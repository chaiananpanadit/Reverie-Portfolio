/* ==================================================================
   app.js — routing, rendering, language switching and the transition.
   You shouldn't need to touch this file; the words live in content.js.
================================================================== */

(function () {
  "use strict";

  var C = window.CONTENT || CONTENT;

  var view       = document.getElementById("view");
  var navDisc    = document.getElementById("nav-disciplines");
  var navMain    = document.getElementById("nav-primary");
  var navWork    = document.getElementById("nav-work");
  var navLabel   = document.getElementById("nav-work-label");
  var sidebarNav = document.getElementById("sidebar-nav");
  var toggle     = document.getElementById("menu-toggle");
  var langBox    = document.getElementById("lang");
  var wipe       = document.getElementById("wipe");
  var slate      = document.getElementById("wipe-slate");
  var helloBar   = document.getElementById("hello-bar");

  var DISC_ORDER = ["film", "photo"];
  var LANGS      = ["en", "th"];
  var STORE_KEY  = "reverie-lang";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ language */

  var LANG = (function () {
    var saved;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* private mode */ }
    if (LANGS.indexOf(saved) > -1) return saved;
    return /^th\b/i.test(navigator.language || "") ? "th" : "en";   // guess from the browser
  })();

  // Pull the right string out of a { en, th } pair. A plain string — an email,
  // a product name — is returned as-is, so it shows in both languages.
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || Array.isArray(v)) return v;
    if (typeof v === "object") return v[LANG] != null ? v[LANG] : (v.en != null ? v.en : "");
    return v;
  }

  function ui(key) {
    var set = (C.ui && (C.ui[LANG] || C.ui.en)) || {};
    return set[key] != null ? set[key] : "";
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === LANG) return;
    LANG = next;
    try { localStorage.setItem(STORE_KEY, LANG); } catch (e) { /* ignore */ }
    document.documentElement.setAttribute("lang", LANG);
    buildNav();
    route(LANG === "th" ? "ไทย" : "english");     // flash the new language on the slate
  }

  function buildLangToggle() {
    langBox.innerHTML = LANGS.map(function (code) {
      var label = code === "th" ? "ไทย" : "EN";
      return '<button type="button" class="lang-btn" data-lang="' + code + '"' +
             (code === LANG ? ' aria-current="true"' : "") + ">" + label + "</button>";
    }).join('<span class="lang-sep">/</span>');
  }

  langBox.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lang]");
    if (btn) setLang(btn.getAttribute("data-lang"));
  });

  /* --------------------------------------------------------------- theme */
  /* The palette itself is pure CSS — this only records the visitor's choice
     and lets it override the system preference. With nothing stored the site
     follows the OS, which is why the attribute is removed rather than set. */

  var THEME_KEY = "reverie-theme";
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var themeBtn  = document.getElementById("theme-btn");

  function activeTheme() {
    var forced = document.documentElement.getAttribute("data-theme");
    if (forced === "light" || forced === "dark") return forced;
    return darkQuery.matches ? "dark" : "light";
  }

  function syncThemeBtn() {
    // the icon shows the theme you're in; the label says what clicking does
    var next = activeTheme() === "dark" ? ui("themeToLight") : ui("themeToDark");
    themeBtn.setAttribute("aria-label", next);
    themeBtn.setAttribute("title", next);
  }

  themeBtn.addEventListener("click", function () {
    var next = activeTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ }
    syncThemeBtn();
  });

  // if they never picked, follow the OS live
  darkQuery.addEventListener("change", syncThemeBtn);

  /* ------------------------------------------------------------ helpers */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Copy may contain <b>, <em>, <br>, <a href="…"> — keep those, drop the rest.
  function rich(s) {
    return esc(s)
      .replace(/&lt;(\/?)(b|em|i|strong|br)&gt;/g, "<$1$2>")
      .replace(/&lt;a href=&quot;([^"<>]+)&quot;&gt;/g, '<a class="link-inline" href="$1">')
      .replace(/&lt;\/a&gt;/g, "</a>");
  }

  function paras(list) {
    var arr = t(list);
    return (Array.isArray(arr) ? arr : [arr]).map(function (p) {
      return "<p>" + rich(p) + "</p>";
    }).join("");
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function find(slug) {
    for (var i = 0; i < C.work.length; i++) if (C.work[i].slug === slug) return C.work[i];
    return null;
  }

  function workIn(discipline) {
    return C.work.filter(function (w) { return w.discipline === discipline; });
  }

  function cta(c) {
    return c ? '<p><a class="link-inline" href="' + esc(c.href) + '">' +
               esc(t(c.label)) + "</a></p>" : "";
  }

  /* ------------------------------------------------------------ sidebar */

  function buildNav() {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var v = C[el.getAttribute("data-bind")];
      if (v != null) el.textContent = t(v);
    });

    buildLangToggle();
    syncThemeBtn();                                   // its label is translated too
    toggle.textContent = sidebarNav.classList.contains("is-open") ? ui("close") : ui("menu");
    navLabel.textContent = ui("workLabel");
    helloBar.innerHTML = "<span>" + esc(ui("sayHello")) + '</span><span aria-hidden="true">&rarr;</span>';

    navDisc.innerHTML = DISC_ORDER.map(function (k, i) {
      var d = C.disciplines[k];
      if (!d) return "";
      return '<li><a class="disc-link" href="#/' + esc(k) + '">' +
             '<span class="disc-n">' + pad(i + 1) + "</span>" +
             '<span class="disc-name">' + esc(t(d.label)) + "</span></a></li>";
    }).join("");

    navMain.innerHTML = [
      { href: "#/work",    label: ui("navWork") },
      { href: "#/about",   label: ui("navAbout") },
      { href: "#/gear",    label: ui("navGear") },
      { href: "#/rates",   label: ui("navRates") },
      { href: "#/contact", label: ui("navContact") }
    ].map(function (p) {
      return '<li><a href="' + p.href + '">' + esc(p.label) + "</a></li>";
    }).join("");

    navWork.innerHTML = C.work.map(function (w) {
      return '<li><a href="#/work/' + esc(w.slug) + '">' + esc(t(w.client)) + "</a></li>";
    }).join("") +
    '<li><a class="nav-dm" href="#/contact">' + esc(ui("dmWork")) + "</a></li>";

    markCurrent(location.hash || "#/");
  }

  function markCurrent(hash) {
    helloBar.hidden = hash === "#/contact";
    document.querySelectorAll(".sidebar a").forEach(function (a) {
      a.removeAttribute("aria-current");
      if (a.getAttribute("href") === hash) a.setAttribute("aria-current", "page");
    });
  }

  toggle.addEventListener("click", function () {
    var open = sidebarNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? ui("close") : ui("menu");
  });

  /* -------------------------------------------------------------- media */

  function figure(inner, caption) {
    return "<figure>" + inner +
      (caption ? "<figcaption>" + esc(t(caption)) + "</figcaption>" : "") + "</figure>";
  }

  function img(src, alt, eager) {
    return '<div class="frame"><img src="' + esc(src) + '" alt="' + esc(t(alt) || "") + '"' +
           (eager ? "" : ' loading="lazy"') + ' decoding="async"></div>';
  }

  function renderMedia(blocks) {
    return (blocks || []).map(function (m) {
      switch (m.type) {
        case "image":
          return figure(img(m.src, m.alt), m.caption);

        case "images":
          return figure('<div class="grid-2">' + (m.items || []).map(function (it) {
            return img(it.src, it.alt);
          }).join("") + "</div>", m.caption);

        case "video":
          return figure(
            '<video controls preload="metadata" playsinline src="' + esc(m.src) + '"' +
            (m.poster ? ' poster="' + esc(m.poster) + '"' : "") + "></video>", m.caption);

        case "embed":
          return figure(
            '<div class="embed"><iframe src="' + esc(m.src) + '" title="' + esc(t(m.caption) || "Video") +
            '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" ' +
            'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>', m.caption);

        case "instagram":
          // Instagram's own embed markup. embed.js swaps the blockquote for a
          // correctly sized iframe; until it does — or if a blocker stops it —
          // the link inside is a working fallback rather than a blank box.
          return figure(
            '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(m.src) +
            '" data-instgrm-version="14"><a href="' + esc(m.src) +
            '" target="_blank" rel="noopener noreferrer">' + esc(ui("watchInstagram")) +
            " &#8599;</a></blockquote>", m.caption);

        case "audio":
          return renderTracks(m.tracks || []);

        default:
          return "";
      }
    }).join("");
  }

  function renderTracks(tracks) {
    return '<div class="tracks">' + tracks.map(function (tr, i) {
      return '<button class="track" data-src="' + esc(tr.src) + '" data-title="' + esc(t(tr.title)) + '">' +
             '<span class="n">' + pad(i + 1) + "</span>" +
             "<span>" + esc(t(tr.title)) + "</span>" +
             '<span class="d">' + esc(tr.length || "") + "</span></button>";
    }).join("") + "</div>";
  }

  function indexList(items) {
    return '<div class="index-list">' + items.map(function (w) {
      return '<a href="#/work/' + esc(w.slug) + '">' +
             '<span class="c1">' + esc(t(w.client)) + "</span>" +
             '<span class="c2">' + esc(t(w.kind) || "") + "</span>" +
             '<span class="c3">' + esc(w.year || "") + "</span></a>";
    }).join("") +
    '<a class="dm-row" href="#/contact"><span>' + esc(ui("dmWork")) +
      '</span><span class="dm-arrow">&rarr;</span></a>' +
    "</div>";
  }

  /* --------------------------------------------------------------- views */

  function viewHome() {
    var h = C.home;
    return (h.cover ? '<div class="media' + (h.cover.mark ? " media-mark" : "") + '">' +
                      figure(img(h.cover.src, h.cover.alt, true)) + "</div>" : "") +
           '<h1 class="display">' + esc(t(h.headline)) + "</h1>" +
           '<div class="lede">' + paras(h.body) + "</div>" +
           '<div class="disc-cards">' + DISC_ORDER.map(function (k, i) {
             var d = C.disciplines[k];
             if (!d) return "";
             return '<a class="disc-card" href="#/' + esc(k) + '">' +
                    '<span class="disc-card-n">' + pad(i + 1) + "</span>" +
                    '<span class="disc-card-t">' + esc(t(d.label)) + "</span>" +
                    '<span class="disc-card-b">' + esc(t(d.blurb) || "") + "</span>" +
                    '<span class="disc-card-a">&rarr;</span></a>';
           }).join("") + "</div>" +
           cta(h.cta);
  }

  function viewDiscipline(key) {
    var d = C.disciplines[key];
    if (!d) return viewMissing();
    var mine = workIn(key);

    return (d.cover ? '<div class="media">' + figure(img(d.cover.src, d.cover.alt, true)) + "</div>" : "") +
           '<h1 class="display">' + esc(t(d.headline)) + "</h1>" +
           (d.blurb ? '<p class="meta">' + esc(t(d.blurb)) + "</p>" : "") +
           '<div class="lede">' + paras(d.intro) + "</div>" +

           '<div class="svc">' + d.services.map(function (s, i) {
             return '<article class="svc-item">' +
                    '<span class="svc-n">' + pad(i + 1) + "</span>" +
                    '<div class="svc-body">' +
                      "<h2>" + esc(t(s.title)) + "</h2>" +
                      "<p>" + rich(t(s.body)) + "</p>" +
                      (s.gets ? '<p class="svc-gets"><b>' + esc(ui("youGet")) + "</b> " + esc(t(s.gets)) + "</p>" : "") +
                      (s.note ? '<p class="svc-note">' + esc(t(s.note)) + "</p>" : "") +
                    "</div></article>";
           }).join("") + "</div>" +

           (mine.length
             ? '<h2 class="section-label">' + esc(ui("selectedWork").replace("{x}", t(d.label))) + "</h2>" +
               indexList(mine)
             : "") +

           cta(d.cta);
  }

  function viewAbout() {
    var a = C.about;
    return (a.cover ? '<div class="media">' + figure(img(a.cover.src, a.cover.alt, true)) + "</div>" : "") +
           '<h1 class="display">' + esc(t(a.headline)) + "</h1>" +
           '<div class="lede">' + paras(a.body) + "</div>" +
           (a.facts && a.facts.length
             ? '<dl class="rows">' + a.facts.map(function (f) {
                 return '<div class="row"><dt>' + esc(t(f.k)) + "</dt><dd>" + esc(t(f.v)) + "</dd></div>";
               }).join("") + "</dl>"
             : "") +
           cta(a.cta);
  }

  function viewGear() {
    var g = C.gear;
    if (!g) return viewMissing();

    return '<h1 class="display">' + esc(t(g.headline)) + "</h1>" +
           (g.intro ? '<div class="lede"><p>' + rich(t(g.intro)) + "</p></div>" : "") +
           g.groups.map(function (grp) {
             return '<section class="gear-group">' +
               '<h2 class="section-label">' + esc(t(grp.title)) + "</h2>" +
               '<div class="gear-list">' + grp.items.map(function (it) {
                 var inner = '<span class="gear-name">' + esc(t(it.name)) + "</span>" +
                             '<span class="gear-note">' + esc(t(it.note) || "") + "</span>" +
                             '<span class="gear-link">' + (it.url ? "&#8599;" : "") + "</span>";
                 return it.url
                   ? '<a class="gear-row" href="' + esc(it.url) + '" target="_blank" rel="noopener noreferrer">' + inner + "</a>"
                   : '<div class="gear-row">' + inner + "</div>";
               }).join("") + "</div></section>";
           }).join("") +
           cta(g.cta);
  }

  function viewRates() {
    var r = C.rates;
    if (!r) return viewMissing();

    return '<h1 class="display">' + esc(t(r.headline)) + "</h1>" +
           (r.intro ? '<div class="lede"><p>' + rich(t(r.intro)) + "</p></div>" : "") +
           r.groups.map(function (grp) {
             return '<section class="rate-group">' +
               '<h2 class="section-label">' + esc(t(grp.title)) + "</h2>" +
               '<div class="rate-list">' + grp.items.map(function (it) {
                 var p = t(it.price);
                 // a number takes the currency; a word ("dm") stands on its own
                 var money = /\d/.test(p) ? p + " " + (r.unit || "") : p;
                 return '<div class="rate-row">' +
                        '<span class="rate-name">' + esc(t(it.name)) + "</span>" +
                        '<span class="rate-note">' + esc(t(it.note) || "") + "</span>" +
                        '<span class="rate-price">' + esc(money) + "</span></div>";
               }).join("") + "</div></section>";
           }).join("") +
           (r.note ? '<p class="rate-note-foot">' + rich(t(r.note)) + "</p>" : "") +
           cta(r.cta);
  }

  function viewContact() {
    var c = C.contact;
    return '<h1 class="display">' + esc(t(c.headline)) + "</h1>" +
           '<div class="lede"><p>' + rich(t(c.intro)) + "</p></div>" +
           '<dl class="rows">' + c.rows.map(function (r) {
             var val = r.copy
               ? '<button class="copy-btn" type="button" data-copy="' + esc(t(r.v)) + '">' +
                 esc(t(r.v)) + ' <span class="copy-label" aria-live="polite">' + esc(ui("copy")) +
                 "</span></button>"
               : r.href
               ? '<a class="link-plain" href="' + esc(r.href) + '">' + esc(t(r.v)) + "</a>"
               : esc(t(r.v));
             return '<div class="row"><dt>' + esc(t(r.k)) + "</dt><dd>" + val + "</dd></div>";
           }).join("") + "</dl>";
  }

  function viewWorkIndex() {
    return '<h1 class="display">' + esc(ui("allWork")) + "</h1>" + DISC_ORDER.map(function (k) {
      var d = C.disciplines[k], mine = workIn(k);
      if (!d || !mine.length) return "";
      return '<h2 class="section-label">' + esc(t(d.label)) + "</h2>" + indexList(mine);
    }).join("");
  }

  function viewProject(w) {
    var meta = [w.date || w.year, t(w.role), t(w.kind)].filter(Boolean).map(esc).join(" &nbsp;·&nbsp; ");
    return '<div class="media">' + renderMedia(w.media) + "</div>" +
           "<h1>" + esc(t(w.title) || t(w.client)) + "</h1>" +
           '<p class="meta">' + meta + "</p>" +
           (w.blurb ? '<div class="lede">' + paras(w.blurb) + "</div>" : "") +
           '<p><a class="link-inline" href="#/contact">' + esc(ui("workWithMe")) + "</a></p>";
  }

  function viewMissing() {
    return "<h1>" + esc(ui("notFoundTitle")) + "</h1><p>" + esc(ui("notFoundBody")) + "</p>" +
           '<p><a class="link-inline" href="#/">' + esc(ui("backHome")) + "</a></p>";
  }

  /* -------------------------------------------------------------- router */

  // Every page except the landing gets one. It walks the history rather than
  // pointing at a fixed parent, so it undoes whatever the visitor actually did
  // — and since the boot code forces the first paint to #/, anything deeper was
  // reached by a hash change, which means there is always a step to go back to.
  function backBtn() {
    return '<button class="back" type="button" id="back-btn">&#8592; ' +
           esc(ui("back")) + "</button>";
  }

  function isHome(hash) {
    return hash.replace(/^#\/?/, "").split("/").filter(Boolean).length === 0;
  }

  function resolve(hash) {
    var parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    var suffix = " — " + C.name;

    if (parts.length === 0)
      return { html: viewHome(), title: C.name + " — " + t(C.tagline), slate: C.name };

    if (C.disciplines[parts[0]] && !parts[1])
      return { html: viewDiscipline(parts[0]), title: t(C.disciplines[parts[0]].label) + suffix,
               slate: t(C.disciplines[parts[0]].label) };

    if (parts[0] === "about")
      return { html: viewAbout(), title: ui("navAbout") + suffix, slate: ui("navAbout") };

    if (parts[0] === "gear")
      return { html: viewGear(), title: ui("navGear") + suffix, slate: ui("navGear") };

    if (parts[0] === "rates")
      return { html: viewRates(), title: ui("navRates") + suffix, slate: ui("navRates") };

    if (parts[0] === "contact")
      return { html: viewContact(), title: ui("navContact") + suffix, slate: ui("navContact") };

    if (parts[0] === "work" && !parts[1])
      return { html: viewWorkIndex(), title: ui("navWork") + suffix, slate: ui("workLabel") };

    if (parts[0] === "work") {
      var w = find(parts[1]);
      if (w) return { html: viewProject(w), title: t(w.client) + suffix,
                      slate: w.discipline ? t(C.disciplines[w.discipline].label) : ui("workLabel") };
    }

    return { html: viewMissing(), title: ui("notFoundTitle") + suffix, slate: "404" };
  }

  // Instagram embeds. The script is fetched the first time a page needs it,
  // never on pages without one. Because this is a single-page site, every
  // route change paints fresh blockquotes, so process() has to be called again
  // after each paint — embed.js only scans the document once on its own.
  var igRequested = false;
  function processInstagram() {
    if (!view.querySelector("blockquote.instagram-media")) return;
    if (window.instgrm && window.instgrm.Embeds) { window.instgrm.Embeds.process(); return; }
    if (igRequested) return;               // still loading, or blocked: the link stays
    igRequested = true;
    var sc = document.createElement("script");
    sc.async = true;
    sc.src = "https://www.instagram.com/embed.js";
    sc.onload = function () { if (window.instgrm) window.instgrm.Embeds.process(); };
    document.body.appendChild(sc);
  }

  function paint(page) {
    view.innerHTML = page.html;
    document.title = page.title;

    // stagger the entrance of each top-level block
    var kids = view.children;
    for (var i = 0; i < kids.length; i++) kids[i].style.setProperty("--i", i);

    window.scrollTo(0, 0);
    var back = document.getElementById("back-btn");
    if (back) back.addEventListener("click", function () { history.back(); });
    bindTracks();
    processInstagram();
    if (audio.paused && !audio.duration) bar.hidden = true;
  }

  var busy = false;

  // slateOverride lets the language switch flash "ไทย" instead of the page name
  function route(slateOverride) {
    var hash = location.hash || "#/";
    var page = resolve(hash);
    if (!isHome(hash)) page.html = backBtn() + page.html;
    markCurrent(hash);
    if (sidebarNav.classList.contains("is-open")) toggle.click();

    if (REDUCED || busy) { paint(page); return; }

    busy = true;
    slate.textContent = typeof slateOverride === "string" ? slateOverride : page.slate;
    wipe.classList.add("is-active", "is-covering");

    // swap the content while the slats have the screen covered
    setTimeout(function () {
      paint(page);
      wipe.classList.remove("is-covering");
      wipe.classList.add("is-revealing");
      setTimeout(function () {
        wipe.classList.remove("is-active", "is-revealing");
        busy = false;
      }, 420);
    }, 400);
  }

  /* -------------------------------------------------------- audio player */

  var audio    = new Audio();
  var bar      = document.getElementById("player");
  var btn      = document.getElementById("player-btn");
  var titleEl  = document.getElementById("player-title");
  var timeEl   = document.getElementById("player-time");
  var fill     = document.getElementById("player-fill");
  var barTrack = fill.parentNode;
  var current  = null;                    // the <button class="track"> now loaded

  function clock(s) {
    if (!isFinite(s)) return "0:00";
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ":" + (r < 10 ? "0" : "") + r;
  }

  function repaintPlayer() {
    btn.innerHTML = audio.paused ? "&#9658;" : "&#9612;&#9612;";
    document.querySelectorAll(".track").forEach(function (tr) {
      tr.setAttribute("data-state", tr === current && !audio.paused ? "playing" : "idle");
    });
  }

  function play(trackEl) {
    if (current === trackEl && !audio.paused) { audio.pause(); repaintPlayer(); return; }
    if (current !== trackEl) {
      current = trackEl;
      audio.src = trackEl.getAttribute("data-src");
      titleEl.textContent = trackEl.getAttribute("data-title");
      fill.style.width = "0%";
    }
    bar.hidden = false;
    audio.play().catch(function () { /* blocked or missing file — see error handler */ });
    repaintPlayer();
  }

  function bindTracks() {
    current = null;
    document.querySelectorAll(".track").forEach(function (tr) {
      tr.addEventListener("click", function () { play(tr); });
    });
  }

  btn.addEventListener("click", function () {
    if (!current) return;
    if (audio.paused) audio.play().catch(function () {}); else audio.pause();
    repaintPlayer();
  });

  document.getElementById("player-close").addEventListener("click", function () {
    audio.pause(); bar.hidden = true; repaintPlayer();
  });

  barTrack.addEventListener("click", function (e) {
    if (!audio.duration) return;
    var r = barTrack.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });

  audio.addEventListener("timeupdate", function () {
    timeEl.textContent = clock(audio.currentTime);
    if (audio.duration) fill.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  });
  audio.addEventListener("play",  repaintPlayer);
  audio.addEventListener("pause", repaintPlayer);
  audio.addEventListener("ended", function () { fill.style.width = "0%"; repaintPlayer(); });
  audio.addEventListener("error", function () {
    audio.pause();                       // so the bar shows ▶ rather than a phantom pause
    titleEl.textContent = ui("missingFile") + (audio.getAttribute("src") || "");
    timeEl.textContent = "--:--";
    fill.style.width = "0%";
    repaintPlayer();
  });

  /* ------------------------------------------------------- tap to copy */
  // For ids that have no reliable link of their own — a LINE id only opens
  // from a link if the owner has made it searchable, but a copied id can
  // always be pasted into LINE's search. The clipboard API needs https,
  // which GitHub Pages is; the textarea fallback covers older browsers.
  function copyText(text, btn) {
    var label = btn.querySelector(".copy-label");
    function done() {
      label.textContent = ui("copied");
      clearTimeout(btn._reset);
      btn._reset = setTimeout(function () { label.textContent = ui("copy"); }, 2600);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try { if (document.execCommand("copy")) done(); } catch (e) { /* id is still on screen */ }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  view.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".copy-btn");
    if (btn) copyText(btn.getAttribute("data-copy"), btn);
  });

  /* ---------------------------------------------------------------- boot */

  // Always open on the home page: a stale bookmark or a hash left over from a
  // previous visit shouldn't drop a first-time visitor deep inside the site.
  // replaceState (not location.hash) so this never fires hashchange and never
  // leaves the old route in history.
  if (location.hash && location.hash !== "#/") {
    try {
      history.replaceState(null, "", location.pathname + location.search + "#/");
    } catch (e) { location.replace("#/"); }        // file:// in some browsers
  }

  document.documentElement.setAttribute("lang", LANG);
  buildNav();
  window.addEventListener("hashchange", function () { route(); });   // no event arg through
  route();
})();
