# Maharaja Readymade — The Royal Address of Fashion

Website for **Maharaja Readymade**, Ansari Road, Chowk Bazar, Bulandshahr, Uttar Pradesh — 203001.

A static site: plain HTML, CSS and JavaScript. No build step, no framework, no dependencies to install.

---

## Running it locally

Because the page loads separate CSS/JS files, opening `index.html` directly from the
file system can trip browser security rules. Serve it over HTTP instead:

```bash
# Python (already installed on most machines)
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Other options: `npx serve .`, or the "Live Server" extension in VS Code.

---

## Deploying to GitHub Pages

1. Create a repository on GitHub and push this folder as the repository **root**
   (`index.html` must sit at the top level):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main`, folder: `/ (root)`

3. The site goes live at `https://<your-username>.github.io/<your-repo>/` within a minute or two.

All internal paths are relative, so the site works whether it is served from a
domain root or from a repository subpath.

---

## Project structure

```
.
├── index.html                  Page markup
├── assets/
│   ├── css/
│   │   └── styles.css          All styling, including the responsive layers
│   ├── js/
│   │   ├── canvas-scenes.js    The eight per-tab animated 3D backgrounds
│   │   ├── reviews.js          Customer review cards
│   │   ├── assistant.js        The "Royal Assistant" chat
│   │   └── app.js              Tabs, counters, gallery lightbox, device adaptation
│   ├── img/
│   │   ├── logo.jpg            Company logo (header, footer, favicon)
│   │   ├── brands/             The twelve partner-brand logos
│   │   └── store/              Photographs of the shop
│   └── video/
│       └── store-1..3.mp4      In-store footage used in the Gallery tab
├── .nojekyll                   Tells GitHub Pages to serve files as-is
└── README.md
```

The four scripts are loaded in order at the end of `index.html`. `app.js` must stay
last, since it starts everything up once the rest is defined.

---

## Making changes

### Adding photographs to the Gallery

1. Drop the image into `assets/img/store/`.
2. Add a tile to the gallery grid in `index.html` (search for `id="photos-grid"`):

   ```html
   <div class="photo-item reveal">
     <img src="assets/img/store/your-photo.jpg" alt="Your caption"
          loading="lazy" style="object-position:center 40%;">
     <div class="photo-overlay"><span class="photo-overlay-text">Your caption</span></div>
   </div>
   ```

`object-position` sets which part of the photo stays visible when the tile crops it.
Lower percentages favour the top of the image — useful when faces or signage sit high
in the frame.

There is also a `localGalleryPhotos` array near the top of `app.js` that can inject
tiles from the same folder without touching the markup.

### Changing the store's contact details or opening hours

These are written directly into `index.html` (Contact tab) **and** repeated in the
assistant's answers in `assets/js/assistant.js`. Update both so the chat does not
contradict the page.

### Live Google reviews

The Reviews tab shows a curated set of reviews from `assets/js/reviews.js`, plus
buttons through to the real Google listing.

To pull reviews live, there is an Elfsight widget slot waiting in `index.html` —
search for `YOUR_ELFSIGHT_WIDGET_ID`. Create a free Google Reviews widget at
[elfsight.com](https://elfsight.com), connect it to the Maharaja Readymade listing,
and paste the widget ID over that placeholder. Until then the slot renders nothing
and the curated cards show instead, so the page still looks complete.

### Swapping a background video

Each tab's `<video class="video-bg">` in `index.html` carries a `poster` image and a
`<source>`. The home hero additionally has `data-src-lg` and `data-src-sm`; `app.js`
picks between them by screen width so phones never download the large file.

---

## How it behaves on phones and tablets

- **Tablet (≤1024px)** — the sidebar becomes a slide-in drawer, grids drop to two or
  three columns, and the 3D canvases render at 1× pixel density.
- **Phone (≤640px)** — background videos are replaced by their poster stills rather
  than downloading several megabytes per tab; the decorative canvases and blur orbs
  are switched off to save battery; layout goes single-column with larger tap targets.
- **Touch devices** — the brand cards flip on tap, since they reveal their description
  on hover and touch screens never fire hover.
- Anyone with "reduce motion" enabled in their OS gets the site with animation
  suppressed.

---

## Asset notes

Images in `assets/img/` are web-optimised copies. The brand logos were trimmed of
their built-in whitespace so they sit evenly on the tiles, and the store photographs
were resized and re-encoded (roughly 14 MB down to 1 MB in total). Keep the original
full-resolution files somewhere outside this repository.

Stock footage used for the tab backgrounds comes from [Pexels](https://www.pexels.com)
under the Pexels licence. The in-store videos and photographs are the shop's own.
