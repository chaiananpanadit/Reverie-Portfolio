/* ==================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT

   The site is bilingual. Any text a visitor reads is written as a pair:

       { en: "english", th: "ไทย" }

   A plain string with no pair shows in BOTH languages — which is what you
   want for names that shouldn't be translated (emails, "fabfilter",
   "sony zv-e10", "reverie").

   No build step: save the file and refresh the browser.
   Anything marked  // TODO  is waiting for your words.
================================================================== */

const CONTENT = {

  /* ---------------------------------------------------------------- brand */

  name: "reverie",
  tagline:   { en: "film · photo", th: "วิดีโอ · ภาพ" },
  location:  { en: "lampang, thailand",    th: "ลำปาง ประเทศไทย" },
  copyright: "© 2026 reverie",

  /* ------------------------------------------------------------ ui labels */
  /* The words the site itself needs — buttons, section headings, the 404.
     {x} is replaced with a discipline name, {n} with a number. */

  ui: {
    en: {
      navWork: "work", navServices: "services", navRates: "prices",
      navAbout: "about", navContact: "contact", navGear: "gear",
      skip: "skip to content", themeToDark: "switch to dark", themeToLight: "switch to light",
      filterAll: "all", workHeading: "selected work", servicesHeading: "what i do",
      seeWork: "see the work", seePrices: "see prices", askPrice: "ask for a price",
      seeDiscWork: "see the {x} work", youGet: "you get", next: "next", prev: "previous",
      close: "close", backToWork: "all work", photos: "{n} photos", reels: "{n} reels",
      reelTile: "instagram reel", watchInstagram: "watch on instagram",
      ctaTitle: "got a project?",
      ctaBody: "dates, place, rough budget. instagram or line is fastest — replies within a day.",
      dmInstagram: "dm on instagram", allContacts: "all contacts", fastest: "fastest",
      tapToCopy: "tap to copy", copied: "copied — paste it in line",
      whatToSend: "what to send", details: "details",
      notFoundTitle: "NOT HERE", notFoundBody: "that page doesn't exist (yet).", backHome: "back to the start"
    },
    th: {
      navWork: "ผลงาน", navServices: "บริการ", navRates: "ราคา",
      navAbout: "เกี่ยวกับ", navContact: "ติดต่อ", navGear: "อุปกรณ์",
      skip: "ข้ามไปเนื้อหา", themeToDark: "เปลี่ยนเป็นธีมมืด", themeToLight: "เปลี่ยนเป็นธีมสว่าง",
      filterAll: "ทั้งหมด", workHeading: "ผลงาน", servicesHeading: "รับงานอะไรบ้าง",
      seeWork: "ดูผลงาน", seePrices: "ดูเรทราคา", askPrice: "ทักมาถามราคา",
      seeDiscWork: "ดูงาน{x}", youGet: "ได้อะไร", next: "ถัดไป", prev: "ก่อนหน้า",
      close: "ปิด", backToWork: "ผลงานทั้งหมด", photos: "{n} รูป", reels: "{n} คลิป",
      reelTile: "รีลบน instagram", watchInstagram: "ดูบน instagram",
      ctaTitle: "มีงานให้ถ่ายไหม",
      ctaBody: "บอกวัน สถานที่ งบคร่าว ๆ ทักไอจีหรือไลน์เร็วสุด ตอบในวัน",
      dmInstagram: "ทักไอจี", allContacts: "ช่องทางอื่น", fastest: "เร็วสุด",
      tapToCopy: "แตะเพื่อคัดลอก", copied: "คัดลอกแล้ว — วางในไลน์ได้เลย",
      whatToSend: "ส่งอะไรมาบ้าง", details: "รายละเอียด",
      notFoundTitle: "ไม่มีหน้านี้", notFoundBody: "หน้านี้ยังไม่มี", backHome: "กลับหน้าแรก"
    }
  },

  /* -------------------------------------------------------------- landing */

  home: {
    /* the photo across the top of the home page. Delete the line and the
       small K mark shows there instead. */
    cover: { src: "assets/media/covers/home.jpg",
             alt: "Reverie Production — two of the crew with cameras in the school courtyard, fisheye" },
    /* under the REVERIE heading: one line that says what this is, one
       short paragraph, then straight into the work */
    headline: { en: "film and photo, made in lampang.", th: "รับถ่ายวิดีโอ ถ่ายภาพ ลำปาง" },
    body: {
      en: "one person who shoots it, cuts it, scores it and mixes it. no agency layer, no waiting three weeks for a first draft.",
      th: "ถ่ายเอง ตัดเอง ทำเพลงเอง มิกซ์เอง คนเดียวจบ ไม่มีคนกลาง ไม่ต้องรอ 3 อาทิตย์กว่าจะได้ดูดราฟต์แรก"
    }
  },

  /* ---------------------------------------------------------- disciplines */

  disciplines: {

    /* ------------------------------------------------------------- FILM */
    film: {
      label:    { en: "film", th: "วิดีโอ" },
      headline: { en: "FILM", th: "วิดีโอ" },
      blurb:    { en: "moving image, start to finish", th: "ภาพเคลื่อนไหว ตั้งแต่ต้นจนจบ" },
      intro: {
        en: [
          "i direct, shoot, cut, grade and mix. that means one person carries the idea from the first frame to the final export, and nothing gets lost in a handover.",
          "small setups on purpose — a camera, fast glass, a light or two. it keeps the room calm and the day cheap."
        ],
        th: [
          "กำกับ ถ่าย ตัด เกรดสี มิกซ์เสียง ทำเองหมด ไอเดียเลยไม่หล่นหายระหว่างทาง ตั้งแต่เฟรมแรกยัน export ไฟล์สุดท้าย",
          "ตั้งใจ setup เล็ก ๆ กล้องตัวเดียว เลนส์ไว ๆ ไฟสักดวงสองดวง หน้ากองเลยชิล งบก็ไม่บาน"
        ]
      },
      services: [
        {
          title: { en: "vlog", th: "vlog" },
          body: {
            en: "personal camera op and editor for creators. travel days, launches, a normal week that needs to look like a story. i shoot it, cut it, and hand you something ready to upload.",
            th: "ตากล้อง + คนตัดส่วนตัวสำหรับครีเอเตอร์ ไปเที่ยว งานเปิดตัว หรือชีวิตธรรมดาที่อยากให้ออกมาเป็น story ถ่ายให้ ตัดให้ ได้ไฟล์ไปลงได้เลย"
          },
          gets: { en: "1 main edit + 2 vertical cuts", th: "คลิปหลัก 1 ตัว + คลิปแนวตั้ง 2 ตัว" },
          note: { en: "half day or full day · same-week turnaround", th: "ครึ่งวัน / เต็มวัน · ได้งานในอาทิตย์นั้นเลย" }
        },
        {
          title: { en: "short film", th: "หนังสั้น" },
          body: {
            en: "narrative and documentary shorts. script breakdown, shot list, shoot, edit, colour and sound mix. bring a finished script or a half-formed idea — both work.",
            th: "หนังสั้นทั้งแนวเล่าเรื่องและสารคดี แตกบท ทำ shot list ถ่าย ตัด เกรด มิกซ์ มีบทมาครบแล้ว หรือมีแค่ไอเดียในหัว ได้หมด"
          },
          gets: { en: "festival-ready master + trailer cut", th: "ไฟล์ master พร้อมส่งเทศกาล + trailer" },
          note: { en: "scoped per project · usually 2–5 shoot days", th: "คิดราคาตามงาน · ปกติถ่าย 2–5 วัน" }
        },
        {
          title: { en: "school event", th: "งานโรงเรียน" },
          body: {
            en: "sports days, concerts, graduations, open houses. multi-cam where it matters, roaming where it doesn't. fast recap cuts while the day still feels fresh.",
            th: "กีฬาสี คอนเสิร์ต งานจบ open house ตั้งหลายกล้องตรงจุดสำคัญ ที่เหลือเดินเก็บบรรยากาศ ตัด recap ไว ๆ ตอนทุกคนยังอินอยู่"
          },
          gets: { en: "3–5 min recap + full-length record + stills", th: "recap 3–5 นาที + ไฟล์เต็ม + ภาพนิ่ง" },
          note: { en: "single day · recap delivered in 48 hours", th: "วันเดียว · ได้ recap ใน 48 ชม." }
        },
        {
          title: { en: "live session / studio session", th: "live session / studio session" },
          body: {
            en: "bands and solo artists, played live. multi-angle video cut to a proper audio mix, not the camera mic — i record and mix the sound as part of the job.",
            th: "วงหรือศิลปินเดี่ยว เล่นสด ถ่ายหลายมุม ตัดเข้ากับเสียงที่มิกซ์จริง ไม่ใช่เสียงไมค์กล้อง อัดเสียง + มิกซ์ให้ด้วยในตัว"
          },
          gets: { en: "one song per setup, video + mixed audio", th: "เพลงละหนึ่งเซ็ต ได้ทั้งวิดีโอและเสียงที่มิกซ์แล้ว" },
          note: { en: "in your room or mine · add songs at a reduced rate", th: "ห้องซ้อมหรือสตูดิโอก็ได้ · เพลงต่อไปคิดถูกลง" }
        }
      ]
    },

    /* ------------------------------------------------------------ PHOTO */
    photo: {
      label:    { en: "photo",  th: "ภาพ" },
      headline: { en: "PHOTO",  th: "ภาพ" },
      blurb:    { en: "stills that don't look stock", th: "รูปที่ไม่ใช่ฟีลภาพสต็อก" },
      cover: { src: "assets/media/photo/night/09183.jpg", alt: "Sitting on the bank at night, lights broken up on the river" },
      intro: {
        en: [
          "digital and 35mm film, studio or on location. i shoot tight sets rather than huge galleries — fewer frames, all of them usable.",
          "every delivered image is graded and retouched. you get the finished set, not a contact sheet to pick through."
        ],
        th: [
          "ถ่ายทั้ง digital และฟิล์ม 35mm ในสตูดิโอหรือ on location เน้นเซ็ตกระชับ ไม่ได้ปล่อยรูปเป็นร้อย ได้น้อยกว่าแต่ใช้ได้ทุกใบ",
          "ทุกรูปที่ส่ง เกรดสี + รีทัชมาแล้ว ได้เป็นเซ็ตที่เสร็จพร้อมใช้ ไม่ใช่กองไฟล์ให้ไปนั่งคัดเอง"
        ]
      },
      services: [
        {
          title: { en: "short photoshoot", th: "ถ่ายสั้น" },
          body: {
            en: "a focused one-to-two hour session. portraits, a product drop, a fit, a headshot refresh. one location, one look, in and out.",
            th: "เซสชันสั้น ๆ 1–2 ชั่วโมง portrait ของดรอปใหม่ ลุคประจำวัน หรือเปลี่ยนรูปโปรไฟล์ ที่เดียว ลุคเดียว จบไว"
          },
          gets: { en: "15–25 retouched images", th: "ภาพรีทัชแล้ว 15–25 ใบ" },
          note: { en: "1–2 hours · delivered in 3 days", th: "1–2 ชั่วโมง · ส่งงานใน 3 วัน" }
        },
        {
          title: { en: "social media content shoot", th: "ถ่ายคอนเทนต์ลงโซเชียล" },
          body: {
            en: "a batch shoot that fills your feed for a month. we plan the grid first, then shoot stills and verticals back to back so the whole set hangs together.",
            th: "ถ่ายรวดเดียว ลงได้ทั้งเดือน วางฟีดก่อน แล้วถ่ายรูปกับคลิปแนวตั้งต่อกันไปเลย ทั้งเซ็ตเลยดูไปทางเดียวกัน"
          },
          gets: { en: "40+ stills, crops for feed / story / thumbnail", th: "รูป 40+ ใบ ครอปไว้ให้แล้วทั้ง feed / story / ปก" },
          note: { en: "half day · monthly retainer available", th: "ครึ่งวัน · รับเป็นรายเดือนได้" }
        }
        /* TODO — add more photo services here when you decide them. Copy the
           block above, change the words. e.g. event coverage, 35mm film,
           product on white, lookbook. */
      ]
    },

  },

  /* -------------------------------------------------------------- contact */

  contact: {
    headline: { en: "SAY HELLO", th: "ทักมาได้เลย" },
    intro: {
      en: "tell me the dates, the place, what you need out the other end, and roughly the budget. instagram or line is fastest — i reply within a day.",
      th: "บอกวัน สถานที่ อยากได้งานแบบไหน แล้วก็งบคร่าว ๆ ทักไอจีหรือไลน์เร็วสุด ตอบภายในวันแน่นอน"
    },
    /* the "what to send" list under the buttons */
    checklist: {
      en: ["the date (or dates)", "where it is", "what you want at the end — photos, a clip, a full edit", "a rough budget"],
      th: ["วันไหน", "ที่ไหน", "อยากได้อะไร รูป คลิปสั้น หรือตัดเต็ม", "งบประมาณคร่าว ๆ"]
    },
    /* rows that link to instagram, line (`copy: true`), a phone number or an
       email become the big buttons at the top of the contact page, fastest
       first. Everything else is listed underneath as details. */
    rows: [
      { k: "instagram",                        v: "@reverie._exe",                    href: "https://instagram.com/reverie._exe" },
      { k: { en: "email",  th: "อีเมล" },      v: "chaiananpanadit.direct@gmail.com", href: "mailto:chaiananpanadit.direct@gmail.com" },
      /* `copy: true` makes the id tap-to-copy, which works whatever your line
         privacy settings are. A direct link (href: "https://line.me/ti/p/~Anan19082553")
         would open line straight away, but only if the id is set to be
         searchable — test that on your own phone before swapping it in. */
      { k: { en: "line",   th: "ไลน์" },       v: "Anan19082553", copy: true },
      { k: { en: "phone",  th: "เบอร์โทร" },   v: "+66 64 893 1485",                  href: "tel:+66648931485" },
      { k: { en: "based",  th: "อยู่ที่" },     v: { en: "lampang, thailand", th: "ลำปาง ประเทศไทย" } },
      { k: { en: "rates",  th: "ราคา" },       v: { en: "see the price rate", th: "ดูเรทราคา" }, href: "#/rates" },
      { k: { en: "area",   th: "พื้นที่" },     v: { en: "all of lampang · chiang mai", th: "ทั่วลำปาง · เชียงใหม่" } },
      { k: { en: "travel", th: "เดินทาง" },    v: { en: "free anywhere in lampang. chiang mai adds travel, charged both ways.", th: "ในลำปางไม่คิดค่าเดินทาง ไปเชียงใหม่คิดค่าเดินทางไป-กลับ" } }
    ]
  },

  /* ---------------------------------------------------------------- about */

  about: {
    headline: { en: "ABOUT", th: "เกี่ยวกับ" },
    /* a 1200px copy of portrait.jpg (the 4.3 MB original is left untouched) */
    cover: { src: "assets/media/photo/portrait-web.jpg", alt: "Chaianan Panadit" },
    body: {
      en: [
        "my name is <b>chaianan panadit</b>. call me <b>vi</b> — it's the middle of ri<em>(vi)</em>ère, and it stuck.",
        "reverie is me, and it started the way these things usually do — a borrowed camera, a cracked daw, and no idea what any of the buttons did.",
        "what stuck was liking all of it. most people pick a lane: shooter, editor, colourist, producer, mixer. i kept doing whatever the project needed next until i could do the whole chain. so when you hire me for a film, the score isn't outsourced. when you hire me for a mix, i can hear where the edit wants to breathe.",
        "i'm still at school — bunyawat, in lampang — and running this around it. that's not a disclaimer. it means i answer messages the same day, i'll take the brief nobody else wants, and i'd rather do forty interesting jobs than four expensive boring ones.",
        "bring me the weird one."
      ],
      /* TODO — swap the latin name below for your name written in thai */
      th: [
        "ชื่อ <b>chaianan panadit</b> เรียก <b>vi</b> ก็ได้ มาจากตรงกลางคำว่า ri<em>(vi)</em>ère เรียกไปเรียกมาเลยติด",
        "reverie มีอยู่คนเดียวนี่แหละ เริ่มแบบที่ใครหลายคนเริ่ม ยืมกล้องเขามา โหลด DAW มาลองเล่น แล้วก็ไม่รู้เลยว่าปุ่มไหนทำอะไร",
        "ที่ติดคือชอบมันทุกส่วน คนส่วนใหญ่เลือกสายเดียว ตากล้อง คนตัด คนเกรดสี โปรดิวเซอร์ คนมิกซ์ แต่ทำทุกอย่างที่งานต้องการไปเรื่อย ๆ จนทำได้ครบทั้งสาย จ้างทำหนัง เพลงประกอบก็ไม่ต้องจ้างใครเพิ่ม จ้างมิกซ์ ก็ฟังออกว่าตรงไหนควรเว้นจังหวะ",
        "ตอนนี้ยังเรียนอยู่ที่บุญวาทย์ ลำปาง แล้วรับงานควบไปด้วย ไม่ได้บอกให้เห็นใจนะ แต่แปลว่าตอบแชทวันต่อวัน งานที่คนอื่นไม่รับก็รับ แล้วก็ขอทำงานสนุก ๆ สี่สิบงาน ดีกว่างานแพงแต่น่าเบื่อสี่งาน",
        "มีงานแปลก ๆ เอามาเลย"
      ]
    },
    facts: [
      { k: { en: "name",       th: "ชื่อ" },        v: "chaianan panadit (vi)" },        // TODO thai spelling
      { k: { en: "based",      th: "อยู่ที่" },      v: { en: "lampang, thailand", th: "ลำปาง ประเทศไทย" } },
      { k: { en: "studying",   th: "เรียนที่" },     v: { en: "bunyawat, lampang", th: "บุญวาทย์ ลำปาง" } },
      { k: { en: "works",      th: "ทำ" },          v: { en: "film · photo", th: "วิดีโอ · ภาพ" } },
      { k: { en: "area",       th: "พื้นที่" },      v: { en: "all of lampang · chiang mai", th: "ทั่วลำปาง · เชียงใหม่" } },
      { k: { en: "travel",     th: "เดินทาง" },     v: { en: "chiang mai charged both ways", th: "ไปเชียงใหม่คิดค่าเดินทางไปกลับ" } },
      { k: { en: "turnaround", th: "ระยะเวลา" },    v: { en: "days, not weeks", th: "เป็นวัน ไม่ใช่เป็นอาทิตย์" } },
      { k: { en: "crew size",  th: "ทีม" },         v: { en: "one (more on request)", th: "คนเดียว (เพิ่มได้ถ้าจำเป็น)" } },
      { k: { en: "languages",  th: "ภาษา" },        v: { en: "thai, english", th: "ไทย, อังกฤษ" } }
    ],
    cta: { label: { en: "SEE THE GEAR", th: "ดูอุปกรณ์" }, href: "#/gear" }
  },

  /* ----------------------------------------------------------------- gear */

  gear: {
    headline: { en: "GEAR", th: "อุปกรณ์" },
    intro: {
      en: "not a shopping list — this is everything that actually gets used. small kit, known deeply, rather than a locker full of things i'd have to look up.",
      th: "ไม่ใช่ wishlist นี่คือของที่ใช้จริงทุกชิ้น ของไม่เยอะแต่รู้จักดีทุกตัว ดีกว่ามีเต็มตู้แล้วต้องมานั่งเปิดคู่มือ"
    },
    groups: [
      {
        title: { en: "camera", th: "กล้อง" },
        items: [
          { name: "sony zv-e10",
            note: { en: "aps-c mirrorless · the body everything hangs off", th: "mirrorless aps-c · ตัวหลัก ทุกอย่างต่อจากตัวนี้" },
            url: "https://www.sony.com/electronics/interchangeable-lens-cameras/zv-e10" }
        ]
      },
      {
        title: { en: "lenses", th: "เลนส์" },
        items: [
          { name: "50mm f/1.8 prime",
            note: { en: "portraits and low light · the one that makes it look expensive", th: "portrait กับที่แสงน้อย · ตัวที่ทำให้รูปดูแพง" },
            url: "https://www.sony.com/electronics/camera-lenses" },
          { name: "anamorphic 1.33x 50mm",
            note: { en: "2.4:1 squeeze · oval flares, wide frame, no crop in post", th: "บีบ 2.4:1 · แฟลร์รี ภาพกว้าง ไม่ต้องครอปทีหลัง" } },
          { name: "16-50mm f/3.5-5.6 oss",
            note: { en: "power zoom · run-and-gun, vlog wide, always on the body", th: "power zoom · ถ่ายไว ถ่าย vlog มุมกว้าง ติดกล้องตลอด" },
            url: "https://www.sony.com/electronics/camera-lenses" },
          { name: "75-300mm f/4.5-5.6",
            note: { en: "the long end · compression, stage, sport, anything i can't walk up to", th: "ช่วงเทเล · บีบระยะ งานเวที กีฬา อะไรที่เดินเข้าไปใกล้ไม่ได้" } }
        ]
      },
      {
        title: { en: "rig & support", th: "ริกและขาตั้ง" },
        items: [
          { name: "smallrig cage",
            note: { en: "keeps the body rigid and gives everything a mounting point", th: "ล็อกบอดี้ให้นิ่ง มีจุดไว้ต่ออุปกรณ์อื่น" },
            url: "https://www.smallrig.com" },
          { name: "smallrig handlebar",
            note: { en: "top handle · low angles, high angles, long handheld days", th: "ด้ามจับด้านบน · มุมต่ำ มุมสูง ถือยาว ๆ ทั้งวัน" },
            url: "https://www.smallrig.com" },
          { name: "camera stand",
            note: { en: "tripod work — interviews, locked-off, timelapse", th: "งานขาตั้ง สัมภาษณ์ ล็อกภาพ ไทม์แลปส์" } },
          { name: "battery kit",
            note: { en: "spares and charger · enough to shoot a full day without hunting for a socket", th: "แบตสำรองกับที่ชาร์จ · พอถ่ายทั้งวันโดยไม่ต้องหาปลั๊ก" } }
        ]
      },
      {
        title: { en: "post — image & video", th: "ตัดต่อ ภาพและวิดีโอ" },
        items: [
          { name: "davinci resolve",
            note: { en: "edit, colour grade and the fairlight mix, all in one project", th: "ตัด เกรดสี แล้วก็มิกซ์ใน fairlight จบในโปรเจกต์เดียว" },
            url: "https://www.blackmagicdesign.com/products/davinciresolve" },
          { name: "photoshop",
            note: { en: "retouch and composite", th: "รีทัชกับตัดต่อภาพ" },
            url: "https://www.adobe.com/products/photoshop.html" },
          { name: "lightroom",
            note: { en: "culling, raw development, batch grading a full shoot", th: "คัดภาพ ล้างไฟล์ raw เกรดทั้งกองรวดเดียว" },
            url: "https://www.adobe.com/products/photoshop-lightroom.html" },
          { name: "touchdesigner",
            note: { en: "realtime visuals and generative content for live shows", th: "visual เรียลไทม์ + generative content สำหรับงานโชว์สด" },
            url: "https://derivative.ca" }
        ]
      },
      {
        title: { en: "daws", th: "daw" },
        items: [
          { name: "fl studio",
            note: { en: "writing and beats — fastest from idea to sound", th: "แต่งเพลงกับทำบีต — จากไอเดียไปเป็นเสียงเร็วสุด" },
            url: "https://www.image-line.com" },
          { name: "reaper",
            note: { en: "tracking, editing and anything to picture", th: "อัด ตัด และงานที่ต้องทำกับภาพ" },
            url: "https://www.reaper.fm" },
          { name: "studio one",
            note: { en: "mixing and mastering", th: "มิกซ์กับมาสเตอร์" },
            url: "https://www.presonus.com" }
        ]
      },
      {
        title: { en: "plugins", th: "ปลั๊กอิน" },
        items: [
          { name: "neural dsp",
            note: { en: "the full archetype guitar line, plus vocal", th: "archetype กีตาร์ครบทุกตัว รวมถึงตัว vocal" },
            url: "https://neuraldsp.com" },
          { name: "fabfilter",
            note: { en: "eq, compression, reverb — the surgical end of a mix", th: "eq, comp, reverb — งานละเอียดของการมิกซ์" },
            url: "https://www.fabfilter.com" },
          { name: "oeksound",
            note: { en: "soothe and spiff · fixing sources instead of masking them", th: "soothe กับ spiff · แก้ที่ต้นทางแทนที่จะกลบ" },
            url: "https://oeksound.com" },
          { name: "serum",
            note: { en: "wavetable synth — most of the sound design starts here", th: "wavetable ซินธ์ — ซาวด์ดีไซน์ส่วนใหญ่เริ่มจากตรงนี้" },
            url: "https://xferrecords.com" },
          { name: "native instruments",
            note: { en: "komplete instruments and samplers", th: "เครื่องดนตรีกับแซมเพลอร์ใน komplete" },
            url: "https://www.native-instruments.com" },
          { name: "guitar rig 7",
            note: { en: "amp and pedal modelling", th: "จำลองแอมป์กับเอฟเฟกต์" },
            url: "https://www.native-instruments.com" },
          { name: "valhalla dsp",
            note: { en: "reverb and delay · the space everything sits in", th: "รีเวิร์บกับดีเลย์ · ให้เสียงมีมิติ มีที่ทาง" },
            url: "https://valhalladsp.com" }
        ]
      },
      {
        title: { en: "machines", th: "เครื่อง" },
        items: [
          { name: "desktop",
            note: { en: "ryzen 5 7500f · rtx 5060 · 32 gb ram — grading, rendering, big sessions", th: "ryzen 5 7500f · rtx 5060 · แรม 32 gb — เกรดสี เรนเดอร์ เซสชันหนัก ๆ" },
            url: "https://www.amd.com" },   // TODO confirm the ram
          { name: "laptop",
            note: { en: "hp victus · ryzen 7 · rtx 4050 — cutting on location", th: "hp victus · ryzen 7 · rtx 4050 — ตัดงานนอกสถานที่" },
            url: "https://www.hp.com" },
          { name: "macbook",
            note: { en: "m2 · 256 gb — writing, review, travel days", th: "m2 · 256 gb — เขียนงาน ดูงาน วันที่ต้องเดินทาง" },
            url: "https://www.apple.com/macbook-air" }
        ]
      }
    ]
  },

  /* ----------------------------------------------------------------- rates */
  /* `price` is a { en, th } pair only where it's words ("dm me"). A number is
     a plain string so it reads the same in both languages. */

  rates: {
    headline: { en: "PRICE RATE", th: "เรทราคา" },
    intro: {
      en: "ranges, not fixed numbers — where a job lands depends on how long it runs, how far it is and how much post it needs. tell me what you're making and i'll give you one number.",
      th: "เป็นช่วงราคานะ ไม่ใช่ราคาตายตัว ขึ้นกับงานยาวแค่ไหน ไกลแค่ไหน ต้องตัดต่อเยอะไหม เล่ามาก่อนว่าจะทำอะไร เดี๋ยวตีราคาให้เป๊ะ ๆ"
    },
    groups: [
      {
        title: { en: "photography", th: "ถ่ายภาพ" },
        items: [
          { name: { en: "photoshoot",   th: "ถ่ายภาพ" },
            note: { en: "whole set",    th: "ทั้งเซ็ต" }, price: "400–600" },
          { name: { en: "couple photo", th: "ถ่ายคู่" },
            note: { en: "whole set",    th: "ทั้งเซ็ต" }, price: "500–800" },
          { name: { en: "school event", th: "งานโรงเรียน" },
            note: { en: "full event",   th: "ทั้งงาน" },    price: "1,500–3,000" }
        ]
      },
      {
        title: { en: "videography", th: "ถ่ายวิดีโอ" },
        items: [
          { name: { en: "short clips",        th: "คลิปสั้น" },
            note: { en: "15–30 sec",          th: "15–30 วินาที" },     price: "300–600" },
          { name: { en: "content",            th: "คอนเทนต์" },
            note: { en: "3–10 min",           th: "3–10 นาที" },        price: "800–2,000" },
          { name: { en: "school event",       th: "งานโรงเรียน" },
            note: { en: "full event",         th: "ทั้งงาน" },          price: "2,000–4,000" },
          { name: { en: "live / studio session", th: "งานไลฟ์ / สตูดิโอ" },
            note: { en: "session video",      th: "วิดีโอเซสชัน" },      price: "1,500–3,000" },
          { name: { en: "music video",        th: "มิวสิกวิดีโอ" },
            note: { en: "footage only",       th: "เฉพาะฟุตเทจ" },       price: "1,200–2,500" }
        ]
      },
      {
        title: { en: "post", th: "งานตัดต่อ" },
        items: [
          { name: { en: "simple edit",  th: "ตัดต่อแบบง่าย" },
            note: { en: "on top of footage",  th: "บวกเพิ่มจากค่าถ่าย" },  price: "300–800" },
          { name: { en: "full session", th: "เซสชันเต็ม" },
            note: { en: "interview + colour grade", th: "สัมภาษณ์ + เกรดสี" }, price: "2,500–4,000" },
          { name: { en: "edited music video", th: "มิวสิกวิดีโอตัดจบ" },
            note: { en: "scope decides it", th: "แล้วแต่ขนาดงาน" },
            price: { en: "dm", th: "ทักมา" } }
        ]
      }
    ],
    unit: "THB",
    /* the line off the bottom of the price sheet */
    note: {
      en: "i'd rather do forty interesting jobs than four expensive boring ones. i'll take the brief nobody else wants. — rivi",
      th: "ขอทำงานสนุก ๆ สี่สิบงาน ดีกว่างานแพงแต่น่าเบื่อสี่งาน งานที่ไม่มีใครอยากรับ ส่งมาได้เลย — rivi"
    }
  },

  /* ----------------------------------------------------------------- work */
  /*
     Everything a visitor reads here is a { en, th } pair, same as the rest of
     the file — titles, sidebar labels, roles, blurbs and captions all switch
     with the language. Song titles, file paths and timecodes stay plain.

     `image alt` text is deliberately left in english. It's for screen readers
     and search engines rather than the page, and it isn't worth doubling.

       discipline : "film" | "photo"   <- which page it shows up on
       slug       : url id, lowercase, no spaces
       client     : the name on the grid card
       cover      : the grid card image (optional — without one the card is
                    set in type, which is how the sports day reels show)
       media      : any number of blocks —

         { type: "image",  src, alt, caption }
         { type: "images", items: [{src, alt}, ...] }         2-up grid
         { type: "video",  src, poster, caption }             local .mp4
         { type: "embed",  src, caption }                     youtube/vimeo
         { type: "instagram", src, caption }                  a post or reel url
         { type: "audio",  tracks: [{title, src, length}] }   track list
  */

  work: [
    {
      /* The real sports day — the film and its behind-the-scenes cut, both
         Instagram reels. Reels are vertical, so they stack rather than sit
         2-up: Instagram won't render an embed narrower than 326px.
         The share links' ?vrfl= / ?srtk= tracking tokens are stripped. */
      discipline: "film", slug: "sports-day",
      /* the film's YELLOW INWZA title card, set whole on black for the grid.
         Full-size originals: assets/media/film/sports-day/ */
      cover: "assets/media/covers/sports-day.jpg",
      client: { en: "sports day", th: "กีฬาสี" },
      title:  { en: "SPORTS DAY", th: "กีฬาสี" },
      year: "2026",
      kind:  { en: "school event", th: "งานโรงเรียน" },
      media: [
        { type: "instagram", src: "https://www.instagram.com/reel/DfUmoCqoihZ/",
          caption: { en: "the film", th: "ตัวงาน" } },
        { type: "instagram", src: "https://www.instagram.com/reel/DfUxTqUobTA/",
          caption: { en: "behind the scenes", th: "เบื้องหลัง" } }
      ]
    },
    /* "is it really you — live" was removed: it pointed at an mp4 that was
       never in the repo, so it rendered a dead player. The travel vlog went
       for the same reason — its YouTube embed rendered blank (id VjtrD92pC9s,
       if it comes back). */
    {
      discipline: "photo", slug: "portrait-night",
      cover: "assets/media/covers/portrait-night.jpg",
      client: { en: "portrait night", th: "พอร์ตเทรตกลางคืน" },
      title:  { en: "PORTRAIT NIGHT", th: "พอร์ตเทรตกลางคืน" },
      kind:   { en: "portrait series", th: "ชุดพอร์ตเทรต" },
      role:   { en: "photographer", th: "ช่างภาพ" },
      year: "2026",
      date: "16/08/2026",
      blurb: {
        en: [
          "one evening along the river in lampang — the old bridge, the walkway under it, and the festoon lights that come on at about seven.",
          "shot wide open on the 50mm, no flash, nothing added. the light is the light that was already there: bulbs strung over the water, and whatever the market was throwing off behind us."
        ],
        th: [
          "เย็นเดียวริมน้ำที่ลำปาง — สะพานเก่า ทางเดินใต้สะพาน แล้วก็ไฟสายที่ติดตอนประมาณทุ่มนึง",
          "เปิด f กว้างสุดกับเลนส์ 50 ไม่ใช้แฟลช ไม่เติมอะไรเลย แสงที่เห็นคือแสงที่มีอยู่ตรงนั้นจริง ๆ"
        ]
      },
      media: [
        { type: "image",  src: "assets/media/photo/night/09258.jpg", alt: "Standing in the colonnade, lights receding" },
        { type: "images", items: [
          { src: "assets/media/photo/night/09216.jpg", alt: "Under the bridge arch" },
          { src: "assets/media/photo/night/09222.jpg", alt: "Turning back toward the camera" }
        ] },
        { type: "images", items: [
          { src: "assets/media/photo/night/09273.jpg", alt: "" },
          { src: "assets/media/photo/night/09207.jpg", alt: "" }
        ] },
        { type: "image",  src: "assets/media/photo/night/09246.jpg", alt: "Light streaks across the frame" },
        { type: "image",  src: "assets/media/photo/night/09183.jpg", alt: "Sitting on the bank, reflections on the river" }
      ]
    },

    {
      discipline: "photo", slug: "night-streets",
      cover: "assets/media/covers/night-streets.jpg",
      client: { en: "night streets", th: "ถนนกลางคืน" },
      title:  { en: "NIGHT STREETS", th: "ถนนกลางคืน" },
      kind:   { en: "street series", th: "ชุดภาพถนน" },
      role:   { en: "photographer", th: "ช่างภาพ" },
      year: "2026",
      date: "18/08/2026",
      blurb: {
        en: [
          "the same town after midnight, when there is nobody left in it. iso 51200, hand held, grain everywhere — which is the point.",
          "signs, shutters, a cart going home. the town keeps its shape after the people go."
        ],
        th: [
          "เมืองเดิมหลังเที่ยงคืน ตอนที่ไม่เหลือใครแล้ว iso 51200 ถือมือ เกรนเต็มไปหมด แต่นั่นแหละที่อยากได้",
          "ป้าย ประตูม้วน รถเข็นที่กำลังกลับบ้าน คนกลับกันหมดแล้ว แต่เมืองยังอยู่ตรงนั้น"
        ]
      },
      media: [
        { type: "image",  src: "assets/media/photo/street/09359.jpg", alt: "A cart crossing under the traffic light" },
        { type: "images", items: [
          { src: "assets/media/photo/street/09364.jpg", alt: "Road signs, Thanon Hiway and Wat Shichum" },
          { src: "assets/media/photo/street/09369.jpg", alt: "A bulb under the eaves of a shophouse" }
        ] },
        { type: "image",  src: "assets/media/photo/street/09370.jpg", alt: "Two street lamps" },
        { type: "image",  src: "assets/media/photo/street/09318.jpg", alt: "Light broken up on the surface of the water" }
      ]
    },

    {
      /* TODO rename this — i called it "fishing days" from what's in the frames.
         Cut any image you don't want: delete its { src, alt } line. */
      discipline: "photo", slug: "fishing-days",
      cover: "assets/media/covers/fishing-days.jpg",
      client: { en: "fishing days", th: "วันไปตกปลา" },
      title:  { en: "FISHING DAYS", th: "วันไปตกปลา" },
      year: "2026",
      role:  { en: "photography", th: "ถ่ายภาพ" },
      kind:  { en: "documentary", th: "สารคดี" },
      blurb: {
        en: [
          "two afternoons on the water and the roads out to it. shot on a zv-e10, available light, no setups — just following the day.",
          "the kind of shooting that teaches you to be quick: nobody waits for you to change a lens."
        ],
        th: [
          "สองบ่ายริมน้ำ กับถนนระหว่างทางไปที่นั่น ถ่ายด้วย zv-e10 ใช้แสงที่มี ไม่จัดอะไรเลย ปล่อยให้วันมันพาไป",
          "งานแบบนี้สอนให้ไว เพราะไม่มีใครรอให้เปลี่ยนเลนส์เสร็จก่อน"
        ]
      },
      /* pairs are grouped landscape-with-landscape and portrait-with-portrait
         so the two-up rows line up. mixing the two leaves one side short. */
      media: [
        { type: "image",  src: "assets/media/photo/dsc08593.jpg", alt: "Road out through the rice fields" },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08620.jpg", alt: "Two rods over the water" },
          { src: "assets/media/photo/dsc08624.jpg", alt: "" }
        ] },
        { type: "image",  src: "assets/media/photo/dsc08617.jpg", alt: "Waiting on the bridge" },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08618.jpg", alt: "" },
          { src: "assets/media/photo/dsc08619.jpg", alt: "" }
        ] },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08626.jpg", alt: "" },
          { src: "assets/media/photo/dsc08627.jpg", alt: "" }
        ] },
        { type: "image",  src: "assets/media/photo/dsc08682.jpg", alt: "The catch" },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08628.jpg", alt: "" },
          { src: "assets/media/photo/dsc08665.jpg", alt: "" }
        ] },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08669.jpg", alt: "" },
          { src: "assets/media/photo/dsc08675.jpg", alt: "" }
        ] },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08625.jpg", alt: "" },
          { src: "assets/media/photo/dsc08595.jpg", alt: "" }
        ] },
        { type: "images", items: [
          { src: "assets/media/photo/dsc08676.jpg", alt: "" },
          { src: "assets/media/photo/dsc08678.jpg", alt: "" }
        ] },
        { type: "image",  src: "assets/media/photo/dsc08695.jpg", alt: "" }
      ]
    },
    {
      /* TODO — the blurb is only what's visible in the frames, because you
         haven't told me what the day was. Rewrite it, and add the rest of the
         take if you have it: copy an { type: "image", ... } line per frame. */
      discipline: "photo", slug: "festival",
      cover: "assets/media/covers/festival.jpg",
      client: { en: "festival",  th: "เทศกาล" },
      title:  { en: "FESTIVAL",  th: "เทศกาล" },
      year: "2026",
      role:  { en: "photographer", th: "ช่างภาพ" },
      kind:  { en: "event", th: "งานอีเวนต์" },
      blurb: {
        en: ["kayaks on the river, club jerseys, and a line of pennants over the water."],
        th: ["เรือคายัคบนแม่น้ำ เสื้อทีม กับธงราวเหนือผิวน้ำ"]
      },
      /* one portrait, one wide — kept as separate full-width blocks rather than
         a 2-up, because mixing orientations leaves one side of the row short */
      media: [
        { type: "image", src: "assets/media/photo/festival/festival-01.jpg",
          alt: "Two paddlers in club jerseys rafted alongside kayaks, pennants strung overhead" },
        { type: "image", src: "assets/media/photo/festival/festival-02.jpg",
          alt: "A paddler underway, seen from behind" }
      ]
    }
  ]
};
