/* MyTube — a personal YouTube-style app.
 * Everything lives on this device: the library in localStorage, uploaded video
 * files in IndexedDB. YouTube videos play through the official embed player;
 * titles come from YouTube's oEmbed and view counts from the Return YouTube
 * Dislike API. */
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
  dislike: 'M17 14V3h3v11h-3zM17 14l-4 8a3 3 0 0 1-3-3v-4H4.5a2 2 0 0 1-2-2.3l1.4-8A2 2 0 0 1 5.9 3H17',
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
  prev: 'M6 5h2v14H6zM20 5v14L9 12z',
  next: 'M16 5h2v14h-2zM4 5v14l11-7z',
  bell: 'M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16zM10 21h4',
  comment: 'M4 4h16v12H9l-5 4z',
  send: 'M4 12 20 4l-6 16-3-7zM11 13l9-9',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  people: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M17 11a2.5 2.5 0 1 0 0-5M18 14.5a5 5 0 0 1 3.5 5.5',
  lock: 'M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  link: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  imgplus: 'M14 4H4v16h16v-9M4 16l5-5 4 4 2-2 5 5M9 9.5a1.5 1.5 0 1 0 0-.01M18 2v6M15 5h6',
  hash: 'M5 9h15M4 15h15M10 3 8 21M16 3l-2 18',
  shuffle: 'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',
  cast: 'M3 8V5h18v14h-7M3 12a8 8 0 0 1 8 8M3 16a4 4 0 0 1 4 4M3 20h.01',
  zap: 'M13 2 4 14h7l-1 8 9-12h-7z',
  playline: 'M7 4.5v15l12-7.5z',
  fill: 'M7 17V7h10M7 7l10 10',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  eq: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  pip: 'M3 5h18v14H3zM12 12h7v5h-7z',
  volume: 'M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  skip: 'M5 5l9 7-9 7zM16 5h3v14h-3z',
  bookmark: 'M6 3h12v18l-6-4-6 4z',
  check: 'M5 12l5 5 9-10',
  sparkle: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
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
  phone: 'M7 2h10v20H7zM11 18h2',
  film: 'M3 4h18v16H3zM7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4',
};
const FILLED = new Set(['play', 'pause', 'prev', 'next']);
function icon(name) {
  const fill = FILLED.has(name);
  const w = name === 'more' || name === 'moreV' ? 3 : 1.8;
  return `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="${fill ? 'none' : 'currentColor'}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
}
const LOGO = `<svg viewBox="0 0 34 24" aria-hidden="true"><defs><linearGradient id="lg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ff3d6e"/><stop offset="1" stop-color="#ff0033"/></linearGradient></defs><rect x="1" y="1" width="32" height="22" rx="7" fill="url(#lg)"/><path d="M14 7.5v9l7.5-4.5z" fill="#fff"/></svg>`;
const NO_THUMB = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="#3a2a7a"/><stop offset="1" stop-color="#7a1a3a"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/><path d="M7 3v3l2.6-1.5z" fill="#fff" opacity=".8"/></svg>');

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
    disliked: [],
    later: [],
    playlists: [],
    stats: {},     // YouTube view/like counts, cached
    plays: {},     // how many times you've opened each video
    comments: {},  // your own comments, per video
    searches: [],  // your YouTube search history
    settings: {
      theme: 'dark', autoplay: true, discover: 30, bgPlay: true, apiKey: '',
      sponsor: { on: true, cats: ['sponsor', 'selfpromo', 'interaction'] },
      eq: { preset: 'flat', bass: 0, voice: 0, treble: 0, norm: false },
    },
  };
}

let state;
try { state = Object.assign(defaultState(), JSON.parse(localStorage.getItem(STORE_KEY)) || {}); }
catch { state = defaultState(); }
// Settings added in later versions get their defaults.
state.settings = Object.assign(defaultState().settings, state.settings);
// Videos you only opened from search aren't kept once nothing points at them.
{
  const keep = new Set([...state.history.map((h) => h.id), ...state.liked, ...state.later, ...state.playlists.flatMap((p) => p.items), ...Object.keys(state.comments)]);
  for (const v of Object.values(state.videos)) {
    if (v.unsaved && !keep.has(v.id)) { delete state.videos[v.id]; delete state.progress[v.id]; delete state.stats[v.id]; }
  }
}
Remote.setKey(state.settings.apiKey);

let saveTimer = 0;
function save(now) {
  clearTimeout(saveTimer);
  const write = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { toast('Could not save — storage is full or blocked'); } };
  if (now) write(); else saveTimer = setTimeout(write, 200);
}

// ---------------------------------------------------------------- helpers
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function baseThumb(v) { return v.local ? v.thumb || NO_THUMB : `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`; }
function thumb(id) {
  const v = state.videos[id];
  if (!v) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return v.customThumb || baseThumb(v);
}
// Visibility works like YouTube's, inside your own app:
// public shows in feeds, unlisted only in your library and channel, private is locked.
const VISIBILITY = {
  public: ['globe', 'Public', 'Shows up in your Home, Subscriptions and Shorts feeds'],
  unlisted: ['link', 'Unlisted', 'Kept out of your feeds, but still in your library and channel'],
  private: ['lock', 'Private', 'Hidden from feeds and marked with a lock'],
};
const visOf = (v) => VISIBILITY[v.visibility] ? v.visibility : 'public';
const inFeeds = (v) => visOf(v) === 'public';
function parseTags(text) {
  const out = [];
  for (const raw of String(text).split(/[\s,]+/)) {
    const t = raw.replace(/^#+/, '').replace(/[^\p{L}\p{N}_]/gu, '');
    if (t && !out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  }
  return out.slice(0, 15);
}
const tagLinks = (tags) => tags.map((t) => `<a href="#search/${encodeURIComponent('#' + t)}" data-action="minimize">#${esc(t)}</a>`).join(' ');
const ytUrl = (v) => v.short ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function hashColor(str) {
  let h = 0;
  for (const c of String(str)) h = (h * 31 + c.codePointAt(0)) >>> 0;
  return `hsl(${h % 360} 55% 42%)`;
}
const RAINBOW = 'linear-gradient(135deg, #ff6b9a, #ffb86b, #ffe66b, #7bdc9a, #6bc5ff, #b56bff)';
const colorCss = (c) => c === 'rainbow' ? RAINBOW : c;
function avatar(name, size = 36, photo, color) {
  const inner = photo ? `<img src="${esc(photo)}" alt="">` : esc((name || '?').trim().charAt(0).toUpperCase());
  return `<span class="avatar av-${size}" style="background:${colorCss(color || hashColor(name))}">${inner}</span>`;
}
// Profile styling: a font and effect for your name, and a frame around your picture.
const FONTS = {
  '': ['Default', 'inherit'],
  bungee: ['Bungee', "'Bungee', sans-serif"],
  pacifico: ['Pacifico', "'Pacifico', cursive"],
  pixel: ['Pixel', "'Press Start 2P', monospace"],
  marker: ['Marker', "'Permanent Marker', cursive"],
  orbitron: ['Orbitron', "'Orbitron', sans-serif"],
  creepster: ['Creepster', "'Creepster', cursive"],
  lobster: ['Lobster', "'Lobster', cursive"],
  monoton: ['Monoton', "'Monoton', cursive"],
  glitch: ['Glitch', "'Rubik Glitch', sans-serif"],
  bangers: ['Bangers', "'Bangers', cursive"],
};
const FRAMES = { none: 'None', rainbow: 'Rainbow', neon: 'Neon', fire: 'Fire', gold: 'Gold', galaxy: 'Galaxy', ice: 'Ice', crown: 'Crown', moon: 'Moon', blossom: 'Blossom', sparkle: 'Sparkle', lantern: 'Lantern' };
const NAME_FX = { plain: 'Plain', rainbow: 'Rainbow', glow: 'Neon glow', fire: 'Fire', gold: 'Gold', sparkle: 'Sparkle' };
const PRIMARY_COLORS = ['#8b7cf6', '#f6a77c', '#7fb88a', '#5b3cc4', '#e05a5a', '#b98bc9', '#1a73e8', 'rainbow'];
const ACCENT_COLORS = ['#ff0033', '#ff8a5c', '#3ccf91', '#3ea6ff', '#8b5cf6', '#ff4fa3', '#f5b300'];
function styledName(text, p = state.profile) {
  const f = FONTS[p.font] ? p.font : '';
  return `<span class="uname font-${f || 'default'} fx-${p.nameFx || 'plain'}" style="font-family:${FONTS[f][1]}">${esc(text)}</span>`;
}
const myName = (text) => styledName(text);
function profileAvatar(size, p = state.profile) {
  const a = avatar(p.name, size, p.photo, p.color);
  const fr = FRAMES[p.frame] ? p.frame : 'none';
  return fr === 'none' ? a : `<span class="pfp frame-${fr} ${size <= 36 ? 'sm' : ''}" style="--s:${size}px">${a}</span>`;
}
// Your uploads show your own profile picture as the channel avatar.
const chName = (v) => v.local ? myName(v.channel) : esc(v.channel);
function channelAvatar(v, size) { return v.local ? profileAvatar(size) : avatar(v.channel, size, v.avatar); }
const when = (v) => v.uploaded || ago(v.addedAt);

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
function fmtCount(n) {
  if (n == null) return '';
  for (const [d, s] of [[1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) {
    if (n >= d) { const x = n / d; return (x < 10 ? x.toFixed(1).replace(/\.0$/, '') : Math.floor(x)) + s; }
  }
  return String(Math.round(n));
}
function fmtSize(b) { return b > 1e9 ? (b / 1e9).toFixed(1) + ' GB' : Math.max(1, Math.round(b / 1e6)) + ' MB'; }

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
  t.classList.remove('show');
  void t.offsetWidth; // restart the bounce when toasts come back to back
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ---------------------------------------------------------------- effects
// Particle bursts drawn in a layer above everything, animated with the Web Animations API.
const fxLayer = document.createElement('div');
fxLayer.id = 'fx-layer';
document.body.appendChild(fxLayer);
const FX_ICON = { pop: '💥', hearts: '❤️', confetti: '🎉', stars: '⭐', fire: '🔥', fireworks: '🎆', off: '🚫' };
const LIKE_FX = { pop: 'Pop', hearts: 'Hearts', confetti: 'Confetti', stars: 'Stars', fire: 'Fire', off: 'Off' };
const SUB_FX = { confetti: 'Confetti', fireworks: 'Fireworks', stars: 'Stars', hearts: 'Hearts', off: 'Off' };
const CONFETTI = ['#ff3d6e', '#ffd36b', '#3ccf91', '#3ea6ff', '#b56bff', '#ff8a5c'];
const rand = (a, b) => a + Math.random() * (b - a);
const buzz = (ms = 12) => { try { navigator.vibrate?.(ms); } catch { /* not supported */ } };

function particle(x, y, html, cls) {
  const el = document.createElement('span');
  el.className = 'fx-p ' + (cls || '');
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.innerHTML = html;
  fxLayer.appendChild(el);
  return el;
}
function fly(el, dx, dy, { dur = 900, spin = 0, gravity = 0, scale = 1, delay = 0 } = {}) {
  const a = el.animate([
    { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
    { transform: `translate(calc(-50% + ${dx * 0.75}px), calc(-50% + ${dy * 0.75}px)) rotate(${spin * 0.6}deg) scale(${scale})`, opacity: 1, offset: 0.55 },
    { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + gravity}px)) rotate(${spin}deg) scale(${scale * 0.8})`, opacity: 0 },
  ], { duration: dur, delay, easing: 'cubic-bezier(.15,.75,.3,1)', fill: 'both' });
  a.onfinish = () => el.remove();
}
function ringAt(x, y, color, size = 70) {
  const el = particle(x, y, '', 'fx-ring');
  el.style.width = el.style.height = size + 'px';
  el.style.borderColor = color;
  el.style.color = color;
  el.animate([{ transform: 'translate(-50%,-50%) scale(.2)', opacity: 0.9 }, { transform: 'translate(-50%,-50%) scale(1.6)', opacity: 0 }],
    { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => el.remove();
}
function burstAt(x, y, kind) {
  if (reduceMotion || kind === 'off' || !kind) return;
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff0033';
  const radial = (n, html, opts = {}) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rand(-0.3, 0.3), r = rand(opts.min || 40, opts.max || 90);
      fly(particle(x, y, typeof html === 'function' ? html(i) : html, opts.cls), Math.cos(a) * r, Math.sin(a) * r - (opts.lift || 0),
        { dur: rand(650, 1000), spin: rand(-120, 120), gravity: opts.gravity || 0, scale: rand(0.8, 1.2) });
    }
  };
  if (kind === 'pop') {
    ringAt(x, y, accent);
    radial(10, () => `<i style="background:${accent}"></i>`, { cls: 'dot', min: 30, max: 60 });
  } else if (kind === 'hearts') {
    ringAt(x, y, '#ff4f8b');
    radial(9, (i) => ['❤️', '💖', '💕', '💗'][i % 4], { min: 40, max: 95, lift: 40, cls: 'emoji' });
  } else if (kind === 'stars') {
    ringAt(x, y, '#ffd36b');
    radial(10, (i) => ['⭐', '✨', '🌟'][i % 3], { min: 45, max: 100, cls: 'emoji' });
  } else if (kind === 'fire') {
    for (let i = 0; i < 9; i++) fly(particle(x + rand(-14, 14), y, '🔥', 'emoji'), rand(-40, 40), rand(-130, -70), { dur: rand(700, 1100), scale: rand(0.8, 1.3) });
  } else if (kind === 'confetti') {
    ringAt(x, y, accent, 90);
    for (let i = 0; i < 26; i++) {
      const a = rand(-Math.PI, 0) + rand(-0.4, 0.4), r = rand(70, 170);
      fly(particle(x, y, `<i style="background:${CONFETTI[i % CONFETTI.length]}"></i>`, 'confetti'),
        Math.cos(a) * r, Math.sin(a) * r, { dur: rand(900, 1400), spin: rand(-540, 540), gravity: rand(90, 160) });
    }
  } else if (kind === 'fireworks') {
    const spots = [[x, y], [x + rand(-110, -50), y - rand(90, 160)], [x + rand(50, 110), y - rand(110, 190)]];
    spots.forEach(([fx, fy], k) => setTimeout(() => {
      const color = CONFETTI[(k * 2) % CONFETTI.length];
      ringAt(fx, fy, color, 60);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2, r = rand(50, 85);
        fly(particle(fx, fy, `<i style="background:${CONFETTI[(i + k) % CONFETTI.length]}"></i>`, 'dot spark'),
          Math.cos(a) * r, Math.sin(a) * r, { dur: rand(800, 1100), gravity: 30 });
      }
    }, k * 220));
  }
}
function burst(el, kind) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burstAt(r.left + r.width / 2, r.top + r.height / 2, kind);
}
function floatText(el, text) {
  if (reduceMotion || !el) return;
  const r = el.getBoundingClientRect();
  const t = particle(r.left + r.width / 2, r.top, text, 'fx-text');
  t.animate([{ transform: 'translate(-50%,0) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-18px) scale(1.1)', opacity: 1, offset: 0.3 }, { transform: 'translate(-50%,-46px) scale(1)', opacity: 0 }],
    { duration: 900, easing: 'ease-out' }).onfinish = () => t.remove();
}
function bigHeart(container) {
  if (reduceMotion) return;
  const r = container.getBoundingClientRect();
  const h = particle(r.left + r.width / 2, r.top + r.height / 2, '❤️', 'fx-bigheart');
  h.animate([{ transform: 'translate(-50%,-50%) scale(0) rotate(-15deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.25) rotate(8deg)', opacity: 1, offset: 0.3 },
    { transform: 'translate(-50%,-50%) scale(1) rotate(0)', opacity: 1, offset: 0.6 }, { transform: 'translate(-50%,-120%) scale(.8)', opacity: 0 }],
    { duration: 900, easing: 'ease-out' }).onfinish = () => h.remove();
  burstAt(r.left + r.width / 2, r.top + r.height / 2, 'hearts');
}

// A soft ripple from the finger on every button, card and link.
document.addEventListener('pointerdown', (e) => {
  if (reduceMotion) return;
  const el = e.target.closest('button, a, .thumb, label.btn, label.pill-btn, label.night-btn, label.mono-drop, .style-opt, .swatch');
  if (!el || el.disabled || e.target.closest('.short .frame, #yt-host')) return;
  const r = el.getBoundingClientRect();
  if (r.width * r.height > 300000) return;
  const wrap = document.createElement('span');
  wrap.className = 'ripple-wrap';
  Object.assign(wrap.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: getComputedStyle(el).borderRadius });
  const dot = document.createElement('span');
  dot.className = 'ripple';
  const size = Math.hypot(r.width, r.height) * 2;
  Object.assign(dot.style, { width: size + 'px', height: size + 'px', left: e.clientX - r.left - size / 2 + 'px', top: e.clientY - r.top - size / 2 + 'px' });
  wrap.appendChild(dot);
  fxLayer.appendChild(wrap);
  dot.animate([{ transform: 'scale(0)', opacity: 0.32 }, { transform: 'scale(1)', opacity: 0 }], { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => wrap.remove();
}, { passive: true });

// Your library. Videos opened from search stay out of it until you save them.
const allVideos = () => Object.values(state.videos).filter((v) => !v.unsaved).sort((a, b) => b.addedAt - a.addedAt);
const isSub = (ch) => state.subs.some((s) => s.name === ch);
const watched = (id) => state.history.some((h) => h.id === id);
const toggleIn = (arr, id) => { const i = arr.indexOf(id); if (i >= 0) arr.splice(i, 1); else arr.unshift(id); return i < 0; };

// ---------------------------------------------------------------- views & likes
// YouTube videos: real counts from returnyoutubedislikeapi.com (cached 6h).
// Your uploads: how many times you've played them.
function viewsOf(id) { return state.videos[id]?.local ? (state.plays[id] || 0) : state.stats[id]?.views; }
function likesOf(id) {
  const v = state.videos[id];
  if (v?.local) return state.liked.includes(id) ? 1 : 0;
  return state.stats[id]?.likes;
}
const viewsShort = (id) => { const n = viewsOf(id); return n == null ? '' : '▷' + fmtCount(n); };
const viewsLong = (id) => { const n = viewsOf(id); return n == null ? '' : `${fmtCount(n)} view${n === 1 ? '' : 's'}`; };
// Your own like is added on top of YouTube's count so tapping Like visibly ticks up.
const likesShort = (id) => {
  const v = state.videos[id];
  const n = v?.local ? 0 : state.stats[id]?.likes;
  const total = (n || 0) + (state.liked.includes(id) && !v?.local ? 1 : 0) + (v?.local && state.liked.includes(id) ? 1 : 0);
  return total ? fmtCount(total) : '';
};
const dislikesShort = (id) => {
  const n = state.stats[id]?.dislikes, mine = state.disliked.includes(id) ? 1 : 0;
  return (n || 0) + mine ? fmtCount((n || 0) + mine) : '';
};
function likeRatio(id) {
  const st = state.stats[id];
  if (st?.likes == null || st?.dislikes == null) return null;
  const l = st.likes + (state.liked.includes(id) ? 1 : 0), d = st.dislikes + (state.disliked.includes(id) ? 1 : 0);
  return l + d ? Math.round((l / (l + d)) * 100) : null;
}
const likesLong = (id) => { const n = likesOf(id); return n == null ? '' : `${fmtCount(n)} like${n === 1 ? '' : 's'}`; };

const statsQueue = new Set();
let statsBusy = false;
function wantStats(ids) {
  for (const id of ids) {
    const v = state.videos[id], s = state.stats[id];
    if (v && !v.local && (!s || Date.now() - s.at > 6 * 3.6e6)) statsQueue.add(id);
  }
  pumpStats();
}
async function pumpStats() {
  if (statsBusy) return;
  statsBusy = true;
  while (statsQueue.size) {
    const batch = [...statsQueue].slice(0, 4);
    batch.forEach((id) => statsQueue.delete(id));
    await Promise.all(batch.map(async (id) => {
      try {
        const r = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${id}`);
        if (!r.ok) throw new Error(r.status);
        const j = await r.json();
        state.stats[id] = { views: j.viewCount, likes: j.likes, dislikes: j.dislikes, at: Date.now() };
        paintStats(id, true);
      } catch {
        // Remember the failure so we don't retry on every render.
        state.stats[id] = { ...state.stats[id], at: Date.now() };
      }
    }));
  }
  statsBusy = false;
  save();
}
function paintStats(id, animate) {
  document.querySelectorAll(`[data-views="${id}"]`).forEach((el) => { el.textContent = viewsShort(id); });
  document.querySelectorAll(`[data-views-long="${id}"]`).forEach((el) => countUp(el, viewsOf(id), viewsLong(id), animate));
  document.querySelectorAll(`[data-likes-long="${id}"]`).forEach((el) => countUp(el, likesOf(id), likesLong(id), animate));
  document.querySelectorAll(`[data-likes-short="${id}"]`).forEach((el) => { el.textContent = likesShort(id); });
  document.querySelectorAll(`[data-dislikes-short="${id}"]`).forEach((el) => { el.textContent = dislikesShort(id); });
  document.querySelectorAll(`[data-ratio="${id}"]`).forEach((el) => { const r = likeRatio(id); el.style.setProperty('--r', (r ?? 0) + '%'); el.classList.toggle('hidden', r == null); });
  document.querySelectorAll(`[data-ratio-text="${id}"]`).forEach((el) => { el.textContent = ratioText(id); });
}
// Rolls a number up from zero, then settles on the formatted label.
function countUp(el, n, finalText, animate) {
  if (!animate || reduceMotion || !n) { el.textContent = finalText; return; }
  const unit = finalText.replace(/^[\d.,]+[KMB]?\s*/, '');
  const start = performance.now(), dur = 900;
  const step = (now) => {
    const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = p < 1 ? `${fmtCount(n * e)} ${unit}` : finalText;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function requestVisibleStats(root) {
  const ids = new Set();
  root.querySelectorAll('[data-views],[data-views-long]').forEach((el) => ids.add(el.dataset.views || el.dataset.viewsLong));
  wantStats(ids);
}

// ---------------------------------------------------------------- uploaded files (IndexedDB)
let dbPromise;
function fileDb() {
  return dbPromise ||= new Promise((res, rej) => {
    const r = indexedDB.open('mytube-files', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('files');
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function fileOp(mode, fn) {
  const db = await fileDb();
  return new Promise((res, rej) => {
    const tx = db.transaction('files', mode);
    const req = fn(tx.objectStore('files'));
    tx.oncomplete = () => res(req.result);
    tx.onerror = () => rej(tx.error);
    tx.onabort = () => rej(tx.error);
  });
}
const putFile = (id, blob) => fileOp('readwrite', (s) => s.put(blob, id));
const getFile = (id) => fileOp('readonly', (s) => s.get(id));
const delFile = (id) => fileOp('readwrite', (s) => s.delete(id));
const fileUrls = {};
async function fileUrl(id) {
  if (fileUrls[id]) return fileUrls[id];
  const blob = await getFile(id).catch(() => null);
  return blob ? (fileUrls[id] = URL.createObjectURL(blob)) : null;
}

// Reads a video's duration and size and grabs a frame for the thumbnail.
function probeVideo(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.muted = true; v.playsInline = true; v.preload = 'auto';
    let done = false;
    const finish = (img) => {
      if (done) return;
      done = true;
      resolve({ duration: isFinite(v.duration) ? v.duration : 0, w: v.videoWidth, h: v.videoHeight, thumb: img });
      v.removeAttribute('src'); v.load();
      URL.revokeObjectURL(url);
    };
    v.onloadedmetadata = () => { v.currentTime = Math.min(1, (v.duration || 3) / 3); };
    v.onseeked = () => {
      try {
        const max = 320, r = v.videoWidth / v.videoHeight || 16 / 9;
        const w = r >= 1 ? max : Math.round(max * r), h = r >= 1 ? Math.round(max / r) : max;
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(v, 0, 0, w, h);
        finish(c.toDataURL('image/jpeg', 0.6));
      } catch { finish(null); }
    };
    v.onerror = () => finish(null);
    setTimeout(() => finish(null), 10000);
    v.src = url;
    v.load();
  });
}

const isVideoFile = (f) => f.type.startsWith('video/') || /\.(mp4|mov|m4v|webm|mkv|3gp)$/i.test(f.name);
async function importFiles(files, { category = '', allShort = false, onProgress } = {}) {
  try { await navigator.storage?.persist?.(); } catch { /* not supported */ }
  let n = 0, i = 0;
  for (const f of files) {
    i++;
    if (!isVideoFile(f)) continue;
    onProgress?.(i, files.length, f.name);
    const id = 'local-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const info = await probeVideo(f);
    try { await putFile(id, f); } catch { toast(`Not enough space on this phone for ${f.name}`); continue; }
    state.videos[id] = {
      id, local: true,
      title: f.name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').trim() || 'My video',
      channel: state.profile.name, channelUrl: '', category,
      short: allShort || (info.h > info.w && info.duration <= 180),
      addedAt: Date.now(), thumb: info.thumb, size: f.size,
    };
    if (info.duration) state.progress[id] = { t: 0, d: info.duration };
    n++;
  }
  save(true);
  return n;
}

// ---------------------------------------------------------------- list rendering
// Every rendered list registers its ids so tapping a card can queue the rest.
let ctxLists = {}, ctxSeq = 0;
function ctx(ids) { const k = 'c' + ctxSeq++; ctxLists[k] = ids; return k; }

function progressBar(id) {
  const p = state.progress[id];
  if (!p || !p.d || !p.t) return '';
  return `<div class="watched" style="width:${Math.min(100, (p.t / p.d) * 100).toFixed(1)}%"></div>`;
}
function durBadge(id) { const p = state.progress[id]; return p && p.d ? `<span class="badge">${fmtTime(p.d)}</span>` : ''; }
function localBadge(v) {
  const vis = visOf(v);
  const parts = [v.local && icon('phone'), vis !== 'public' && icon(VISIBILITY[vis][0]), v.kids && 'Kids'].filter(Boolean);
  if (!parts.length) return '';
  // A single "On phone" gets a label; combinations stay compact so they never hit the duration.
  const label = parts.length === 1 && v.local ? `${parts[0]} On phone` : parts.join(' ');
  return `<span class="badge left" title="${[v.local && 'On phone', vis !== 'public' && VISIBILITY[vis][1], v.kids && 'Made for kids'].filter(Boolean).join(', ')}">${label}</span>`;
}
function thumbBox(v, k) {
  return `<a class="thumb" data-play="${v.id}" data-ctx="${k}" href="#"><img loading="lazy" src="${thumb(v.id)}" alt="">${localBadge(v)}${durBadge(v.id)}${progressBar(v.id)}</a>`;
}
const viewsSpan = (id) => `<span data-views="${id}">${viewsShort(id)}</span>`;

function bigCard(v, k) {
  return `<div class="card">
    ${thumbBox(v, k)}
    <div class="meta">
      <a href="#channel/${encodeURIComponent(v.channel)}">${channelAvatar(v, 36)}</a>
      <a class="text" data-play="${v.id}" data-ctx="${k}" href="#">
        <div class="title">${esc(v.title)}</div>
        <div class="sub"><span>${chName(v)}</span>${viewsSpan(v.id)}<span>${when(v)}</span></div>
      </a>
      <button class="more" data-menu="${v.id}" aria-label="More">${icon('moreV')}</button>
    </div></div>`;
}
function smallCard(v, k, wide) {
  return `<div class="hcard ${wide ? 'wide' : ''}">
    ${thumbBox(v, k)}
    <div class="meta"><a class="text" data-play="${v.id}" data-ctx="${k}" href="#">
      <div class="title">${esc(v.title)}</div><div class="sub"><span>${chName(v)}</span>${wide ? viewsSpan(v.id) + `<span>${when(v)}</span>` : ''}</div></a>
      <button class="more" data-menu="${v.id}" aria-label="More">${icon('more')}</button></div></div>`;
}
function listRow(v, k, extra, editable) {
  return `<div class="lrow" data-id="${v.id}" data-q="${esc((v.title + ' ' + v.channel).toLowerCase())}">
    ${thumbBox(v, k)}
    <a class="text" data-play="${v.id}" data-ctx="${k}" href="#"><div class="title">${esc(v.title)}</div>
      <div class="sub"><span>${chName(v)}</span>${viewsSpan(v.id)}<span>${extra ?? when(v)}</span></div></a>
    ${editable ? `<a class="more" href="#edit/${v.id}" aria-label="Edit video">${icon('edit')}</a>` : `<button class="more" data-menu="${v.id}" aria-label="More">${icon('moreV')}</button>`}</div>`;
}
function shortTile(v, width = 150) {
  return `<a class="hcard" href="#shorts/${v.id}" style="width:${width}px"><div class="thumb" style="aspect-ratio:9/16;border-radius:10px"><img loading="lazy" src="${thumb(v.id)}" alt="">${localBadge(v)}</div>
    <div class="title" style="font-size:14px;margin-top:6px">${esc(v.title)}</div><div class="sub">${viewsSpan(v.id)}</div></a>`;
}
function shortsShelf(list) {
  if (!list.length) return '';
  return `<div class="section-title">${icon('shorts')} Shorts</div><div class="hrow">${list.map((v) => shortTile(v)).join('')}</div>`;
}
function empty(ic, text, btn) {
  return `<div class="empty">${icon(ic)}<div>${text}</div>${btn || ''}</div>`;
}
const addBtnHtml = '<button class="btn" data-action="add">Add a video</button>';

// ---------------------------------------------------------------- real YouTube results
// Results are plain objects until you open one; then it becomes a video entry
// (marked unsaved, so it stays out of your library until you save it).
const remoteById = new Map();
let remoteLists = {};
function rlist(items) { const k = 'r' + ctxSeq++; remoteLists[k] = items; return k; }
const rThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
function ensureVideo(r) {
  let v = state.videos[r.id];
  if (!v) {
    v = state.videos[r.id] = {
      id: r.id, title: r.title, channel: r.channel || 'YouTube', channelUrl: r.channelUrl || '', avatar: r.avatar || '',
      category: '', short: !!r.short, uploaded: r.uploaded || '', addedAt: Date.now(), unsaved: true,
    };
    if (r.views != null && !state.stats[r.id]) state.stats[r.id] = { views: r.views, at: 0 };
    if (r.duration && !state.progress[r.id]) state.progress[r.id] = { t: 0, d: r.duration };
  }
  return v;
}
function saveToLibrary(id) {
  const v = state.videos[id];
  if (!v?.unsaved) return;
  delete v.unsaved;
  v.addedAt = Date.now();
  save();
  toast('Saved to your library');
}
const rMeta = (r) => [r.views != null ? `${fmtCount(r.views)} views` : '', r.uploaded].filter(Boolean).map((x) => `<span>${esc(x)}</span>`).join('');
function remoteCard(r, k, badge = '') {
  remoteById.set(r.id, r);
  return `<div class="card">
    <a class="thumb" data-rplay="${r.id}" data-rk="${k}" href="#"><img loading="lazy" src="${rThumb(r.id)}" alt="">${badge ? `<span class="badge left">${badge}</span>` : ''}${r.duration ? `<span class="badge">${fmtTime(r.duration)}</span>` : ''}${progressBar(r.id)}</a>
    <div class="meta">${avatar(r.channel, 36, r.avatar)}
      <a class="text" data-rplay="${r.id}" data-rk="${k}" href="#"><div class="title">${esc(r.title)}</div><div class="sub"><span>${esc(r.channel)}</span>${rMeta(r)}</div></a>
      <button class="more" data-rmenu="${r.id}" aria-label="More">${icon('moreV')}</button></div></div>`;
}
function remoteShort(r, k) {
  remoteById.set(r.id, r);
  return `<div class="rshort-card">
    <a class="rshort" data-rplay="${r.id}" data-rk="${k}" href="#"><img loading="lazy" src="${rThumb(r.id)}" alt=""><span class="rshort-title">${esc(r.title)}</span></a>
    <button class="rshort-more" data-rmenu="${r.id}" aria-label="More">${icon('more')}</button>
    <div class="rshort-meta">${avatar(r.channel, 36, r.avatar)}<div><div class="name">${esc(r.channel)}</div><div class="sub">${[r.views != null ? fmtCount(r.views) + ' views' : '', r.uploaded].filter(Boolean).map(esc).join(' · ')}</div></div></div>
  </div>`;
}
let shortsQueue = [];
function playRemote(id, k) {
  const r = remoteById.get(id);
  if (!r) return;
  const list = remoteLists[k] || [r];
  ensureVideo(r);
  if (r.short) {
    shortsQueue = list.filter((x) => x.short).map((x) => ensureVideo(x).id);
    if (playerMode === 'full') setPlayerMode('mini');
    location.hash = '#shorts/' + r.id;
    return;
  }
  const ids = list.filter((x) => !x.short).map((x) => ensureVideo(x).id);
  openVideo(id, ids.includes(id) ? ids : [id, ...ids]);
}

// ---------------------------------------------------------------- search
const searchCache = new Map();
const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
function addSearchHistory(q, thumbId) {
  state.searches = [{ q, thumb: thumbId || state.searches.find((x) => x.q === q)?.thumb || '', at: Date.now() }, ...state.searches.filter((x) => x.q.toLowerCase() !== q.toLowerCase())].slice(0, 30);
  save();
}
function runSearch(q) {
  if (searchCache.get(q)?.items || searchCache.get(q)?.loading) return;
  searchCache.set(q, { loading: true });
  const hash = location.hash;
  Remote.search(q).then((items) => {
    searchCache.set(q, { items });
    addSearchHistory(q, items[0]?.id);
  }).catch(() => {
    searchCache.set(q, { error: true });
    addSearchHistory(q);
  }).finally(() => { if (location.hash === hash && !$('#sheet-root .scrim')) rerender(); });
}
function searchBar(q) {
  return `<div class="searchbar"><button class="icon-btn" data-action="back" aria-label="Back">${icon('back')}</button>
    <form class="search-field" id="search-form" role="search" action="#">
      <input id="search-input" type="search" placeholder="Search YouTube" value="${esc(q)}" autocomplete="off" autocapitalize="off" enterkeyhint="search">
      ${q ? `<button type="button" class="search-clear" data-action="search-clear" aria-label="Clear">${icon('close')}</button>` : ''}
    </form>
    ${SpeechRec ? `<button class="icon-btn mic-btn" data-action="voice" aria-label="Search with your voice">${icon('mic')}</button>` : ''}
  </div><div class="suggest-panel hidden" id="search-suggest"></div>`;
}
function renderSearch(q, filter) {
  const links = findLinks(q);
  if (!q) {
    const rows = state.searches.map((x) => `<div class="sh-row">
        <a class="sh-main" href="#search/${encodeURIComponent(x.q)}">${icon('history')}<span class="sh-q">${esc(x.q)}</span>${x.thumb ? `<img class="sh-thumb" loading="lazy" src="${rThumb(x.thumb)}" alt="">` : ''}</a>
        <button class="sh-fill" data-fill="${esc(x.q)}" aria-label="Edit “${esc(x.q)}”">${icon('fill')}</button></div>`).join('');
    return searchBar('') + (rows ? `<div class="sh-list">${rows}</div><button class="sh-clear" data-action="search-history-clear">Clear search history</button>`
      : empty('search', 'Search YouTube for videos, Shorts and music.<br>You can also paste a YouTube link to save it.'));
  }
  const f = filter || 'All';
  const lib = allVideos().filter((v) => [v.title, v.channel, v.category, v.description, ...(v.tags || []).map((t) => '#' + t)].join(' ').toLowerCase().includes(q.toLowerCase()));
  const res = searchCache.get(q) || {};
  let items = res.items || [];
  if (f === 'Videos') items = items.filter((r) => !r.short);
  if (f === 'Shorts') items = items.filter((r) => r.short);
  if (f === 'Unwatched') items = items.filter((r) => !watched(r.id));
  const vids = items.filter((r) => !r.short), shorts = items.filter((r) => r.short);
  const vk = rlist(vids), sk = rlist(shorts);
  const grid = (list) => list.length ? `<div class="rshort-grid">${list.map((r) => remoteShort(r, sk)).join('')}</div>` : '';
  let body = '';
  if (f === 'Saved') {
    const k = ctx(lib.map((v) => v.id));
    body = lib.length ? lib.map((v) => listRow(v, k)).join('') : empty('search', 'Nothing in your library matches.');
  } else if (res.loading) {
    body = '<div class="feed">' + Array.from({ length: 3 }, () => '<div class="card skel"><div class="thumb"></div><div class="meta"><span class="avatar av-36"></span><div class="text"><div class="skel-line"></div><div class="skel-line short"></div></div></div></div>').join('') + '</div>';
  } else if (res.error) {
    body = `<div class="empty">${icon('search')}<div>Couldn't reach YouTube search right now.<br>Check your connection and try again${Remote.hasKey() ? '' : ', or add a YouTube API key in Settings for steadier search'}.</div>
      <button class="btn" data-action="search-retry" data-q="${esc(q)}">Try again</button></div>`;
  } else if (f === 'Shorts') {
    body = grid(shorts) || empty('shorts', 'No Shorts found.');
  } else {
    const parts = vids.map((r) => remoteCard(r, vk));
    if (f === 'All' && shorts.length) parts.splice(Math.min(2, parts.length), 0, `</div><div class="section-title">${icon('shorts')} Shorts</div>${grid(shorts.slice(0, 4))}<div class="feed">`);
    body = parts.length ? `<div class="feed">${parts.join('')}</div>` : empty('search', 'No results.');
  }
  const libTop = f === 'All' && lib.length ? `<div class="section-title" style="font-size:16px">From your library</div>${lib.slice(0, 3).map((v) => listRow(v, ctx(lib.map((x) => x.id)))).join('')}` : '';
  return searchBar(q) + `
    <div class="chips">${['All', 'Videos', 'Shorts', 'Unwatched', 'Saved'].map((c) => `<button class="chip ${c === f ? 'active' : ''}" data-sfilter="${c}">${c}</button>`).join('')}</div>
    ${links.length ? `<button class="lib-item" style="width:100%;text-align:left" data-action="add-from-search">${icon('plus')}<div class="text"><div class="title">Save ${links.length} video${links.length > 1 ? 's' : ''} from link</div></div></button>` : ''}
    ${libTop}${body}`;
}
function setupSearch(q) {
  const form = $('#search-form'), inp = $('#search-input'), panel = $('#search-suggest');
  if (!q) inp.focus();
  if (q && !findLinks(q).length) runSearch(q);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = inp.value.trim();
    if (!v) return;
    inp.blur();
    if (v === q) { panel.classList.add('hidden'); return; }
    location.hash = '#search/' + encodeURIComponent(v);
  });
  let timer = 0, seq = 0;
  inp.addEventListener('input', () => {
    clearTimeout(timer);
    const v = inp.value.trim();
    if (!v || v === q) { panel.classList.add('hidden'); return; }
    timer = setTimeout(async () => {
      const mine = ++seq;
      const past = state.searches.filter((x) => x.q.toLowerCase().startsWith(v.toLowerCase())).slice(0, 3).map((x) => x.q);
      const row = (t, ic) => `<div class="sh-row"><a class="sh-main" href="#search/${encodeURIComponent(t)}">${icon(ic)}<span class="sh-q">${esc(t)}</span></a><button class="sh-fill" data-fill="${esc(t)}" aria-label="Edit">${icon('fill')}</button></div>`;
      const draw = (list) => { panel.innerHTML = [...past.map((t) => row(t, 'history')), ...list.filter((t) => !past.includes(t)).map((t) => row(t, 'search'))].join('') || row(v, 'search'); panel.classList.remove('hidden'); };
      draw([]);
      try { const list = await Remote.suggestions(v); if (mine === seq) draw(list); } catch { /* keep what we have */ }
    }, 200);
  });
}
function voiceSearch(btn) {
  const rec = new SpeechRec();
  rec.lang = navigator.language || 'en-US';
  rec.interimResults = true;
  const inp = $('#search-input');
  btn.classList.add('listening');
  rec.onresult = (e) => {
    const text = [...e.results].map((r) => r[0].transcript).join('');
    inp.value = text;
    if (e.results[e.results.length - 1].isFinal && text.trim()) location.hash = '#search/' + encodeURIComponent(text.trim());
  };
  rec.onend = () => btn.classList.remove('listening');
  rec.onerror = () => { btn.classList.remove('listening'); toast('Voice search needs microphone access'); };
  try { rec.start(); } catch { btn.classList.remove('listening'); }
}

// ---------------------------------------------------------------- discovery for Home
// Recommendations related to what you watched lately (or trending), mixed into
// Home by the Familiar ↔ New slider.
const detailsCache = new Map();
function loadDetails(id) {
  if (!detailsCache.has(id)) {
    detailsCache.set(id, Remote.details(id).then((d) => { detailsReady.set(id, d || { related: [] }); return d; })
      .catch(() => { detailsReady.set(id, { related: [] }); return null; }));
  }
  return detailsCache.get(id);
}
let discover = { key: null, items: [], at: 0, loading: false };
function loadDiscover() {
  const seeds = [...new Set(state.history.map((h) => state.videos[h.id]).filter((v) => v && !v.local).map((v) => v.id))].slice(0, 3);
  const key = seeds.join(',') || 'trending';
  if (discover.loading || (discover.key === key && Date.now() - discover.at < 30 * 60e3)) return;
  discover.loading = true;
  (async () => {
    let items = [];
    const details = await Promise.all(seeds.map(loadDetails));
    const pools = details.map((d) => d?.related || []);
    for (let i = 0; pools.some((p) => p[i]); i++) for (const p of pools) if (p[i]) items.push(p[i]);
    if (!items.length) items = await Remote.trending().catch(() => []);
    const seen = new Set();
    items = items.filter((r) => !seen.has(r.id) && seen.add(r.id) && !(state.videos[r.id] && !state.videos[r.id].unsaved));
    discover = { key, items, at: Date.now(), loading: false };
    if ((location.hash || '#home').startsWith('#home') && view.homeChip === 'All' && !$('#sheet-root .scrim')) rerender();
  })().catch(() => { discover.loading = false; discover.at = Date.now(); discover.key = key; });
}

// ---------------------------------------------------------------- views
const view = { homeChip: 'All', subsChip: 'All', subsChannel: null, shuffle: false };

function topbar(extra = '') {
  return `<header class="topbar"><a class="logo" href="#home">${LOGO}<span class="logo-text">MyTube</span></a><div class="spacer"></div>
    ${extra}<a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a></header>`;
}

function renderHome() {
  const vids = allVideos();
  const cats = [...new Set(vids.map((v) => v.category).filter(Boolean))].sort();
  const hasLocal = vids.some((v) => v.local);
  const chips = ['Your custom feed', 'All', 'New to you', ...(hasLocal ? ['Your uploads'] : []), ...cats];
  if (!chips.includes(view.homeChip)) view.homeChip = 'All';
  const c = view.homeChip;
  let list = vids.filter((v) => !v.short && inFeeds(v));
  if (c === 'Your custom feed') {
    const likedCh = new Set(state.liked.map((id) => state.videos[id]?.channel));
    list = list.filter((v) => isSub(v.channel) || likedCh.has(v.channel));
  } else if (c === 'New to you') list = list.filter((v) => !watched(v.id));
  else if (c === 'Your uploads') list = list.filter((v) => v.local);
  else if (c !== 'All') list = list.filter((v) => v.category === c);
  if (view.shuffle) list = list.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  const k = ctx(list.map((v) => v.id));
  const shorts = vids.filter((v) => v.short && inFeeds(v));

  // Mix in recommendations according to the slider (All only).
  const tune = c === 'All' ? state.settings.discover : 0;
  const found = tune ? discover.items.filter((r) => !r.short).slice(0, Math.round(tune / 100 * 40)) : [];
  const foundShorts = tune ? discover.items.filter((r) => r.short).slice(0, Math.round(tune / 100 * 10)) : [];
  const dk = rlist(found), dsk = rlist(foundShorts);
  const entries = [];
  for (let i = 0, j = 0, acc = 0; i < list.length || j < found.length;) {
    acc += tune / 100;
    if ((acc >= 1 || i >= list.length) && j < found.length) { entries.push(remoteCard(found[j++], dk, '✨ For you')); acc -= acc >= 1 ? 1 : 0; }
    else entries.push(bigCard(list[i++], k));
  }
  const shelf = shortsShelf(shorts) + (foundShorts.length ? `${shorts.length ? '' : `<div class="section-title">${icon('shorts')} Shorts</div>`}<div class="rshort-row">${foundShorts.map((r) => remoteShort(r, dsk)).join('')}</div>` : '');
  let feed = '';
  entries.forEach((html, i) => {
    feed += html;
    if (i === 1 && c === 'All') feed += `</div>${shelf}<div class="feed">`;
  });
  if (entries.length < 2 && c === 'All') feed += `</div>${shelf}<div class="feed">`;

  return topbar() + `
    <div class="chips">
      <button class="chip ${view.shuffle ? 'active' : ''}" data-action="shuffle" aria-label="Shuffle">${icon('compass')}</button>
      ${chips.map((ch) => `<button class="chip ${ch === c ? 'active' : ''}" data-homechip="${esc(ch)}">${ch === 'Your custom feed' ? icon('feed') : ''}${esc(ch)}</button>`).join('')}
    </div>
    ${c === 'All' ? `<div class="tune"><span>Familiar</span><input type="range" id="tune" min="0" max="100" step="10" value="${state.settings.discover}" aria-label="Mix of familiar and new videos"><span>New ✨</span></div>` : ''}
    <div class="feed">${feed}</div>
    ${entries.length ? '' : empty('feed', c === 'Your custom feed' ? 'Subscribe to channels or like videos to build your custom feed.' : 'Nothing here yet. Paste a YouTube link or upload a video from your phone.', addBtnHtml)}`;
}

function renderSubs() {
  const subs = state.subs;
  const vids = allVideos().filter((v) => isSub(v.channel) && inFeeds(v));
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
    <div class="chips">
      ${['All', 'Today', 'Videos', 'Shorts', 'Continue watching'].map((ch) => `<button class="chip ${ch === c ? 'active' : ''}" data-subschip="${ch}">${ch}</button>`).join('')}
    </div>
    ${!subs.length ? empty('subs', 'You have no subscriptions yet. Open any video and tap Subscribe.') :
      !list.length ? empty('subs', 'No videos from these channels yet. Add some with the + button.', addBtnHtml) : `
    <div class="section-title">Most relevant</div>
    <div class="hrow">${rel.map((v) => smallCard(v, k, true)).join('')}</div>
    ${rest.length ? `<div class="feed" style="margin-top:12px">${rest.map((v) => bigCard(v, k)).join('')}</div>` : ''}`}`;
}

function libItem(title, sub, ids, href, corner) {
  const first = ids.find((id) => state.videos[id]);
  return `<a class="lib-item" href="${href}"><div class="stack">${first ? `<img loading="lazy" src="${thumb(first)}" alt="">` : ''}<span class="corner">${icon(corner)}</span></div>
    <div class="text"><div class="title">${esc(title)}</div><div class="sub">${esc(sub)}</div></div><span>${icon('right')}</span></a>`;
}

function renderYou() {
  const p = state.profile;
  const hist = state.history.map((h) => state.videos[h.id]).filter(Boolean);
  const histShorts = hist.filter((v) => v.short), histVids = hist.filter((v) => !v.short);
  const hk = ctx(histVids.map((v) => v.id));
  const locals = allVideos().filter((v) => v.local);
  const shortsGroup = histShorts.length ? `<div class="hcard"><a class="thumb shorts-group" href="#shorts/${histShorts[0].id}">
      ${histShorts.slice(0, 3).map((v) => `<img loading="lazy" src="${thumb(v.id)}" alt="">`).join('')}<span class="badge">${icon('shorts')}</span></a>
      <div class="meta"><a class="text" href="#shorts/${histShorts[0].id}"><div class="title">Shorts</div><div class="sub">${histShorts.length} watched</div></a></div></div>` : '';
  const headStyle = p.color === 'rainbow' ? 'background:linear-gradient(180deg, rgba(255,107,154,.4), rgba(107,197,255,.22) 60%, transparent)' : `--pc:${esc(p.color)}`;
  return `<div class="you-head ${p.banner ? 'has-banner' : ''}" style="${headStyle}">
    ${p.banner ? `<div class="banner" style="background-image:url('${p.banner}')"></div>` : ''}
    <header class="topbar"><button class="pill-btn" data-action="edit-profile">${icon('user')} Profile ${icon('down')}</button><div class="spacer"></div>
      <a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a>
      <button class="icon-btn" data-action="settings" aria-label="Settings">${icon('gear')}</button></header>
    <div class="profile">${profileAvatar(88)}<div><h1>${myName(p.name)}</h1><div class="handle">${esc(p.handle)}${p.pronouns ? ` · ${esc(p.pronouns)}` : ''}</div></div></div>
    <div class="btn-row"><a class="btn primary" href="#channel/${encodeURIComponent(p.name)}">View channel</a><button class="btn" data-action="add">Upload video</button></div>
  </div>
  <a class="section-title" href="#history">History ${icon('right')}</a>
  ${hist.length ? `<div class="hrow">${shortsGroup}${histVids.slice(0, 12).map((v) => smallCard(v, hk)).join('')}</div>` : `<div class="sub" style="padding:0 16px 8px">Videos you watch will show up here.</div>`}
  <div class="section-title">Library</div>
  <div class="chips static">
    <a class="chip" href="#history">${icon('history')} Recents</a>
    <a class="chip" href="#files">${icon('download')} Downloaded</a>
    <a class="chip" href="#playlists">${icon('list')} Playlists</a>
    <a class="chip" href="#home" data-homechip-link="Music">Music</a>
  </div>
  ${libItem('Liked videos', `${state.liked.length} videos · Private`, state.liked, '#liked', 'like')}
  ${libItem('Watch later', `${state.later.length} videos · Private`, state.later, '#later', 'clock')}
  ${libItem('Downloaded', `${locals.length} videos saved on this phone`, locals.map((v) => v.id), '#files', 'download')}
  ${state.playlists.map((pl) => libItem(pl.name, `${pl.items.length} videos · Playlist`, pl.items, `#playlist/${pl.id}`, 'list')).join('')}
  <button class="lib-item" data-action="new-playlist" style="width:100%;text-align:left"><div class="stack new">${icon('plus')}</div><div class="text"><div class="title">New playlist</div></div></button>`;
}

function pageHeader(title, extra = '') {
  return `<header class="topbar"><button class="icon-btn" data-action="back" aria-label="Back">${icon('back')}</button>
    <div class="page-title">${esc(title)}</div>${extra}</header>`;
}
function renderList(title, ids, opts = {}) {
  const vids = ids.map((id) => state.videos[id]).filter(Boolean);
  const k = ctx(vids.map((v) => v.id));
  const playAll = vids.length ? `<div class="btn-row"><button class="btn red play-all" data-play="${vids[0].id}" data-ctx="${k}">${icon('play')} Play all</button>
    <button class="btn" data-action="shuffle-play" data-ctx="${k}">${icon('shuffle')} Shuffle</button></div>` : '';
  const tools = opts.manage && vids.length ? `<div class="pl-tools">
      <label class="pl-search">${icon('search')}<input type="search" data-plsearch placeholder="Search in this list" autocomplete="off"></label>
      <button class="pill-btn" data-action="sel-start" data-key="${opts.manage}">Select</button></div>` : '';
  const extra = opts.manage ? `<button class="icon-btn" data-action="pl-tools" data-key="${opts.manage}" aria-label="List options">${icon('moreV')}</button>` : (opts.extra || '');
  const selBar = view.select && opts.manage === view.select.key ? `<div class="sel-bar"><span id="sel-count">${view.select.ids.size} selected</span>
      <button data-action="sel-all">All</button><button class="danger" data-action="sel-remove">Remove</button><button data-action="sel-cancel">Done</button></div>` : '';
  return (opts.header ?? pageHeader(title, extra)) + (opts.top || '') + tools + selBar + playAll +
    (vids.length ? vids.map((v) => listRow(v, k, opts.sub ? opts.sub(v) : undefined, opts.editable)).join('') : empty(opts.icon || 'list', opts.empty || 'Nothing here yet.', opts.emptyBtn));
}

function renderFiles() {
  const locals = allVideos().filter((v) => v.local);
  const used = locals.reduce((n, v) => n + (v.size || 0), 0);
  const top = `<div class="upload-card"><label class="btn red upload-btn">${icon('upload')} Upload from phone<input type="file" accept="video/*" multiple hidden data-upload></label>
    <div class="sub">${locals.length} videos · ${fmtSize(used)} on this phone. They play offline and never leave your device.</div></div>`;
  return renderList('Downloaded', locals.map((v) => v.id), { top, icon: 'download', empty: 'Videos you upload from your phone show up here.', sub: (v) => v.size ? fmtSize(v.size) : 'On phone' });
}

function renderPlaylists() {
  return pageHeader('Playlists') +
    libItem('Liked videos', `${state.liked.length} videos`, state.liked, '#liked', 'like') +
    libItem('Watch later', `${state.later.length} videos`, state.later, '#later', 'clock') +
    state.playlists.map((pl) => libItem(pl.name, `${pl.items.length} videos`, pl.items, `#playlist/${pl.id}`, 'list')).join('') +
    `<button class="lib-item" data-action="new-playlist" style="width:100%;text-align:left"><div class="stack new">${icon('plus')}</div><div class="text"><div class="title">New playlist</div></div></button>`;
}

function renderShorts(startId) {
  let list = allVideos().filter((v) => v.short && (inFeeds(v) || v.id === startId));
  if (startId && shortsQueue.includes(startId)) list = shortsQueue.map((id) => state.videos[id]).filter(Boolean);
  else if (startId && state.videos[startId]?.unsaved) list = [state.videos[startId], ...list];
  if (startId) {
    const i = list.findIndex((v) => v.id === startId);
    if (i > 0) list = [...list.slice(i), ...list.slice(0, i)];
  }
  if (!list.length) {
    return topbar() + empty('shorts', 'No Shorts saved yet.<br>Paste a link like <b>youtube.com/shorts/…</b> or upload a vertical video with the + button.', addBtnHtml);
  }
  return `<div class="shorts-top"><a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a></div>
  <div class="shorts" id="shorts">${list.map((v) => `
    <div class="short" data-short="${v.id}">
      <div class="frame"><img src="${thumb(v.id)}" alt=""></div>
      <div class="overlay"><div class="who">${channelAvatar(v, 28)} ${chName(v)}</div><div>${esc(v.title)}</div>
        <div class="sub" style="color:#ddd">${viewsSpan(v.id)}</div></div>
      <div class="side">
        <button data-act-like="${v.id}" class="${state.liked.includes(v.id) ? 'on' : ''}">${icon('like')}<span>Like</span></button>
        <button data-action="comments" data-id="${v.id}" ${v.kids ? 'disabled' : ''}>${icon('comment')}<span>${(state.comments[v.id] || []).reduce((n, c) => n + 1 + (c.replies?.length || 0), 0) || 'Comment'}</span></button>
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
      const el = e.target, id = el.dataset.short, frame = $('.frame', el), v = state.videos[id];
      if (e.isIntersecting) {
        if (frame.querySelector('iframe,video')) continue;
        if (v?.local) {
          fileUrl(id).then((url) => {
            if (!url || frame.querySelector('video')) return;
            const vid = document.createElement('video');
            Object.assign(vid, { src: url, loop: true, playsInline: true, autoplay: true });
            // Tap to pause / play, and to unmute if the browser forced it muted.
            // Tap to pause, double-tap to like (with a big heart), like YouTube Shorts.
            let tapTimer = 0;
            vid.addEventListener('click', () => {
              if (tapTimer) {
                clearTimeout(tapTimer); tapTimer = 0;
                if (!state.liked.includes(id)) { toggleLike(id); el.querySelector('[data-act-like]')?.classList.add('on'); }
                bigHeart(frame); buzz(15);
                return;
              }
              tapTimer = setTimeout(() => { tapTimer = 0; if (vid.muted) { vid.muted = false; return; } vid.paused ? vid.play() : vid.pause(); }, 260);
            });
            frame.appendChild(vid);
            vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); });
          });
        } else {
          frame.insertAdjacentHTML('beforeend', `<iframe allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen
            src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&loop=1&playlist=${id}&rel=0"></iframe>`);
        }
        addHistory(id);
      } else {
        const m = frame.querySelector('iframe,video');
        if (m) { if (m.pause) m.pause(); m.remove(); }
      }
    }
  }, { root, threshold: 0.6 });
  root.querySelectorAll('.short').forEach((el) => io.observe(el));
}

function comicToggle() {
  const on = !!state.settings.comic;
  return `<button class="comic-btn ${on ? 'on' : ''}" data-action="toggle-comic" aria-pressed="${on}">${icon('zap')} Comic style${on ? ': on' : ''}</button>`;
}
function renderChannel(name) {
  const p = state.profile;
  const sub = state.subs.find((s) => s.name === name);
  const mine = name === p.name || allVideos().some((v) => v.local && v.channel === name);
  const vids = allVideos().filter((v) => v.channel === name);
  const url = sub?.url || vids.find((v) => v.channelUrl)?.channelUrl;
  const totalViews = vids.reduce((n, v) => n + (viewsOf(v.id) || 0), 0);
  const header = `<header class="topbar"><button class="icon-btn" data-action="back" aria-label="Back">${icon('back')}</button>
    <div class="page-title">${mine ? 'You' : esc(name)}</div>
    <a class="icon-btn" href="#search" aria-label="Search">${icon('search')}</a>
    <button class="icon-btn" data-action="settings" aria-label="Settings">${icon('gear')}</button></header>`;
  const top = `<div class="ch-head">
      <span class="ch-av">${mine ? profileAvatar(88) : avatar(name, 88)}</span>
      <div class="ch-info"><h1>${mine ? myName(name) : esc(name)}</h1>
        ${mine && (p.handle || p.pronouns) ? `<div class="handle">${esc(p.handle)}${p.pronouns ? ` · ${esc(p.pronouns)}` : ''}</div>` : ''}
        <div class="sub">${vids.length} saved video${vids.length === 1 ? '' : 's'} • ${fmtCount(totalViews)} view${totalViews === 1 ? '' : 's'}</div></div>
    </div>
    <div class="btn-row">${mine
      ? `<a class="btn outline" href="#manage">Manage videos</a><button class="btn outline" data-action="add">Create</button>`
      : `<button class="sub-btn ${sub ? 'on' : ''}" data-act-sub="${esc(name)}" style="flex:1">${sub ? 'Subscribed' : 'Subscribe'}</button>
         ${url ? `<a class="btn outline" href="${esc(url)}" target="_blank" rel="noopener">Open on YouTube</a>` : ''}`}</div>
    <div class="comic-row">${comicToggle()}</div>`;
  return renderList(name, vids.map((v) => v.id), { header, top, empty: mine ? 'Tap Create to upload your first video.' : 'No saved videos from this channel.' });
}
function renderManage() {
  const p = state.profile;
  const vids = allVideos().filter((v) => v.local || v.channel === p.name);
  return renderList('Manage videos', vids.map((v) => v.id), {
    editable: true, icon: 'film', empty: 'Your uploads will show up here.',
    sub: (v) => { const vis = VISIBILITY[visOf(v)]; return `${vis[1]}${v.kids ? ' · Kids' : ''}`; },
  });
}

// ---------------------------------------------------------------- router
function route(animate) {
  ctxLists = {}; ctxSeq = 0; remoteLists = {};
  const h = decodeURIComponent(location.hash.slice(1) || 'home');
  const [page, ...rest] = h.split('/');
  const arg = rest.join('/');
  const main = $('#main');
  let html;
  switch (page) {
    case 'shorts': html = renderShorts(arg); break;
    case 'subs': html = renderSubs(); break;
    case 'you': html = renderYou(); break;
    case 'search': html = renderSearch(arg, view.searchFilter?.q === arg ? view.searchFilter.f : 'All'); break;
    case 'history': {
      const extra = state.history.length ? `<button class="icon-btn" data-action="clear-history" aria-label="Clear history">${icon('trash')}</button>` : '';
      html = renderList('History', state.history.map((x) => x.id), { extra, icon: 'history', empty: 'No watch history yet.', sub: (v) => 'watched ' + ago(state.history.find((x) => x.id === v.id).at) });
      break;
    }
    case 'liked': html = renderList('Liked videos', state.liked, { manage: 'liked', icon: 'like', empty: 'Tap Like on a video to save it here.' }); break;
    case 'later': html = renderList('Watch later', state.later, { manage: 'later', icon: 'clock', empty: 'Save videos to watch later.' }); break;
    case 'library': html = renderList('All saved videos', allVideos().map((v) => v.id), { icon: 'save' }); break;
    case 'files': html = renderFiles(); break;
    case 'playlists': html = renderPlaylists(); break;
    case 'playlist': {
      const pl = state.playlists.find((p) => p.id === arg);
      html = pl ? renderList(pl.name, pl.items, { manage: 'pl:' + pl.id, empty: 'Add videos with “Save to playlist”.' }) : renderHome();
      break;
    }
    case 'channel': html = renderChannel(arg); break;
    case 'edit': html = renderEdit(arg); break;
    case 'profile': html = renderProfileEdit(); break;
    case 'manage': html = renderManage(); break;
    default: html = renderHome();
  }
  if (page !== 'edit') editDraft = null;
  if (view.select && view.select.page !== h) view.select = null;
  if (page !== 'profile' && profDraft) { profDraft = null; applyTheme(); }
  const push = ['history', 'liked', 'later', 'library', 'files', 'playlists', 'playlist', 'channel', 'edit', 'profile', 'manage', 'search'].includes(page);
  main.classList.toggle('enter', !!animate && !reduceMotion && !push);
  main.classList.toggle('push', !!animate && !reduceMotion && push);
  main.innerHTML = html;
  const tab = page === 'channel' && arg === state.profile.name ? 'you' : { home: 'home', shorts: 'shorts', subs: 'subs', channel: 'subs' }[page] || (['you', 'history', 'liked', 'later', 'library', 'playlist', 'playlists', 'files', 'edit', 'profile', 'manage'].includes(page) ? 'you' : page === 'search' ? '' : 'home');
  document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.tab === tab));
  $('#tab-avatar').innerHTML = profileAvatar(28);
  document.body.classList.toggle('on-shorts', page === 'shorts');
  if (page === 'shorts') setupShorts();
  if (page === 'search') setupSearch(arg);
  if ((page === 'home' || !page) && view.homeChip === 'All' && state.settings.discover > 0) loadDiscover();
  main.classList.toggle('selecting', !!view.select && view.select.page === h);
  if (view.select) main.querySelectorAll('.lrow').forEach((r) => r.classList.toggle('sel', view.select.ids.has(r.dataset.id)));
  requestVisibleStats(main);
}
function rerender() { const y = scrollY; route(false); scrollTo(0, y); }

// ---------------------------------------------------------------- player
// Two engines share one frame: the YouTube embed and a <video> for uploads.
let yt = null, ytApiFailed = false, pending = null, playerMode = 'hidden', engine = 'yt';
let current = null, queue = [], lastSave = 0;
const lv = () => $('#local-video');

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
function stopYt() { if (yt && yt.stopVideo) yt.stopVideo(); else if (ytApiFailed) $('#yt-host').innerHTML = ''; pending = null; }
function stopLocal() { const v = lv(); v.pause(); v.removeAttribute('src'); v.load(); }

function onYtState(e) {
  updateMiniIcon();
  if (e.data === 0) onEnded();
}
async function onEnded() {
  recordProgress(true);
  if (!state.settings.autoplay) return;
  let n = nextInQueue();
  if (!n && current && !state.videos[current]?.local) {
    const rel = (await loadDetails(current))?.related?.find((r) => !r.short && !watched(r.id));
    if (rel) { n = ensureVideo(rel).id; queue = [...queue, n]; }
  }
  if (n) openVideo(n, queue);
}
lv().addEventListener('ended', onEnded);
lv().addEventListener('play', updateMiniIcon);
lv().addEventListener('pause', updateMiniIcon);

function isPlaying() {
  if (engine === 'local') { const v = lv(); return !v.paused && !v.ended; }
  return !!(yt && yt.getPlayerState && yt.getPlayerState() === 1);
}
function pausePlayer() { userPaused = true; if (engine === 'local') lv().pause(); else if (yt && yt.pauseVideo) yt.pauseVideo(); }
function resumePlayer() { userPaused = false; if (engine === 'local') lv().play().catch(() => {}); else if (yt && yt.playVideo) yt.playVideo(); }
function playerTimes() {
  if (engine === 'local') { const v = lv(); return [v.currentTime, isFinite(v.duration) ? v.duration : 0]; }
  if (yt && yt.getCurrentTime) return [yt.getCurrentTime(), yt.getDuration()];
  return [0, 0];
}
function updateMiniIcon() {
  const b = $('#mini-toggle');
  b.innerHTML = icon(isPlaying() ? 'pause' : 'play');
  b.classList.toggle('hidden', engine === 'yt' && !yt);
}

function recordProgress(force) {
  if (!current) return;
  const [t, d] = playerTimes();
  if (!d) return;
  state.progress[current] = { t: t > d - 10 ? d : t, d };
  $('#mini-progress-bar').style.width = (t / d * 100) + '%';
  if (force || Date.now() - lastSave > 5000) { lastSave = Date.now(); save(); }
}
setInterval(() => { if (isPlaying()) { recordProgress(); checkSkips(); } }, 500);

// ---------------------------------------------------------------- sponsor skipping (SponsorBlock)
const SB_CATS = { sponsor: 'Sponsors', selfpromo: 'Self-promo', interaction: 'Subscribe reminders', intro: 'Intros', outro: 'Endcards', music_offtopic: 'Non-music parts' };
const SB_ONE = { sponsor: 'sponsor', selfpromo: 'self-promo', interaction: 'subscribe reminder', intro: 'intro', outro: 'endcard', music_offtopic: 'non-music part' };
let segments = [];
function loadSegments(id) {
  segments = [];
  const sb = state.settings.sponsor;
  if (!sb.on || !sb.cats.length || state.videos[id]?.local) return;
  Remote.sponsorSegments(id, sb.cats).then((list) => { if (current === id) segments = list; }).catch(() => {});
}
function checkSkips() {
  if (engine !== 'yt' || !segments.length || !yt?.getCurrentTime) return;
  const t = yt.getCurrentTime();
  for (const seg of segments) {
    if (t < seg.start - 1) seg.done = false; // watching it again after seeking back
    if (!seg.done && t >= seg.start && t < seg.end - 0.4) {
      seg.done = true;
      yt.seekTo(seg.end, true);
      toast(`Skipped ${SB_ONE[seg.category] || 'segment'} ⏭`);
    }
  }
}

// ---------------------------------------------------------------- seeking, lock screen, background play, PiP
function seekTo(sec) {
  if (engine === 'local') lv().currentTime = sec;
  else if (yt?.seekTo) yt.seekTo(sec, true);
}
function seekBy(d) { const [t] = playerTimes(); seekTo(Math.max(0, t + d)); }
function updateMediaSession(v) {
  if (!('mediaSession' in navigator) || !v) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title: v.title, artist: v.channel, album: 'MyTube', artwork: [{ src: thumb(v.id), sizes: '480x360', type: 'image/jpeg' }] });
    const handlers = {
      play: resumePlayer, pause: pausePlayer,
      previoustrack: () => { const p = prevInQueue(); if (p) openVideo(p, queue); },
      nexttrack: () => { const n = nextInQueue(); if (n) openVideo(n, queue); },
      seekbackward: () => seekBy(-10), seekforward: () => seekBy(10),
      seekto: (d) => seekTo(d.seekTime),
    };
    for (const [k, f] of Object.entries(handlers)) { try { navigator.mediaSession.setActionHandler(k, f); } catch { /* unsupported action */ } }
  } catch { /* no media session */ }
}
// Phones pause video when the app goes to the background; for your uploads we
// start it again so the sound keeps going (YouTube's player can't be kept awake).
let userPaused = false;
lv().addEventListener('pause', () => {
  if (document.hidden && state.settings.bgPlay && !userPaused && engine === 'local' && current) setTimeout(() => lv().play().catch(() => {}), 60);
});
async function togglePip() {
  const v = lv();
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture();
    else if (document.pictureInPictureEnabled && v.requestPictureInPicture) await v.requestPictureInPicture();
    else if (v.webkitSupportsPresentationMode?.('picture-in-picture')) v.webkitSetPresentationMode(v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
    else toast('Picture-in-picture isn’t available on this device');
  } catch { toast('Couldn’t start picture-in-picture'); }
}

// ---------------------------------------------------------------- equalizer (your uploads)
const EQ_PRESETS = { flat: ['Flat', 0, 0, 0, false], bass: ['Bass boost', 8, 0, 1, false], voice: ['Voice clarity', -3, 6, 2, false], night: ['Night mode', 0, 3, 0, true], bright: ['Bright', 0, 1, 6, false] };
let audioGraph = null;
const eqActive = () => { const e = state.settings.eq; return !!(e.bass || e.voice || e.treble || e.norm); };
function ensureAudioGraph() {
  if (audioGraph) return audioGraph;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const src = ctx.createMediaElementSource(lv());
  const bass = ctx.createBiquadFilter(); bass.type = 'lowshelf'; bass.frequency.value = 160;
  const voice = ctx.createBiquadFilter(); voice.type = 'peaking'; voice.frequency.value = 2500; voice.Q.value = 0.9;
  const treble = ctx.createBiquadFilter(); treble.type = 'highshelf'; treble.frequency.value = 6500;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -28; comp.knee.value = 24; comp.ratio.value = 8; comp.attack.value = 0.004; comp.release.value = 0.25;
  const makeup = ctx.createGain(); makeup.gain.value = 1.5;
  src.connect(bass); bass.connect(voice); voice.connect(treble);
  audioGraph = { ctx, bass, voice, treble, comp, makeup };
  applyEq();
  return audioGraph;
}
function applyEq() {
  if (!audioGraph) { if (eqActive() && engine === 'local' && current) ensureAudioGraph(); return; }
  const g = audioGraph, e = state.settings.eq;
  g.bass.gain.value = e.bass; g.voice.gain.value = e.voice; g.treble.gain.value = e.treble;
  [g.treble, g.comp, g.makeup].forEach((n) => n.disconnect());
  if (e.norm) { g.treble.connect(g.comp); g.comp.connect(g.makeup); g.makeup.connect(g.ctx.destination); }
  else g.treble.connect(g.ctx.destination);
  if (g.ctx.state === 'suspended') g.ctx.resume();
}
lv().addEventListener('play', () => { if (audioGraph?.ctx.state === 'suspended') audioGraph.ctx.resume(); });

function addHistory(id) {
  state.history = state.history.filter((h) => h.id !== id);
  state.history.unshift({ id, at: Date.now() });
  state.history.length = Math.min(state.history.length, 300);
  state.plays[id] = (state.plays[id] || 0) + 1;
  save();
}
function nextInQueue() {
  const i = queue.indexOf(current);
  return i >= 0 && i < queue.length - 1 ? queue[i + 1] : null;
}
function prevInQueue() {
  const i = queue.indexOf(current);
  return i > 0 ? queue[i - 1] : null;
}

async function openVideo(id, q, startAt) {
  const v = state.videos[id];
  if (!v) return;
  if (current && current !== id) recordProgress(true);
  current = id;
  queue = q && q.length ? q : allVideos().filter((x) => !x.short && inFeeds(x)).map((x) => x.id);
  if (!queue.includes(id)) queue = [id, ...queue];
  const p = state.progress[id];
  const start = startAt ?? (p && p.d && p.t > 10 && p.t < p.d - 15 ? p.t : 0);
  addHistory(id);
  userPaused = false;
  updateMediaSession(v);
  setPlayerMode('full');
  renderPlayerBody(true);

  engine = v.local ? 'local' : 'yt';
  $('#player').classList.toggle('local', engine === 'local');
  if (engine === 'local') {
    stopYt();
    const url = await fileUrl(id);
    if (current !== id) return;
    if (!url) { toast('This video file is missing from this phone'); return; }
    const el = lv();
    el.src = url;
    el.currentTime = start;
    if (eqActive()) ensureAudioGraph();
    el.play().catch(() => {});
  } else {
    stopLocal();
    loadInPlayer(id, start);
    loadSegments(id);
    // Description, related videos and comments arrive in the background.
    loadDetails(id).then(() => { if (current === id) refreshWatchSlots(id); });
    loadComments(id).then(() => { if (current === id) afterCommentChange(id); });
  }
  updateMiniIcon();
}

function setPlayerMode(mode) {
  playerMode = mode;
  const el = $('#player');
  el.classList.remove('hidden', 'full', 'mini');
  el.classList.add(mode);
  document.body.style.overflow = mode === 'full' ? 'hidden' : '';
  if (mode === 'full') el.scrollTop = 0;
  updateMiniIcon();
}

function commentsCard(id) {
  const list = state.comments[id] || [];
  const own = list.reduce((n, c) => n + 1 + (c.replies?.length || 0), 0);
  const top = [...list].sort((x, y) => cScore(y) - cScore(x) || y.at - x.at)[0];
  const rc = commentCache.get(id);
  const yt = (rc?.list || []).filter((c) => !c.hidden).sort((a, b) => b.score - a.score)[0];
  const total = own + (rc?.list?.length || 0);
  const face = (c) => c.avatar ? `<span class="avatar av-28"><img src="${esc(c.avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer"></span>` : avatar(c.author, 28);
  return `<button class="comments-card" data-action="comments" data-id="${id}">
    <div class="cc-head"><b>Comments</b> <span class="sub">${total ? fmtCount(total) + (rc?.list?.length >= 20 ? '+' : '') : ''}</span></div>
    <div class="cc-body">${yt ? `${face(yt)}<span class="cc-text">${esc(yt.text)}</span>` : top ? `${profileAvatar(28)}<span class="cc-text">${esc(top.text)}</span>` : `${profileAvatar(28)}<span class="cc-text muted">${rc?.loading ? 'Loading comments…' : 'Add a comment...'}</span>`}</div>
  </button>`;
}
const commentCache = new Map();
function loadComments(id) {
  if (!id || state.videos[id]?.local) return Promise.resolve(null);
  const hit = commentCache.get(id);
  if (hit?.promise) return hit.promise;
  const entry = { loading: true };
  entry.promise = Remote.comments(id)
    .then((r) => { Object.assign(entry, { loading: false, disabled: r.disabled, list: Remote.classify(r.list) }); return entry; })
    .catch(() => { Object.assign(entry, { loading: false, error: true }); return entry; });
  commentCache.set(id, entry);
  return entry.promise;
}
function agoSeconds(text) {
  const m = String(text).match(/(\d+)\s*(second|minute|hour|day|week|month|year)/i);
  if (!m) return 0;
  return +m[1] * { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2592000, year: 31536000 }[m[2].toLowerCase()];
}
function frameHtml(id, sec, width = 176) {
  const f = Remote.frameAt(detailsNow(id)?.frames, sec);
  if (!f) return `<span class="frame fallback" style="width:${width}px;height:${Math.round(width * 9 / 16)}px;background-image:url('${thumb(id)}')"><b>${fmtTime(sec)}</b></span>`;
  const sc = width / f.w;
  return `<span class="frame" style="width:${width}px;height:${Math.round(f.h * sc)}px;background-image:url('${f.url}');background-size:${f.cols * f.w * sc}px ${f.rows * f.h * sc}px;background-position:-${f.x * sc}px -${f.y * sc}px"><b>${fmtTime(sec)}</b></span>`;
}
const previewHtml = (id, sec) => `<div class="ts-preview">${frameHtml(id, sec)}<button class="ts-jump" data-jump="${sec}">${icon('play')} Play from ${fmtTime(sec)}</button></div>`;
function jumpTo(id, sec) {
  closeSheet();
  if (current === id) { seekTo(sec); resumePlayer(); if (playerMode !== 'full') setPlayerMode('full'); }
  else if (state.videos[id]) openVideo(id, null, sec);
}
function remoteCommentItem(c, id) {
  const long = c.text.length > 220 || c.text.split('\n').length > 5;
  const expanded = cview.more.has(c.id);
  return `<div class="cm ${c.hidden ? 'filtered' : ''}">
    ${c.avatar ? `<span class="avatar av-36"><img src="${esc(c.avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer"></span>` : avatar(c.author, 36)}
    <div class="cm-main">
      <div class="cm-meta">${c.pinned ? '<span class="cm-pin">📌 Pinned</span>' : ''}<span class="${c.owner ? 'cm-owner' : ''}">${esc(c.author)}</span> <span>• ${esc(c.ago)}</span>${c.hidden ? `<span class="cm-flag">${icon('shield')} ${esc(c.hidden)}</span>` : ''}</div>
      <div class="cm-text ${long && !expanded ? 'clamp' : ''}" data-cid="${c.id}">${linkTimes(c.text, id)}</div>
      ${long ? `<button class="cm-more" data-cmore="${c.id}">${expanded ? 'Show less' : 'Read more'}</button>` : ''}
      ${cview.preview?.cid === c.id ? previewHtml(id, cview.preview.sec) : ''}
      <div class="cm-actions static"><span>${icon('like')}<span>${c.likes ? fmtCount(c.likes) : ''}</span></span>${c.hearted ? '<span class="cm-heart" title="Loved by the creator">❤️</span>' : ''}${c.replies ? `<span class="cm-replycount">${fmtCount(c.replies)} repl${c.replies === 1 ? 'y' : 'ies'}</span>` : ''}</div>
    </div></div>`;
}

function ratioText(id) {
  const st = state.stats[id], r = likeRatio(id);
  if (r == null) return '';
  return `👍 ${fmtCount(st.likes + (state.liked.includes(id) ? 1 : 0))} · 👎 ${fmtCount(st.dislikes + (state.disliked.includes(id) ? 1 : 0))} · ${r}% liked`;
}
function descBox(v) {
  const extra = [v.category && `<span>${esc(v.category)}</span>`, v.kids && '<span>Made for kids</span>'].filter(Boolean).join('');
  const desc = v.description || detailsNow(v.id)?.description?.trim() || '';
  if (!desc && !v.tags?.length && !extra && v.local) return '';
  return `<button class="desc-box" data-action="desc-toggle">
    <div class="desc-stats"><b data-views-long="${v.id}">${viewsLong(v.id)}</b> <b>${when(v)}</b> ${v.tags?.length ? `<span class="tags">${tagLinks(v.tags)}</span>` : ''}</div>
    ${v.local ? '' : `<div class="desc-ratio" data-ratio-text="${v.id}">${ratioText(v.id)}</div>`}
    ${desc ? `<div class="desc-text">${linkTimes(desc, v.id)}</div>` : ''}
    ${extra ? `<div class="desc-extra">${extra}</div>` : ''}
    <span class="desc-more">...more</span>
  </button>`;
}

// Details that already arrived (description, related videos, storyboard).
const detailsReady = new Map();
const detailsNow = (id) => detailsReady.get(id);
function relatedHtml(id) {
  const d = detailsNow(id);
  if (state.videos[id]?.local) return '';
  if (!d) return '<div class="section-title" style="font-size:16px">Related on YouTube</div><div class="feed"><div class="card skel"><div class="thumb"></div></div></div>';
  const list = (d.related || []).filter((r) => !r.short).slice(0, 15);
  if (!list.length) return '';
  const k = rlist(list);
  return `<div class="section-title" style="font-size:16px">Related on YouTube</div><div class="feed">${list.map((r) => remoteCard(r, k)).join('')}</div>`;
}
function refreshWatchSlots(id) {
  const v = state.videos[id];
  if (!v) return;
  const rel = $('#related-slot'), desc = $('#desc-slot');
  if (rel) rel.innerHTML = relatedHtml(id);
  if (desc) desc.innerHTML = descBox(v);
}
// Turns 4:12-style times into buttons that jump the video there.
function linkTimes(text, id) {
  let out = '', last = 0;
  for (const ts of Remote.timestamps(text)) {
    out += esc(text.slice(last, ts.index)) + `<span class="ts" role="button" tabindex="0" data-ts="${ts.sec}" data-vid="${id}">${esc(ts.label)}</span>`;
    last = ts.index + ts.length;
  }
  return out + esc(text.slice(last));
}

function renderPlayerBody(animate) {
  const v = state.videos[current];
  if (!v) return;
  const sub = isSub(v.channel), liked = state.liked.includes(v.id), disliked = state.disliked.includes(v.id), later = state.later.includes(v.id);
  const upNext = queue.filter((id) => id !== v.id).map((id) => state.videos[id]).filter(Boolean);
  const k = ctx(queue);
  const handle = v.local ? state.profile.handle : '@' + v.channel.replace(/\s+/g, '');
  const body = $('#player-body');
  body.classList.toggle('enter', !!animate && !reduceMotion);
  body.innerHTML = `
    <div class="ambient" style="background-image:url('${thumb(v.id)}')"></div>
    <div class="player-top"><button class="icon-btn" data-action="minimize" aria-label="Minimize">${icon('down')}</button><div class="spacer"></div>
      <button class="icon-btn" data-action="prev" aria-label="Previous" ${prevInQueue() ? '' : 'disabled'}>${icon('prev')}</button>
      <button class="icon-btn" data-action="next" aria-label="Next" ${nextInQueue() ? '' : 'disabled'}>${icon('next')}</button>
      ${v.local ? '' : `<a class="icon-btn" href="${ytUrl(v)}" target="_blank" rel="noopener" aria-label="Open on YouTube">${icon('external')}</a>`}
      ${v.local ? `<button class="icon-btn" data-action="pip" aria-label="Picture in picture">${icon('pip')}</button>` : ''}
      <button class="icon-btn" data-action="eq" aria-label="Sound">${icon('eq')}</button>
      <button class="icon-btn" data-action="edit-current" aria-label="Edit video">${icon('edit')}</button>
      <button class="icon-btn" data-action="close-player" aria-label="Close">${icon('close')}</button></div>
    <div class="watch-info">${v.tags?.length ? `<div class="tagline">${tagLinks(v.tags.slice(0, 3))}</div>` : ''}<h2>${esc(v.title)}</h2>
      <div class="sub statline"><a href="#channel/${encodeURIComponent(v.channel)}" data-action="minimize"><b>${v.local ? myName(handle) : esc(handle)}</b></a>
        <span data-likes-long="${v.id}">${likesLong(v.id)}</span><span data-views-long="${v.id}">${viewsLong(v.id)}</span>
        <span>${v.local ? 'uploaded ' + ago(v.addedAt) : when(v)}</span>${visOf(v) !== 'public' ? `<span class="vis-pill">${icon(VISIBILITY[visOf(v)][0])} ${VISIBILITY[visOf(v)][1]}</span>` : ''}</div></div>
    <div class="watch-row">
      <a href="#channel/${encodeURIComponent(v.channel)}" data-action="minimize">${channelAvatar(v, 36)}</a>
      ${v.local ? `<span class="watch-ch">${myName(v.channel)}</span>` : sub
        ? `<button class="pill-btn bell" data-act-sub="${esc(v.channel)}" aria-label="Subscribed — tap to unsubscribe">${icon('bell')}${icon('down')}</button>`
        : `<button class="sub-btn" data-act-sub="${esc(v.channel)}">Subscribe</button>`}
      <div class="spacer"></div>
      <div class="like-pill"><button class="${liked ? 'on' : ''}" data-act-like="${v.id}" aria-label="Like" aria-pressed="${liked}">${icon('like')}<span data-likes-short="${v.id}">${likesShort(v.id)}</span></button><span class="sep"></span><button class="${disliked ? 'on' : ''}" data-act-dislike="${v.id}" aria-label="Dislike" aria-pressed="${disliked}">${icon('dislike')}<span data-dislikes-short="${v.id}">${dislikesShort(v.id)}</span></button>${v.local ? '' : `<span class="ratio ${likeRatio(v.id) == null ? 'hidden' : ''}" data-ratio="${v.id}" style="--r:${likeRatio(v.id) ?? 0}%"></span>`}</div>
      ${v.unsaved ? `<button class="pill-btn save-lib" data-action="save-lib" data-id="${v.id}">${icon('bookmark')} Save</button>` : ''}
      <button class="icon-btn" data-act-share="${v.id}" aria-label="Share">${icon('share')}</button>
      <button class="icon-btn ${later ? 'on' : ''}" data-act-later="${v.id}" aria-label="Watch later">${icon('clock')}</button>
      <button class="icon-btn" data-menu="${v.id}" aria-label="More">${icon('more')}</button>
    </div>
    <div id="desc-slot">${descBox(v)}</div>
    ${v.kids ? `<div class="comments-card off"><div class="cc-head"><b>Comments are turned off</b></div><div class="sub">This video is made for kids, so comments are off.</div></div>` : commentsCard(v.id)}
    <div class="section-title" style="font-size:16px">Up next ${state.settings.autoplay ? '<span class="sub" style="margin:0 0 0 6px;font-weight:400">· autoplay on</span>' : ''}</div>
    <div class="feed">${upNext.map((x) => bigCard(x, k)).join('')}</div>
    ${upNext.length || !v.local ? '' : '<div class="sub" style="padding:0 16px">Add more videos to build a queue.</div>'}
    <div id="related-slot">${relatedHtml(v.id)}</div>`;
  requestVisibleStats(body);
}

$('#mini-expand').addEventListener('click', () => setPlayerMode('full'));
$('#mini-close').innerHTML = icon('close');
$('#mini-close').addEventListener('click', (e) => {
  e.stopPropagation();
  recordProgress(true);
  stopYt();
  stopLocal();
  current = null;
  setPlayerMode('hidden');
});
$('#mini-toggle').addEventListener('click', (e) => {
  e.stopPropagation();
  if (isPlaying()) pausePlayer(); else resumePlayer();
  setTimeout(updateMiniIcon, 150);
});

// ---------------------------------------------------------------- sheets
function openSheet(html, onMount) {
  const root = $('#sheet-root');
  root.innerHTML = `<div class="scrim"><div class="sheet" role="dialog"><div class="grab"></div>${html}</div></div>`;
  const scrim = $('.scrim:not(.closing)', root);
  scrim.addEventListener('click', (e) => { if (e.target === scrim) closeSheet(); });
  onMount && onMount($('.sheet', root));
}
function closeSheet() {
  const scrim = $('#sheet-root .scrim');
  if (!scrim) return;
  if (reduceMotion) { scrim.remove(); return; }
  scrim.classList.add('closing');
  setTimeout(() => scrim.remove(), 220);
}

function videoMenu(id) {
  const v = state.videos[id];
  if (!v) return;
  const h = location.hash;
  const plId = h.startsWith('#playlist/') ? h.slice(10) : null;
  openSheet(`
    <h3 style="font-size:15px;font-weight:500">${esc(v.title)}</h3>
    <button class="opt" data-sheet="play">${icon('play')} Play</button>
    ${v.unsaved ? `<button class="opt" data-sheet="savelib">${icon('bookmark')} Save to library</button>` : ''}
    <button class="opt" data-sheet="later">${icon('clock')} ${state.later.includes(id) ? 'Remove from Watch later' : 'Save to Watch later'}</button>
    <button class="opt" data-sheet="playlist">${icon('save')} Save to playlist</button>
    <button class="opt" data-sheet="comments">${icon('comment')} Comments</button>
    <button class="opt" data-sheet="share">${icon('share')} Share</button>
    <button class="opt" data-sheet="edit">${icon('edit')} Edit details</button>
    ${v.local ? '' : `<a class="opt" href="${ytUrl(v)}" target="_blank" rel="noopener">${icon('external')} Open on YouTube</a>`}
    ${plId ? `<button class="opt" data-sheet="unplaylist">${icon('trash')} Remove from this playlist</button>` : ''}
    ${v.unsaved ? '' : `<button class="opt" data-sheet="remove" style="color:#ff4e45">${icon('trash')} ${v.local ? 'Delete from phone' : 'Remove from library'}</button>`}`, (s) => {
    s.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sheet]');
      if (!b) return;
      const a = b.dataset.sheet;
      closeSheet();
      if (a === 'play') v.short ? (location.hash = '#shorts/' + id) : openVideo(id);
      else if (a === 'later') { toggleLater(id); refreshAfterAction(); }
      else if (a === 'savelib') { saveToLibrary(id); refreshAfterAction(); }
      else if (a === 'playlist') playlistSheet(id);
      else if (a === 'comments') commentsSheet(id);
      else if (a === 'share') share(id);
      else if (a === 'edit') { if (playerMode === 'full') setPlayerMode('mini'); location.hash = '#edit/' + id; }
      else if (a === 'unplaylist') { const pl = state.playlists.find((p) => p.id === plId); pl.items = pl.items.filter((x) => x !== id); save(); rerender(); }
      else if (a === 'remove') confirmSheet(v.local ? `Delete “${v.title}” from this phone?` : `Remove “${v.title}” from your library?`, v.local ? 'Delete' : 'Remove', () => removeVideo(id));
    });
  });
}

// In-page confirmation, since the app may run where confirm() is blocked.
function confirmSheet(question, okLabel, onOk) {
  openSheet(`<h3>${esc(question)}</h3><div class="row"><button class="btn" data-x="no">Cancel</button><button class="btn red" data-x="yes">${esc(okLabel)}</button></div>`, (s) => {
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (!x) return;
      closeSheet();
      if (x === 'yes') onOk();
    });
  });
}

function removeVideo(id) {
  const v = state.videos[id];
  if (current === id) $('#mini-close').click();
  if (v?.local) {
    delFile(id).catch(() => {});
    if (fileUrls[id]) { URL.revokeObjectURL(fileUrls[id]); delete fileUrls[id]; }
  }
  delete state.videos[id];
  state.liked = state.liked.filter((x) => x !== id);
  state.disliked = state.disliked.filter((x) => x !== id);
  state.later = state.later.filter((x) => x !== id);
  state.history = state.history.filter((x) => x.id !== id);
  state.playlists.forEach((p) => { p.items = p.items.filter((x) => x !== id); });
  delete state.progress[id];
  delete state.comments[id];
  delete state.plays[id];
  save(); rerender(); toast(v?.local ? 'Deleted from phone' : 'Removed from library');
}

function categoryOptions(selected) {
  const cats = [...new Set(['Music', 'Gaming', 'Comedy', 'Film', 'Education', 'Sports', 'Podcasts', 'Vlogs', 'Tutorials', ...Object.values(state.videos).map((v) => v.category).filter(Boolean)])].sort();
  return `<option value="">Auto / none</option>${cats.map((c) => `<option ${c === selected ? 'selected' : ''}>${esc(c)}</option>`).join('')}<option value="__new">New category…</option>`;
}

const QUICK_CATS = [['Gaming', '🎮'], ['Music', '🎵'], ['Vlogs', '🎥'], ['Tutorials', '📚'], ['Comedy', '😂'], ['Sports', '⚽'], ['Film', '🎬'], ['Podcasts', '🎙️']];
// Concentric rings and loose pencil scribbles; the scribble filter's seed steps
// a few times a second so the lines "boil" like hand-drawn animation.
function monoArt() {
  const boil = reduceMotion ? '' : '<animate attributeName="seed" values="1;4;7;10" dur=".6s" repeatCount="indefinite" calcMode="discrete"/>';
  const scribbles = [[118, 112, -8], [124, 118, 14], [100, 104, 4], [132, 126, -20], [90, 86, 30]]
    .map(([rx, ry, rot]) => `<ellipse cx="150" cy="150" rx="${rx}" ry="${ry}" transform="rotate(${rot} 150 150)"/>`).join('');
  return `<svg class="mono-art" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs>
      <radialGradient id="monoCore" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#2a2a2e"/><stop offset="1" stop-color="#0c0c0e"/></radialGradient>
      <filter id="boil" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="1">${boil}</feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
    <circle class="ring" cx="150" cy="150" r="128"/>
    <circle class="ring bold" cx="150" cy="150" r="108"/>
    <circle class="core" cx="150" cy="150" r="84"/>
    <g class="arcs"><path d="M150 54a96 96 0 0 1 83 48"/><path d="M66 198a96 96 0 0 1-8-30"/></g>
    <g class="arcs rev"><path d="M196 214a74 74 0 0 1-60 9"/><path d="M90 104a74 74 0 0 1 36-24"/></g>
    <g class="scribble" filter="url(#boil)">${scribbles}</g>
  </svg>`;
}
function addSheet(prefill = '') {
  let staged = [];
  openSheet(`<div class="mono-add">
    <h3 class="mono-title">Add videos</h3>
    <label class="mono-drop" for="add-files" aria-label="Upload videos from your phone">
      ${monoArt()}
      <span class="mono-arrow">${icon('upload')}</span>
      <span class="tap-hint">Tap to pick videos from your phone</span>
      <span class="staged" id="add-staged"></span>
      <input type="file" id="add-files" accept="video/*" multiple hidden>
    </label>
    <div class="upload-progress hidden" id="add-progress"><div class="bar"><div id="add-progress-bar"></div></div><div class="sub" id="add-progress-text"></div></div>
    <label class="mono-label" for="add-cat">Category</label>
    <div class="mono-select"><span class="hash" aria-hidden="true">#</span><select id="add-cat">${categoryOptions('')}</select><span class="star" aria-hidden="true">★</span></div>
    <input class="mono-input hidden" id="add-newcat" type="text" placeholder="Category name">
    <div class="mono-chips">${QUICK_CATS.map(([c, e]) => `<button class="mono-chip" data-cat="${c}">${c} ${e}</button>`).join('')}</div>
    <div class="mono-actions"><button class="mono-cancel" data-x="cancel">Cancel</button><button class="mono-import" data-x="go">Import videos</button></div>
  </div>`, (s) => {
    s.classList.add('mono');
    // Links shared into the app (Android share menu) arrive as prefill and are added on Import.
    const prefillLinks = findLinks(prefill);
    if (prefillLinks.length) $('#add-staged', s).textContent = `🔗 ${prefillLinks.length} YouTube link${prefillLinks.length === 1 ? '' : 's'} ready`;
    const sel = $('#add-cat', s);
    const cat = () => sel.value === '__new' ? $('#add-newcat', s).value.trim() : sel.value;
    const syncChips = () => s.querySelectorAll('.mono-chip').forEach((c) => c.classList.toggle('on', c.dataset.cat === sel.value));
    sel.addEventListener('change', () => { $('#add-newcat', s).classList.toggle('hidden', sel.value !== '__new'); syncChips(); });
    $('#add-files', s).addEventListener('change', (e) => {
      staged = [...e.target.files].filter(isVideoFile);
      $('#add-staged', s).textContent = staged.length ? `${staged.length} video${staged.length === 1 ? '' : 's'} ready · ${staged.map((f) => f.name).join(', ')}` : (e.target.files.length ? 'Those files are not videos' : '');
      s.querySelector('.mono-drop').classList.toggle('ready', staged.length > 0);
    });
    s.addEventListener('click', async (e) => {
      const chip = e.target.closest('.mono-chip');
      if (chip) {
        sel.value = sel.value === chip.dataset.cat ? '' : chip.dataset.cat;
        $('#add-newcat', s).classList.add('hidden');
        syncChips(); pop(chip);
        return;
      }
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (x === 'cancel') closeSheet();
      if (x !== 'go') return;
      const links = prefillLinks;
      if (!staged.length && !links.length) { toast('Pick a video first'); shake(s.querySelector('.mono-drop')); return; }
      s.querySelectorAll('button, select, input').forEach((el) => { el.disabled = true; });
      e.target.textContent = 'Importing…';
      let n = 0;
      if (staged.length) {
        $('#add-progress', s).classList.remove('hidden');
        n += await importFiles(staged, {
          category: cat(),
          onProgress: (i, total, name) => {
            $('#add-progress-bar', s).style.width = ((i - 1) / total * 100) + '%';
            $('#add-progress-text', s).textContent = `Saving ${i} of ${total}: ${name}`;
          },
        });
      }
      if (links.length) n += await addVideos(links, { category: cat() });
      closeSheet();
      toast(n ? `Imported ${n} video${n === 1 ? '' : 's'} 🎉` : 'Nothing was imported');
      if (n) burstAt(innerWidth / 2, innerHeight * 0.55, 'confetti');
      if (staged.length && n) { view.homeChip = 'Your uploads'; if (location.hash !== '#home') { location.hash = '#home'; return; } }
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

// ---------------------------------------------------------------- edit video page
let editDraft = null;
function editFields(v) {
  return { title: v.title, description: v.description || '', tags: (v.tags || []).join(' '), visibility: visOf(v), kids: !!v.kids, category: v.category || '', channel: v.channel, short: !!v.short, customThumb: v.customThumb || null };
}
function editDirty() {
  const v = state.videos[editDraft.id];
  const a = editFields(v), d = editDraft;
  return Object.keys(a).some((k) => k === 'tags' ? parseTags(d.tags).join(' ') !== parseTags(a.tags).join(' ') : String(d[k] ?? '') !== String(a[k] ?? ''));
}
function renderEdit(id) {
  const v = state.videos[id];
  if (!v) return renderHome();
  if (!editDraft || editDraft.id !== id) editDraft = { id, more: false, ...editFields(v) };
  const d = editDraft, vis = VISIBILITY[d.visibility];
  return `<header class="topbar"><button class="icon-btn" data-action="edit-cancel" aria-label="Back">${icon('back')}</button>
      <div class="page-title">Edit video</div><button class="save-pill" data-action="edit-save" ${editDirty() ? '' : 'disabled'}>Save</button></header>
    <div class="edit-thumb ${d.short ? 'tall' : ''}"><img src="${d.customThumb || baseThumb(v)}" alt="Thumbnail">
      <label class="thumb-change" aria-label="Change thumbnail">${icon('imgplus')}<input type="file" accept="image/*" hidden data-edit-thumb></label>
      ${d.customThumb ? '<button class="thumb-reset" data-action="edit-thumb-reset">Use original</button>' : ''}</div>
    <label class="edit-field"><span>Title</span><input id="ed-title" data-ed="title" maxlength="100" value="${esc(d.title)}"></label>
    <label class="edit-field"><span>Description</span><textarea id="ed-desc" data-ed="description" maxlength="5000" placeholder="Tell viewers about your video">${esc(d.description)}</textarea></label>
    <label class="edit-field"><span>Hashtags</span><input id="ed-tags" data-ed="tags" placeholder="#funny #skate #2026" value="${esc(d.tags)}" autocapitalize="off"></label>
    <div class="tag-chips" id="ed-tag-chips">${tagChips(d.tags)}</div>
    <button class="edit-row" data-action="edit-visibility">${icon(vis[0])}<div><small>Visibility</small><b>${vis[1]}</b></div>${icon('right')}</button>
    <button class="edit-row" data-action="edit-audience">${icon('people')}<div><small>Audience</small><b>${d.kids ? "Yes, it's made for kids" : "No, it's not made for kids"}</b></div>${icon('right')}</button>
    ${d.more ? `
      <label class="edit-field"><span>Category</span><select id="ed-cat" data-ed="category">${categoryOptions(d.category)}</select></label>
      <label class="edit-field hidden" id="ed-newcat-wrap"><span>New category</span><input id="ed-newcat" data-ed="newcat" placeholder="Category name"></label>
      <label class="edit-field"><span>Channel</span><input id="ed-ch" data-ed="channel" value="${esc(d.channel)}"></label>
      <label class="edit-row toggle">${icon('shorts')}<div><small>Format</small><b>Show as a Short</b></div><input type="checkbox" data-ed="short" ${d.short ? 'checked' : ''}></label>
      <button class="edit-row danger" data-action="edit-delete">${icon('trash')}<div><b>${v.local ? 'Delete from phone' : 'Remove from library'}</b></div></button>` :
      `<button class="show-more" data-action="edit-more">Show more ${icon('down')}</button>`}`;
}
const tagChips = (text) => parseTags(text).map((t) => `<span class="tag-chip">#${esc(t)}</span>`).join('');
function updateEditBar() {
  const b = $('[data-action="edit-save"]');
  if (b) b.disabled = !editDirty();
}
function leaveEdit() {
  editDraft = null;
  if (history.length > 1) history.back(); else location.hash = '#you';
}
function saveEdit() {
  const d = editDraft, v = state.videos[d.id];
  Object.assign(v, {
    title: d.title.trim() || v.title, description: d.description.trim(), tags: parseTags(d.tags),
    visibility: d.visibility, kids: d.kids, category: d.category, channel: d.channel.trim() || v.channel,
    short: d.short, customThumb: d.customThumb || undefined,
  });
  save(true);
  if (current === d.id) renderPlayerBody();
  toast('Video updated');
  leaveEdit();
}
// Crops an image to the video's shape and keeps it small enough to store.
function makeThumb(file, tall) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const W = tall ? 360 : 640, H = tall ? 640 : 360;
      const scale = Math.max(W / img.width, H / img.height);
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      c.getContext('2d').drawImage(img, (W - img.width * scale) / 2, (H - img.height * scale) / 2, img.width * scale, img.height * scale);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
function choiceSheet(title, options, selected, onPick) {
  openSheet(`<h3>${esc(title)}</h3>${options.map(([value, ic, label, desc]) => `
    <button class="opt choice ${value === selected ? 'on' : ''}" data-v="${value}">${icon(ic)}<div><b>${esc(label)}</b><div class="sub">${esc(desc)}</div></div><span class="radio"></span></button>`).join('')}`, (s) => {
    s.addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]');
      if (!b) return;
      closeSheet();
      onPick(b.dataset.v);
    });
  });
}
document.addEventListener('input', (e) => {
  const key = e.target.dataset?.ed;
  if (!key || !editDraft) return;
  if (key === 'short') editDraft.short = e.target.checked;
  else if (key === 'category') {
    $('#ed-newcat-wrap')?.classList.toggle('hidden', e.target.value !== '__new');
    editDraft.category = e.target.value === '__new' ? ($('#ed-newcat')?.value.trim() || '') : e.target.value;
  } else if (key === 'newcat') editDraft.category = e.target.value.trim();
  else editDraft[key] = e.target.value;
  if (key === 'tags') $('#ed-tag-chips').innerHTML = tagChips(editDraft.tags);
  if (key === 'short') { rerender(); return; }
  updateEditBar();
});
document.addEventListener('change', async (e) => {
  if (!e.target.matches('[data-edit-thumb]') || !editDraft) return;
  const f = e.target.files[0];
  if (!f) return;
  try {
    editDraft.customThumb = await makeThumb(f, editDraft.short);
    rerender();
  } catch { toast('That image could not be opened'); }
});

// YouTube-style comments: Top/Newest, likes, replies in threads, Read more.
// They're your own notes, so they're private and stored on this phone.
const cview = { sort: 'top', replyTo: null, open: new Set(), more: new Set(), menu: null };
const cScore = (c) => (c.liked ? 2 : 0) - (c.disliked ? 1 : 0) + (c.replies?.length || 0);
function findComment(id, cid) {
  for (const c of state.comments[id] || []) {
    if (c.id === cid) return { c, list: state.comments[id] };
    const r = (c.replies || []).find((x) => x.id === cid);
    if (r) return { c: r, list: c.replies, parent: c };
  }
  return null;
}
function commentItem(c, reply) {
  const p = state.profile;
  const long = c.text.length > 180 || c.text.split('\n').length > 4;
  const expanded = cview.more.has(c.id);
  const n = c.replies?.length || 0, open = cview.open.has(c.id);
  return `<div class="cm ${reply ? 'reply' : ''} ${!reply && n && !open ? 'has-replies' : ''}">
    ${profileAvatar(reply ? 28 : 36)}
    <div class="cm-main">
      <div class="cm-meta">${myName(p.handle)} <span>• ${ago(c.at)}</span></div>
      <div class="cm-text ${long && !expanded ? 'clamp' : ''}" data-cid="${c.id}">${linkTimes(c.text, cview.vid)}</div>
      ${cview.preview?.cid === c.id ? previewHtml(cview.vid, cview.preview.sec) : ''}
      ${long ? `<button class="cm-more" data-cmore="${c.id}">${expanded ? 'Show less' : 'Read more'}</button>` : ''}
      <div class="cm-actions">
        <button class="${c.liked ? 'on' : ''}" data-clike="${c.id}" aria-label="Like">${icon('like')}<span>${c.liked ? 1 : ''}</span></button>
        <button class="${c.disliked ? 'on' : ''}" data-cdis="${c.id}" aria-label="Dislike">${icon('dislike')}</button>
        <button data-creply="${c.id}" aria-label="Reply">${icon('comment')}</button>
      </div>
      ${!reply && n ? `<button class="cm-replies" data-copen="${c.id}">${n} repl${n === 1 ? 'y' : 'ies'} ${icon(open ? 'down' : 'right')}</button>
        ${open ? `<div class="cm-thread">${c.replies.map((r) => commentItem(r, true)).join('')}</div>` : ''}` : ''}
    </div>
    ${cview.menu === c.id ? `<button class="cm-del" data-cdel="${c.id}">Delete</button>` : `<button class="more" data-cmenu="${c.id}" aria-label="Comment options">${icon('moreV')}</button>`}
  </div>`;
}
function commentsSheet(id, tab) {
  const isYt = !state.videos[id]?.local;
  cview.replyTo = null; cview.menu = null; cview.preview = null; cview.vid = id;
  cview.tab = tab || cview.tab && cview.tabFor === id && cview.tab || (isYt ? 'youtube' : 'yours');
  cview.tabFor = id;
  if (!isYt) cview.tab = 'yours';
  if (isYt) loadComments(id);
  openSheet(`<div class="cm-sheet">
    <div class="cm-head"><h3>Comments <span class="cm-count"></span></h3><button class="icon-btn" data-x="close" aria-label="Close">${icon('close')}</button></div>
    ${isYt ? `<div class="cm-tabs" role="tablist">${[['youtube', 'YouTube'], ['highlights', '✨ Highlights'], ['yours', 'Yours']].map(([k, l]) => `<button role="tab" data-tab="${k}">${l}</button>`).join('')}</div>` : ''}
    <div class="cm-chips"><button class="chip" data-sort="top">Top</button><button class="chip" data-sort="newest">Newest</button><button class="cm-filter" data-showhidden></button></div>
    <div class="cm-note"></div>
    <div class="cm-list"></div>
    <div class="cm-bar">
      <div class="cm-replying hidden"><span></span><button data-x="cancel-reply" aria-label="Cancel reply">${icon('close')}</button></div>
      <div class="cm-input">${profileAvatar(32)}<input type="text" id="cm-text" placeholder="Comment..." maxlength="2000" enterkeyhint="send" autocomplete="off">
        <button class="cm-send" data-x="post" aria-label="Post">${icon('send')}</button></div>
    </div></div>`, (s) => {
    s.classList.add('tall');
    const inp = $('#cm-text', s), listEl = $('.cm-list', s);
    const drawRemote = () => {
      const rc = commentCache.get(id) || {};
      const tabIs = (t) => cview.tab === t;
      s.querySelector('.cm-bar').classList.add('hidden');
      s.querySelector('.cm-chips').classList.toggle('hidden', tabIs('highlights'));
      if (rc.loading) {
        listEl.innerHTML = Array.from({ length: 4 }, () => '<div class="cm skel"><span class="avatar av-36"></span><div class="cm-main"><div class="skel-line short"></div><div class="skel-line"></div></div></div>').join('');
        $('.cm-note', s).textContent = 'Loading comments from YouTube…';
        return;
      }
      if (rc.error || rc.disabled) {
        $('.cm-note', s).textContent = rc.disabled ? 'Comments are turned off for this video on YouTube.' : 'Couldn’t load YouTube comments right now.';
        listEl.innerHTML = rc.disabled ? '' : `<div class="empty">${icon('comment')}<div>Check your connection and try again.</div><button class="btn" data-x="retry">Try again</button></div>`;
        return;
      }
      const all = rc.list || [];
      const hiddenCount = all.filter((c) => c.hidden).length;
      $('.cm-count', s).textContent = all.length ? fmtCount(all.length) : '';
      if (tabIs('highlights')) {
        const moments = Remote.bestMoments(all, state.progress[id]?.d);
        $('.cm-note', s).textContent = 'The moments viewers mention most in the comments. Tap one to jump there.';
        listEl.innerHTML = moments.map((m) => `<button class="moment" data-jump="${m.sec}">${frameHtml(id, m.sec, 132)}
          <span class="moment-text"><b>${fmtTime(m.sec)}</b><span class="sub">${m.count} viewer${m.count === 1 ? ' mentions' : 's mention'} this</span><span class="moment-sample">“${esc(m.sample.text.slice(0, 140))}”</span></span></button>`).join('')
          || `<div class="empty">${icon('sparkle')}<div>No highlights yet.<br>They show up when viewers mention times like 4:12.</div></div>`;
        return;
      }
      const f = $('[data-showhidden]', s);
      f.classList.remove('hidden');
      f.classList.toggle('on', !cview.showHidden);
      f.innerHTML = `${icon('shield')} ${cview.showHidden ? 'Filter off' : hiddenCount ? `${hiddenCount} hidden` : 'Filter on'}`;
      $('.cm-note', s).textContent = cview.showHidden ? 'Showing everything, including comments the filter flagged as spam, bots, self-promo or toxic.' : 'Smart filter hides bot copies, scams, self-promo and toxic comments, and puts real discussion first.';
      const shown = all.filter((c) => cview.showHidden || !c.hidden)
        .sort(cview.sort === 'top' ? (a, b) => b.score - a.score : (a, b) => agoSeconds(a.ago) - agoSeconds(b.ago));
      listEl.innerHTML = shown.map((c) => remoteCommentItem(c, id)).join('') || `<div class="empty">${icon('comment')}<div>No comments yet.</div></div>`;
    };
    const draw = () => {
      s.querySelectorAll('[data-tab]').forEach((b) => b.classList.toggle('active', b.dataset.tab === cview.tab));
      s.querySelectorAll('[data-sort]').forEach((b) => b.classList.toggle('active', b.dataset.sort === cview.sort));
      if (cview.tab !== 'yours') { drawRemote(); return; }
      s.querySelector('.cm-bar').classList.remove('hidden');
      s.querySelector('.cm-chips').classList.remove('hidden');
      $('[data-showhidden]', s).classList.add('hidden');
      $('.cm-note', s).textContent = 'Your comments are private and saved only on this phone.';
      const list = state.comments[id] || [];
      const total = list.reduce((n, c) => n + 1 + (c.replies?.length || 0), 0);
      $('.cm-count', s).textContent = total || '';
      const sorted = [...list].sort(cview.sort === 'top' ? (x, y) => cScore(y) - cScore(x) || y.at - x.at : (x, y) => y.at - x.at);
      listEl.innerHTML = sorted.map((c) => commentItem(c, false)).join('') ||
        `<div class="empty">${icon('comment')}<div>No comments yet.<br>Start the conversation.</div></div>`;
      const rep = cview.replyTo && findComment(id, cview.replyTo);
      $('.cm-replying', s).classList.toggle('hidden', !rep);
      if (rep) $('.cm-replying span', s).innerHTML = `Replying to ${myName(state.profile.handle)}`;
      inp.placeholder = rep ? 'Add a reply...' : 'Comment...';
      afterCommentChange(id);
    };
    const post = () => {
      const text = inp.value.trim();
      if (!text) return;
      const c = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), text, at: Date.now() };
      const rep = cview.replyTo && findComment(id, cview.replyTo);
      if (rep) {
        const top = rep.parent || rep.c;
        (top.replies ||= []).push(c);
        cview.open.add(top.id);
      } else (state.comments[id] ||= []).unshift({ ...c, replies: [] });
      cview.replyTo = null;
      inp.value = '';
      save(); draw();
      if (!rep) listEl.scrollTop = 0;
      burst($('.cm-send', s), 'stars');
      buzz(10);
    };
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') post(); });
    if (isYt) loadComments(id).then(() => { if (s.isConnected) draw(); });
    s.addEventListener('click', (e) => {
      const t = e.target.closest('button, [data-ts]');
      if (!t) return;
      const d = t.dataset;
      if (d.x === 'close') return closeSheet();
      if (d.jump) return jumpTo(id, +d.jump);
      if (d.ts) {
        const cid = t.closest('.cm-text')?.dataset.cid;
        cview.preview = cview.preview?.cid === cid && cview.preview.sec === +d.ts ? null : { cid, sec: +d.ts };
        loadDetails(id).then(() => { if (s.isConnected) draw(); });
        draw();
        return;
      }
      if (d.tab) { cview.tab = d.tab; cview.preview = null; if (d.tab === 'highlights') loadDetails(id).then(() => { if (s.isConnected) draw(); }); draw(); listEl.scrollTop = 0; return; }
      if (d.showhidden !== undefined) { cview.showHidden = !cview.showHidden; draw(); return; }
      if (d.x === 'retry') { commentCache.delete(id); loadComments(id).then(() => { if (s.isConnected) draw(); }); draw(); return; }
      if (d.x === 'post') return post();
      if (d.x === 'cancel-reply') cview.replyTo = null;
      if (d.sort) cview.sort = d.sort;
      if (d.cmore) cview.more.has(d.cmore) ? cview.more.delete(d.cmore) : cview.more.add(d.cmore);
      if (d.copen) cview.open.has(d.copen) ? cview.open.delete(d.copen) : cview.open.add(d.copen);
      if (d.creply) { cview.replyTo = d.creply; setTimeout(() => inp.focus(), 0); }
      if (d.clike || d.cdis) {
        const f = findComment(id, d.clike || d.cdis);
        if (d.clike) { f.c.liked = !f.c.liked; if (f.c.liked) f.c.disliked = false; } else { f.c.disliked = !f.c.disliked; if (f.c.disliked) f.c.liked = false; }
        save();
      }
      cview.menu = d.cmenu ? (cview.menu === d.cmenu ? null : d.cmenu) : null;
      if (d.cdel) {
        const f = findComment(id, d.cdel);
        f.list.splice(f.list.indexOf(f.c), 1);
        save(); toast('Comment deleted');
      }
      draw();
      if (d.clike || d.cdis) {
        const el = s.querySelector(`[data-${d.clike ? 'clike' : 'cdis'}="${d.clike || d.cdis}"]`);
        pop(el);
        if (d.clike && findComment(id, d.clike)?.c.liked) burst(el, state.settings.likeFx || 'pop');
      }
    });
    draw();
  });
}
function afterCommentChange(id) {
  const total = (state.comments[id] || []).reduce((n, c) => n + 1 + (c.replies?.length || 0), 0) + (commentCache.get(id)?.list?.length || 0);
  if (current === id) {
    const card = $('#player-body .comments-card');
    if (card) card.outerHTML = commentsCard(id);
  }
  document.querySelectorAll(`.short[data-short="${id}"] [data-action="comments"] span`).forEach((el) => { el.textContent = total || 'Comment'; });
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
      if (x === 'done') { closeSheet(); refreshAfterAction(); }
      if (x === 'create') {
        const name = $('#pl-new', s).value.trim();
        if (!name) return;
        state.playlists.push({ id: 'p' + Date.now().toString(36), name, items: [id] });
        save(); closeSheet(); toast(`Saved to ${name}`); refreshAfterAction();
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

// ---------------------------------------------------------------- playlist tools
function listArr(key) {
  if (key === 'liked') return state.liked;
  if (key === 'later') return state.later;
  return state.playlists.find((p) => 'pl:' + p.id === key)?.items || [];
}
function setListArr(key, arr) {
  if (key === 'liked') state.liked = arr;
  else if (key === 'later') state.later = arr;
  else { const pl = state.playlists.find((p) => 'pl:' + p.id === key); if (pl) pl.items = arr; }
  save();
}
function removeDuplicates(key) {
  const ids = new Set(), names = new Set();
  const before = listArr(key);
  const after = before.filter((id) => {
    const v = state.videos[id];
    const name = v ? (v.title + '|' + v.channel).toLowerCase().replace(/\s+/g, ' ') : id;
    if (ids.has(id) || names.has(name)) return false;
    ids.add(id); names.add(name);
    return true;
  });
  setListArr(key, after);
  toast(before.length - after.length ? `Removed ${before.length - after.length} duplicate${before.length - after.length === 1 ? '' : 's'}` : 'No duplicates found');
  rerender();
}
async function isUnavailable(id) {
  const v = state.videos[id];
  if (!v) return true;
  if (v.local) return !(await getFile(id).catch(() => null));
  try {
    const r = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent('https://www.youtube.com/watch?v=' + id)}`);
    return [401, 403, 404].includes(r.status);
  } catch { return false; } // offline: keep it
}
async function removeUnavailable(key) {
  const ids = [...listArr(key)];
  const dead = new Set();
  let done = 0;
  const worker = async () => {
    while (ids.length) {
      const id = ids.shift();
      if (await isUnavailable(id)) dead.add(id);
      toast(`Checking videos… ${++done}`);
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  setListArr(key, listArr(key).filter((id) => !dead.has(id)));
  toast(dead.size ? `Removed ${dead.size} private or deleted video${dead.size === 1 ? '' : 's'}` : 'Every video is still available');
  rerender();
}
function listToolsSheet(key) {
  const plId = key.startsWith('pl:') ? key.slice(3) : null;
  openSheet(`<h3>List tools</h3>
    <button class="opt" data-x="dupes">${icon('list')} Remove duplicates</button>
    <button class="opt" data-x="dead">${icon('shield')} Remove private or deleted videos</button>
    <button class="opt" data-x="select">${icon('check')} Select videos to remove</button>
    ${plId ? `<button class="opt" data-x="edit">${icon('edit')} Rename or delete playlist</button>` : ''}`, (s) => {
    s.addEventListener('click', (e) => {
      const x = e.target.closest('[data-x]')?.dataset.x;
      if (!x) return;
      closeSheet();
      if (x === 'dupes') removeDuplicates(key);
      if (x === 'dead') removeUnavailable(key);
      if (x === 'select') { view.select = { page: decodeURIComponent(location.hash.slice(1)), key, ids: new Set() }; rerender(); }
      if (x === 'edit') playlistMenu(plId);
    });
  });
}

// ---------------------------------------------------------------- sound sheet
function eqSheet() {
  const e = state.settings.eq, isLocal = engine === 'local';
  const dis = isLocal ? '' : 'disabled';
  openSheet(`<h3>Sound</h3>
    ${isLocal ? '' : '<div class="hint">The equalizer works on videos you uploaded. YouTube’s player doesn’t let other apps change its sound.</div>'}
    <div class="fx-picker warm">${Object.entries(EQ_PRESETS).map(([k, p]) => `<button class="fx-chip ${e.preset === k ? 'on' : ''}" data-eqp="${k}" ${dis}>${p[0]}</button>`).join('')}</div>
    <div class="eq-sliders">${[['bass', 'Bass'], ['voice', 'Dialogue'], ['treble', 'Treble']].map(([k, l]) => `
      <label class="eq-row"><span>${l}</span><input type="range" min="-12" max="12" step="1" value="${e[k]}" data-eq="${k}" ${dis}><b data-eqv="${k}">${e[k] > 0 ? '+' : ''}${e[k]} dB</b></label>`).join('')}</div>
    <div class="set-group"><label class="check">${icon('volume')}<span style="flex:1">Even out loud sounds</span><input class="switch" type="checkbox" data-eqnorm ${e.norm ? 'checked' : ''} ${dis}></label></div>
    <div class="hint">On iPhone, the equalizer can stop sound when the screen locks. Set it to Flat for background listening.</div>`, (s) => {
    s.classList.add('settings');
    const sync = () => {
      s.querySelectorAll('[data-eq]').forEach((r) => { r.value = e[r.dataset.eq]; });
      s.querySelectorAll('[data-eqv]').forEach((b) => { const v = e[b.dataset.eqv]; b.textContent = `${v > 0 ? '+' : ''}${v} dB`; });
      s.querySelectorAll('[data-eqp]').forEach((b) => b.classList.toggle('on', b.dataset.eqp === e.preset));
      $('[data-eqnorm]', s).checked = e.norm;
    };
    s.addEventListener('input', (ev) => {
      const k = ev.target.dataset.eq;
      if (k) { e[k] = +ev.target.value; e.preset = 'custom'; }
      if (ev.target.hasAttribute('data-eqnorm')) e.norm = ev.target.checked;
      sync(); applyEq(); save();
    });
    s.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-eqp]');
      if (!b) return;
      const [, bass, voice, treble, norm] = EQ_PRESETS[b.dataset.eqp];
      Object.assign(e, { preset: b.dataset.eqp, bass, voice, treble, norm });
      sync(); applyEq(); save(); pop(b);
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
      if (x === 'delete') confirmSheet(`Delete “${pl.name}”?`, 'Delete', () => {
        state.playlists = state.playlists.filter((p) => p !== pl); save(); location.hash = '#you';
      });
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

// ---------------------------------------------------------------- edit profile page
document.addEventListener('click', (e) => {
  const b = profDraft && e.target.closest('#main [data-k][data-v]');
  if (!b) return;
  profDraft[b.dataset.k] = b.dataset.v;
  // Preview the accent across the app right away; Cancel puts it back.
  if (b.dataset.k === 'accent') document.documentElement.style.setProperty('--accent', b.dataset.v);
  rerender();
});
let profDraft = null;
const PROFILE_KEYS = ['name', 'handle', 'pronouns', 'photo', 'banner', 'color', 'font', 'nameFx', 'frame'];
function renderProfileEdit() {
  const p = state.profile;
  if (!profDraft) {
    profDraft = Object.fromEntries(PROFILE_KEYS.map((k) => [k, p[k] ?? '']));
    profDraft.accent = state.settings.accent || '#ff0033';
    profDraft.font ||= ''; profDraft.nameFx ||= 'plain'; profDraft.frame ||= 'none';
  }
  const d = profDraft;
  const tiles = (key, options, render, cls = '') => `<div class="style-picker">${Object.entries(options).map(([k, label]) =>
    `<button class="style-opt ${cls}${cls ? k : ''} ${d[key] === k ? 'on' : ''}" data-k="${key}" data-v="${k}">${render(k, label)}</button>`).join('')}</div>`;
  const stars = Array.from({ length: 40 }, (_, i) =>
    `<i style="left:${(i * 61) % 100}%;top:${(i * 29) % 100}%;animation-delay:${(i % 7) * 0.6}s;${i % 5 ? '' : 'width:3px;height:3px'}"></i>`).join('');
  return `<div class="cozy-night">
    <div class="night-stars" aria-hidden="true">${stars}</div>
    <header class="night-head"><button class="icon-btn" data-action="profile-cancel" aria-label="Back">${icon('back')}</button><h1>Edit Profile</h1></header>
    <div class="banner-card" style="${d.banner ? `background-image:url('${d.banner}')` : ''}">
      ${d.banner ? '' : '<div class="banner-art" aria-hidden="true"><span class="b-moon">🌙</span><span class="b-window"></span><span class="b-plant">🪴</span><span class="b-laptop">💻</span><span class="b-cup">☕</span></div>'}
      <label class="banner-avatar" aria-label="Change avatar">${profileAvatar(88, d)}<span class="cam">📷</span><input type="file" accept="image/*" hidden data-pf-photo></label>
      <div class="banner-btns">
        <label class="night-btn">Change Avatar<input type="file" accept="image/*" hidden data-pf-photo></label>
        <label class="night-btn">${d.banner ? 'Change Banner' : 'Add Banner'} 🖼️<input type="file" accept="image/*" hidden data-pf-banner></label>
        ${d.photo || d.banner ? '<button class="night-btn small" data-action="profile-clear-images">Remove pictures</button>' : ''}
      </div>
    </div>
    <div class="night-preview">${styledName(d.name || 'Your name', d)} <span>${esc(d.handle || '@you')}${d.pronouns ? ` · ${esc(d.pronouns)}` : ''}</span></div>
    <label class="night-label" for="pf-name">Display name <span>✦</span></label>
    <div class="night-input"><input id="pf-name" data-pf="name" value="${esc(d.name)}" maxlength="40">${icon('edit')}</div>
    <label class="night-label" for="pf-handle">Handle</label>
    <div class="night-input"><input id="pf-handle" data-pf="handle" value="${esc(d.handle)}" maxlength="30" autocapitalize="off">${icon('edit')}</div>
    <label class="night-label" for="pf-pronouns">Pronouns</label>
    <div class="night-input"><input id="pf-pronouns" data-pf="pronouns" value="${esc(d.pronouns)}" maxlength="30" placeholder="e.g. he/they">${icon('edit')}</div>
    <div class="night-label">Avatar decorations <span>✦</span></div>
    ${tiles('frame', FRAMES, (k, label) => `${profileAvatar(44, { ...d, frame: k })}<span>${label}</span>`)}
    <div class="night-label">Display name style</div>
    ${tiles('font', Object.fromEntries(Object.entries(FONTS).map(([k, v]) => [k, v[0]])), (k, label) =>
      `<span class="font-${k || 'default'}" style="font-family:${FONTS[k][1]};font-size:22px">Aa</span><span style="font-family:${FONTS[k][1]}" class="font-${k || 'default'}">${label}</span>`)}
    <div class="night-label">Profile effects</div>
    ${tiles('nameFx', NAME_FX, (k, label) => `<span class="uname fx-${k}" style="font-weight:700;font-size:22px">Aa</span><span>${label}</span>`, 'fxtile-')}
    <div class="night-label">Theme colors</div>
    <div class="color-row"><span class="color-tag">Primary</span>${PRIMARY_COLORS.map((c) =>
      `<button class="swatch ${c === 'rainbow' ? 'wide' : ''} ${d.color === c ? 'on' : ''}" style="background:${colorCss(c)}" data-k="color" data-v="${c}" aria-label="Primary ${c}"></button>`).join('')}</div>
    <div class="color-row"><span class="color-tag">Accent</span>${ACCENT_COLORS.map((c) =>
      `<button class="swatch ${d.accent === c ? 'on' : ''}" style="background:${c}" data-k="accent" data-v="${c}" aria-label="Accent ${c}"></button>`).join('')}</div>
    <div class="night-hint">Accent recolors buttons, progress bars and highlights across MyTube.</div>
    <div class="night-bar"><button class="night-cancel" data-action="profile-cancel">Cancel</button><button class="night-save" data-action="profile-save">Save Changes</button></div>
  </div>`;
}
function refreshProfilePreview() {
  const d = profDraft, pv = $('.night-preview');
  if (pv) pv.innerHTML = `${styledName(d.name || 'Your name', d)} <span>${esc(d.handle || '@you')}${d.pronouns ? ` · ${esc(d.pronouns)}` : ''}</span>`;
}
function leaveProfile() {
  profDraft = null;
  applyTheme();
  if (history.length > 1) history.back(); else location.hash = '#you';
}
function saveProfile() {
  const d = profDraft, p = state.profile;
  let handle = d.handle.trim();
  if (handle && !handle.startsWith('@')) handle = '@' + handle;
  const name = d.name.trim() || 'You';
  // Your uploads follow your channel name.
  if (name !== p.name) Object.values(state.videos).forEach((v) => { if (v.local && v.channel === p.name) v.channel = name; });
  Object.assign(p, { name, handle: handle || '@me', pronouns: d.pronouns.trim(), photo: d.photo || null, banner: d.banner || null, color: d.color, font: d.font, nameFx: d.nameFx, frame: d.frame });
  state.settings.accent = d.accent;
  save(true);
  toast('Profile saved ✨');
  burstAt(innerWidth / 2, innerHeight * 0.4, 'stars');
  leaveProfile();
}
function cropImage(file, w, h, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(w / img.width, h / img.height);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, (w - img.width * scale) / 2, (h - img.height * scale) / 2, img.width * scale, img.height * scale);
      URL.revokeObjectURL(img.src);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
document.addEventListener('input', (e) => {
  const key = e.target.dataset?.pf;
  if (!key || !profDraft) return;
  profDraft[key] = e.target.value;
  refreshProfilePreview();
});
document.addEventListener('change', async (e) => {
  if (!profDraft) return;
  const isPhoto = e.target.matches('[data-pf-photo]'), isBanner = e.target.matches('[data-pf-banner]');
  if (!isPhoto && !isBanner) return;
  const f = e.target.files[0];
  if (!f) return;
  try {
    if (isPhoto) profDraft.photo = await cropImage(f, 256, 256, 0.85);
    else profDraft.banner = await cropImage(f, 900, 340, 0.72);
    rerender();
  } catch { toast('That image could not be opened'); }
});

function settingsSheet() {
  const st = state.settings;
  openSheet(`<h3>Settings</h3>
    <div class="set-group">
      <label class="check">${icon('moon')}<span style="flex:1">Dark theme</span><input class="switch" type="checkbox" id="st-dark" ${st.theme === 'dark' ? 'checked' : ''}></label>
      <label class="check">${icon('playline')}<span style="flex:1">Autoplay next video</span><input class="switch" type="checkbox" id="st-auto" ${st.autoplay ? 'checked' : ''}></label>
      <label class="check">${icon('zap')}<span style="flex:1">Comic style</span><input class="switch" type="checkbox" id="st-comic" ${st.comic ? 'checked' : ''}></label>
    </div>
    <div class="set-label">Like effect <span>tap to preview</span></div>
    <div class="fx-picker warm">${Object.entries(LIKE_FX).map(([k, l]) => `<button class="fx-chip ${(st.likeFx || 'pop') === k ? 'on' : ''}" data-likefx="${k}">${FX_ICON[k]} ${l}</button>`).join('')}</div>
    <div class="set-label">Subscribe effect</div>
    <div class="fx-picker cool">${Object.entries(SUB_FX).map(([k, l]) => `<button class="fx-chip ${(st.subFx || 'confetti') === k ? 'on' : ''}" data-subfx="${k}">${FX_ICON[k]} ${l}</button>`).join('')}</div>
    <div class="set-label">Playback</div>
    <div class="set-group">
      <label class="check">${icon('volume')}<span style="flex:1">Background play<small>Keeps your uploads playing when you lock the phone</small></span><input class="switch" type="checkbox" id="st-bg" ${st.bgPlay ? 'checked' : ''}></label>
      <label class="check">${icon('skip')}<span style="flex:1">Skip sponsors<small>Community-marked segments from SponsorBlock</small></span><input class="switch" type="checkbox" id="st-sb" ${st.sponsor.on ? 'checked' : ''}></label>
    </div>
    <div class="fx-picker cool">${Object.entries(SB_CATS).map(([k, l]) => `<button class="fx-chip ${st.sponsor.cats.includes(k) ? 'on' : ''}" data-sbcat="${k}">${l}</button>`).join('')}</div>
    <div class="set-label">YouTube API key <span>optional</span></div>
    <div class="api-row"><input type="text" id="st-key" placeholder="Paste a key for steadier search" value="${esc(st.apiKey)}" autocomplete="off" autocapitalize="off" spellcheck="false"><button class="fx-chip" data-x="savekey">Save</button></div>
    <div class="hint">Search, comments and recommendations come from public YouTube mirrors, which are sometimes busy. A free YouTube Data API v3 key from Google Cloud makes search and comments steadier.</div>
    <div class="set-group inset">
    <button class="opt" data-x="export">${icon('download')} Back up my library</button>
    <label class="opt" style="cursor:pointer">${icon('upload')} Restore from backup<input type="file" id="st-import" accept="application/json,.json" hidden></label>
    <button class="opt" data-x="clear">${icon('history')} Clear watch history</button>
    <button class="opt danger" data-x="reset">${icon('trash')} Reset everything</button>
    </div>
    <div class="hint">Your library is stored only on this device. The backup holds your library, playlists and profile, but not uploaded video files.</div>`, (s) => {
    s.classList.add('settings');
    $('#st-dark', s).addEventListener('change', (e) => { st.theme = e.target.checked ? 'dark' : 'light'; applyTheme(); save(); });
    $('#st-auto', s).addEventListener('change', (e) => { st.autoplay = e.target.checked; save(); if (current) renderPlayerBody(); });
    $('#st-comic', s).addEventListener('change', (e) => { st.comic = e.target.checked; save(); applyTheme(); rerender(); });
    $('#st-bg', s).addEventListener('change', (e) => { st.bgPlay = e.target.checked; save(); });
    $('#st-sb', s).addEventListener('change', (e) => { st.sponsor.on = e.target.checked; save(); if (current) loadSegments(current); });
    s.addEventListener('click', (e) => {
      const cat = e.target.closest('[data-sbcat]');
      if (cat) {
        const k = cat.dataset.sbcat, cats = st.sponsor.cats;
        st.sponsor.cats = cats.includes(k) ? cats.filter((x) => x !== k) : [...cats, k];
        cat.classList.toggle('on', st.sponsor.cats.includes(k));
        pop(cat); save();
        if (current) loadSegments(current);
        return;
      }
      if (e.target.closest('[data-x="savekey"]')) {
        st.apiKey = $('#st-key', s).value.trim();
        Remote.setKey(st.apiKey);
        searchCache.clear(); commentCache.clear();
        save();
        toast(st.apiKey ? 'API key saved — search uses it now' : 'API key removed');
      }
    });
    s.addEventListener('click', (e) => {
      const b = e.target.closest('[data-likefx],[data-subfx]');
      if (!b) return;
      const key = b.dataset.likefx ? 'likeFx' : 'subFx';
      st[key] = b.dataset.likefx || b.dataset.subfx;
      save();
      b.parentElement.querySelectorAll('.on').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      burst(b, st[key]);
      pop(b);
    });
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
      if (x === 'clear') confirmSheet('Clear your watch history?', 'Clear', () => { state.history = []; state.progress = {}; save(); rerender(); });
      if (x === 'reset') confirmSheet('Delete your whole library, uploads, playlists and profile?', 'Delete everything', async () => {
        await Promise.all(Object.values(state.videos).filter((v) => v.local).map((v) => delFile(v.id).catch(() => {})));
        state = defaultState(); save(true); applyTheme(); location.hash = '#home'; rerender();
      });
    });
  });
}

// ---------------------------------------------------------------- actions
function subscribeTo(name, url = '', onlyAdd = false) {
  if (isSub(name)) { if (!onlyAdd) { state.subs = state.subs.filter((s) => s.name !== name); toast(`Unsubscribed from ${name}`); } }
  else { state.subs.push({ name, url }); if (!onlyAdd) toast(`Subscribed to ${name}`); }
  save();
}
function toggleLike(id) {
  const on = toggleIn(state.liked, id);
  if (on) state.disliked = state.disliked.filter((x) => x !== id);
  save(); toast(on ? 'Added to Liked videos' : 'Removed from Liked videos');
}
function toggleDislike(id) {
  const on = toggleIn(state.disliked, id);
  if (on) state.liked = state.liked.filter((x) => x !== id);
  save(); if (on) toast('You disliked this video');
}
function toggleLater(id, quiet) { const on = toggleIn(state.later, id); save(); if (!quiet) toast(on ? 'Saved to Watch later' : 'Removed from Watch later'); }
async function share(id) {
  const v = state.videos[id];
  try {
    if (v.local) {
      const blob = await getFile(id);
      const file = blob && new File([blob], blob.name || `${v.title}.mp4`, { type: blob.type || 'video/mp4' });
      if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: v.title });
      else toast('This phone can’t share video files from here');
      return;
    }
    const url = ytUrl(v);
    if (navigator.share) await navigator.share({ title: v.title, url });
    else { await navigator.clipboard.writeText(url); toast('Link copied'); }
  } catch { /* share sheet dismissed */ }
}
function refreshAfterAction() {
  if (playerMode === 'full') { const y = $('#player').scrollTop; renderPlayerBody(); $('#player').scrollTop = y; }
  if (!location.hash.startsWith('#shorts')) rerender();
}
function pop(el) { replay(el, 'pop'); }
function shake(el) { replay(el, 'shake'); }
function spin(el) { replay(el, 'spin'); }
function replay(el, cls) {
  if (reduceMotion || !el) return;
  el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
}

document.addEventListener('input', (e) => {
  if (e.target.matches('[data-plsearch]')) {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('#main .lrow').forEach((r) => r.classList.toggle('hidden', !!q && !r.dataset.q.includes(q)));
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id !== 'tune') return;
  state.settings.discover = +e.target.value;
  save();
  rerender();
  if (state.settings.discover > 0) loadDiscover();
});
document.addEventListener('change', async (e) => {
  if (!e.target.matches('[data-upload]')) return;
  const files = [...e.target.files];
  if (!files.length) return;
  toast(`Saving ${files.length} video${files.length === 1 ? '' : 's'}…`);
  const n = await importFiles(files);
  toast(n ? `Uploaded ${n} video${n === 1 ? '' : 's'}` : 'Those files are not videos');
  rerender();
});

document.addEventListener('click', (e) => {
  // Taps inside sheets (or on things a sheet just redrew away) are handled by the sheet.
  if (!e.target.isConnected || e.target.closest('#sheet-root')) return;
  // Selecting rows in a list
  const selRow = view.select && e.target.closest('#main.selecting .lrow');
  if (selRow) {
    const id = selRow.dataset.id, ids = view.select.ids;
    ids.has(id) ? ids.delete(id) : ids.add(id);
    selRow.classList.toggle('sel', ids.has(id));
    $('#sel-count').textContent = `${ids.size} selected`;
    return;
  }
  // Timestamps in descriptions jump the video
  const ts = e.target.closest('[data-ts]');
  if (ts) { e.preventDefault(); jumpTo(ts.dataset.vid, +ts.dataset.ts); return; }
  const t = e.target.closest('[data-play],[data-rplay],[data-rmenu],[data-sfilter],[data-fill],[data-menu],[data-action],[data-homechip],[data-homechip-link],[data-subschip],[data-subch],[data-act-like],[data-act-dislike],[data-act-later],[data-act-share],[data-act-sub],[data-act-playlist]');
  if (!t) return;
  const d = t.dataset;

  if (d.rplay) { e.preventDefault(); playRemote(d.rplay, d.rk); return; }
  if (d.rmenu) { e.preventDefault(); e.stopPropagation(); const r = remoteById.get(d.rmenu); if (r) videoMenu(ensureVideo(r).id); return; }
  if (d.sfilter) { view.searchFilter = { q: decodeURIComponent(location.hash.slice(8)), f: d.sfilter }; rerender(); return; }
  if (d.fill !== undefined) {
    e.preventDefault();
    const inp = $('#search-input');
    if (inp) { inp.value = d.fill + ' '; inp.focus(); inp.dispatchEvent(new Event('input')); }
    return;
  }

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
  if (d.actLike || d.actDislike || d.actLater) {
    const id = d.actLike || d.actDislike || d.actLater;
    if (d.actLike) toggleLike(id); else if (d.actDislike) toggleDislike(id); else toggleLater(id);
    const kind = d.actLike ? 'like' : d.actDislike ? 'dislike' : 'later';
    const on = (kind === 'like' ? state.liked : kind === 'dislike' ? state.disliked : state.later).includes(id);
    let el = t;
    if (t.closest('.short')) t.classList.toggle('on', on);
    else { refreshAfterAction(); el = $(`#player-body [data-act-${kind}="${id}"]`) || t; }
    pop(el);
    if (on && kind === 'like') { burst(el, state.settings.likeFx || 'pop'); floatText(el, '+1'); buzz(15); }
    if (on && kind === 'dislike') shake(el);
    if (on && kind === 'later') spin(el);
    return;
  }
  if (d.actShare) { share(d.actShare); return; }
  if (d.actPlaylist) { playlistSheet(d.actPlaylist); return; }
  if (d.actSub) {
    const v = Object.values(state.videos).find((x) => x.channel === d.actSub);
    subscribeTo(d.actSub, v?.channelUrl);
    refreshAfterAction();
    if (isSub(d.actSub)) {
      const el = (playerMode === 'full' && $(`#player-body [data-act-sub="${CSS.escape(d.actSub)}"]`)) || $(`#main [data-act-sub="${CSS.escape(d.actSub)}"]`) || t;
      el.classList.add('just-subbed');
      burst(el, state.settings.subFx || 'confetti');
      buzz([12, 40, 18]);
    }
    return;
  }

  switch (d.action) {
    case 'add': addSheet(); break;
    case 'voice': voiceSearch(t); break;
    case 'search-clear': location.hash = '#search'; break;
    case 'search-history-clear': confirmSheet('Clear your search history?', 'Clear', () => { state.searches = []; save(); rerender(); }); break;
    case 'search-retry': searchCache.delete(d.q); rerender(); break;
    case 'save-lib': saveToLibrary(d.id); refreshAfterAction(); burst($('#player-body [data-action="save-lib"]') || t, 'stars'); break;
    case 'pip': togglePip(); break;
    case 'eq': eqSheet(); break;
    case 'pl-tools': listToolsSheet(d.key); break;
    case 'sel-start': view.select = { page: decodeURIComponent(location.hash.slice(1)), key: d.key, ids: new Set() }; rerender(); break;
    case 'sel-cancel': view.select = null; rerender(); break;
    case 'sel-all': listArr(view.select.key).forEach((id) => view.select.ids.add(id)); rerender(); break;
    case 'sel-remove': {
      const { key, ids } = view.select;
      if (!ids.size) { toast('Tap videos to select them'); break; }
      setListArr(key, listArr(key).filter((id) => !ids.has(id)));
      toast(`Removed ${ids.size} video${ids.size === 1 ? '' : 's'}`);
      view.select = null; rerender();
      break;
    }
    case 'edit-cancel': leaveEdit(); break;
    case 'toggle-comic':
      state.settings.comic = !state.settings.comic; save(); applyTheme(); rerender();
      toast(state.settings.comic ? 'Comic style on 💥' : 'Comic style off');
      break;
    case 'profile-cancel': leaveProfile(); break;
    case 'profile-save': saveProfile(); break;
    case 'profile-clear-images': profDraft.photo = ''; profDraft.banner = ''; rerender(); break;
    case 'edit-current': if (current) { const id = current; setPlayerMode('mini'); location.hash = '#edit/' + id; } break;
    case 'edit-save': saveEdit(); break;
    case 'edit-more': editDraft.more = true; rerender(); break;
    case 'edit-thumb-reset': editDraft.customThumb = null; rerender(); break;
    case 'edit-visibility':
      choiceSheet('Visibility', Object.entries(VISIBILITY).map(([k, [ic, label, desc]]) => [k, ic, label, desc]), editDraft.visibility,
        (val) => { editDraft.visibility = val; rerender(); });
      break;
    case 'edit-audience':
      choiceSheet('Audience', [
        ['no', 'people', "No, it's not made for kids", 'Comments stay on'],
        ['yes', 'people', "Yes, it's made for kids", 'Comments are turned off, like on YouTube'],
      ], editDraft.kids ? 'yes' : 'no', (val) => { editDraft.kids = val === 'yes'; rerender(); });
      break;
    case 'edit-delete': {
      const id = editDraft.id, v = state.videos[id];
      confirmSheet(v.local ? `Delete “${v.title}” from this phone?` : `Remove “${v.title}” from your library?`, v.local ? 'Delete' : 'Remove', () => { editDraft = null; removeVideo(id); location.hash = '#you'; });
      break;
    }
    case 'desc-toggle': if (!e.target.closest('a')) t.classList.toggle('open'); break;
    case 'shuffle': view.shuffle = !view.shuffle; rerender(); break;
    case 'manage-subs': manageSubsSheet(); break;
    case 'edit-profile': location.hash = '#profile'; break;
    case 'settings': settingsSheet(); break;
    case 'new-playlist': newPlaylistSheet(); break;
    case 'playlist-menu': playlistMenu(d.pl); break;
    case 'comments': commentsSheet(d.id); break;
    case 'back': if (history.length > 1) history.back(); else location.hash = '#home'; break;
    case 'minimize': setPlayerMode('mini'); break;
    case 'close-player': $('#mini-close').click(); break;
    case 'prev': { const p = prevInQueue(); if (p) openVideo(p, queue); break; }
    case 'next': { const n = nextInQueue(); if (n) openVideo(n, queue); break; }
    case 'clear-history': confirmSheet('Clear your watch history?', 'Clear', () => { state.history = []; state.progress = {}; save(); rerender(); }); break;
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
  document.documentElement.style.setProperty('--accent', state.settings.accent || '#ff0033');
  document.body.classList.toggle('comic', !!state.settings.comic);
  document.querySelector('meta[name=theme-color]').content = state.settings.theme === 'light' ? '#ffffff' : '#0f0f0f';
}

// ---------------------------------------------------------------- boot
document.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
applyTheme();
window.addEventListener('hashchange', () => { route(true); scrollTo(0, 0); });
route(true);
refreshSeeds().then(() => { if (!$('#sheet-root').innerHTML && !location.hash.startsWith('#shorts')) rerender(); });

// "Share to MyTube" (Android share target) or ?add=<link>
{
  const qs = new URLSearchParams(location.search);
  const shared = [qs.get('add'), qs.get('url'), qs.get('text')].filter(Boolean).join(' ');
  if (shared) {
    history.replaceState(null, '', location.pathname + location.hash);
    if (findLinks(shared).length) addSheet(shared);
  }
}

// Update check: version.json is published with every release. When it no longer
// matches this build, offer a one-tap refresh instead of waiting for caches to expire.
const APP_VERSION = '14';
async function checkForUpdate() {
  try {
    const r = await fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return;
    const { v } = await r.json();
    if (v && v !== APP_VERSION && !$('#update-bar')) {
      document.body.insertAdjacentHTML('beforeend', `<button id="update-bar">${icon('download')} New version available · Tap to update</button>`);
      $('#update-bar').addEventListener('click', async () => {
        $('#update-bar').textContent = 'Updating…';
        try { await (await navigator.serviceWorker?.getRegistration())?.update(); } catch { /* reload anyway */ }
        location.reload();
      });
    }
  } catch { /* offline */ }
}
checkForUpdate();
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkForUpdate(); });

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
