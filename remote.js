/* Remote — where MyTube gets real YouTube data from a browser, without an account.
 * Search, suggestions, recommendations, comments and video details come from public
 * Piped and Invidious mirrors (with fallbacks, and the instance that works is remembered).
 * If you add your own YouTube Data API key in Settings, search and comments use it instead.
 * Sponsor segments come from SponsorBlock. Nothing here touches the page. */
'use strict';

const Remote = (() => {
  const PIPED = ['https://pipedapi.kavin.rocks', 'https://pipedapi.adminforge.de', 'https://api.piped.private.coffee', 'https://pipedapi.r4fo.com', 'https://pipedapi.leptons.xyz'];
  const INVIDIOUS = ['https://inv.nadeko.net', 'https://invidious.nerdvpn.de', 'https://invidious.f5.si', 'https://yewtu.be'];
  const MEMO_KEY = 'mytube:instances';
  let apiKey = '';
  let memo = {};
  try { memo = JSON.parse(localStorage.getItem(MEMO_KEY)) || {}; } catch { /* storage blocked */ }
  const lists = { piped: [...PIPED], inv: [...INVIDIOUS] };
  let discovered = false;

  async function getJSON(url, ms = 7000) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ms);
    try {
      const r = await fetch(url, { signal: ctl.signal });
      if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      return await r.json();
    } finally { clearTimeout(timer); }
  }
  function remember(kind, base) {
    memo[kind] = base;
    try { localStorage.setItem(MEMO_KEY, JSON.stringify(memo)); } catch { /* storage blocked */ }
  }
  // Ask the public instance directories for more mirrors, once per session.
  async function discover() {
    if (discovered) return;
    discovered = true;
    await Promise.allSettled([
      getJSON('https://piped-instances.kavin.rocks/', 5000).then((arr) => {
        for (const i of arr) if (i.api_url && !lists.piped.includes(i.api_url)) lists.piped.push(i.api_url.replace(/\/$/, ''));
      }),
      getJSON('https://api.invidious.io/instances.json?sort_by=health', 5000).then((arr) => {
        for (const [, i] of arr) if (i.api && i.cors && i.uri && !lists.inv.includes(i.uri)) lists.inv.push(i.uri.replace(/\/$/, ''));
      }),
    ]);
  }
  // Tries the remembered mirror, then races a few, then walks the rest.
  async function fromMirrors(kind, path) {
    const tried = new Set();
    const attempt = async (base) => { tried.add(base); const j = await getJSON(base + path); remember(kind, base); return j; };
    if (memo[kind]) { try { return await attempt(memo[kind]); } catch { /* fall through */ } }
    for (let round = 0; round < 2; round++) {
      const pool = lists[kind].filter((b) => !tried.has(b));
      if (pool.length) {
        try { return await Promise.any(pool.slice(0, 3).map(attempt)); } catch { /* next */ }
        for (const base of pool.slice(3)) { try { return await attempt(base); } catch { /* next */ } }
      }
      if (round === 0) await discover();
    }
    throw new Error('No YouTube mirror answered');
  }
  // Prefer Piped, fall back to Invidious.
  async function either(pipedPath, invPath, fromP, fromI) {
    try { return fromP(await fromMirrors('piped', pipedPath)); } catch { /* try Invidious */ }
    return fromI(await fromMirrors('inv', invPath));
  }

  // ---------------------------------------------------------------- helpers
  const enc = encodeURIComponent;
  const idFromUrl = (u) => String(u || '').match(/[?&]v=([\w-]{11})/)?.[1] || String(u || '').match(/shorts\/([\w-]{11})/)?.[1] || null;
  function agoText(date) {
    const s = (Date.now() - new Date(date).getTime()) / 1000;
    for (const [n, u] of [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']]) {
      if (s >= n) { const k = Math.floor(s / n); return `${k} ${u}${k === 1 ? '' : 's'} ago`; }
    }
    return 'just now';
  }
  function isoDuration(iso) {
    const m = String(iso).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    return m ? (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0) : 0;
  }
  function htmlToText(html) {
    const doc = new DOMParser().parseFromString(String(html || '').replace(/<br\s*\/?>/gi, '\n'), 'text/html');
    return doc.body.textContent || '';
  }
  const bestThumb = (arr) => (arr || []).slice().sort((a, b) => (b.width || 0) - (a.width || 0))[0]?.url || '';
  const absolute = (u, base) => !u ? '' : u.startsWith('//') ? 'https:' + u : u.startsWith('/') ? base + u : u;

  function fromPiped(it) {
    if (it.type && it.type !== 'stream') return null;
    const id = idFromUrl(it.url);
    if (!id) return null;
    const d = it.duration > 0 ? it.duration : 0;
    return {
      id, title: it.title || '', channel: it.uploaderName || '', avatar: it.uploaderAvatar || '',
      channelUrl: it.uploaderUrl ? 'https://www.youtube.com' + it.uploaderUrl : '',
      views: it.views >= 0 ? it.views : null, duration: d || null, uploaded: it.uploadedDate || '',
      short: !!it.isShort || (d > 0 && d <= 60),
    };
  }
  function fromInvidious(it) {
    if (it.type && !['video', 'shortVideo'].includes(it.type)) return null;
    if (!it.videoId) return null;
    const d = it.lengthSeconds > 0 ? it.lengthSeconds : 0;
    return {
      id: it.videoId, title: it.title || '', channel: it.author || '', avatar: bestThumb(it.authorThumbnails),
      channelUrl: it.authorId ? 'https://www.youtube.com/channel/' + it.authorId : '',
      views: it.viewCount >= 0 ? it.viewCount : null, duration: d || null, uploaded: it.publishedText || '',
      short: it.type === 'shortVideo' || (d > 0 && d <= 60),
    };
  }
  const clean = (arr) => (arr || []).filter(Boolean);

  // ---------------------------------------------------------------- YouTube Data API (optional key)
  async function apiVideos(ids) {
    if (!ids.length) return [];
    const d = await getJSON(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${ids.join(',')}&key=${enc(apiKey)}`);
    return d.items.map((v) => {
      const dur = isoDuration(v.contentDetails?.duration);
      return {
        id: v.id, title: v.snippet.title, channel: v.snippet.channelTitle, avatar: '',
        channelUrl: 'https://www.youtube.com/channel/' + v.snippet.channelId,
        views: +v.statistics?.viewCount || null, duration: dur || null, uploaded: agoText(v.snippet.publishedAt),
        short: dur > 0 && dur <= 60,
      };
    });
  }

  // ---------------------------------------------------------------- public API
  async function search(q) {
    if (apiKey) {
      const s = await getJSON(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${enc(q)}&key=${enc(apiKey)}`);
      return apiVideos(s.items.map((i) => i.id.videoId).filter(Boolean));
    }
    return either(`/search?q=${enc(q)}&filter=all`, `/api/v1/search?q=${enc(q)}&type=all`,
      (j) => clean(j.items?.map(fromPiped)), (j) => clean(j.map?.(fromInvidious)));
  }
  async function suggestions(q) {
    return either(`/suggestions?query=${enc(q)}`, `/api/v1/search/suggestions?q=${enc(q)}`,
      (j) => (Array.isArray(j) ? j : []).slice(0, 8), (j) => (j.suggestions || []).slice(0, 8).map(htmlToText));
  }
  async function trending() {
    return either('/trending?region=US', '/api/v1/trending?region=US',
      (j) => clean(j.map?.(fromPiped)), (j) => clean(j.map?.(fromInvidious)));
  }
  // Details: recommendations, storyboard frames for previews, likes and description.
  async function details(id) {
    return either(`/streams/${id}`, `/api/v1/videos/${id}`,
      (j) => ({
        related: clean(j.relatedStreams?.map(fromPiped)),
        frames: (j.previewFrames || []).slice(-1)[0] || null,
        description: htmlToText(j.description),
      }),
      (j) => ({
        related: clean(j.recommendedVideos?.map((r) => fromInvidious({ ...r, type: 'video' }))),
        frames: null,
        description: j.description || '',
      }));
  }
  async function comments(id) {
    if (apiKey) {
      const j = await getJSON(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=100&order=relevance&textFormat=plainText&key=${enc(apiKey)}`);
      return {
        disabled: false,
        list: j.items.map((t) => {
          const c = t.snippet.topLevelComment.snippet;
          return { id: t.id, author: c.authorDisplayName, avatar: c.authorProfileImageUrl, text: c.textDisplay, likes: c.likeCount || 0, ago: agoText(c.publishedAt), replies: t.snippet.totalReplyCount || 0, pinned: false, hearted: false, owner: false };
        }),
      };
    }
    return either(`/comments/${id}`, `/api/v1/comments/${id}`,
      (j) => ({
        disabled: !!j.disabled,
        list: (j.comments || []).map((c) => ({
          id: c.commentId, author: c.author, avatar: c.thumbnail, text: htmlToText(c.commentText), likes: c.likeCount || 0,
          ago: c.commentedTime || '', replies: c.replyCount || 0, pinned: !!c.pinned, hearted: !!c.hearted, owner: !!c.channelOwner,
        })),
      }),
      (j) => ({
        disabled: false,
        list: (j.comments || []).map((c) => ({
          id: c.commentId, author: c.author, avatar: absolute(bestThumb(c.authorThumbnails), ''), text: c.content || htmlToText(c.contentHtml),
          likes: c.likeCount || 0, ago: c.publishedText || '', replies: c.replies?.replyCount || 0, pinned: !!c.isPinned,
          hearted: !!c.creatorHeart, owner: !!c.authorIsChannelOwner,
        })),
      }));
  }
  // SponsorBlock segments. 404 means the video has none.
  async function sponsorSegments(id, categories) {
    try {
      const j = await getJSON(`https://sponsor.ajay.app/api/skipSegments?videoID=${id}&categories=${enc(JSON.stringify(categories))}`, 6000);
      return j.filter((s) => s.actionType === 'skip' || !s.actionType).map((s) => ({ start: s.segment[0], end: s.segment[1], category: s.category }));
    } catch (e) {
      if (e.status === 404) return [];
      throw e;
    }
  }

  // ---------------------------------------------------------------- comment smarts (no network)
  const SELF_PROMO = /\b(sub(scribe)? (to|2) (me|my)|check (out )?my (channel|video|page)|sub ?4 ?sub|subscribe back|visit my channel|new on youtube.*sub)\b/i;
  const SCAM = /(telegram|whats ?app|wa\.me|t\.me\/|\+\d[\d\s-]{8,}|crypto|bitcoin|forex|binary option|investment|trading coach|earn \$|\$\d+k? (a|per) (day|week)|dm me|contact (him|her) on|onlyfans|🔞|18\+|cl[i1]ck (my|the) (profile|link)|free (robux|v-?bucks|gift card))/i;
  const TOXIC = /\b(kys|kill yourself|retard(ed)?|idiot|stupid|moron|loser|trash human|dumbass|stfu|shut up|ugly|f+u+c+k+ (you|u)|hate you)\b/i;
  const LINK = /https?:\/\/(?!(www\.)?(youtube\.com|youtu\.be))\S+/i;
  const norm = (t) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  // Marks each comment with why it would be hidden, and scores the real discussion.
  function classify(list) {
    const seen = new Map();
    for (const c of list) { const k = norm(c.text); if (k.length > 8) seen.set(k, (seen.get(k) || 0) + 1); }
    const firstSeen = new Set();
    return list.map((c) => {
      const t = c.text || '', k = norm(t);
      const letters = (t.match(/\p{L}/gu) || []).length;
      let hidden = '';
      if (!c.owner && !c.pinned) {
        if (SCAM.test(t)) hidden = 'scam';
        else if (SELF_PROMO.test(t) || LINK.test(t)) hidden = 'self-promo';
        else if (TOXIC.test(t)) hidden = 'toxic';
        else if (seen.get(k) > 1 && firstSeen.has(k)) hidden = 'bot copy';
        else if ((t.length > 14 && letters / t.length < 0.25) || /(.)\1{9,}/u.test(t)) hidden = 'spam';
      }
      firstSeen.add(k);
      const score = (c.pinned ? 1e9 : 0) + (c.owner ? 1e6 : 0) + c.likes + c.replies * 25 + (t.length > 80 ? 40 : 0) + (c.hearted ? 200 : 0);
      return { ...c, hidden, score };
    });
  }
  // Groups timestamps that viewers mention into the moments people talk about most.
  const TS = /(?<![\d:])(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?![\d:])/g;
  function timestamps(text) {
    const out = [];
    for (const m of String(text).matchAll(TS)) {
      const sec = (+m[1] || 0) * 3600 + +m[2] * 60 + +m[3];
      if (+m[3] < 60) out.push({ sec, index: m.index, length: m[0].length, label: m[0] });
    }
    return out;
  }
  function bestMoments(list, duration) {
    const mentions = [];
    for (const c of list) {
      if (c.hidden) continue;
      const seen = new Set();
      for (const ts of timestamps(c.text)) {
        if ((duration && ts.sec > duration + 5) || seen.has(ts.sec)) continue;
        seen.add(ts.sec);
        mentions.push({ sec: ts.sec, c });
      }
    }
    // Times within a few seconds of each other are the same moment (4:12 and 4:13).
    mentions.sort((a, b) => a.sec - b.sec);
    const groups = [];
    for (const m of mentions) {
      const g = groups[groups.length - 1];
      if (g && m.sec - g.start <= 6) g.items.push(m); else groups.push({ start: m.sec, items: [m] });
    }
    return groups.map((g) => {
      const secs = g.items.map((i) => i.sec);
      return {
        sec: secs[Math.floor(secs.length / 2)],
        count: new Set(g.items.map((i) => i.c.id)).size,
        weight: g.items.reduce((w, i) => w + 1 + Math.log10(1 + i.c.likes), 0),
        sample: g.items.reduce((a, b) => (b.c.likes > a.c.likes ? b : a)).c,
      };
    }).filter((g) => g.count >= 2 || groups.length <= 3).sort((a, b) => b.weight - a.weight).slice(0, 6);
  }
  // Which storyboard tile shows a given second (for timestamp previews).
  function frameAt(frames, sec) {
    if (!frames?.urls?.length || !frames.durationPerFrame) return null;
    const perPage = frames.framesPerPageX * frames.framesPerPageY;
    const idx = Math.min(frames.totalCount - 1, Math.floor((sec * 1000) / frames.durationPerFrame));
    const page = Math.floor(idx / perPage), within = idx % perPage;
    return {
      url: frames.urls[Math.min(page, frames.urls.length - 1)], w: frames.frameWidth, h: frames.frameHeight,
      x: (within % frames.framesPerPageX) * frames.frameWidth, y: Math.floor(within / frames.framesPerPageX) * frames.frameHeight,
      cols: frames.framesPerPageX, rows: frames.framesPerPageY,
    };
  }

  return {
    setKey: (k) => { apiKey = (k || '').trim(); },
    hasKey: () => !!apiKey,
    search, suggestions, trending, details, comments, sponsorSegments,
    classify, bestMoments, timestamps, frameAt,
  };
})();
