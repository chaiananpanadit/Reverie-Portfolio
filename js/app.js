/* ==================================================================
   app.js — routing, rendering, language and theme.
   You shouldn't need to touch this file; the words live in content.js.

   Pages (the part after the # in the address):
     #/                 home: intro + every project
     #/film  #/photo    home, with the grid filtered to that discipline
     #/work/<slug>      one project
     #/services         what's on offer (#/services/film jumps to film)
     #/rates            prices
     #/about  #/gear    about, and the kit list
     #/contact          the buttons to get in touch
   Every address works when shared or bookmarked — nothing is forced home.
================================================================== */

(function () {
  "use strict";

  var C = window.CONTENT || CONTENT;

  function $(id) { return document.getElementById(id); }
  var view    = $("view");
  var main    = $("main");
  var navTop  = $("nav-top");
  var tabbar  = $("tabbar");
  var foot    = $("foot");
  var langBox = $("lang");
  var skip    = $("skip-link");

  var DISC_ORDER = ["film", "photo"];
  var LANGS      = ["en", "th"];
  var STORE_KEY  = "reverie-lang";
  var REDUCED    = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

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

  function ui(key, vars) {
    var set = (C.ui && (C.ui[LANG] || C.ui.en)) || {};
    var s = set[key] != null ? set[key] : "";
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }

  function setLang(next) {
    if (LANGS.indexOf(next) < 0 || next === LANG) return;
    LANG = next;
    try { localStorage.setItem(STORE_KEY, LANG); } catch (e) { /* ignore */ }
    document.documentElement.setAttribute("lang", LANG);
    buildChrome();
    route({ keep: true });                 // same page, same place, new words
  }

  langBox.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) setLang(b.getAttribute("data-lang"));
  });

  /* --------------------------------------------------------------- theme */
  /* The palette itself is pure CSS — this only records the visitor's choice
     and lets it override the system preference. With nothing stored the site
     follows the OS. */

  var THEME_KEY = "reverie-theme";
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var themeBtn  = $("theme-btn");

  function activeTheme() {
    var forced = document.documentElement.getAttribute("data-theme");
    if (forced === "light" || forced === "dark") return forced;
    return darkQuery.matches ? "dark" : "light";
  }

  function syncTheme() {
    // the icon shows the theme you're in; the label says what tapping does
    var next = activeTheme() === "dark" ? ui("themeToLight") : ui("themeToDark");
    themeBtn.setAttribute("aria-label", next);
    themeBtn.setAttribute("title", next);
    // the phone's own address bar follows the page, not the system
    var bg = activeTheme() === "dark" ? "#121110" : "#f3f1ed";
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute("content", bg);
    });
  }

  themeBtn.addEventListener("click", function () {
    var next = activeTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ }
    syncTheme();
  });
  darkQuery.addEventListener("change", syncTheme);

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
      .replace(/&lt;a href=&quot;([^"<>]+)&quot;&gt;/g, '<a class="text-link" href="$1">')
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

  function isExternal(href) { return /^https?:/.test(href || ""); }
  function linkAttrs(href) {
    return 'href="' + esc(href) + '"' + (isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : "");
  }

  /* ------------------------------------------------------------- arrows */
  /* Plain type, like everything else: the arrows are characters, not icons. */

  var ARROWS = { go: "&rarr;", back: "&larr;", out: "&#8599;" };
  function arrow(kind) {
    return '<span class="arr" aria-hidden="true">' + ARROWS[kind || "go"] + "</span>";
  }

  // the uppercase, underlined link the site has always used for its calls to action
  function linkInline(href, label, cls) {
    return '<a class="link-inline' + (cls ? " " + cls : "") + '" ' + linkAttrs(href) + ">" +
           "<span>" + esc(label) + "</span>" + arrow(isExternal(href) ? "out" : "go") + "</a>";
  }

  function backLink(href, label) {
    return '<p class="crumbs"><a class="back" href="' + href + '">' + arrow("back") +
           "<span>" + esc(label) + "</span></a></p>";
  }

  /* ------------------------------------------------------ contact routes */
  /* The rows in content.js are the single source: whichever row links to
     instagram is "the instagram", the row marked copy is "the line id". */

  function contactKind(r) {
    if (r.copy) return "line";
    var h = r.href || "";
    if (/instagram\.com/.test(h)) return "instagram";
    if (/^mailto:/.test(h)) return "mail";
    if (/^tel:/.test(h)) return "phone";
    return "";
  }
  function contactRow(kind) {
    var rows = (C.contact && C.contact.rows) || [];
    for (var i = 0; i < rows.length; i++) if (contactKind(rows[i]) === kind) return rows[i];
    return null;
  }

  // One hairline row that does something: a link, or a tap-to-copy button.
  // label | value (+ a "fastest" tag) | arrow. The LINE row says "tap to copy"
  // under the id instead of an arrow, so a thumb can't miss what it does.
  function actionRow(r, cls) {
    var kind = contactKind(r);
    var fast = kind === "instagram" || kind === "line";
    var value = esc(t(r.v));
    // an email may break after a dot or the @, never in the middle of a word
    if (kind === "mail") value = value.replace(/([.@])/g, "$1<wbr>");
    var inner = '<span class="ix-k">' + esc(t(r.k)) + "</span>" +
                '<span class="ix-v"><span class="ix-val">' + value + "</span>" +
                  (fast ? ' <span class="tag">' + esc(ui("fastest")) + "</span>" : "") +
                  (r.copy ? '<span class="copy-label" aria-live="polite">' + esc(ui("tapToCopy")) + "</span>" : "") +
                "</span>";
    if (r.copy) {
      return '<button class="ix copy-btn' + (cls ? " " + cls : "") + '" type="button" data-copy="' +
             esc(t(r.v)) + '">' + inner + '<span class="ix-a"></span></button>';
    }
    return '<a class="ix' + (cls ? " " + cls : "") + '" ' + linkAttrs(r.href) + ">" + inner +
           '<span class="ix-a">' + arrow(isExternal(r.href) ? "out" : "go") + "</span></a>";
  }

  // The block every page ends on: the two fastest ways in, plus everything else.
  function ctaBlock() {
    var ig = contactRow("instagram"), line = contactRow("line");
    return '<section class="cta">' +
      '<h2 class="section-label">' + esc(ui("ctaTitle")) + "</h2>" +
      '<p class="cta-body">' + esc(ui("ctaBody")) + "</p>" +
      '<div class="ix-list">' +
        (ig ? actionRow(ig) : "") +
        (line ? actionRow(line) : "") +
        '<a class="ix ix-more" href="#/contact"><span class="ix-k">' + esc(ui("allContacts")) + "</span>" +
          '<span class="ix-v"></span><span class="ix-a">' + arrow() + "</span></a>" +
      "</div></section>";
  }

  /* ---------------------------------------------------------- the chrome */

  var PAGES = [
    { key: "work",     href: "#/",         label: "navWork" },
    { key: "services", href: "#/services", label: "navServices" },
    { key: "rates",    href: "#/rates",    label: "navRates" },
    { key: "about",    href: "#/about",    label: "navAbout" },
    { key: "contact",  href: "#/contact",  label: "navContact" }
  ];

  function buildChrome() {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var v = C[el.getAttribute("data-bind")];
      if (v != null) el.textContent = t(v);
    });
    skip.textContent = ui("skip");

    langBox.innerHTML = LANGS.map(function (code) {
      return '<button type="button" class="lang-btn" data-lang="' + code + '"' +
             ' aria-pressed="' + (code === LANG) + '"' +
             (code === "th" ? ' lang="th"' : "") + ">" + (code === "th" ? "ไทย" : "EN") + "</button>";
    }).join('<span class="lang-sep" aria-hidden="true">/</span>');
    syncTheme();

    navTop.innerHTML = PAGES.map(function (p) {
      return '<li><a href="' + p.href + '" data-nav="' + p.key + '"' +
             (p.key === "contact" ? ' class="nav-cta"' : "") + ">" + esc(ui(p.label)) + "</a></li>";
    }).join("");

    tabbar.innerHTML = PAGES.map(function (p) {
      return '<a href="' + p.href + '" data-nav="' + p.key + '"' +
             (p.key === "contact" ? ' class="tab-cta"' : "") + "><span>" + esc(ui(p.label)) + "</span></a>";
    }).join("");

    foot.innerHTML = '<div class="foot-inner">' +
      '<p class="foot-brand"><b>' + esc(C.name) + "</b> " + esc(t(C.tagline)) + "</p>" +
      '<ul class="foot-links">' +
        PAGES.concat([{ key: "gear", href: "#/gear", label: "navGear" }]).map(function (p) {
          return '<li><a href="' + p.href + '">' + esc(ui(p.label)) + "</a></li>";
        }).join("") +
      "</ul>" +
      '<p class="foot-meta">' + esc(t(C.location)) + "<br>" + esc(C.copyright) + "</p></div>";
  }

  function markActive(key) {
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  /* -------------------------------------------------------------- media */

  function photoCount(w) {
    return (w.media || []).reduce(function (n, m) {
      return n + (m.type === "image" ? 1 : m.type === "images" ? (m.items || []).length : 0);
    }, 0);
  }
  function reelCount(w) {
    return (w.media || []).filter(function (m) { return m.type === "instagram"; }).length;
  }

  // gallery = every photo on the current project page, in order, for the viewer
  var gallery = [];

  function photo(src, alt) {
    var i = gallery.push({ src: src, alt: t(alt) || "" }) - 1;
    return '<button class="frame zoom" type="button" data-zoom="' + i + '" aria-label="' +
           esc(t(alt) || ui("details")) + '">' +
           '<img src="' + esc(src) + '" alt="' + esc(t(alt) || "") + '" loading="lazy" decoding="async"></button>';
  }

  function figure(inner, caption, cls) {
    return '<figure' + (cls ? ' class="' + cls + '"' : "") + ">" + inner +
      (caption ? "<figcaption>" + esc(t(caption)) + "</figcaption>" : "") + "</figure>";
  }

  function instagram(m) {
    // Instagram's own embed markup. embed.js swaps the blockquote for a sized
    // iframe; until it does — or if a blocker stops it — the link inside is a
    // working fallback rather than a blank box.
    return figure(
      '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(m.src) +
      '" data-instgrm-version="14"><a class="link-inline" href="' + esc(m.src) +
      '" target="_blank" rel="noopener noreferrer"><span>&#9658; ' + esc(ui("watchInstagram")) +
      "</span>" + arrow("out") + "</a></blockquote>", m.caption, "reel");
  }

  function renderMedia(blocks) {
    gallery = [];
    var out = "", reels = [];
    function flushReels() {
      if (reels.length) out += '<div class="reels">' + reels.join("") + "</div>";
      reels = [];
    }
    (blocks || []).forEach(function (m) {
      if (m.type === "instagram") { reels.push(instagram(m)); return; }
      flushReels();
      switch (m.type) {
        case "image":
          out += figure(photo(m.src, m.alt), m.caption);
          break;
        case "images":
          out += figure('<div class="grid-2">' + (m.items || []).map(function (it) {
            return photo(it.src, it.alt);
          }).join("") + "</div>", m.caption);
          break;
        case "video":
          out += figure('<video controls preload="metadata" playsinline src="' + esc(m.src) + '"' +
                        (m.poster ? ' poster="' + esc(m.poster) + '"' : "") + "></video>", m.caption);
          break;
        case "embed":
          out += figure('<div class="embed"><iframe src="' + esc(m.src) + '" title="' +
                        esc(t(m.caption) || "Video") + '" loading="lazy" ' +
                        'referrerpolicy="strict-origin-when-cross-origin" ' +
                        'allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>', m.caption);
          break;
        case "audio":
          out += '<ol class="tracks">' + (m.tracks || []).map(function (tr, i) {
            return '<li><span class="track-n">' + pad(i + 1) + '</span><span class="track-title">' +
                   esc(t(tr.title)) + "</span>" +
                   '<audio controls preload="none" src="' + esc(tr.src) + '"></audio></li>';
          }).join("") + "</ol>";
          break;
      }
    });
    flushReels();
    return out;
  }

  /* --------------------------------------------------------------- cards */

  function card(w, i) {
    var media;
    if (w.cover) {
      media = '<img src="' + esc(w.cover) + '" alt="" loading="lazy" decoding="async">';
    } else {
      // no still to show (the sports day film only exists as reels): set it in type
      var n = reelCount(w);
      media = '<span class="tile">' +
                '<span class="tile-title">&#9658; ' + esc(t(w.title) || t(w.client)) + "</span>" +
                '<span class="tile-sub">' + esc(ui("reelTile")) + (n > 1 ? " &times; " + n : "") + "</span>" +
              "</span>";
    }
    return '<a class="card" href="#/work/' + esc(w.slug) + '" data-slug="' + esc(w.slug) + '"' +
           ' data-disc="' + esc(w.discipline || "") + '">' +
           '<span class="frame card-media">' + media + "</span>" +
           '<span class="card-cap">' +
             '<span class="card-n">' + pad(i + 1) + "</span>" +
             '<span class="card-title">' + esc(t(w.client)) + "</span>" +
             '<span class="card-year">' + esc(w.year || "") + "</span>" +
             '<span class="card-kind">' + esc(t(w.kind) || "") + "</span>" +
           "</span></a>";
  }

  /* --------------------------------------------------------------- views */

  function viewHome(filter) {
    var h = C.home;
    var items = C.work.filter(function (w) { return !filter || w.discipline === filter; });

    var chips = [{ key: "", href: "#/", label: ui("filterAll"), n: C.work.length }].concat(
      DISC_ORDER.filter(function (k) { return C.disciplines[k]; }).map(function (k) {
        return { key: k, href: "#/" + k, label: t(C.disciplines[k].label),
                 n: C.work.filter(function (w) { return w.discipline === k; }).length };
      }));

    return '<section class="hero">' +
        '<div class="hero-mark"><img src="assets/img/logo.svg" alt="" width="132" height="116"></div>' +
        '<h1 class="display">' + esc(C.name) + "</h1>" +
        '<div class="lede"><p class="lead">' + esc(t(h.headline)) + "</p>" + paras(h.body) + "</div>" +
        '<p class="hero-links">' + linkInline("#/contact", ui("askPrice"), "is-accent") +
          linkInline("#/rates", ui("seePrices")) + "</p>" +
      "</section>" +

      '<section class="work" id="work" aria-labelledby="work-title">' +
        '<div class="section-head">' +
          '<h2 class="section-label" id="work-title">' + esc(ui("workHeading")) + "</h2>" +
          '<div class="filters">' + chips.map(function (c) {
            return '<a class="filter" data-chip href="' + c.href + '"' +
                   ((filter || "") === c.key ? ' aria-current="true"' : "") + ">" +
                   esc(c.label) + ' <span class="filter-n">' + c.n + "</span></a>";
          }).join('<span class="lang-sep" aria-hidden="true">/</span>') + "</div>" +
        "</div>" +
        '<div class="grid">' + items.map(function (w) { return card(w, C.work.indexOf(w)); }).join("") + "</div>" +
      "</section>" +

      '<section class="offer" aria-labelledby="offer-title">' +
        '<h2 class="section-label" id="offer-title">' + esc(ui("servicesHeading")) + "</h2>" +
        '<div class="disc-cards">' + DISC_ORDER.map(function (k, i) {
          var d = C.disciplines[k];
          if (!d) return "";
          return '<a class="disc-card" href="#/services/' + k + '">' +
                 '<span class="disc-card-n">' + pad(i + 1) + "</span>" +
                 '<span class="disc-card-t">' + esc(t(d.label)) + "</span>" +
                 '<span class="disc-card-b">' + esc(t(d.blurb) || "") + "</span>" +
                 '<span class="disc-card-a">' + arrow() + "</span></a>";
        }).join("") + "</div>" +
      "</section>" +

      ctaBlock();
  }

  function pageHead(title, intro) {
    return '<header class="page-head"><h1 class="display">' + esc(title) + "</h1>" +
           (intro ? '<div class="lede">' + paras(intro) + "</div>" : "") + "</header>";
  }

  function viewServices() {
    return pageHead(ui("servicesHeading")) +
      DISC_ORDER.map(function (k, di) {
        var d = C.disciplines[k];
        if (!d) return "";
        var mine = C.work.filter(function (w) { return w.discipline === k; }).length;
        return '<section class="disc" id="svc-' + k + '">' +
          '<h2 class="disc-title"><span class="disc-n">' + pad(di + 1) + "</span>" + esc(t(d.headline)) + "</h2>" +
          (d.blurb ? '<p class="meta">' + esc(t(d.blurb)) + "</p>" : "") +
          '<div class="lede">' + paras(d.intro) + "</div>" +
          '<div class="svc">' + (d.services || []).map(function (s, i) {
            return '<article class="svc-item">' +
              '<span class="svc-n">' + pad(i + 1) + "</span>" +
              '<div class="svc-body">' +
                "<h3>" + esc(t(s.title)) + "</h3>" +
                "<p>" + rich(t(s.body)) + "</p>" +
                (s.gets ? '<p class="svc-gets"><b>' + esc(ui("youGet")) + "</b> " + esc(t(s.gets)) + "</p>" : "") +
                (s.note ? '<p class="svc-note">' + esc(t(s.note)) + "</p>" : "") +
              "</div></article>";
          }).join("") + "</div>" +
          '<p class="links">' +
            (mine ? linkInline("#/" + k, ui("seeDiscWork", { x: t(d.label) })) : "") +
            linkInline("#/rates", ui("seePrices")) + "</p>" +
          "</section>";
      }).join("") +
      ctaBlock();
  }

  function viewRates() {
    var r = C.rates;
    if (!r) return viewMissing();
    return pageHead(t(r.headline), r.intro) +
      r.groups.map(function (grp) {
        return '<section class="rate-group"><h2 class="section-label">' + esc(t(grp.title)) + "</h2>" +
          '<div class="rate-list">' + grp.items.map(function (it) {
            var p = t(it.price);
            var num = /\d/.test(p);         // a number takes the currency; a word ("dm") stands alone
            return '<div class="rate-row"><span class="rate-name">' + esc(t(it.name)) + "</span>" +
                   '<span class="rate-note">' + esc(t(it.note) || "") + "</span>" +
                   '<span class="rate-price">' + esc(p) + (num ? " " + esc(r.unit || "") : "") + "</span></div>";
          }).join("") + "</div></section>";
      }).join("") +
      (r.note ? '<p class="rate-note-foot">' + rich(t(r.note)) + "</p>" : "") +
      ctaBlock();
  }

  function viewAbout() {
    var a = C.about;
    return '<div class="about">' +
        (a.cover ? '<figure class="about-photo"><span class="frame"><img src="' + esc(a.cover.src) + '" alt="' +
                   esc(t(a.cover.alt)) + '" decoding="async"></span></figure>' : "") +
        '<div class="about-text">' +
          '<h1 class="display">' + esc(t(a.headline)) + "</h1>" +
          '<div class="lede">' + paras(a.body) + "</div>" +
          (a.facts && a.facts.length ? '<dl class="rows">' + a.facts.map(function (f) {
             return '<div class="row"><dt>' + esc(t(f.k)) + "</dt><dd>" + esc(t(f.v)) + "</dd></div>";
           }).join("") + "</dl>" : "") +
          (a.cta ? '<p class="links">' + linkInline(a.cta.href, t(a.cta.label)) + "</p>" : "") +
        "</div>" +
      "</div>" +
      ctaBlock();
  }

  function viewGear() {
    var g = C.gear;
    if (!g) return viewMissing();
    return backLink("#/about", ui("navAbout")) +
      pageHead(t(g.headline), g.intro) +
      g.groups.map(function (grp) {
        return '<section class="gear-group"><h2 class="section-label">' + esc(t(grp.title)) + "</h2>" +
          '<div class="gear-list">' + grp.items.map(function (it) {
            var inner = '<span class="gear-name">' + esc(t(it.name)) + "</span>" +
                        '<span class="gear-note">' + esc(t(it.note) || "") + "</span>" +
                        '<span class="gear-link">' + (it.url ? arrow("out") : "") + "</span>";
            return it.url
              ? '<a class="gear-row" ' + linkAttrs(it.url) + ">" + inner + "</a>"
              : '<div class="gear-row">' + inner + "</div>";
          }).join("") + "</div></section>";
      }).join("") +
      ctaBlock();
  }

  function viewContact() {
    var c = C.contact;
    var rows = c.rows || [];
    // fastest first, whatever order the rows are written in
    var ORDER = ["instagram", "line", "phone", "mail"];
    var actions = rows.filter(function (r) { return contactKind(r); }).sort(function (a, b) {
      return ORDER.indexOf(contactKind(a)) - ORDER.indexOf(contactKind(b));
    });
    var details = rows.filter(function (r) { return !contactKind(r); });

    return pageHead(t(c.headline), c.intro) +
      '<div class="ix-list ix-big">' + actions.map(function (r) { return actionRow(r); }).join("") + "</div>" +

      (c.checklist ? '<section class="checklist"><h2 class="section-label">' + esc(ui("whatToSend")) + "</h2>" +
        "<ol>" + t(c.checklist).map(function (x, i) {
          return '<li><span class="svc-n">' + pad(i + 1) + "</span><span>" + esc(x) + "</span></li>";
        }).join("") + "</ol></section>" : "") +

      (details.length ? '<section class="details"><h2 class="section-label">' + esc(ui("details")) + "</h2>" +
        '<dl class="rows">' + details.map(function (r) {
          var v = r.href ? '<a class="link-plain" ' + linkAttrs(r.href) + ">" + esc(t(r.v)) + "</a>" : esc(t(r.v));
          return '<div class="row"><dt>' + esc(t(r.k)) + "</dt><dd>" + v + "</dd></div>";
        }).join("") + "</dl></section>" : "");
  }

  var lastHome = "#/";              // so "all work" returns to the filter you came from

  function viewProject(w) {
    var i = C.work.indexOf(w);
    var prev = C.work[(i - 1 + C.work.length) % C.work.length];
    var next = C.work[(i + 1) % C.work.length];
    var d = C.disciplines[w.discipline];
    var photos = photoCount(w), reels = reelCount(w);
    var meta = [d ? t(d.label) : "", t(w.kind), w.date || w.year, t(w.role),
                photos ? ui("photos", { n: photos }) : "",
                reels ? ui("reels", { n: reels }) : ""].filter(Boolean).map(esc).join(" &nbsp;·&nbsp; ");

    function pagerRow(p, dir) {
      return '<a class="ix" href="#/work/' + esc(p.slug) + '">' +
             '<span class="ix-k">' + (dir === "prev" ? arrow("back") + " " : "") + esc(ui(dir)) + "</span>" +
             '<span class="ix-v">' + esc(t(p.client)) + "</span>" +
             '<span class="ix-a">' + (dir === "next" ? arrow() : "") + "</span></a>";
    }

    return backLink(lastHome, ui("backToWork")) +
      '<header class="project-head">' +
        '<h1 class="display">' + esc(t(w.title) || t(w.client)) + "</h1>" +
        (meta ? '<p class="meta">' + meta + "</p>" : "") +
        (w.blurb ? '<div class="lede">' + paras(w.blurb) + "</div>" : "") +
      "</header>" +
      '<div class="media">' + renderMedia(w.media) + "</div>" +
      (C.work.length > 1 ? '<nav class="ix-list pager" aria-label="Projects">' +
        pagerRow(next, "next") + pagerRow(prev, "prev") + "</nav>" : "") +
      ctaBlock();
  }

  function viewMissing() {
    return pageHead(ui("notFoundTitle"), ui("notFoundBody")) +
      '<p class="links">' + linkInline("#/", ui("backHome")) + "</p>";
  }

  /* -------------------------------------------------------------- router */

  function resolve(hash) {
    var parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    var name = " — " + C.name;
    var p0 = parts[0];

    if (!p0 || p0 === "work" && !parts[1])
      return { kind: "home", nav: "work", html: viewHome(""), title: C.name + " — " + t(C.tagline) };

    if (C.disciplines[p0] && !parts[1])          // old #/film and #/photo links
      return { kind: "home", nav: "work", html: viewHome(p0), title: t(C.disciplines[p0].label) + name };

    if (p0 === "work") {
      var w = find(parts[1]);
      if (w) return { kind: "project", nav: "work", html: viewProject(w), title: t(w.client) + name, slug: w.slug };
    }
    if (p0 === "services")
      return { kind: "services", nav: "services", html: viewServices(), title: ui("navServices") + name,
               anchor: parts[1] && C.disciplines[parts[1]] ? "svc-" + parts[1] : null };
    if (p0 === "rates")   return { kind: "rates",   nav: "rates",   html: viewRates(),   title: ui("navRates") + name };
    if (p0 === "about")   return { kind: "about",   nav: "about",   html: viewAbout(),   title: ui("navAbout") + name };
    if (p0 === "gear")    return { kind: "gear",    nav: "about",   html: viewGear(),    title: ui("navGear") + name };
    if (p0 === "contact") return { kind: "contact", nav: "contact", html: viewContact(), title: ui("navContact") + name };

    return { kind: "missing", nav: "", html: viewMissing(), title: ui("notFoundTitle") + name };
  }

  // Remember how far down each page was, on its own history entry, so the
  // browser's back button lands exactly where you left — and a fresh link
  // (no saved position) starts at the top.
  var saveTimer;
  window.addEventListener("scroll", function () {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      if (!viewer.hidden) return;
      try {
        var st = history.state && typeof history.state === "object" ? history.state : {};
        history.replaceState(Object.assign({}, st, { y: window.scrollY }), "");
      } catch (e) { /* some embedded browsers refuse */ }
    }, 160);
  }, { passive: true });

  var last = null;       // the page we're leaving
  var booted = false;

  function route(opts) {
    opts = opts || {};
    var hash = location.hash || "#/";
    if (!/^#\//.test(hash)) hash = "#/";        // a stray #main etc. — show home
    var page = resolve(hash);
    var from = last;

    // switching filters, or the language, keeps you where you are
    var keep = opts.keep || (from && from.kind === "home" && page.kind === "home");

    view.innerHTML = page.html;
    document.title = page.title;
    markActive(page.nav);
    if (page.kind === "home") lastHome = hash === "#/work" ? "#/" : hash;

    // each top-level block rises in turn, as it always has — but straight
    // away, with no transition to sit through first
    if (!REDUCED && !keep) {
      var kids = view.children;
      for (var k = 0; k < kids.length; k++) kids[k].style.setProperty("--i", Math.min(k, 8));
      view.classList.remove("enter");
      void view.offsetWidth;
      view.classList.add("enter");
    }

    if (!keep) {
      var saved = history.state && typeof history.state.y === "number" ? history.state.y : null;
      var target = page.anchor && document.getElementById(page.anchor);
      var card = page.kind === "home" && from && from.slug &&
                 view.querySelector('.card[data-slug="' + from.slug + '"]');
      if (saved != null) window.scrollTo(0, saved);
      else if (target) target.scrollIntoView();
      else if (card) card.scrollIntoView({ block: "center" });
      else window.scrollTo(0, 0);
      if (booted) main.focus({ preventScroll: true });   // screen readers hear the new page
    }

    processInstagram();
    last = page;
    booted = true;
  }

  // Filter chips replace the address rather than adding to history, so the
  // back button leaves the page instead of stepping through filters.
  view.addEventListener("click", function (e) {
    var chip = e.target.closest && e.target.closest("[data-chip]");
    if (!chip) return;
    e.preventDefault();
    if (location.hash !== chip.getAttribute("href")) location.replace(chip.getAttribute("href"));
  });

  skip.addEventListener("click", function (e) {
    e.preventDefault();
    main.focus();
  });

  // Instagram embeds. The script is fetched the first time a page needs it,
  // never on pages without one. Every route paints fresh blockquotes, so
  // process() runs again after each paint.
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

  /* -------------------------------------------------------- photo viewer */
  /* Tap a photo for full screen. Swipe or arrow keys to move, Esc or the
     phone's back gesture to close — it adds a history step so "back" closes
     the photo instead of leaving the project. */

  var viewer   = $("viewer");
  var vImg     = $("viewer-img");
  var vCount   = $("viewer-count");
  var vClose   = $("viewer-close");
  var vPrev    = $("viewer-prev");
  var vNext    = $("viewer-next");
  var vIndex   = 0;
  var vOpener  = null;

  function showPhoto(i) {
    if (!gallery.length) return;
    vIndex = (i + gallery.length) % gallery.length;
    vImg.src = gallery[vIndex].src;
    vImg.alt = gallery[vIndex].alt;
    vCount.textContent = (vIndex + 1) + " / " + gallery.length;
    vPrev.hidden = vNext.hidden = gallery.length < 2;
  }

  function openViewer(i, opener) {
    vOpener = opener;
    showPhoto(i);
    viewer.hidden = false;
    document.documentElement.classList.add("is-locked");
    try { history.pushState({ viewer: true, y: window.scrollY }, ""); } catch (e) { /* ignore */ }
    vClose.focus();
  }

  function hideViewer() {
    if (viewer.hidden) return;
    viewer.hidden = true;
    vImg.removeAttribute("src");
    document.documentElement.classList.remove("is-locked");
    if (vOpener) vOpener.focus({ preventScroll: true });
  }

  function closeViewer() {
    if (history.state && history.state.viewer) history.back();   // popstate hides it
    else hideViewer();
  }

  window.addEventListener("popstate", function () {
    if (!viewer.hidden && !(history.state && history.state.viewer)) hideViewer();
  });

  view.addEventListener("click", function (e) {
    var z = e.target.closest && e.target.closest("[data-zoom]");
    if (z) openViewer(+z.getAttribute("data-zoom"), z);
  });

  vClose.addEventListener("click", closeViewer);
  vPrev.addEventListener("click", function () { showPhoto(vIndex - 1); });
  vNext.addEventListener("click", function () { showPhoto(vIndex + 1); });
  viewer.addEventListener("click", function (e) { if (e.target === viewer) closeViewer(); });

  document.addEventListener("keydown", function (e) {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowLeft") showPhoto(vIndex - 1);
    else if (e.key === "ArrowRight") showPhoto(vIndex + 1);
    else if (e.key === "Tab") {                 // keep focus inside the viewer
      var f = [vClose, vPrev, vNext].filter(function (b) { return !b.hidden; });
      var at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  var touchX = null, touchY = null;
  viewer.addEventListener("touchstart", function (e) {
    touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
  }, { passive: true });
  viewer.addEventListener("touchend", function (e) {
    if (touchX == null) return;
    var dx = e.changedTouches[0].clientX - touchX, dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showPhoto(vIndex + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) closeViewer();          // swipe down to close
    touchX = touchY = null;
  }, { passive: true });

  /* ------------------------------------------------------- tap to copy */
  // For ids that have no reliable link of their own — a LINE id only opens
  // from a link if the owner has made it searchable, but a copied id can
  // always be pasted into LINE's search. The clipboard API needs https,
  // which GitHub Pages is; the textarea fallback covers older browsers.
  function copyText(text, btn) {
    var label = btn.querySelector(".copy-label");
    function done() {
      btn.classList.add("is-copied");
      if (label) label.textContent = ui("copied");
      clearTimeout(btn._reset);
      btn._reset = setTimeout(function () {
        btn.classList.remove("is-copied");
        if (label) label.textContent = ui("tapToCopy");
      }, 2600);
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
    var b = e.target.closest && e.target.closest(".copy-btn");
    if (b) copyText(b.getAttribute("data-copy"), b);
  });

  /* ---------------------------------------------------------------- boot */

  document.documentElement.setAttribute("lang", LANG);
  buildChrome();
  window.addEventListener("hashchange", function () { route(); });
  route();
})();
