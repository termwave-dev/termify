# Termify Spotify

A terminal-inspired Spotify player for local use or Render. Includes Spotify OAuth PKCE, search, playback controls, queue display, saved tracks, device selection, audio-reactive visualizer modes, and a local color/theme engine.

## Requirements

- Node.js 18+
- A Spotify account; **Spotify Premium is required for playback through the Web Playback SDK**
- A Spotify Developer app / Client ID

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000. In Spotify Developer Dashboard, add this exact Redirect URI to your app:

`http://localhost:3000/`

In the app, open **Settings** and enter your Spotify Client ID. Save, then choose **Connect Spotify**.

## Deploy to Render

1. Push this project to a GitHub repository.
2. In Render, create **New + → Web Service** and connect the repository.
3. Render detects `render.yaml`; use `npm install` as build command and `npm start` as start command if asked.
4. Once deployed, copy the HTTPS URL, e.g. `https://your-app.onrender.com/`.
5. In Spotify Developer Dashboard → your app → **Settings**, add the deployed URL as a Redirect URI, including the trailing slash.
6. Open the deployed app, go to Settings, enter your Spotify Client ID, save, and connect.

You can use the same Spotify Client ID for localhost and Render if both redirect URIs are listed. The app uses Spotify's Authorization Code with PKCE flow, so **do not create or expose a client secret**. The Client ID is public by design.

## Features

- Search tracks and play results
- Play/pause, previous/next, seek, volume, shuffle, repeat
- Spotify Web Playback SDK browser device, plus device selector for other Spotify Connect devices
- Queue view and saved tracks list
- Terminal-inspired UI with responsive layout
- Local theme controls: accent, background, panel color, text color, preset themes
- Canvas visualizer styles: bars, waveform, radial, oscilloscope. Since Spotify's Web Playback SDK does not expose its decoded audio buffer to page JavaScript, these visualizations are **playback-reactive visualizations**, not a direct waveform of Spotify's protected audio.
- Settings and theme preferences stored in localStorage on the current browser

## Spotify limitations

Spotify controls playback availability by account, region, device, API policy, and app access. Premium is required for the Web Playback SDK. Some endpoints/features may be unavailable to newly created apps or restricted by Spotify's current developer-mode rules. If browser playback cannot start, use the device picker to select another Spotify Connect device. Track previews are not guaranteed by Spotify, so search results may not have playable preview URLs.

This is an unofficial third-party client and is not affiliated with Spotify.


## Text-first interface
The interface now uses a compact terminal-style layout with clickable text rows, Discover shortcuts, Recently Played, Friends (limited by Spotify's public API), Stats, Playlist sync, Liked Songs, Albums, playlist creation, and grouped multi-type search results. Spotify permissions changed, so disconnect and reconnect once to approve the expanded scopes.


### Spotify playlist access limitation
Spotify's February 2026 Web API changes restrict reading playlist items to playlists owned by the authenticated user or playlists where they are a collaborator. Opening a followed/public playlist may therefore return 403 even when scopes are correct. Termify now explains this and provides an **Open playlist in Spotify** link instead of suggesting repeated authorization will fix it. Album art remains visible in the miniplayer while track-list rows stay text-first.

### Custom Google Fonts
Open **Settings → Google Font family**, enter a family name available from Google Fonts (for example `Fira Code`, `Roboto`, or `Nunito Sans`), and click **Save settings**. Termify loads the font from Google Fonts and reloads with it applied. Leave the field blank and save to return to the default terminal typography. The selection is stored locally in that browser.


### Synced lyrics
Use the **♫** control in the miniplayer to open or close a separate synced-lyrics popout. Termify looks up synchronized LRC lyrics through LRCLIB, highlights the current line based on playback position, and follows track changes while the popout remains open. Lyrics availability depends on LRCLIB's catalogue and matching metadata; not every recording has synced lyrics. The lyrics view requires popups to be allowed for the site.
