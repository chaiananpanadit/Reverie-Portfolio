# reverie

Portfolio site for Reverie — film and photo by Chaianan Panadit (Vi), Lampang.

Live at <https://chaiananpanadit.github.io/Reverie-Portfolio/>.

No build step, no dependencies, no server. Double-click `index.html` and it
runs. To test on your phone over the same wifi, run `node serve.js` and open
<http://localhost:4321>.

## The pages

| Address | What's there |
| --- | --- |
| `#/` | One line on what this is, then every project as a big photo grid, filterable by film / photo, then the two services, then the contact block |
| `#/film`, `#/photo` | The home grid, already filtered — old links to the film and photo pages land here |
| `#/work/<slug>` | One project: title, notes, the photos (tap any one for full screen), next / previous |
| `#/services` | Everything on offer, film then photo. `#/services/photo` jumps straight to photo |
| `#/rates` | The price list |
| `#/about`, `#/gear` | About, and the kit list |
| `#/contact` | Big buttons: instagram, line (tap to copy the id), call, email — then what to send and the details |

Every address works when it's shared or bookmarked: a customer who gets sent
`…/#/rates` lands on the prices, not the home page.

**On a phone** the five main pages sit in a tab bar along the bottom of the
screen, where a thumb already is; contact is the orange one. Every page ends
on the same "got a project?" block — instagram, the LINE id, and a link to all
contacts — so getting in touch is never more than a tap away.

**On a computer** the same five pages are along the top, with contact as the
orange button.

## Editing

**Everything you change lives in [`js/content.js`](js/content.js).** Open it
in any text editor, change the words, save, refresh. Anything marked `// TODO`
is a placeholder waiting for your real details.

| What | Where in `content.js` |
| --- | --- |
| Studio name, tagline, city, copyright | top of the file |
| Button labels, headings, the 404 | `ui` |
| The big line and paragraph on the home page | `home` |
| Film services | `disciplines.film` |
| Photo services | `disciplines.photo` |
| Instagram, LINE, phone, email, area, travel | `contact.rows` |
| The "what to send" list | `contact.checklist` |
| Bio and the facts table | `about` |
| Kit list | `gear` |
| Price list | `rates` |
| Every project | `work` |

### Two languages

The site is English and Thai. On a first visit it picks Thai if the phone is
set to Thai, then remembers the choice. Any text a visitor reads is a pair:

```js
tagline: { en: "film · photo", th: "วิดีโอ · ภาพ" }
```

A plain string with no pair shows in both languages — right for names, the
email, the LINE id, gear product names.

### Contact buttons

The rows in `contact.rows` decide the buttons on the contact page. A row that
links to instagram, a `tel:` number or a `mailto:` address becomes a button;
a row with `copy: true` becomes tap-to-copy (used for the LINE id, which a link
can only open if the id is searchable in LINE's privacy settings — a copied id
always works). They're shown fastest first: instagram, line, phone, email.
Rows without a link are listed underneath as details.

The instagram row and the LINE row also feed the "got a project?" block at the
bottom of every page, so changing your handle there changes it everywhere.

### Adding a project

Copy any block in `work`. `discipline` is `"film"` or `"photo"` and decides
which filter it shows under. `slug` is the address (`#/work/your-slug`).
`cover` is the photo on the home grid.

```js
{
  discipline: "photo",
  slug: "my-project",
  cover: "assets/media/covers/my-project.jpg",
  client: { en: "my project", th: "โปรเจกต์" },     // the name on the grid card
  title:  { en: "MY PROJECT", th: "โปรเจกต์" },     // the big heading on its page
  year: "2026",
  kind: { en: "portrait series", th: "ชุดพอร์ตเทรต" },
  role: { en: "photographer", th: "ช่างภาพ" },
  blurb: { en: ["first paragraph", "second"], th: ["ย่อหน้าแรก", "ย่อหน้าสอง"] },
  media: [ /* see below */ ]
}
```

Without a `cover` the grid card is set in type on a dark tile with a play
button — that's how the sports day reels show, since there's no still for them.
Covers are cropped to 4:5 on the grid, so keep the subject near the middle.
About 1000px wide is plenty; the ones in `assets/media/covers/` are 30–300 KB.

### Media blocks

Any number, top to bottom, in a project's `media`:

```js
{ type: "image",  src: "assets/media/photo/x.jpg", alt: "", caption: "" }
{ type: "images", items: [{ src: "…/a.jpg", alt: "" }, { src: "…/b.jpg", alt: "" }] }  // side by side on a computer
{ type: "instagram", src: "https://www.instagram.com/reel/REEL_ID/" }                   // a reel or post
{ type: "embed",  src: "https://www.youtube.com/embed/VIDEO_ID" }                        // youtube / vimeo
{ type: "video",  src: "assets/media/film/x.mp4", poster: "assets/media/film/x.jpg" }
{ type: "audio",  tracks: [{ title: "track", src: "assets/media/sound/x.mp3" }] }
```

- Every photo opens full screen when tapped. Swipe or use the arrow keys to
  move through the set; the phone's back gesture closes it.
- On a phone, `images` pairs stack one above the other so each photo gets the
  full width. Pair landscape with landscape and portrait with portrait so the
  two line up on a computer.
- **instagram** takes the plain post or reel url — strip anything after the
  `?` in a share link (`?vrfl=`, `?srtk=`, `?igsh=` are tracking tokens).
  Two or more in a row sit side by side on a computer. Until Instagram's
  script loads, or if a blocker stops it, a dark reel-shaped box with a
  "watch on instagram" button holds the space. The account has to be public.
- **embed** needs the embed url, not the share url.

Inside `blurb`, `body` and `intro` you can use `<b>`, `<em>`, `<br>` and
`<a href="…">link</a>`. Anything else prints as plain text.

## Your files

Photos live in [`assets/media/photo/`](assets/media/), grid covers in
`assets/media/covers/`. **Lowercase, hyphens, no spaces, no Thai characters in
filenames** — those work on your computer but break on some hosts, and the
failure looks like a missing file.

`assets/media/photo/portrait.jpg` is the 4.3 MB original of your about photo,
left untouched; the site uses `portrait-web.jpg`, a 1200px copy at about
100 KB. `assets/media/covers/og.jpg` is the picture that shows when the link is
shared in LINE, Messenger or Instagram DMs.

`assets/img/logo.svg` is the reverie K — the header mark and the browser-tab
icon. It's black on transparent; the dark theme inverts it.

## Look and feel

Terracotta on sketchbook paper: warm off-white `#f3f1ed` rather than `#fff`,
and a dark theme that's the same paper with the lights off. One accent colour —
terracotta `#a8451c` (light) / `#e2794b` (dark) — on the things you can press:
the contact button, the instagram button, numbering, underlines.

All colours are tokens at the top of [`css/style.css`](css/style.css), written
once as `--l-*` (light) and `--d-*` (dark). Change `--l-accent` and
`--d-accent` and every button follows.

**Type** is IBM Plex Sans Thai — one family that covers both English and Thai,
so a mixed sentence never changes face halfway — with IBM Plex Mono for small
labels and prices. Both are in `assets/fonts/` (SIL Open Font License, see
`OFL.txt`), so the site looks the same on every phone instead of falling back
to whatever the phone has.

**Light and dark:** the site follows the phone's setting until someone taps the
sun / moon, then remembers their choice. A small script in `<head>` applies a
saved theme and language before the first paint so there's no flash.

**Motion:** pages fade in (about a quarter of a second — nothing to wait for);
photos scale slightly under a mouse. Anyone with "reduce motion" switched on
gets none of it.

**Tap targets** are at least 44px everywhere, and nothing scrolls sideways on a
360px-wide phone in either language.

## Publishing

GitHub Pages builds from `main`; a push goes live in about a minute. If a
change doesn't show, open the site with `?v=2` (any number) on the end of the
address to skip the phone's cache.

## Still to do

- The `festival` blurb only describes what's visible in the frames — marked
  `// TODO` in `content.js`.
- Your name in `about.facts` is still latin script in the Thai version.
- The `fishing days` images are the in-camera JPEG previews from the `.ARW`
  files; save your own exports over them with the same filenames whenever you
  like.
