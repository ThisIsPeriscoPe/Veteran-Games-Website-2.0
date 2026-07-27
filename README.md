# Veteran Games Website 2.0 · Design Handoff

Final desktop design, built as static HTML so every section can be read, measured and copied
directly. Built against **Slipstream by ThemeREX** (Elementor · The Events Calendar ·
WooCommerce · TRX Addons). Desktop only, designed at **1440px**.

Prepared by Periscope · July 2026

---

## Start here

1. Open `design/00-index.html` in a browser. It links every template.
2. Set your browser window to **1440px wide** (or wider). These are desktop comps, there are no
   responsive breakpoints in the prototype. Tablet and mobile behaviour is the theme's own.
3. Read the comment block at the top of any template before building it. Every file opens with a
   **SWAP LIST** telling you which assets are local, which still point at the live site, and what
   is still to be supplied.

---

## What is in the box

```
design/                 12 page templates + prototype index
  00-index.html         template index (not a site page, delete before build)
  01-home.html          … 12-volunteer.html
  css/vg.css            the entire design system (see below)
  js/vg.js              prototype only interactions, do not port
assets/
  img/hero/             page hero banners
  img/events/           event card images
  img/general/          section images
  logos/sponsors/       sponsor logo set, balanced 500x200 transparent PNGs
  logos/news/           press / As Featured In logo set, same treatment
  logos/VFC-main.png    presenting sponsor mark (rendered white via CSS filter)
  brand/palette.md      colour tokens
  brand/fonts.md        type rules
  video/                hero loop lives here once supplied
Fonts/                  Montserrat OTFs (licensed, supplied by client)
videos.md               every YouTube embed ID and where it is placed
```

---

## Page map

| Template | Page | Notes |
|---|---|---|
| 01 | Home | Hero video, events, founder video, obstacle carousel, impact, shop/donate band |
| 02 | Find My Event | TEC list view + filter bar, per event ticketing CTAs |
| 03 | The Experience | Full course video banner, 6 obstacle rows |
| 04 | Our Purpose | Mission, mental health stats, 3 year history timeline |
| 05 | Our Sponsors | Presenting / Gold / Series / Bronze / Community tiers |
| 06 | Become a Sponsor | Charter, values, promises, enquiry form |
| 07 | Donate | Donorbox embed, bank details, stats, testimonials |
| 08 | News & Media | Filterable post grid |
| 09 | Shop | WooCommerce grid, external checkout at shop.vsf.org.au |
| 10 | Contact | Details + form |
| 11 | Event Info | **Template**, populated with National Finals as the exemplar |
| 12 | Volunteer | Roles + volunteer EOI form |

**Navigation (exact, one line at 1440):**
Home · Find My Event · The Experience · Our Purpose · Show Your Support (Become a Sponsor /
Donate / Volunteer / Our Sponsors) · News & Media · Shop · Contact

---

## How to read the markup

Every section is preceded by a comment naming the **Slipstream / Elementor widget it maps to**:

```html
<!-- [Slipstream] Upcoming Events: The Events Calendar (TEC) events list, card layout, 3 up carousel -->
```

Build these with the named native widget. Nothing here needs a custom widget.

**The only approved custom arrangements** (native widgets composed in a custom layout, agreed
with the client):

- Home shop / donate CTA band
- Per event ticketing CTAs (Find My Event)
- Donorbox embeds (Donate)
- Compete / Spectate cards (Event Info)

---

## Design system · `design/css/vg.css`

Class driven, mirrors the section patterns above. Key pieces:

| Class | Purpose |
|---|---|
| `.sec` `.sec-coal` `.sec-light` | Section backgrounds: black, dark coal, off white |
| `.cta-band.cta-gold` | Gold CTA bands |
| `.btn` `.btn-gold` `.btn-line` `.btn-white` `.btn-sm` `.btn-row` | Buttons. All buttons stay on one line |
| `.card` `.card-img` `.card-bd` | Cards |
| `.ev-row` `.ev-date` | Event list rows, date stack |
| `.rail` `.rail-wide` | Horizontal carousels |
| `.vid` | 16:9 video embed frame |
| `.logos` `.logos-rail` `.logos-clean` `.logos-media` | Logo rails, light and dark treatments |
| `.plate` | Sponsor logo tiles (tier cards) |
| `.stat` `.stats` | Counters and stat blocks |
| `.tl` `.tl-item` | Timeline |
| `.acc` | Accordion (FAQs) |
| `.form` `.form-panel` `.row2` | Forms |
| `.kicker` `.rule` `.badge` `.meta` `.lead` | Type helpers |

Colours and type live in `assets/brand/palette.md` and `assets/brand/fonts.md`.
Gold accent is `#BFAE7A`. Headings max out at **ExtraBold 800**, Black is retired.

---

## Copy rules (please preserve)

- Always **"Veteran Games"**, never "the Games"
- **Teams of 8**. Do not mention reserves or teams of 10
- **No dashes of any kind** in body copy
- Spectator entry is **by donation**, never "free"
- "Presented by Veterans First Consulting" must appear early on Home and on Event Info
  (contractual)
- Race Roster = competitor entries · Eventbrite = spectators

---

## Assets

Sponsor and press logos are supplied as a **balanced set**: every file is 500x200 transparent PNG
with the mark optically centred, so a single CSS box renders them all at equal visual weight. Do
not substitute originals from the live site, they have baked backgrounds and inconsistent padding.

Logo geometry in the header and footer is deliberately locked to explicit width and height with
`object-fit:contain`, so the mark cannot distort under layout pressure. Keep that pattern.

A handful of images still load from `veterangames.com` where no original was available. They are
listed per file in the SWAP LIST comments.

---

## Still to supply

- `assets/video/hero-loop.mp4` — 10 to 20s muted loop for the Home hero
- Founder piece and 3 testimonial videos (placeholders in place, see `videos.md`)
- 2026 hype cut for the Event Info hero (2025 highlights used as placeholder)
- Donate page mission copy is a proposal, pending VSF preferred language

---

## Before you build

- `design/js/vg.js` is **prototype only**. It fakes the accordion and the News filter, and it
  cache busts local images so the client always sees the latest file. In production those come
  from Elementor Accordion, TRX post filters and WordPress asset versioning. Do not port it.
- `?v=` query strings on the stylesheet link are prototype cache busting. Drop them.
- `design/00-index.html` is a contact sheet, not a page.
