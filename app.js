/* MyTube — a personal YouTube-style app.
 * Everything lives in localStorage on this device. Videos play through the
 * official YouTube embed player; titles/channels come from YouTube's oEmbed. */
'use strict';

// ---------------------------------------------------------------- icons
const ICONS = {
  home: 'M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z',
  shorts: 'M14.5 3.5 7 7.6a3.6 3.6 0 0 0 1.1 6.6l-.9.5a3.6 3.6 0 1 0 3.4 6.3l7.5-4.1a3.6 3.6 0 0 0-1.1-6.6l.9-.5a3.6 3.6 0 1 0-3.4-6.3zM10.2 9.6v4.8l4.1-2.4z',
  plus: 'M12 5v14M5 12h14',
  subs: 'M4 9h16v11H4zM6 6h12M8 3h8M10.5 11.5v6l5-3z',
  search: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM16 16l5 5',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  moreV: 'M12 5h.01M12 12h.01M12 19h.01',
  like: 'M7 10v11H4V10h3zM7 10l4-8a3 3 0 0 1 3 3v4h5.5a2 2 0 0 1 2 2.3l-1.4 8A2 2 0 0 1 18.1 21H7',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  share: 'M14 5l7 7-7 7M21 12H10a7 7 0 0 0-7 7',
  save: 'M3 6h13M3 12h13M3 18h8M18 14v8M14 18h8',
  history: 'M3 12a9 9 0 1 0 2.6-6.4L3 8M3 3v5h5M12 7v5l3 2',
  right: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
  back: 'M19 12H5M12 19l-7-7 7-7',
  close: 'M6 6l12 12M18 6 6 18',
  play: 'M8 5v14l11-7z',
  pause: 'M7 5h3v14H7zM14 5h3v14h-3z',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',
  feed: 'M4 7h16v13H4zM8 4h8M12 10.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3z',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
  upload: 'M12 15V3M7 8l5-5 5 5M4 21h16',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
  list: 'M3 6h18M3 12h18M3 18h11M17 15v6l5-3z',
  moon: 'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  shuffle: 'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  link: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
};
const FILLED = new Set(['play', 'pause']);
function icon(name) {
  const fill = FILLED.has(name);
  const w = name === 'more' || name === 'moreV' ? 3 : 1.8;
  return `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="${fill ? 'none' : 'currentColor'}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
}
const LOGO = `<svg viewBox="0 0 34 24" aria-hidden="true"><defs><linearGradient id="lg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ff3d6e"/><stop offset="1" stop-color="#ff0033"/></linearGradient></defs><rect x="1" y="1" width="32" height="22" rx="7" fill="url(#lg)"/><path d="M14 7.5v9l7.5-4.5z" fill="#fff"/></svg>`;

// ---------------------------------------------------------------- state
const STORE_KEY = 'mytube:v1';
const SEED = [
  ['dQw4w9WgXcQ', 'Rick Astley - Never Gonna Give You Up (Official Music Video)', 'Rick Astley', 'Music'],
  ['aqz-KE-bpKQ', 'Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film', 'Blender', 'Film'],
  ['9bZkp7q19f0', 'PSY - GANGNAM STYLE (강남스타일) M/V', 'officialpsy', 'Music'],
  ['jNQXAC9IVRw', 'Me at the zoo', 'jawed', 'Classics'],
  ['kJQP7kiw5Fk', 'Luis Fonsi - Despacito ft. Daddy Yankee', 'Luis Fonsi', 'Music'],
  ['eRsGyueVLvQ', 'Sintel - Open Movie by Blender Foundation', 'Blender', 'Film'],
];

function defaultState() {
  const now = Date.now();
  const videos = {};
  SEED.forEach(([id, title, channel, category], i) => {
    videos[id] = { id, title, channel, channelUrl: '', category, short: false, addedAt: now - i * 3.6e6 * 7, seed: true };
  });
  return {
    profile: { name: 'You', handle: '@me', color: '#5b3cc4', photo: null },
    videos,
    subs: [{ name: 'Blender', url: 'https://www.youtube.com/@BlenderOfficial' }],
    history: [],
    progress: {},
    liked: [],
    later: [],
    playlists: [],
    settings: { theme: 'dark', autoplay: true },
  };
}

let state;
try { state = Object.assign(defaultState(), JSON.parse(localStorage.getItem(STORE_KEY)) || {}); }
catch { state = defaultState(); }

let saveTimer = 0;
function save(now) {
  clearTimeout(saveTimer);
  const write = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { toast('Could not save — storage is full or blocked'); } };
  if (now) write(); else saveTimer = setTimeout(write, 200);
}

// ---------------------------------------------------------------- helpers
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytUrl = (v) => v.short ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;

function hashColor(str) {
  let h = 0;
  for (const c of String(str)) h = (h * 31 + c.codePointAt(0)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}
function avatar(name, size = 36, photo, color) {
  const inner = photo ? `<img src="${esc(photo)}" alt="">` : esc((name || '?').trim().charAt(0).toUpperCase());
  return `<span class="avatar av-${size}" style="background:${color || hashColor(name)}">${inner}</span>`;
}
function profileAvatar(size) { const p = state.profile; return avatar(p.name, size, p.photo, p.color); }

function ago(t) {
  const s = (Date.now() - t) / 1000;
  const units = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']];
  for (const [n, u] of units) if (s >= n) return `${Math.floor(s / n)}${u} ago`;
  return 'just now';
}
function fmtTime(sec) {
  sec = Math.floor(sec || 0);
  const h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
  return (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) + ':' + String(s).padStart(2, '0');
}

function parseId(input) {
  const s = String(input || '').trim();
  if (/^[\w-]{11}$/.test(s)) return { id: s, short: false };
  let u;
  try { u = new URL(s.startsWith('http') ? s : 'https://' + s); } catch { return null; }
  const host = u.hostname.replace(/^(www|m|music)\./, '');
  let id = null, short = false;
  if (host === 'youtu.be') id = u.pathname.slice(1, 12);
  else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
    const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([\w-]{11})/);
    if (m) { id = m[2]; short = m[1] === 'shorts'; }
    else id = u.searchParams.get('v');
  }
  return id && /^[\w-]{11}$/.test(id) ? { id, short } : null;
}
function findLinks(text) {
  const out = new Map();
  for (const tok of String(text).split(/[\s,]+/)) {
    const p = parseId(tok);
    if (p && !out.has(p.id)) out.set(p.id, p);
  }
  return [...out.values()];
}

async function fetchMeta(id, short) {
  const page = short ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
  const sources = [
    `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(page)}`,
    `https://noembed.com/embed?url=${encodeURIComponent(page)}`,
  ];
  for (const src of sources) {
    try {
      const r = await fetch(src);
      if (!r.ok) continue;
      const j = await r.json();
      if (j.title) {
        const vertical = j.height && j.width && j.height > j.width;
        return { title: j.title, channel: j.author_name || 'Unknown channel', channelUrl: j.author_url || '', vertical };
      }
    } catch { /* try the next source */ }
  }
  return null;
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

const allVideos = () => Object.values(state.videos).sort((a, b) => b.addedAt - a.addedAt);
const isSub = (ch) => state.subs.some((s) => s.name === ch);
const watched = (id) => state.history.some((h) => h.id === id);
const toggleIn = (arr, id) => { const i = arr.indexOf(id); if (i >= 0) arr.splice(i, 1); else arr.unshift(id); return i < 0; };

// ---------------------------------------------------------------- list rendering
// Every rendered list registers its ids so tapping a card can queue the rest.
let ctxLists = {}, ctxSeq = 0;
function ctx(ids) { const k = 'c' + ctxSeq++; ctxLists[k] = ids; return k; }

function progressBar(id) {
  const p = state.progress[id];
  if (!p || !p.d) return '';
  return `<div class="watched" style="width:${Math.min(100, (p.t / p.d) * 100).toFixed(1)}%"></div>`;
}
function durBadge(id) { const p = state.progress[id]; return p && p.d ? `<span class="badge">${fmtTime(p.d)}</span>` : ''; }

function bigCard(v, k) {
  return `<div class="card">
    <a class="thumb" data-play="${v.id}" data-ctx="${k}" href="#"><img loading="lazy" src="${thumb(v.id)}" alt="">${durBadge(v.id)}${progressBar(v.id)}</a>
    <div class="meta">
      <a href="#channel/${encodeURIComponent(v.channel)}">${avatar(v.channel)}</a>
      <a class="text" data-play="${v.id}" data-ctx="${k}" href="#">
        <div class="title">${esc(v.title)}</div>
        <div class="sub">${esc(v.channel)} · ${v.short ? 'Short · ' : ''}${esc(v.category || 'Saved')} · ${ago(v.addedAt)}</div>
      </a>
      <button class="more" data-menu="${v.id}" aria-label="More">${icon('moreV')}</button>
    </div></div>`;
}
function smallCard(v, k, wide) {
  return `<div class="hcard ${wide ? 'wide' : ''}">
    <a class="thumb" data-play="${v.id}" data-ctx="${k}" href="#"><img loading="lazy" src="${thumb(v.id)}" alt="">${durBadge(v.id)}${progressBar(v.id)}</a>
    <div class="meta"><a class="text" data-play="${v.id}" data-ctx="${k}" href="#">
      <div class="title">${esc(v.title)}</div><div class="sub">${esc(v.channel)}</div></a>
      <button class="more" data-menu="${v.id}" aria-label="More">${icon('more')}</button></div></div>`;
}
function listRow(v, k, extra = '') {
  return `<div class="lrow">
    <a class="thumb" data-play="${v.id}" data-ctx="${k}" href="#"><img loading="lazy" src="${thumb(v.id)}" alt="">${durBadge(v.id)}${progressBar(v.id)}</a>
    <a class="text" data-play="${v.id}" data-ctx="${k}" href="#"><div class="title">${esc(v.title)}</div>
      <div class="sub">${esc(v.channel)}${extra ? ' · ' + extra : ''}</div></a>
    <button class="more" data-menu="${v.id}" aria-label="More">${icon('moreV')}</button></div>`;
}
function shortsShelf(list) {
  if (!list.length) return '';
  return `<div class="section-title">${icon('shorts')} Shorts</div><div class="hrow">${list.map((v) => `
    <a class="hcard" href="#shorts/${v.id}" style="width:150px"><div class="thumb" style="aspect-ratio:9/16;border-radius:10px"><img loading="lazy" src="${thumb(v.id)}" alt=""></div>
    <div class="title" style="font-size:14px;margin-top:6px">${esc(v.title)}</div></a>`).join('')}</div>`;
}
function empty(ic, text, btn) {
  return `<div class="empty">${icon(ic)}<div>${text}</div>${btn || ''}</div>`;
}
const addBtnHtml = '<button class="btn" data-action="add">Add a video</button>';

// ---------------------------------------------------------------- views
const view = { homeChip: 'All', subsChip: 'All', subsChannel: null, shuffle: false };

function topbar(extra = '') {
  return `<header class="topbar"><a class="logo" href="#home">${LOGO}<span>MyTube</span></a><div class="spacer"></div>
    ${extra}<a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a></header>`;
}

function renderHome() {
  const vids = allVideos();
  const cats = [...new Set(vids.map((v) => v.category).filter(Boolean))].sort();
  const chips = ['Your custom feed', 'All', 'New to you', ...cats];
  if (!chips.includes(view.homeChip)) view.homeChip = 'All';
  const c = view.homeChip;
  let list = vids.filter((v) => !v.short);
  if (c === 'Your custom feed') {
    const likedCh = new Set(state.liked.map((id) => state.videos[id]?.channel));
    list = list.filter((v) => isSub(v.channel) || likedCh.has(v.channel));
  } else if (c === 'New to you') list = list.filter((v) => !watched(v.id));
  else if (c !== 'All') list = list.filter((v) => v.category === c);
  if (view.shuffle) list = list.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  const k = ctx(list.map((v) => v.id));
  const shorts = vids.filter((v) => v.short);

  let feed = '';
  list.forEach((v, i) => {
    feed += bigCard(v, k);
    if (i === 1 && c === 'All') feed += `</div>${shortsShelf(shorts)}<div class="feed">`;
  });
  if (list.length < 2 && c === 'All') feed += `</div>${shortsShelf(shorts)}<div class="feed">`;

  return topbar() + `
    <div class="chips">
      <button class="chip ${view.shuffle ? 'active' : ''}" data-action="shuffle" aria-label="Shuffle">${icon('compass')}</button>
      ${chips.map((ch) => `<button class="chip ${ch === c ? 'active' : ''}" data-homechip="${esc(ch)}">${ch === 'Your custom feed' ? icon('feed') : ''}${esc(ch)}</button>`).join('')}
    </div>
    <div class="feed">${feed}</div>
    ${list.length ? '' : empty('feed', c === 'Your custom feed' ? 'Subscribe to channels or like videos to build your custom feed.' : 'Nothing here yet. Paste any YouTube link to start your collection.', addBtnHtml)}`;
}

function renderSubs() {
  const subs = state.subs;
  const vids = allVideos().filter((v) => isSub(v.channel));
  let list = view.subsChannel ? vids.filter((v) => v.channel === view.subsChannel) : vids;
  const c = view.subsChip;
  if (c === 'Today') list = list.filter((v) => Date.now() - v.addedAt < 864e5);
  else if (c === 'Videos') list = list.filter((v) => !v.short);
  else if (c === 'Shorts') list = list.filter((v) => v.short);
  else if (c === 'Continue watching') list = list.filter((v) => state.progress[v.id]?.t > 5);

  const rel = list.slice(0, 6), rest = list.slice(6);
  const k = ctx(list.map((v) => v.id));
  return topbar() + `
    <div class="channels-row">
      ${subs.map((s) => `<button class="ch ${view.subsChannel === s.name ? 'active' : ''}" data-subch="${esc(s.name)}">${avatar(s.name, 64)}<div class="name">${esc(s.name)}</div></button>`).join('')}
      <button class="ch-all" data-action="manage-subs">All</button>
    </div>
    <div class="chips" style="top:calc(var(--safe-t) + 56px)">
      ${['All', 'Today', 'Videos', 'Shorts', 'Continue watching'].map((ch) => `<button class="chip ${ch === c ? 'active' : ''}" data-subschip="${ch}">${ch}</button>`).join('')}
    </div>
    ${!subs.length ? empty('subs', 'You have no subscriptions yet. Open any video and tap Subscribe.') :
      !list.length ? empty('subs', 'No videos from these channels yet. Add some with the + button.', addBtnHtml) : `
    <div class="section-title">Most relevant</div>
    <div class="hrow">${rel.map((v) => smallCard(v, k, true)).join('')}</div>
    ${rest.length ? `<div class="feed" style="margin-top:12px">${rest.map((v) => bigCard(v, k)).join('')}</div>` : ''}`}`;
}

function renderYou() {
  const p = state.profile;
  const hist = state.history.map((h) => state.videos[h.id]).filter(Boolean);
  const hk = ctx(hist.map((v) => v.id));
  const lib = (title, sub, ids, href, corner) => {
    const first = ids.find((id) => state.videos[id]);
    return `<a class="lib-item" href="${href}"><div class="stack">${first ? `<img loading="lazy" src="${thumb(first)}" alt="">` : ''}<span class="corner">${icon(corner)}</span></div>
      <div class="text"><div class="title">${esc(title)}</div><div class="sub">${esc(sub)}</div></div><span>${icon('right')}</span></a>`;
  };
  return `<div class="you-head">
    <header class="topbar" style="background:transparent"><button class="pill-btn" data-action="edit-profile">${icon('user')} Profile ${icon('down')}</button><div class="spacer"></div>
      <a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a>
      <button class="icon-btn" data-action="settings" aria-label="Settings">${icon('gear')}</button></header>
    <div class="profile">${profileAvatar(88)}<div><h1>${esc(p.name)}</h1><div class="handle">${esc(p.handle)}</div></div></div>
    <div class="btn-row"><button class="btn primary" data-action="edit-profile">Edit profile</button><button class="btn" data-action="add">Add videos</button></div>
  </div>
  <a class="section-title" href="#history">History ${icon('right')}</a>
  ${hist.length ? `<div class="hrow">${hist.slice(0, 12).map((v) => smallCard(v, hk)).join('')}</div>` : `<div class="sub" style="padding:0 16px 8px">Videos you watch will show up here.</div>`}
  <div class="section-title">Library</div>
  <div class="chips" style="position:static">
    <a class="chip" href="#history">${icon('history')} Recents</a>
    <a class="chip" href="#library">All saved</a>
    <button class="chip" data-action="new-playlist">${icon('plus')} New playlist</button>
    <a class="chip" href="#home" data-homechip-link="Music">Music</a>
  </div>
  ${lib('Liked videos', `${state.liked.length} videos · Private`, state.liked, '#liked', 'like')}
  ${lib('Watch later', `${state.later.length} videos · Private`, state.later, '#later', 'clock')}
  ${state.playlists.map((pl) => lib(pl.name, `${pl.items.length} videos · Playlist`, pl.items, `#playlist/${pl.id}`, 'list')).join('')}
  ${lib('All saved videos', `${Object.keys(state.videos).length} videos`, allVideos().map((v) => v.id), '#library', 'save')}`;
}

function pageHeader(title, extra = '') {
  return `<header class="topbar"><button class="icon-btn" data-action="back" aria-label="Back">${icon('back')}</button>
    <div style="font-weight:600;font-size:18px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(title)}</div>${extra}</header>`;
}
function renderList(title, ids, opts = {}) {
  const vids = ids.map((id) => state.videos[id]).filter(Boolean);
  const k = ctx(vids.map((v) => v.id));
  const playAll = vids.length ? `<div class="btn-row"><button class="btn red" data-play="${vids[0].id}" data-ctx="${k}">Play all</button>
    <button class="btn" data-action="shuffle-play" data-ctx="${k}">Shuffle</button></div>` : '';
  return pageHeader(title, opts.extra || '') + (opts.top || '') + playAll +
    (vids.length ? vids.map((v) => listRow(v, k, opts.sub ? opts.sub(v) : ago(v.addedAt))).join('') : empty(opts.icon || 'list', opts.empty || 'Nothing here yet.'));
}

function renderShorts(startId) {
  let list = allVideos().filter((v) => v.short);
  if (startId) {
    const i = list.findIndex((v) => v.id === startId);
    if (i > 0) list = [...list.slice(i), ...list.slice(0, i)];
  }
  if (!list.length) {
    return topbar() + empty('shorts', 'No Shorts saved yet.<br>Paste a link like <b>youtube.com/shorts/…</b> with the + button.', addBtnHtml);
  }
  return `<div class="shorts-top"><a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a></div>
  <div class="shorts" id="shorts">${list.map((v) => `
    <div class="short" data-short="${v.id}">
      <div class="frame"><img src="${thumb(v.id)}" alt=""></div>
      <div class="overlay"><div class="who">${avatar(v.channel, 28)} ${esc(v.channel)}</div><div>${esc(v.title)}</div></div>
      <div class="side">
        <button data-act-like="${v.id}" class="${state.liked.includes(v.id) ? 'on' : ''}">${icon('like')}<span>Like</span></button>
        <button data-act-later="${v.id}" class="${state.later.includes(v.id) ? 'on' : ''}">${icon('clock')}<span>Later</span></button>
        <button data-act-share="${v.id}">${icon('share')}<span>Share</span></button>
        <button data-menu="${v.id}">${icon('more')}<span>More</span></button>
      </div>
    </div>`).join('')}</div>`;
}

function setupShorts() {
  const root = $('#shorts');
  if (!root) return;
  if (playerMode !== 'hidden') pausePlayer();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target, id = el.dataset.short, frame = $('.frame', el);
      if (e.isIntersecting) {
        if (!$('iframe', frame)) {
          frame.insertAdjacentHTML('beforeend', `<iframe allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
            src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&loop=1&playlist=${id}&rel=0"></iframe>`);
          addHistory(id);
        }
      } else $('iframe', frame)?.remove();
    }
  }, { root, threshold: 0.6 });
  root.querySelectorAll('.short').forEach((el) => io.observe(el));
}

function renderSearch(q) {
  const ql = q.toLowerCase();
  const links = findLinks(q);
  const res = q ? allVideos().filter((v) => (v.title + ' ' + v.channel + ' ' + (v.category || '')).toLowerCase().includes(ql)) : [];
  const k = ctx(res.map((v) => v.id));
  return `<div class="searchbar"><button class="icon-btn" data-action="back" aria-label="Back">${icon('back')}</button>
    <input id="search-input" type="search" placeholder="Search your library or paste a link" value="${esc(q)}" autocomplete="off" enterkeyhint="search"></div>
    ${links.length ? `<button class="lib-item" style="width:100%;text-align:left" data-action="add-from-search">${icon('plus')}<div class="text"><div class="title">Add ${links.length} video${links.length > 1 ? 's' : ''} from link</div></div></button>` : ''}
    ${res.map((v) => listRow(v, k, esc(v.category || ''))).join('')}
    ${q && !links.length ? `<a class="lib-item" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(q)}">${icon('external')}<div class="text"><div class="title">Search YouTube for “${esc(q)}”</div><div class="sub">Opens youtube.com — copy a link and paste it here to save it</div></div></a>` : ''}
    ${!q ? empty('search', 'Search titles, channels and categories you\'ve saved — or paste a YouTube link to add it.') : ''}`;
}

function renderChannel(name) {
  const sub = state.subs.find((s) => s.name === name);
  const vids = allVideos().filter((v) => v.channel === name);
  const url = sub?.url || vids.find((v) => v.channelUrl)?.channelUrl;
  const top = `<div class="profile">${avatar(name, 64)}<div style="flex:1;min-width:0"><h1 style="font-size:22px">${esc(name)}</h1><div class="sub">${vids.length} saved videos</div></div></div>
    <div class="btn-row"><button class="sub-btn ${sub ? 'on' : ''}" data-act-sub="${esc(name)}" style="flex:1">${sub ? 'Subscribed' : 'Subscribe'}</button>
    ${url ? `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">Open on YouTube</a>` : ''}</div>`;
  return renderList(name, vids.map((v) => v.id), { top, empty: 'No saved videos from this channel.' });
}

// ---------------------------------------------------------------- router
function route() {
  ctxLists = {}; ctxSeq = 0;
  const h = decodeURIComponent(location.hash.slice(1) || 'home');
  const [page, ...rest] = h.split('/');
  const arg = rest.join('/');
  const main = $('#main');
  let html;
  switch (page) {
    case 'shorts': html = renderShorts(arg); break;
    case 'subs': html = renderSubs(); break;
    case 'you': html = renderYou(); break;
    case 'search': html = renderSearch(arg); break;
    case 'history': {
      const extra = state.history.length ? `<button class="icon-btn" data-action="clear-history" aria-label="Clear history">${icon('trash')}</button>` : '';
      html = renderList('History', state.history.map((x) => x.id), { extra, icon: 'history', empty: 'No watch history yet.', sub: (v) => 'watched ' + ago(state.history.find((x) => x.id === v.id).at) });
      break;
    }
    case 'liked': html = renderList('Liked videos', state.liked, { icon: 'like', empty: 'Tap Like on a video to save it here.' }); break;
    case 'later': html = renderList('Watch later', state.later, { icon: 'clock', empty: 'Save videos to watch later.' }); break;
    case 'library': html = renderList('All saved videos', allVideos().map((v) => v.id), { icon: 'save' }); break;
    case 'playlist': {
      const pl = state.playlists.find((p) => p.id === arg);
      html = pl ? renderList(pl.name, pl.items, { extra: `<button class="icon-btn" data-action="playlist-menu" data-pl="${pl.id}" aria-label="Playlist options">${icon('moreV')}</button>`, empty: 'Add videos with “Save to playlist”.' }) : renderHome();
      break;
    }
    case 'channel': html = renderChannel(arg); break;
    default: html = renderHome();
  }
  main.innerHTML = html;
  const tab = { home: 'home', shorts: 'shorts', subs: 'subs', channel: 'subs' }[page] || (['you', 'history', 'liked', 'later', 'library', 'playlist'].includes(page) ? 'you' : page === 'search' ? '' : 'home');
  document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.tab === tab));
  $('#tab-avatar').innerHTML = profileAvatar(28);
  document.body.classList.toggle('on-shorts', page === 'shorts');
  if (page === 'shorts') setupShorts();
  if (page === 'search') {
    const inp = $('#search-input');
    if (!arg) inp.focus();
    inp.addEventListener('change', () => { location.replace('#search/' + encodeURIComponent(inp.value)); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });
  }
}
function rerender() { const y = scrollY; route(); scrollTo(0, y); }

// ---------------------------------------------------------------- player
let yt = null, ytApiFailed = false, pending = null, playerMode = 'hidden';
let current = null, queue = [], tick = 0, lastSave = 0;

window.onYouTubeIframeAPIReady = () => { if (pending) loadInPlayer(pending.id, pending.start); };
setTimeout(() => { if (!(window.YT && YT.Player)) { ytApiFailed = true; if (pending) loadInPlayer(pending.id, pending.start); } }, 8000);

function loadInPlayer(id, start) {
  pending = null;
  if (yt && yt.loadVideoById) { yt.loadVideoById({ videoId: id, startSeconds: start }); return; }
  if (window.YT && YT.Player) {
    yt = new YT.Player('yt-host', {
      host: 'https://www.youtube-nocookie.com',
      videoId: id,
      playerVars: { autoplay: 1, playsinline: 1, rel: 0, start: Math.floor(start) },
      events: { onStateChange: onYtState },
    });
    return;
  }
  if (ytApiFailed) {
    $('#yt-host').innerHTML = `<iframe allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
      src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&start=${Math.floor(start)}"></iframe>`;
    return;
  }
  pending = { id, start };
}

function onYtState(e) {
  updateMiniIcon();
  if (e.data === 0) { // ended
    recordProgress(true);
    if (state.settings.autoplay) { const n = nextInQueue(); if (n) openVideo(n, queue); }
  }
}
function isPlaying() { return yt && yt.getPlayerState && yt.getPlayerState() === 1; }
function pausePlayer() { if (yt && yt.pauseVideo) yt.pauseVideo(); }
function updateMiniIcon() { $('#mini-toggle').innerHTML = icon(isPlaying() ? 'pause' : 'play'); $('#mini-toggle').classList.toggle('hidden', !yt); }

function recordProgress(force) {
  if (!current || !yt || !yt.getCurrentTime) return;
  const t = yt.getCurrentTime(), d = yt.getDuration();
  if (!d) return;
  state.progress[current] = { t: t > d - 10 ? d : t, d };
  $('#mini-progress-bar').style.width = (t / d * 100) + '%';
  if (force || Date.now() - lastSave > 5000) { lastSave = Date.now(); save(); }
}
setInterval(() => { if (isPlaying()) recordProgress(); }, 1000);

function addHistory(id) {
  state.history = state.history.filter((h) => h.id !== id);
  state.history.unshift({ id, at: Date.now() });
  state.history.length = Math.min(state.history.length, 300);
  save();
}
function nextInQueue() {
  const i = queue.indexOf(current);
  return i >= 0 && i < queue.length - 1 ? queue[i + 1] : null;
}

function openVideo(id, q) {
  const v = state.videos[id];
  if (!v) return;
  if (current && current !== id) recordProgress(true);
  current = id;
  queue = q && q.length ? q : allVideos().filter((x) => !x.short).map((x) => x.id);
  if (!queue.includes(id)) queue = [id, ...queue];
  const p = state.progress[id];
  const start = p && p.d && p.t > 10 && p.t < p.d - 15 ? p.t : 0;
  addHistory(id);
  setPlayerMode('full');
  renderPlayerBody();
  loadInPlayer(id, start);
}

function setPlayerMode(mode) {
  playerMode = mode;
  const el = $('#player');
  el.className = mode === 'hidden' ? 'hidden' : mode;
  document.body.style.overflow = mode === 'full' ? 'hidden' : '';
  if (mode === 'full') el.scrollTop = 0;
  updateMiniIcon();
}

function renderPlayerBody() {
  const v = state.videos[current];
  if (!v) return;
  const sub = isSub(v.channel), liked = state.liked.includes(v.id), later = state.later.includes(v.id);
  const upNext = queue.filter((id) => id !== v.id).map((id) => state.videos[id]).filter(Boolean);
  const k = ctx(queue);
  $('#player-body').innerHTML = `
    <div class="player-top"><button class="icon-btn" data-action="minimize" aria-label="Minimize">${icon('down')}</button><div class="spacer"></div>
      <a class="icon-btn" href="${ytUrl(v)}" target="_blank" rel="noopener" aria-label="Open on YouTube">${icon('external')}</a>
      <button class="icon-btn" data-action="close-player" aria-label="Close">${icon('close')}</button></div>
    <div class="watch-info"><h2>${esc(v.title)}</h2><div class="sub">${esc(v.category || 'Saved')} · added ${ago(v.addedAt)}</div></div>
    <div class="watch-channel"><a href="#channel/${encodeURIComponent(v.channel)}" data-action="minimize">${avatar(v.channel)}</a>
      <a class="name" href="#channel/${encodeURIComponent(v.channel)}" data-action="minimize">${esc(v.channel)}</a>
      <button class="sub-btn ${sub ? 'on' : ''}" data-act-sub="${esc(v.channel)}">${sub ? 'Subscribed' : 'Subscribe'}</button></div>
    <div class="actions">
      <button class="pill-btn ${liked ? 'on' : ''}" data-act-like="${v.id}">${icon('like')} ${liked ? 'Liked' : 'Like'}</button>
      <button class="pill-btn ${later ? 'on' : ''}" data-act-later="${v.id}">${icon('clock')} ${later ? 'Saved' : 'Later'}</button>
      <button class="pill-btn" data-act-playlist="${v.id}">${icon('save')} Save</button>
      <button class="pill-btn" data-act-share="${v.id}">${icon('share')} Share</button>
      <button class="pill-btn" data-menu="${v.id}">${icon('more')}</button>
    </div>
    <div class="section-title" style="font-size:16px">Up next ${state.settings.autoplay ? '<span class="sub" style="margin:0 0 0 6px;font-weight:400">· autoplay on</span>' : ''}</div>
    ${upNext.map((x) => listRow(x, k, ago(x.addedAt))).join('') || '<div class="sub" style="padding:0 16px">Add more videos to build a queue.</div>'}`;
}

$('#mini-expand').addEventListener('click', () => setPlayerMode('full'));
$('#mini-close').innerHTML = icon('close');
$('#mini-close').addEventListener('click', (e) => {
  e.stopPropagation();
  recordProgress(true);
  if (yt && yt.stopVideo) yt.stopVideo(); else $('#yt-host').innerHTML = '';
  current = null;
  setPlayerMode('hidden');
});
$('#mini-toggle').addEventListener('click', (e) => {
  e.stopPropagation();
  if (!yt) return;
  if (isPlaying()) yt.pauseVideo(); else yt.playVideo();
  setTimeout(updateMiniIcon, 150);
});

// ---------------------------------------------------------------- sheets
function openSheet(html, onMount) {
  const root = $('#sheet-root');
  root.innerHTML = `<div class="scrim"><div class="sheet" role="dialog"><div class="grab"></div>${html}</div></div>`;
  const scrim = $('.scrim', root);
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeSheet(); });
  onMount && onMount($('.sheet', root));
}
function closeSheet() { $('#sheet-root').innerHTML = ''; }

function videoMenu(id) {
  const v = state.videos[id];
  if (!v) return;
  const h = location.hash;
  const plId = h.startsWith('#playlist/') ? h.slice(10) : null;
  openSheet(`
    <h3 style="font-size:15px;font-weight:500">${esc(v.title)}</h3>
    <button class="opt" data-sheet="play">${icon('play')} Play</button>
    <button class="opt" data-sheet="later">${icon('clock')} ${state.later.includes(id) ? 'Remove from Watch later' : 'Save to Watch later'}</button>
    <button class="opt" data-sheet="playlist">${icon('save')} Save to playlist</button>
    <button class="opt" data-sheet="share">${icon('share')} Share</button>
    <button class="opt" data-sheet="edit">${icon('edit')} Edit details</button>
    <a class="opt" href="${ytUrl(v)}" target="_blank" rel="noopener">${icon('external')} Open on YouTube</a>
    ${plId ? `<button class="opt" data-sheet="unplaylist">${icon('trash')} Remove from this playlist</button>` : ''}
    <button class="opt" data-sheet="remove" style="color:#ff4e45">${icon('trash')} Remove from library</button>`, (s) => {
    s.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sheet]');
      if (!b) return;
      const a = b.dataset.sheet;
      closeSheet();
      if (a === 'play') v.short ? (location.hash = '#shorts/' + id) : openVideo(id);
      else if (a === 'later') toggleLater(id);
      else if (a === 'playlist') playlistSheet(id);
      else if (a === 'share') share(id);
      else if (a === 'edit') editVideoSheet(id);
      else if (a === 'unplaylist') { const pl = state.playlists.find((p) => p.id === plId); pl.items = pl.items.filter((x) => x !== id); save(); rerender(); }
      else if (a === 'remove') removeVideo(id);
    });
  });
}

function removeVideo(id) {
  delete state.videos[id];
  state.liked = state.liked.filter((x) => x !== id);
  state.later = state.later.filter((x) => x !== id);
  state.history = state.history.filter((x) => x.id !== id);
  state.playlists.forEach((p) => { p.items = p.items.filter((x) => x !== id); });
  delete state.progress[id];
  save(); rerender(); toast('Removed from library');
}

function categoryOptions(selected) {
  const cats = [...new Set(['Music', 'Gaming', 'Comedy', 'Film', 'Education', 'Sports', 'Podcasts', ...Object.values(state.videos).map((v) => v.category).filter(Boolean)])].sort();
  return `<option value="">Auto / none</option>${cats.map((c) => `<option ${c === selected ? 'selected' : ''}>${esc(c)}</option>`).join('')}<option value="__new">New category…</option>`;
}

function addSheet(prefill = '') {
  openSheet(`
    <h3>Add videos</h3>
    <div class="field"><label for="add-links">YouTube links (one or many)</label>
      <textarea id="add-links" placeholder="https://youtu.be/…&#10;https://www.youtube.com/shorts/…">${esc(prefill)}</textarea></div>
    <div class="hint">Tip: in the YouTube app tap Share → Copy link, then paste here. Shorts links are detected automatically.</div>
    <div class="field"><label for="add-cat">Category</label><select id="add-cat">${categoryOptions('')}</select></div>
    <div class="field hidden" id="add-newcat-wrap"><input id="add-newcat" type="text" placeholder="Category name"></div>
    <label class="check"><input type="checkbox" id="add-sub"> Subscribe to the channel</label>
    <label class="check"><input type="checkbox" id="add-short"> Treat all as Shorts</label>
    <div class="row"><button class="btn" data-x="cancel">Cancel</button><button class="btn red" data-x="go">Add</button></div>`, (s) => {
    const ta = $('#add-links', s);
    if (!prefill && navigator.clipboard?.readText) {
      navigator.clipboard.readText().then((t) => { if (!ta.value && findLinks(t).length) ta.value = t.trim(); }).catch(() => {});
    }
    setTimeout(() => ta.focus(), 50);
    $('#add-cat', s).addEventListener('change', (e) => $('#add-newcat-wrap', s).classList.toggle('hidden', e.target.value !== '__new'));
    s.addEventListener('click', async (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'cancel') closeSheet();
      if (x !== 'go') return;
      const links = findLinks(ta.value);
      if (!links.length) { toast('No YouTube links found'); return; }
      let cat = $('#add-cat', s).value;
      if (cat === '__new') cat = $('#add-newcat', s).value.trim();
      const subscribe = $('#add-sub', s).checked, allShort = $('#add-short', s).checked;
      e.target.disabled = true; e.target.textContent = 'Adding…';
      const n = await addVideos(links, { category: cat, subscribe, allShort });
      closeSheet();
      toast(`Added ${n} video${n === 1 ? '' : 's'}`);
      rerender();
    });
  });
}

async function addVideos(links, { category = '', subscribe = false, allShort = false } = {}) {
  let n = 0;
  await Promise.all(links.map(async ({ id, short }) => {
    const meta = await fetchMeta(id, short);
    const old = state.videos[id];
    state.videos[id] = {
      id,
      title: meta?.title || old?.title || 'YouTube video ' + id,
      channel: meta?.channel || old?.channel || 'Unknown channel',
      channelUrl: meta?.channelUrl || old?.channelUrl || '',
      category: category || old?.category || '',
      short: allShort || short || !!meta?.vertical || !!old?.short,
      addedAt: old?.addedAt || Date.now(),
    };
    if (subscribe) subscribeTo(state.videos[id].channel, state.videos[id].channelUrl, true);
    n++;
  }));
  save(true);
  return n;
}

// Seed titles are typed by hand; refresh them from oEmbed once so they're accurate.
async function refreshSeeds() {
  const seeds = Object.values(state.videos).filter((v) => v.seed);
  if (!seeds.length) return;
  await Promise.all(seeds.map(async (v) => {
    const m = await fetchMeta(v.id, false);
    if (m) Object.assign(v, { title: m.title, channelUrl: m.channelUrl }, { seed: false });
  }));
  save();
}

function editVideoSheet(id) {
  const v = state.videos[id];
  openSheet(`<h3>Edit details</h3>
    <div class="field"><label>Title</label><input type="text" id="ev-title" value="${esc(v.title)}"></div>
    <div class="field"><label>Channel</label><input type="text" id="ev-ch" value="${esc(v.channel)}"></div>
    <div class="field"><label>Category</label><select id="ev-cat">${categoryOptions(v.category)}</select></div>
    <div class="field hidden" id="ev-newcat-wrap"><input id="ev-newcat" type="text" placeholder="Category name"></div>
    <label class="check"><input type="checkbox" id="ev-short" ${v.short ? 'checked' : ''}> This is a Short</label>
    <div class="row"><button class="btn" data-x="cancel">Cancel</button><button class="btn red" data-x="go">Save</button></div>`, (s) => {
    $('#ev-cat', s).addEventListener('change', (e) => $('#ev-newcat-wrap', s).classList.toggle('hidden', e.target.value !== '__new'));
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'cancel') closeSheet();
      if (x !== 'go') return;
      let cat = $('#ev-cat', s).value;
      if (cat === '__new') cat = $('#ev-newcat', s).value.trim();
      Object.assign(v, { title: $('#ev-title', s).value.trim() || v.title, channel: $('#ev-ch', s).value.trim() || v.channel, category: cat, short: $('#ev-short', s).checked });
      save(); closeSheet(); rerender();
      if (current === id) renderPlayerBody();
    });
  });
}

function playlistSheet(id) {
  openSheet(`<h3>Save to…</h3>
    <label class="check"><input type="checkbox" data-later ${state.later.includes(id) ? 'checked' : ''}> Watch later</label>
    ${state.playlists.map((p) => `<label class="check"><input type="checkbox" data-pl="${p.id}" ${p.items.includes(id) ? 'checked' : ''}> ${esc(p.name)}</label>`).join('')}
    <div class="row"><input type="text" id="pl-new" placeholder="New playlist name" style="flex:1"><button class="btn" data-x="create" style="flex:none">Create</button></div>
    <div class="row"><button class="btn red" data-x="done">Done</button></div>`, (s) => {
    s.addEventListener('change', (e) => {
      const t = e.target;
      if (t.hasAttribute('data-later')) toggleLater(id, true);
      if (t.dataset.pl) { const p = state.playlists.find((x) => x.id === t.dataset.pl); toggleIn(p.items, id); save(); }
    });
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'done') { closeSheet(); rerender(); }
      if (x === 'create') {
        const name = $('#pl-new', s).value.trim();
        if (!name) return;
        state.playlists.push({ id: 'p' + Date.now().toString(36), name, items: [id] });
        save(); closeSheet(); toast(`Saved to ${name}`); rerender();
      }
    });
  });
}

function newPlaylistSheet() {
  openSheet(`<h3>New playlist</h3><div class="field"><input type="text" id="np-name" placeholder="Playlist name"></div>
    <div class="row"><button class="btn" data-x="cancel">Cancel</button><button class="btn red" data-x="go">Create</button></div>`, (s) => {
    setTimeout(() => $('#np-name', s).focus(), 50);
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'cancel') closeSheet();
      if (x !== 'go') return;
      const name = $('#np-name', s).value.trim();
      if (!name) return;
      const id = 'p' + Date.now().toString(36);
      state.playlists.push({ id, name, items: [] });
      save(); closeSheet(); location.hash = '#playlist/' + id;
    });
  });
}

function playlistMenu(plId) {
  const pl = state.playlists.find((p) => p.id === plId);
  openSheet(`<h3>${esc(pl.name)}</h3>
    <div class="field"><label>Rename</label><input type="text" id="pl-name" value="${esc(pl.name)}"></div>
    <div class="row"><button class="btn" data-x="rename">Save name</button></div>
    <button class="opt" data-x="delete" style="color:#ff4e45">${icon('trash')} Delete playlist</button>`, (s) => {
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'rename') { pl.name = $('#pl-name', s).value.trim() || pl.name; save(); closeSheet(); rerender(); }
      if (x === 'delete' && confirm(`Delete “${pl.name}”?`)) {
        state.playlists = state.playlists.filter((p) => p !== pl); save(); closeSheet(); location.hash = '#you';
      }
    });
  });
}

function manageSubsSheet() {
  openSheet(`<h3>Subscriptions</h3>
    ${state.subs.map((s) => `<div class="opt"><a href="#channel/${encodeURIComponent(s.name)}" data-x="go" style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">${avatar(s.name)}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(s.name)}</span></a>
      <button class="sub-btn on" data-unsub="${esc(s.name)}">Unsubscribe</button></div>`).join('') || '<div class="hint">No subscriptions yet.</div>'}
    <div class="field" style="margin-top:8px"><label>Subscribe by channel name</label></div>
    <div class="row" style="padding-top:0"><input type="text" id="sub-new" placeholder="Channel name" style="flex:1"><button class="btn" data-x="add" style="flex:none">Subscribe</button></div>`, (s) => {
    s.addEventListener('click', (e) => {
      const un = e.target.closest('[data-unsub]');
      if (un) { subscribeTo(un.dataset.unsub); manageSubsSheet(); rerender(); return; }
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'go') closeSheet();
      if (x === 'add') { const n = $('#sub-new', s).value.trim(); if (n && !isSub(n)) { subscribeTo(n); manageSubsSheet(); rerender(); } }
    });
  });
}

const SWATCHES = ['#5b3cc4', '#c4302b', '#0f9d58', '#1a73e8', '#f4b400', '#e91e63', '#00897b', '#424242'];
function editProfileSheet() {
  const p = state.profile;
  let photo = p.photo, color = p.color;
  openSheet(`<h3>Edit profile</h3>
    <div class="field" style="display:flex;align-items:center;gap:16px"><span id="ep-av">${avatar(p.name, 64, photo, color)}</span>
      <div style="display:flex;flex-direction:column;gap:8px"><label class="pill-btn" style="margin:0;color:var(--fg)">${icon('upload')} Upload photo<input type="file" id="ep-file" accept="image/*" hidden></label>
      <button class="pill-btn" data-x="nophoto">Remove photo</button></div></div>
    <div class="field"><label>Name</label><input type="text" id="ep-name" value="${esc(p.name)}"></div>
    <div class="field"><label>Handle</label><input type="text" id="ep-handle" value="${esc(p.handle)}"></div>
    <div class="field"><label>Color</label><div class="swatches">${SWATCHES.map((c) => `<button class="swatch ${c === color ? 'on' : ''}" style="background:${c}" data-color="${c}" aria-label="Color ${c}"></button>`).join('')}</div></div>
    <div class="row"><button class="btn" data-x="cancel">Cancel</button><button class="btn red" data-x="go">Save</button></div>`, (s) => {
    const refresh = () => { $('#ep-av', s).innerHTML = avatar($('#ep-name', s).value || p.name, 64, photo, color); };
    $('#ep-name', s).addEventListener('input', refresh);
    $('#ep-file', s).addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'), n = 256, m = Math.min(img.width, img.height);
        c.width = c.height = n;
        c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, n, n);
        photo = c.toDataURL('image/jpeg', 0.85);
        URL.revokeObjectURL(img.src);
        refresh();
      };
      img.src = URL.createObjectURL(f);
    });
    s.addEventListener('click', (e) => {
      const sw = e.target.closest('[data-color]');
      if (sw) { color = sw.dataset.color; s.querySelectorAll('.swatch').forEach((x) => x.classList.toggle('on', x === sw)); refresh(); return; }
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'nophoto') { photo = null; refresh(); }
      if (x === 'cancel') closeSheet();
      if (x === 'go') {
        let handle = $('#ep-handle', s).value.trim();
        if (handle && !handle.startsWith('@')) handle = '@' + handle;
        Object.assign(state.profile, { name: $('#ep-name', s).value.trim() || 'You', handle: handle || '@me', photo, color });
        save(); closeSheet(); rerender();
      }
    });
  });
}

function settingsSheet() {
  const st = state.settings;
  openSheet(`<h3>Settings</h3>
    <label class="check">${icon('moon')}<span style="flex:1">Dark theme</span><input type="checkbox" id="st-dark" ${st.theme === 'dark' ? 'checked' : ''}></label>
    <label class="check">${icon('play')}<span style="flex:1">Autoplay next video</span><input type="checkbox" id="st-auto" ${st.autoplay ? 'checked' : ''}></label>
    <button class="opt" data-x="export">${icon('download')} Back up my data</button>
    <label class="opt" style="cursor:pointer">${icon('upload')} Restore from backup<input type="file" id="st-import" accept="application/json,.json" hidden></label>
    <button class="opt" data-x="clear">${icon('history')} Clear watch history</button>
    <button class="opt" data-x="reset" style="color:#ff4e45">${icon('trash')} Reset everything</button>
    <div class="hint">Your library is stored only on this device. Back it up to move it to another phone or browser.</div>`, (s) => {
    $('#st-dark', s).addEventListener('change', (e) => { st.theme = e.target.checked ? 'dark' : 'light'; applyTheme(); save(); });
    $('#st-auto', s).addEventListener('change', (e) => { st.autoplay = e.target.checked; save(); if (current) renderPlayerBody(); });
    $('#st-import', s).addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try {
        const data = JSON.parse(await f.text());
        if (!data.videos) throw new Error('not a backup');
        state = Object.assign(defaultState(), data);
        save(true); applyTheme(); closeSheet(); rerender(); toast('Backup restored');
      } catch { toast('That file is not a MyTube backup'); }
    });
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'export') {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `mytube-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
      if (x === 'clear' && confirm('Clear your watch history?')) { state.history = []; state.progress = {}; save(); closeSheet(); rerender(); }
      if (x === 'reset' && confirm('Delete your whole library, playlists and profile?')) { state = defaultState(); save(true); applyTheme(); closeSheet(); location.hash = '#home'; rerender(); }
    });
  });
}

// ---------------------------------------------------------------- actions
function subscribeTo(name, url = '', onlyAdd = false) {
  if (isSub(name)) { if (!onlyAdd) { state.subs = state.subs.filter((s) => s.name !== name); toast(`Unsubscribed from ${name}`); } }
  else { state.subs.push({ name, url }); if (!onlyAdd) toast(`Subscribed to ${name}`); }
  save();
}
function toggleLike(id) { const on = toggleIn(state.liked, id); save(); toast(on ? 'Added to Liked videos' : 'Removed from Liked videos'); }
function toggleLater(id, quiet) { const on = toggleIn(state.later, id); save(); if (!quiet) toast(on ? 'Saved to Watch later' : 'Removed from Watch later'); }
async function share(id) {
  const v = state.videos[id], url = ytUrl(v);
  try {
    if (navigator.share) await navigator.share({ title: v.title, url });
    else { await navigator.clipboard.writeText(url); toast('Link copied'); }
  } catch { /* share sheet dismissed */ }
}
function refreshAfterAction() {
  if (playerMode === 'full') renderPlayerBody();
  if (!location.hash.startsWith('#shorts')) rerender();
}

document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-play],[data-menu],[data-action],[data-homechip],[data-homechip-link],[data-subschip],[data-subch],[data-act-like],[data-act-later],[data-act-share],[data-act-sub],[data-act-playlist]');
  if (!t || t.closest('#sheet-root')) return;
  const d = t.dataset;

  if (d.play) {
    e.preventDefault();
    const v = state.videos[d.play];
    if (v?.short) { location.hash = '#shorts/' + v.id; if (playerMode === 'full') setPlayerMode('mini'); return; }
    openVideo(d.play, ctxLists[d.ctx]);
    return;
  }
  if (d.menu) { videoMenu(d.menu); return; }
  if (d.homechip) { view.homeChip = d.homechip; rerender(); return; }
  if (d.homechipLink) { view.homeChip = d.homechipLink; return; }
  if (d.subschip) { view.subsChip = d.subschip; rerender(); return; }
  if (d.subch) { view.subsChannel = view.subsChannel === d.subch ? null : d.subch; rerender(); return; }
  if (d.actLike) {
    toggleLike(d.actLike);
    if (t.closest('.short')) t.classList.toggle('on'); else refreshAfterAction();
    return;
  }
  if (d.actLater) {
    toggleLater(d.actLater);
    if (t.closest('.short')) t.classList.toggle('on'); else refreshAfterAction();
    return;
  }
  if (d.actShare) { share(d.actShare); return; }
  if (d.actPlaylist) { playlistSheet(d.actPlaylist); return; }
  if (d.actSub) { const v = Object.values(state.videos).find((x) => x.channel === d.actSub); subscribeTo(d.actSub, v?.channelUrl); refreshAfterAction(); return; }

  switch (d.action) {
    case 'add': addSheet(); break;
    case 'shuffle': view.shuffle = !view.shuffle; rerender(); break;
    case 'manage-subs': manageSubsSheet(); break;
    case 'edit-profile': editProfileSheet(); break;
    case 'settings': settingsSheet(); break;
    case 'new-playlist': newPlaylistSheet(); break;
    case 'playlist-menu': playlistMenu(d.pl); break;
    case 'back': if (history.length > 1) history.back(); else location.hash = '#home'; break;
    case 'minimize': setPlayerMode('mini'); break;
    case 'close-player': $('#mini-close').click(); break;
    case 'clear-history': if (confirm('Clear your watch history?')) { state.history = []; state.progress = {}; save(); rerender(); } break;
    case 'add-from-search': addVideos(findLinks($('#search-input').value)).then((n) => { toast(`Added ${n} video${n === 1 ? '' : 's'}`); location.hash = '#home'; }); break;
    case 'shuffle-play': {
      const ids = [...(ctxLists[d.ctx] || [])].sort(() => Math.random() - 0.5);
      if (ids.length) openVideo(ids[0], ids);
      break;
    }
  }
});

$('#add-btn').addEventListener('click', () => addSheet());
// Tapping a tab while the player is open shrinks it to the mini player.
$('#tabbar').addEventListener('click', (e) => { if (e.target.closest('a') && playerMode === 'full') setPlayerMode('mini'); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if ($('#sheet-root').innerHTML) closeSheet(); else if (playerMode === 'full') setPlayerMode('mini'); }
});

function applyTheme() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.querySelector('meta[name=theme-color]').content = state.settings.theme === 'light' ? '#ffffff' : '#0f0f0f';
}

// ---------------------------------------------------------------- boot
document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
applyTheme();
window.addEventListener('hashchange', () => { route(); scrollTo(0, 0); });
route();
refreshSeeds().then(() => { if (!$('#sheet-root').innerHTML) rerender(); });

// "Share to MyTube" (Android share target) or ?add=<link>
{
  const qs = new URLSearchParams(location.search);
  const shared = [qs.get('add'), qs.get('url'), qs.get('text')].filter(Boolean).join(' ');
  if (shared) {
    history.replaceState(null, '', location.pathname + location.hash);
    if (findLinks(shared).length) addSheet(shared);
  }
}

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
