# Golpo Greehoo Films — Research Dossier

Compiled 2026-09-22. Source of truth for the site, the OS, and the findings-led pitch. Every
claim below traces to a screenshot, a downloaded video, or a yt-dlp/ffmpeg pull in `research/raw/`.

---

## 1. The filmography (19 unique productions, 22 uploads incl. 3 short cutdowns)

Full machine-readable version: `research/filmography.csv`. Pulled via
`yt-dlp --flat-playlist -J` against both the `/videos` and `/shorts` tabs of
`@golpogreehoofilms` (19 + 3 = 22, matching the channel header exactly), then per-video
`-j` metadata fetch for description/client/agency/date. One video (`BATA EID THEMATIC 2026`,
posted the day before this research) isn't yet extractable by yt-dlp — likely still processing
on YouTube's end. Its title, duration (2:01) and URL are known from the flat listing.

| Title | Client | Agency | Year | Views |
|---|---|---|---|---|
| BATA Eid Thematic 2026 | BATA | — | 2026 | 0 *(just posted)* |
| BelleAme Biscuit TVC | New Zealand Dairy | Cocktail Advertising Ltd. | 2025 | 48 |
| AMAR bKash – সাহস | Amar bKash | Bread & Butter | 2025 | 14 |
| AMAR bKash – উল্লিখিত | Amar bKash | Bread & Butter | 2025 | 20 |
| Asmar Golpo – বিকশিত বাংলাদেশ | Bikoshito Bangladesh | Bread & Butter | 2025 | 16 |
| Workreel Shahrear Polock 2025 | — | — | 2025 | 11 |
| Hero'r Desh Bangladesh | Hero | Carrot Com | 2025 | 17 |
| Swapno – Apon Shokti Te Nari | ACI | Salt Creatives | 2025 | 8 |
| WCIT Thematic | ICT Division | Grey | 2025 | 17 |
| Fresh Premium Tea – Shei Tumi Ke | MGI | Sun Communication | 2025 | 10 |
| Fresh Khushi Chorai | MGI | — | 2025 | 18 |
| BSRM Thematic 70 Years | BSRM | Bitopi | 2025 | 22 |
| Apex Eid Anthem | Apex | Grey | 2025 | 40 |
| Airtel Chittagong Song | Airtel Bangladesh | Bitopi | 2025 | 7 |
| Airtel Rajshahi Song | Airtel Bangladesh | Bitopi | 2025 | 11 |
| Airtel Sylhet Song | Airtel Bangladesh | Bitopi | 2025 | 16 |
| Airtel YOLO Start | Airtel Bangladesh | Bitopi | 2025 | 6 |
| Cholona Ek Sathe | Meher | — | 2025 | 11 |
| Workreel — W O R K R E E L (2024 upload) | — | — | 2024 | 228 |

**Deliverable-matrix proof, already real:** the Airtel relationship alone is four regional
song versions (Chittagong / Rajshahi / Sylhet / YOLO) of what is functionally one campaign, and
two of the bKash/Asmar Golpo films also exist as short-form vertical cutdowns. This is the exact
"one job, many deliverables" shape the OS's deliverable matrix (Phase 4) is built to track —
not a hypothetical, a fact already sitting in their own upload history.

## 2. The agency ecosystem — the real finding of this phase

Every description on the Golpo Greehoo channel is self-tagged `CLIENT / AGENCY / DIRECTOR`.
That gives a clean, verifiable map of who actually buys this work:

| Agency | Jobs (2025) | Brands |
|---|---|---|
| **Bitopi** | 5 | Airtel ×4, BSRM |
| **Grey** | 2 | Apex, ICT Division (WCIT) |
| **Bread & Butter** | 3 | Amar bKash ×2, Bikoshito Bangladesh |
| **Salt Creatives** | 1 | ACI |
| **Carrot Com** | 1 | Hero |
| **Sun Communication** | 1 | MGI (Fresh Premium Tea) |
| **Cocktail Advertising** | 1 | New Zealand Dairy (BelleAme) |

**Bitopi is the load-bearing relationship** — a quarter of the year's confirmed output. This
is decisive evidence for decision #4 in the plan (agency producers first): the buyer isn't BSRM
or Airtel's marketing department, it's a small set of Dhaka creative agencies re-hiring the same
director. The CRM's Agency→Brand→Production model should seed Bitopi, Grey and Bread & Butter
as the three real anchor agency accounts, with the others as single-job relationships to grow.

## 3. Craft analysis

Reviewed via tiled contact sheets (`research/assets/stills/sheets/`) generated from 7
downloaded 720p sources — the two workreels (the studio's own curated best-of) plus five
individual films chosen for range. Full source video sits in `research/raw/video/` (gitignore
this — it's reference material, not a site asset).

**The range is real and wider than "TVC house":**
- **Magical-realist narrative** (Fresh Premium Tea, MGI/Sun Communication) — a woman in a
  floral crown wandering misty pine forest, a man alone on a tidal flat beach with an abandoned
  upright piano under a double-moon sky, his own reflection in the wet sand. This is short-film
  craft wearing a tea ad's budget. **The single strongest image in the entire archive** —
  see `research/assets/stills/picks/fresh-tea-lone-figure-moons.jpg`.
- **Aerial/drone cinematography** (Hero'r Desh Bangladesh, BSRM Thematic) — a tree-lined dusk
  road with three motorcycle headlights receding into golden haze; sweeping drone passes over
  paddy fields, an elevated highway, a metro rail line; a human formation spelling "70" on a
  football pitch shot from directly above.
- **Stylised music-video color work** (Apex Eid Anthem) — saturated teal/magenta/gold gully-set
  grading, a character in gold cap and patterned sunglasses under fairy-lit archways. Distinct
  from everything else in the reel — proof of range beyond one house look.
- **Warm social-realist portraiture** (BSRM Thematic) — a mother reading to her child in bed
  under warm lamplight, silhouetted construction crew against a job-site sky, archival 1966
  photography cut against a molten-steel pour. A corporate-anniversary film that doesn't feel
  like one.
- **Glossy commercial polish** (BelleAme Biscuit) — mall escalators, choreographed blocking,
  a 3D-rendered wheat-grain product shot. Conventional next to the rest, but proves they can
  do straight FMCG commercial work to spec.
- **Live performance** (visible in the workreel) — a two-piece band under teal stage light,
  documentary-textured monsoon/water footage, a gold neon winged-helmet VFX graphic.

**What this means for positioning:** the studio undersells itself by calling this "TVC
production." The strongest reel is closer to short-film and music-video craft applied to
commercial briefs. The site should lead with the Fresh Premium Tea beach image and the
Hero'r Desh road shot before it leads with any product-forward TVC frame — range and craft
first, category-proof second.

## 4. Existing brand asset — do not redesign from scratch

Golpo Greehoo already has a logo: a striped tiger cub carrying a film reel as its tail, aimed
like a spotlight/megaphone, tagline **"battle for tales"** — genuinely well-conceived
(a predator "hunting" stories) and worth knowing about even though the new site's own visual
system (Phase 2, tokens already spec'd) doesn't use it literally. Clean crop saved at
`research/assets/logos/ggf-logo-badge.jpg`. Worth surfacing to them on the call as something we
noticed and respected, not something we're replacing.

Also confirmed from the export slates: their own end-cards already carry
`golpogreehoo.films@gmail.com` as a contact address — a real, monitored inbox, found nowhere
else in this research (not on the FB page, which lists a phone number only). **This is likely
the correct contact for the outreach**, alongside the WhatsApp number.

## 5. Presence baseline (screenshots underpin every figure below)

| Metric | Value | Source |
|---|---|---|
| Golpo Greehoo Facebook | 490 followers, last post 26 May 2026 (Eid) | facebook.com/golpogreehoofilms |
| Golpo Greehoo YouTube | 12 subscribers, 22 videos | youtube.com/@golpogreehoofilms |
| Prekkha Greehoo Facebook | 5.8K followers, dark since 14 Apr 2024 | facebook.com/PrekkhaGreehooVF |
| Prekkha Greehoo YouTube | 13.3K subscribers, 73 videos, bio states closed Dec 2024 | channel/UC2d9KmCmIaJ7QWXwHVXiXMw |
| Best public asset (either era) | Fresh Mustard Oil OVC — 300K views (Prekkha era) | same channel |
| Domains checked | golpogreehoo.com, golpogreehoofilms.com, prekkhagreehoo.com — **all unregistered** | DNS lookup, this research |
| Live property | bbrkmovie.com (film microsite) — built on **Lovable** (`/~flock.js` present) | this research |
| aloksajja.com | Registered, "Coming Soon" placeholder | this research |
| Shahrear Polock LinkedIn | Still lists "Director, Prekkha Greehoo" — the closed company | linkedin.com/in/shahrear-polock-2263b836 |
| Other platforms checked | No Vimeo, no Instagram, no LinkedIn company page, no BD directory listings | this research |

## 6. Gap list — open questions for the 20-minute call

- Real client roster beyond public YouTube uploads (agencies rarely post everything).
- Awards / festival recognition, if any.
- Crew size and regular collaborators beyond Polock (Mustafi Shimul's current status/role,
  if any, post-split — **do not raise this unprompted**, per the decision to present the
  Golpo Greehoo era only).
- Day rates / production budget bands, for realistic OS demo figures.
- What Aloksajja is — co-producer, sister entity, or a separate company entirely — before the
  featured-film section credits it further.
- Whether `golpogreehoo.films@gmail.com` is actively monitored (test via the outreach itself).
- Whether they want the Prekkha archive surfaced at all, once we're talking — their call, not
  ours to make first.

---

## Asset manifest

- `research/filmography.csv` — 19 productions, full metadata.
- `research/assets/posters/*.jpg` — 18 YouTube end-slate thumbnails (branded cards, not raw
  footage — reference only, not for the site).
- `research/assets/stills/sheets/*.jpg` — 7 tiled contact sheets, review artifacts.
- `research/assets/stills/picks/*.jpg` — 16 real frames pulled from source video at chosen
  timestamps. Candidate stills for the site; **re-extract at full source resolution** (not the
  720p research pull) before final use.
- `research/assets/logos/ggf-logo-badge.jpg` — existing studio logo, clean crop.
- `research/raw/` — working files (channel JSON, per-video metadata, 720p video, contact-sheet
  source frames). Not site assets — gitignore this directory.

## Hero candidate, decided

**`fresh-tea-lone-figure-moons.jpg`** — man alone on a wet tidal beach, a planet dominating the
sky, an abandoned piano beside him, his own reflection in the sand. From an MGI tea commercial
nobody has watched. This is the frame the homepage hero is built around: their best work is
real, it exists, and twelve people have seen it.
