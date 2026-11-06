# Coach Dashboard — technical reference

**Status:** Awaiting final approval, October 30, 2026.
**Figma:** page `📱 Mobile App`, section `Coach / Dashboard`. Components live on `🧩 UI Kit`, section `Components / Dashboard`.
**Related:** [section-layout.md](section-layout.md) for the spacing and arrow standard.

---

## 1. Block order

Header → date + greeting → KPI cards → **Quick actions** → Today's schedule.

Quick actions sit above the schedule deliberately: they are what the trainer came to do, and the schedule is what they came to check. A schedule that can run to five rows would otherwise push the actions below the fold on every load.

The date is the full form — `FRIDAY, 30 OCTOBER`, localised as `П'ЯТНИЦЯ, 30 ЖОВТНЯ` — in `Caption/XS` / `text/secondary`. It is produced by a locale-aware date formatter in the user's own time zone, never assembled from fragments (CLAUDE.md §4.4). At 390 px the English string measures 115 px against 350 px of content width, so neither locale is close to wrapping.

**Both KPI cards are white**, whatever the counts are: white surface, ink number, secondary label, neutral chevron. The `Tone=Ink` variant stays in the component set but the Dashboard does not use it.

---

## 2. Today's schedule

### Structure

```
Section · Today's schedule      gap space/12
├─ Heading row   "Today's schedule"  +  "View schedule ›"      24 high
└─ Schedule card                      gap space/12, padding space/16, radius/2xl
   ├─ Tabs viewport   clips, FILL width, 48 high
   │  └─ Time tabs    HORIZONTAL, hugs, offset horizontally to keep the selected hour in view
   └─ Clients  ·or·  Empty slot
      └─ overflow caption, when there are more than five
```

The heading row sits **outside** the card. `View schedule` is the card's only navigation affordance.

**The heading measures 24, not 48.** `View schedule` is 20 high in flow and vertically centred on the title, so the heading hugs to the title's own 24 and the visual gap to the card is the intended 12. Its 48 touch target is a transparent `Hit area · 48` on the content layer, centred on the control and overflowing 14 px above and below. That overflow lands in the 24 gap above and the 12 gap below, so it never covers another control and never reaches the card.

### Client list behaviour

| Clients in the selected hour | What is shown |
| --- | --- |
| 0 | compact empty state, no placeholder rows |
| 1–5 | every client, nothing below the list |
| more than 5 | the first five, then `Showing 5 of 50 clients` in `Caption/XS` / `text/secondary` |

There is **no divider** under the time tabs either; the card's own `space/12` gap does that job.

There is **no "View all" button inside the card**. A second navigation control next to `View schedule` gave two ways to do one thing. The overflow line is a count, not a control.

The Dashboard therefore has a fixed maximum height regardless of how many clients are booked. Fifty clients in one hour produces the same card as six.

`View schedule` opens the full schedule **with the selected hour preserved**.

### Sorting

Within the selected hour, clients who need attention come first, in this order:

1. `Need a plan` — no program assigned
2. `Ending soon` — the assigned program is approaching its end

Everyone else follows in a stable, predictable order; the demo data sorts them alphabetically by first name. Sorting is never random, and the order does not change between two loads of the same data.

**A third "review progress" status was considered and removed, October 30, 2026.** The business rule that would trigger it is not agreed, and there is no safe way to infer one: a program legitimately contains heavy, medium and light weeks, so a single drop in working weight is not a regression and must not be shown as one. It is not in the design, not in the demo data, and not a planned feature. No automatic progress or regression assessment is computed anywhere on this screen, and no AI-generated conclusions appear on it.

**[O] `Ending soon` has no agreed threshold.** It is shown only where a program has a defined end date. How many days or weeks before that date the badge appears is not decided here.

### Status and format badges

Two semantically distinct badges per row. Both are instances of the one `Badge` component set — the separation is in meaning and layer naming, not in duplicated components.

| Order | Layer | Meaning | Values | Tone |
| --- | --- | --- | --- | --- |
| 1 | `Session format` | how the session happens | `In person`, `Online` | Neutral |
| 2 | `Program status` | something the trainer must act on | `Need a plan` | Error |
| | | | `Ending soon` | Warning |

The two actionable statuses deliberately do **not** share a colour: `Need a plan` is soft red because the client has no program at all, `Ending soon` is amber because the program exists and is simply running out. One is a gap, the other is a deadline.

Both formats are the same neutral grey, on the same `badge/neutral/bg` plate with `text/primary` text: same height, padding, radius and type. `Online` was briefly a soft blue and was reverted on October 30, 2026 — with red and amber already in the row, a third hue made the list read as four competing signals. **Colour is reserved for what needs attention, not for telling formats apart.** `Self-guided` was removed on October 30, 2026: a session with no scheduled time with the trainer does not belong in an hourly schedule.

**Badge order is fixed: session format first, then program status.** Format is stable information and should read quieter; status is conditional and has to be noticed.

Toggled by `Show program status` and `Show session format`, so a row without an attention state needs no hand-hidden sublayer.

Labels are sentence case, like every other string in Trenumi.

### Measured contrast

| Badge | Light | Dark |
| --- | --- | --- |
| `Need a plan` — `status/error/*` | 4.84:1 | 6.74:1 |
| `Ending soon` — `status/warning/*` | 4.93:1 | 11.17:1 |
| `In person` and `Online` — `badge/neutral/bg` | 17.60:1 | 13.50:1 |

### Quiet plate, full-contrast text

The neutral badge went through three versions, and the last one is the rule worth keeping.

It began as `text/secondary` on `border/subtle` — 4.23:1, which misses AA for a 12px label. Moving the plate to a dedicated `badge/neutral/bg` (`#f0f0f0` light) lifted it to 4.68:1 and passed. But passing was not the same as being right: `#f0f0f0` with `#6b6b6b` text is within 1.11:1 of the plate and 1.17:1 of the text that `action/disabled/*` uses, so the badge read as a **disabled control**.

The cause was the mechanism, not the values. Disabled in this system is signalled by *low contrast on a neutral plate*, and the format badge was using the same signal to mean "less important". Same signal, two meanings.

The fix is to make a badge quiet by **form**, not by contrast: keep the quiet plate, give it `text/primary`. 17.60:1 in light, 13.50:1 in dark. It now reads as information rather than as something switched off, and the hierarchy against the status badges comes from hue — colour still belongs only to what needs attention.

**The rule this leaves behind: low contrast is reserved for disabled.** Anything that is merely secondary gets a quieter plate, a smaller size or less weight, never a weaker text colour on a filled plate. A sweep of every component set found the recipe nowhere else except where it belongs — the Disabled states of Button, Chip, Text Field and Textarea.

### Row internals

| Gap | Token |
| --- | --- |
| Client name → workout | `space/2` |
| Workout → badges | `space/8` |
| Between badges | `space/4` |

Two gaps that differ need two levels of Auto Layout: `Name` and `Workout` sit in a `Lines` frame at `space/2`, and the `Text` column spaces `Lines` from `Badges` at `space/8`.

### Avatar

Each row opens with a 40 px `Avatar` instead of the repeated dumbbell icon it used until October 30, 2026 — the old icon was identical in every row, so it carried no information and made the list harder to scan.

| State | Shows |
| --- | --- |
| `Type=Photo` | the photo the client uploaded in their own profile, circular-cropped with `scaleMode: FILL` so it is never stretched |
| `Type=Initials` | the fallback: first letters of first and last name — Dmytro Shevchuk → DS |

A photo is optional and only the client can add one; a trainer never uploads on their behalf. The upload mechanism is not designed yet — the component covers the two display states only.

Plate `badge/neutral/bg`, initials `text/primary` in `Label/SM`: **17.6:1** light, **13.5:1** dark.

All five Dashboard states show initials, because no demo client has a photo. The `Type=Photo` state is demonstrated in the UI Kit gallery with a placeholder image borrowed from the moodboard — **not a real client photo**, and worth replacing with a proper asset before this screen is shown to anyone outside the project.

The badges row wraps. Two badges fit side by side in English, but Ukrainian labels are longer; wrapping keeps the row growing in height instead of pushing the chevron out of the card.

### Time tabs

One `Time Tab` component for every hour. The strip hugs its content and sits inside a clipping `Tabs viewport`; the strip is offset horizontally so the **selected hour is always visible**, which is what a real horizontal scroller would do.

**[O]** How the strip is generated — booked hours only, or the trainer's whole working day — is not decided. The `13:00 · 0` tab in the demo exists to show the empty state and assumes the second reading.

**[O]** Hourly booking itself is a design assumption, not confirmed MVP functionality. A Scheduling module is not in the confirmed MVP scope, and this screen must not be read as approving one.

---

## 3. Time Tab count pill

The count was a bare number beside the time, which read as part of the time. It is now a translucent pill, so the hour stays primary and the count is clearly a separate quantity.

| | Fill | Digit |
| --- | --- | --- |
| Selected tab | `badge/count/bg-on-selected` | `action/primary/fg` |
| Unselected tab | `badge/count/bg` | `text/primary` |

Both tokens are **derived per mode**, not fixed colours: `bg-on-selected` is the tab's own foreground at low alpha, `bg` is `text/primary` at low alpha. In dark mode the selected tab is lime with dark text, so the pill correctly inverts to dark-on-lime without a second definition.

| Mode | on-selected | bg |
| --- | --- | --- |
| Light | white 14% | ink 6% |
| Dark | ink 14% | white 10% |

### Why the plate alpha is 6% in light mode

The pill sits under the digit, so it is the digit's background. When the digit was `text/secondary` the alpha was load-bearing and the window was narrow:

| Alpha | Composite | `text/secondary` on it |
| --- | --- | --- |
| 4% | `#f5f5f6` | 4.89:1 |
| **6%** | **`#f0f0f1`** | **4.68:1 — passes** |
| 8% | `#ebebec` | 4.48:1 — **fails** |
| 10% | `#e7e6e8` | 4.28:1 — fails |

The digit is now `text/primary` for the same reason as the format badge — a muted digit on a plate read as a disabled tab — which measures **17.63:1** light and **14.35:1** dark and takes the contrast constraint off the alpha entirely. 6% and 10% are kept as the visual choice they now are: enough to separate the count from the hour, not enough to compete with it.

The selected tab was already correct and is unchanged: its digit is `action/primary/fg` on `badge/count/bg-on-selected`, **14.30:1** light and **12.78:1** dark.

### Geometry

`radius/full`, padding `space/2` vertical and `space/4` horizontal, `minWidth` 20. One digit renders as a 20 circle; `12` and `50` grow the pill instead of clipping. Measured: `5` → 20 wide, `50` → 23 wide.

---

## 4. Notification Badge

A separate main component, `Notification Badge`, documented in `Components / Labels & Filters`.

| | |
| --- | --- |
| Fill | `notification/badge/bg` — `#c62828` |
| Digit | `notification/badge/fg` — white, `Caption/XS` |
| Stroke | none |
| Geometry | `radius/full`, `minWidth` 20, padding `space/2` / `space/4` |
| Property | `Count`, TEXT |

**Count rules.** 1–9 render as the digit. 10 and above render as `9+`. At zero the badge is not rendered — the host hides it, rather than the badge showing `0`.

**Position.** Centred on the top-right point of the 48 circle, at (31, −3) in the button's own coordinates. It overhangs the white circle on purpose; the overlap with the 20px icon box is 3 px of empty corner, so the bell glyph stays fully visible.

**Why the tokens are not aliases.** `notification/badge/bg` holds the *value* of `color/error/600` and `notification/badge/fg` holds white, but neither is an alias. A later change to the error palette would otherwise move the notification badge with it, and the badge is not an error — it is a count.

**Why there is no stroke.** Red needs no help separating itself: the badge measures **5.62:1** against the white button and **3.32:1** against the dark surface, both past the 3:1 non-text minimum. The white digit on red measures **5.62:1**, past the 4.5:1 text minimum. 

This replaced a lime badge, which did need an outline — lime measured 1.05:1 against the canvas and could not be seen without one. Two outline treatments were measured and rejected along the way (solid ink at 4.27:1, read as too heavy; a lime hairline at 3.03:1, still fussy) before the colour itself changed and the problem disappeared.

**Clipping.** The badge overhangs its button, so every ancestor frame must keep `clipsContent` off or it is cut.

**States verified:** `1`, `3`, `9` render as a 20 circle; `9+` grows to a 23 pill; `0` is not rendered. The strip proving this lives in `Components / Labels & Filters`.

---

## 5. States delivered

| State | Content | Scroll | Shows |
| --- | --- | --- | --- |
| Top of screen | 1154 | 0 | header, date, greeting, KPI, quick actions, start of the schedule |
| 09:00 · 5 clients | 1154 | −364 | the priority sort: Need a plan → Ending soon → the rest alphabetically |
| 10:00 · 2 clients | 896 | −106 | under five: no overflow line, no empty space |
| 11:00 · 50 clients | 1182 | −392 | five rows and `Showing 5 of 50 clients` |
| 13:00 · no clients | 816 | −26 | compact empty state, strip scrolled to keep `13:00` in view |

Content runs 816–1182 px against 746 px of viewport above the floating navigation, so the screen scrolls. In every scrolled state the schedule card ends at y 726, clearing the navigation at y 746, and a `space/64` bottom padding keeps the end of the list from being trapped under the navigation bar.

---

## 5.1 Traceability — and the gap

CLAUDE.md §8 rule 1 says a change names the PRD requirement it satisfies. For this screen that is only half possible, and the half that is missing matters more than the half that works.

| Block | Requirement | Fit |
| --- | --- | --- |
| `My clients` KPI | FR-CLI-05 — a trainer sees a list of their clients with status | partial: the requirement is the list, not a count on a home screen |
| `Need a plan` KPI | — | no requirement. A derived view of clients with no assigned program, adjacent to FR-PRG-10 |
| `Add client` | FR-CLI-01 | entry point only |
| `Create program` | FR-PRG-10 and the builder requirements | entry point only |
| `Today's schedule` | — | **no requirement at all** |

**There is no PRD requirement for a trainer Dashboard.** The word "dashboard" appears in the PRD three times, and every one of them is the admin analytics product (§9.1) or the explicit "no web dashboard" scope line. The trainer home screen was designed before it was specified.

`Today's schedule` is the sharper problem. FR-CWX-01 and FR-CWX-02 describe the **client's** calendar and today entry point, not a trainer's hourly view of their own day. An hourly trainer schedule implies booking, and booking is not in the confirmed MVP scope (PRD §6.2). It also sits downstream of open decision **#4**, the program scheduling model, which is **P0 BLOCKED**.

**[C] Decided November 6, 2026: `Today's schedule` stays in the product.** Dropping it was the cheap way out and it is off the table.

That makes the gap a **writing** job, not a design one. Two requirements do not exist yet and have to:

- a **trainer home screen** — what it shows, and what it is the entry point to
- an **hourly schedule** — which first requires answering whether Trenumi has booking at all, because an hourly view of a trainer's day presumes someone put clients into hours

The second depends on open decision **#4** (program scheduling model), still P0 BLOCKED. The screen can be approved as a design before that lands; it cannot be built before it.

**[O] Neither requirement is written yet, and none was invented to make the screen look traceable.**

---

## 6. Localization

Every static string on the screen is bound to a `Language` variable, so switching the collection's mode to `uk` renders the whole Dashboard in Ukrainian. 73 bindings, including the text properties of component instances, which Figma does allow a variable to drive.

Four things are deliberately **not** bound, and each is a rule rather than an oversight:

| Not bound | Why |
| --- | --- |
| the date | locale-formatted from a date, never a stored string (CLAUDE.md §4.4) |
| the greeting | interpolates the trainer's name; a catalog entry holds the whole pattern, never a fragment to concatenate |
| `No clients at 13:00` | interpolates a locale-formatted time |
| `Showing 5 of 50 clients` | **plural** — see below |
| client names and workout titles | trainer-authored content, not UI copy, and never machine-translated |

### Two open questions the Ukrainian pass surfaced

**[O] The greeting needs the vocative.** `Доброго ранку, Роксолано` is correct Ukrainian; `Роксолана` is the nominative most apps settle for. `dashboard/greeting-morning` holds the pattern, and the choice has to be made before the string ships — it cannot be patched later without touching every greeting.

**[O] `Showing 5 of 50 clients` is plural-dependent.** The Figma variable holds a single mock form. In code it must go through a locale-aware plural API: Ukrainian has three categories, English two, and a `count === 1` branch is a bug (CLAUDE.md §4.4).

### What the Ukrainian pass caught

Checking the screen in Ukrainian, where the text is longest, found two real defects that English hid:

- `Створіть нову або скопіюйте наявну` wrapped to two lines and left `наявну` alone on the second — a widow. Rewritten to `Нова або копія наявної`, which fits one line. The title above already says `Створити програму`, so the subtitle did not need to repeat it.
- The schedule heading row measures **172 + 8 + 170 = 350** in Ukrainian: it fits the content width exactly, with nothing to spare. Nothing overflows today, but `Переглянути розклад` is a long link and the row has no slack left. Worth shortening if that line ever grows.

---

## 6. Audit, October 30, 2026

| Check | Result |
| --- | --- |
| Component instances | 101, **0 detached** |
| KPI cards | both `Tone=Neutral`, 169x92, in all five states |
| Quick action circles | `text/primary` circle, `text/inverse` glyph, 44, in all five states |
| Notification badge | `notification/badge/bg`, white digit, **0 strokes**, 20x20 at (31, −3), in all five states |
| Raw paints outside icon masks | **0** |
| Unbound spacing / padding | **0** on the screens; 98 remain inside `Badge` and `Bottom Navigation` where no token matches |
| Unbound corner radii | **0** on the screens; `Bottom Navigation` r=32 has no token |
| Touch targets below 44 | **0** |
| Badges and chevron inside the card padding | yes, in every row |
| Schedule card vs floating navigation | clear in every scrolled state |
| Badge labels in use | `Need a plan` ×3, `Ending soon` ×4, `In person` ×12, `Online` ×5 — nothing else |

Fixed in the first pass: `Menu` and `Notifications` carried a raw radius of 24, and 212 raw spacing and radius values inside the `Badge`, `Bottom Navigation`, `Quick Action` and `Schedule Row` main components were bound to the tokens that already matched them. Circular containers moved from a fixed radius to `radius/full`, which renders identically and stops being wrong the moment the container is resized.

Fixed in the second pass: a leftover `minHeight: 48` on `View schedule` was holding the schedule heading at 48 even after it was told to hug — that was the whole cause of the oversized gap under the heading.

Two notes on Figma behaviour found the hard way, both worth remembering:
- An **absolutely positioned child still expands a hugging Auto Layout parent**. The 48 hit area could not live inside `View schedule`; it lives on the content layer, where it overlaps nothing it can inflate.
- `minHeight` silently overrides `layoutSizingVertical = 'HUG'`, and nothing in the layer panel says so.
