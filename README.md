# MyTube

My own YouTube-style app — a home feed, Shorts, subscriptions, playlists and a profile, all saved on your phone.

## Features
- **Home**: a feed of your saved videos, with filter chips (Your custom feed, All, New to you, and your own categories), a Shorts shelf, and a shuffle button.
- **Shorts**: a full-screen vertical feed you swipe through.
- **+ button**: paste one or more YouTube links (videos or Shorts). Titles and channels are filled in for you. It also checks your clipboard for a link.
- **Subscriptions**: a row of channel avatars, plus All / Today / Videos / Shorts / Continue watching filters.
- **You**: your profile (name, handle, photo, color), history, Liked videos, Watch later, and your playlists.
- **Player**: plays full screen, then shrinks to a mini player while you browse. It remembers where you stopped, plays the next video in the queue, and lets you like, save, share or subscribe.
- **Search** through your library, or paste a link into it to add the video.
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
