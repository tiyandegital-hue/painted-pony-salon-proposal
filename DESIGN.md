# DESIGN.md — Painted Pony Salon (concept proposal)

Lead: Painted Pony Salon, Pinedale WY · owner Chelsie Martin · no website (The Knot profile only).
Built: 2026-11-03, lead-hunt-30min run, Builder 1 of 2. Suggested repo: `tiyandegital-hue/painted-pony-salon-proposal`.

## Tokens

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#FAF5EC` | warm cream page background |
| `--surface` | `#F1E8D5` | tonal bands / cards |
| `--surface-2` | `#E9DBC2` | layered surface step |
| `--ink` | `#2B1E13` | espresso foreground (14.9:1 on canvas) |
| `--body` | `#51402E` | body copy (9.1:1 on canvas) |
| `--muted` | `rgba(43,30,19,.60)` | secondary text |
| `--line` | `rgba(43,30,19,.14)` | hairlines |
| `--accent` | `#9A4A1B` | terracotta — the ONE CTA voltage color (5.74:1 on canvas; white-on-accent 6.23:1) |
| `--accent-deep` | `#7C3A12` | accent hover/press |
| `--dark` | `#241811` | closing CTA band / footer |

- **Radius:** 10px (soft but crafted). Depth = hairlines + surface steps, no shadows except one rationed media shadow.
- **Type:** Georgia/serif display (warm, craft); system sans body; ui-monospace labels (10–12px, uppercase, +0.15–0.3em tracking, 40–60% opacity). Max 2 families + mono.
- **Scale:** H1 `clamp(2.625rem, 6.2vw, 5.25rem)` ≈ 42→84px, leading 0.95, tracking −0.035em. H2 30–44px. Body 17px/1.65, measure ≤62ch.
- **Motion:** entrances opacity 0→1 + translateY(26px), 0.8s, `cubic-bezier(0.16,1,0.3,1)`, staggered 0.1–0.2s, done by ~1.5s. JS-gated (`.js .rv`): no-JS = fully visible. `prefers-reduced-motion` branch mandatory. Marquee linear only.

## Psychology brief (5 lines)

- **Visitor:** woman in/near Pinedale WY looking for a salon; currently finds nothing but a directory listing.
- **Pain:** can't see the work, the prices, or how to book — friction at every step.
- **One action:** request an appointment (thumb-reachable CTA, repeated verb "Book a chair").
- **Trust gap:** unknown online presence → answered with craft imagery, honest sample labeling, no fake proof, human confirmation promise.
- **Emotion:** warmth + small-town trust + premium calm. "Good hair, honest chair."

## Layout ideas

- **Home:** asymmetric split hero (left editorial column, right media plane with floating stamp), quiet service marquee, signature quiz, numbered editorial service list, philosophy split, bento gallery preview, designed closing CTA (not a link-column ending).
- **Services:** accordion menu (progressive disclosure), sample prices in mono, honesty note block.
- **About:** image + story split, "how it works" 3-step cards.
- **Gallery:** 12-col bento grid (7/5/5/7), category filter buttons, concept labels.
- **Visit:** hours table + booking form with consent checkbox, per-field errors, honest demo states.
- **Legal:** privacy + terms in plain language; 404 as a designed scene.

## Signature idea (§18)

**"The Chair Quiz"** — a 3-step interactive service finder on the home page (time → desire → upkeep → recommendation). One live thing per page; real logic over the sample menu; result deep-links to booking. Stateful (back/start-over), keyboard-operable buttons, reduced-motion safe.

## Honesty record

- REAL: business name, owner Chelsie Martin, Pinedale WY. Real proof cited: bluedhaka.com (footer).
- SAMPLE (visibly badged): all services, prices, hours, stylist bio, "walk-in" style claims. No testimonials, no awards, no invented stats anywhere.
- All 6 images AI-generated, disclosed in footer + gallery captions + about page. No fake person presented as Chelsie (craft-hands detail shot used instead; placeholder noted).
- Booking form validates but submits nowhere — demo states say so explicitly.

## Known gaps

1. **No real photography** — live site needs Chelsie's real salon/client photos (with permission) replacing all 6 concept images.
2. **No real contact data** — phone/email/street address unknown (The Knot profile not scraped); booking form has no backend.
3. **No online-booking integration** (Mangomint/Boulevard-style embed) — recommended for the real build.
4. **Browser screenshots unavailable in this environment** — Chrome startup blocked by Hatch domain policy; QA was static (link/HTML/JS/shim checks, contrast math, image review). Parent should do a visual pass in the live browser before outreach.
5. **Stitch step skipped** per task (cron time budget) — §18 rules used as design authority instead.
6. Fonts are system stack (Georgia) — a licensed display serif (e.g. Fraunces) would lift the real build.
