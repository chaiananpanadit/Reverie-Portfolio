# put your work in here

Three folders, one per discipline. Anything goes in them — photos, video files,
mp3s, artwork. Sort by what the work *is*, not what the file type is:

```
assets/media/
  film/     mp4 files, video thumbnails, stills from a shoot
  photo/    jpgs
  sound/    mp3 / wav, cover artwork
```

Then point `js/content.js` at the file. Paths are always written from the site
folder, so they start with `assets/media/`.

## The four kinds of file

**A photo**

```js
{ type: "image", src: "assets/media/photo/sports-day-01.jpg", alt: "Runner at the finish line" }
```

**Two photos side by side**

```js
{ type: "images", items: [
  { src: "assets/media/photo/mono-01.jpg", alt: "" },
  { src: "assets/media/photo/mono-02.jpg", alt: "" }
] }
```

**A video file you host yourself**

```js
{ type: "video",
  src:    "assets/media/film/live-session-01.mp4",
  poster: "assets/media/film/live-session-01-thumb.jpg" }
```

`poster` is the frame shown before it plays. Optional, but without one the
player shows a black box.

**A song**

```js
{ type: "audio", tracks: [
  { title: "interlude", src: "assets/media/sound/interlude.mp3", length: "3:41" }
] }
```

If a file is missing, the player bar says so and prints the path it wanted —
so a typo tells you exactly what to fix.

## Web files only — no RAW, no masters

Browsers cannot display `.ARW` (or `.CR2`, `.NEF`, `.DNG`). Export JPEGs.

Your originals live at **`D:\Art\raw\`** — RAW stills in `fishing-days\`, video
masters in `video\`. They're deliberately outside this folder: everything under
`studio-site\` gets uploaded when you publish, and 400 MB of RAW that no visitor
can open would go with it.

The 18 jpgs in `photo/` right now were pulled out of the RAWs' embedded previews
so the site had something real in it. They're **Sony's in-camera rendering, not
your grade.** When you export properly from Lightroom, save over them with the
same filenames and the site picks the new ones up with no edits to `content.js`.

## Naming files

**lowercase, hyphens, no spaces, no Thai characters.**

`sports-day-01.jpg` ✓ &nbsp;&nbsp; `Sports Day (1).jpg` ✗ &nbsp;&nbsp; `กีฬาสี.jpg` ✗

Spaces and Thai characters work on your own machine but break on some web hosts,
and the failure looks like a missing file rather than a naming problem — which
is a horrible thing to debug later.

## Sizes

The content column is 520px wide, so nothing needs to be huge.

| what | size | export |
| --- | --- | --- |
| portrait / vertical | 1000 × 1250 | JPEG ~80% |
| wide / landscape | 1600 × 900 | JPEG ~80% |
| square | 1200 × 1200 | JPEG ~80% |
| video | 1080p | H.264 mp4 |
| audio | — | mp3 192–320kbps |

A 4000px camera JPEG straight off the card is about 8MB and will make the page
crawl on phone data. Resize before you drop them in.

**Long videos are better on YouTube or Vimeo than in here** — a self-hosted mp4
downloads in full before it plays, and every visitor pays for the whole file.
Use `{ type: "embed", src: "https://www.youtube.com/embed/VIDEO_ID" }` for
anything over about a minute, and keep this folder for short loops and clips.

## The placeholders

The grey `.svg` files in `assets/img/` are the stand-ins still showing wherever
there's no real image yet. They read **PORTFOLIO IN PROGRESS**, so an empty slot
looks deliberate rather than broken. Delete that folder once every slot points
at real work.

To change the wording, open any of them in a text editor — it's one `<text>`
line. They're plain SVG, not images.
