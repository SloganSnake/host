# MyTube

My own YouTube-style app — a home feed, Shorts, subscriptions, playlists and a profile, all saved on your phone.

## Features
- **Home**: a feed of your saved videos, with filter chips (Your custom feed, All, New to you, and your own categories), a Shorts shelf, and a shuffle button.
- **Shorts**: a full-screen vertical feed you swipe through.
- **Real YouTube search**: search history with thumbnails, suggestions as you type, voice search, All / Videos / Shorts / Unwatched / Saved filters and a two-column Shorts grid. Results come from public Piped/Invidious mirrors, or from your own YouTube Data API key (Settings). Opening a result doesn't add it to your library until you tap Save.
- **Familiar ↔ New slider** on Home mixes in recommendations related to what you watched (or trending).
- **Sponsor skipping** with SponsorBlock (sponsors, self-promo, subscribe reminders, intros, endcards, non-music parts).
- **Real dislike counts** and a like/dislike ratio (Return YouTube Dislike).
- **YouTube comments** with a smart filter for bot copies, scams, self-promo and toxic comments; **Highlights** gathers the timestamps viewers mention most; tapping a timestamp shows a preview frame and jumps there.
- **Playlist tools**: search inside a list, select and remove, remove duplicates, remove private or deleted videos.
- **Your uploads**: picture-in-picture, lock-screen controls, background play, and a sound equalizer (bass, dialogue, treble, even out loud sounds).
- **Adding by link**: paste a YouTube link into Search and tap "Save video from link" (or share to MyTube on Android).
- **Subscriptions**: a row of channel avatars, plus All / Today / Videos / Shorts / Continue watching filters.
- **You**: your profile (name, handle, photo, color), history, Liked videos, Watch later, and your playlists.
- **Player**: plays full screen, then shrinks to a mini player while you browse. It remembers where you stopped, plays the next video in the queue, and lets you like, save, share or subscribe.
- **Search** through your library, or paste a link into it to add the video.
- **Upload from your phone**: pick videos from Photos or Files with the + button. They are saved on the phone (IndexedDB), play offline, and show up under Downloaded.
- **Views & likes**: real YouTube view and like counts (via the Return YouTube Dislike API); your uploads count your own plays.
- **Comments**: write your own private comments on any video.
- **Settings**: dark or light theme, autoplay, back up / restore your data, clear history.

## Run it
It's a static site with no build step and no API key.
- **GitHub Pages**: Settings → Pages → Deploy from branch → pick the branch → `/ (root)`. Then open `https://<user>.github.io/host/`.
- **Locally**: `python3 -m http.server` in this folder, then open http://localhost:8000.

## Put it on your phone
- **iPhone (Safari)**: Share → *Add to Home Screen*.
- **Android (Chrome)**: menu → *Install app*. After that, MyTube appears in YouTube's **Share** menu, so you can send videos straight into it.

Your data stays in this browser only (localStorage). Use **Settings → Back up my data** to move it to another device.
Videos play through YouTube's official embed player. A few videos block embedding; use **Open on YouTube** for those.
