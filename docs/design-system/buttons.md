# Button — technical reference

**Status:** Phase 1A complete. Applies to the `Button` and `Icon Button` component sets in the Figma file "Coach", page 🧩 UI Kit.
**Last updated:** October 30, 2026

The Figma sidebar carries the short version of everything here. This file is the long form: the measurements, the reasoning, and the one unsolved problem.

---

## 1. Structure

One Main Component Set, 60 variants: 5 styles × 3 sizes × 4 states.

| Property | Type | Values |
| --- | --- | --- |
| `Style` | VARIANT | Primary, Secondary, Ghost, Destructive, Accent |
| `Size` | VARIANT | SM, MD, LG |
| `State` | VARIANT | Default, Pressed, Disabled, Focus |
| `Label` | TEXT | — |
| `Show leading icon` | BOOLEAN | default false |
| `Leading icon` | INSTANCE_SWAP | — |
| `Show trailing icon` | BOOLEAN | default false |
| `Trailing icon` | INSTANCE_SWAP | — |

Every configuration is reachable through properties. Detaching an instance to change a button is always a mistake.

### Geometry

| Size | Height | Radius token | Padding V/H | Platform |
| --- | --- | --- | --- | --- |
| SM | 40 | `radius/lg` (16) | 10 / 16 | **Desktop only** |
| MD | 48 | `radius/ml` (18) | 12 / 20 | Mobile default + desktop |
| LG | 56 | `radius/xl` (20) | 16 / 24 | Large mobile actions + desktop |

Where a 1px border is present (Secondary in all states, Accent in light mode) the vertical padding is reduced by 1 and, for Accent, the horizontal padding too, so the box measures identically with and without the stroke. Secondary is intentionally 2px wider than the other styles at the same size: its horizontal padding is not compensated, which is a pre-existing inconsistency, not a defect introduced by Stage B.

### Typography

Labels are **Manrope SemiBold 600**, through two dedicated text styles:

| Style | Font | Size / line height | Used by |
| --- | --- | --- | --- |
| `Label/SM` | Manrope SemiBold | 14 / 20 | Size=SM |
| `Label/MD` | Manrope SemiBold | 16 / 24 | Size=MD, Size=LG |

These exist because `Body/SM` and `Body/MD` are Regular 400 by design and are applied to 277 other nodes in the file. Changing them would have restyled every one. `Label/*` differs from `Body/*` in weight only — same size, same line height.

**Standard for future components:** button and control labels use `Label/*`. This is a button rule, not a global typography change.

---

## 2. Colour

All paints are bound to semantic variables; there are no raw colours in the component set.

| Style | Background | Foreground | Border |
| --- | --- | --- | --- |
| Primary | `action/primary/bg` | `action/primary/fg` | — |
| Secondary | `action/secondary/bg` | `action/secondary/fg` | `action/secondary/border` |
| Ghost | none | `text/primary` | — |
| Destructive | `action/destructive/bg` | `action/destructive/fg` | — |
| Accent | `action/accent/bg` | `action/accent/fg` | `action/accent/border` |

### Accent border

`action/accent/border` resolves to `color/brand/ink` in light mode and to `color/alpha/transparent` in dark.

The lime is a brand constant and is identical in both themes, which creates an asymmetry: on a white card it measures **1.15:1**, and on the light canvas **1.05:1**. A control with no discernible boundary fails the 3:1 minimum WCAG 2.2 sets for non-text interactive elements. The 1px `#0B0515` outline measures **20.06:1** against white and resolves it. In dark mode the same lime already separates from the surface at **16.21:1**, so the token resolves to transparent and no outline is drawn.

The 1px occupies layout space in both modes, so geometry does not shift between themes — only the visibility of the stroke changes.

Label contrast on lime is **17.44:1** with the dark foreground. White on lime is 1.15:1 and is forbidden.

---

## 3. Focus indicator

The indicator is drawn **outside** the control:

- 2px ring, 2px clear gap between the button edge and the ring's inner edge
- Corner radius = control radius + 4 → 20 / 22 / 24 for SM / MD / LG
- Bound to `focus/ring`: `#0B0515` in light, `#F4F4F4` in dark
- Implemented as an absolutely positioned rectangle with `STRETCH` constraints, so it tracks the button as the label grows
- Button dimensions are unchanged, so taking focus never reflows a layout and the 48px touch target is untouched

Every ancestor frame must keep `clipsContent` off, or the ring is cut.

### Why it changed

The previous indicator was a 2px stroke with `strokeAlign: OUTSIDE` drawn flush against the button. Because it touched the fill, it was judged against the button rather than the background. In dark mode `border/focus` resolved to `#D9FF00` — the same lime as the Accent fill — so a focused Accent button measured **1:1** against its own ring. The indicator did not exist.

### Measured contrast

Against every opaque surface the ring can land on:

| Surface | Light | Dark |
| --- | --- | --- |
| `bg/canvas` | 18.24:1 | 18.24:1 |
| `surface/default` | 20.06:1 | 16.96:1 |
| `surface/elevated` | 20.06:1 | 15.1:1 |

Worst case 15.1:1, against a 3:1 requirement.

### The scrim, and why it is not a colour problem

`bg/overlay` in light mode is the same near-black as the light-mode ring, which would measure 1:1. This is closed by focus management rather than by colour: while a modal or sheet is open, focus is trapped inside it and controls behind the scrim are neither focusable nor announced (PRD **NFR-15**). A focus ring therefore never lands on the scrim.

For reference, if one did: the 40% light-mode scrim composites to `#97949B` over the normal canvas (6.73:1, passes) but to `#040208` over dark imagery (1.03:1, fails).

### Two-tone ring — measured, not adopted

A second token filling the 2px gap with the opposite tone would cover any backdrop: white scores **20.63:1** exactly where the dark ring fails. It is **not applied**. The approved indicator is one tone per theme.

Revisit when a screen places an interactive control over a photograph, video or other arbitrary backdrop — PRD **NFR-16** records that such a control needs its own focus treatment.

---

## 4. Disabled states

| Style | Treatment |
| --- | --- |
| Primary, Destructive, Accent | `action/disabled/bg` fill, `action/disabled/fg` label. No brand colour survives. |
| Secondary | Transparent fill, `border/subtle` outline, `action/disabled/fg` label — the outlined identity is kept. |
| Ghost | Fully transparent: no fill, no border, `action/disabled/fg` label. |

Before Stage B, Secondary and Ghost both received a solid grey fill, which erased what distinguished them. Disabled text is exempt from contrast minimums under WCAG 2.2; it measures 3.61:1 in light and 3.51:1 in dark, which is comfortably legible regardless.

---

## 5. Known limitation: Lucide icon swap discards colour bindings

**This is a Figma mechanism, not a mistake in the component.** It will recur in every component that uses `INSTANCE_SWAP` over the Lucide library.

### What happens

The Lucide source library is 1509 components. Every one carries a raw white wrapper fill — switched off, `visible: false`, which is why it never shows as a white square — and a raw black 1.5px vector stroke. None is bound to a variable. The structure is uniform: exactly one vector per icon.

Setting the `Leading icon` or `Trailing icon` property **replaces the nested subtree**. The replacement arrives carrying those source paints, and the colour binding that lived on the previous glyph does not come with it. Setting the property to the same icon still re-swaps, and still discards the binding.

### How to spot it

A healthy slot is still named `Icon Leading` or `Icon Trailing`. After a swap it is renamed to the glyph — `copy`, `chevron-right`. **A glyph name in the layer list means the colour is no longer bound.**

### The trap

`resetOverrides()` followed by re-applying the saved properties re-runs the swap, so the standard "clean up stale overrides" move re-breaks every icon it touches. This is why the black-icon bug kept returning after each repair.

### Permanent fix — IMPLEMENTED, October 30, 2026

The colour now lives on a layer that is never swapped. Every icon slot has this structure:

```
Icon Slot   FRAME, clipsContent, boolean `visible` property
├─ Glyph    FRAME, isMask: true          ← contributes shape only
│  └─ Lucide  INSTANCE                    ← the INSTANCE_SWAP target
└─ Colour plate  RECTANGLE                ← fill bound to a semantic token
```

The mask is safe precisely because the source wrapper fill is switched off, so it reads the stroke alpha rather than a solid 24×24 block. The swap target is the nested `Lucide` instance, so replacing it never touches the plate, and the plate is what carries the colour.

**The mask must be the Glyph frame, not the swappable instance.** Setting `isMask` directly on the instance does not survive a swap — that was the first thing the pilot got wrong.

#### Migration result

All **160 icon slots** migrated:

| Component set | Slots | Icon size |
| --- | --- | --- |
| Button | 120 (60 variants × 2) | 20 px at SM, 24 px at MD and LG |
| Icon Button | 24 | 20 / 24 px |
| Text Field | 16 (8 variants × 2) | 20 px |

Verified after migration: 0 legacy slots, 0 unbound colour plates, 0 missing property references, 0 wrong mask orderings, 0 raw visible paints across 143 instances. Button heights unchanged at 40 / 48 / 56.

A live swap test ran four consecutive glyph changes — `plus → trash-2 → pencil → heart → plus`. The plate held `action/primary/fg` at every step and the slot kept its name, so the rename tell-tale is gone too.

#### Plate tokens

| Context | Token |
| --- | --- |
| Button / Icon Button, by style | `action/primary/fg`, `action/secondary/fg`, `text/primary` (Ghost), `action/destructive/fg`, `action/accent/fg` |
| Any `State=Disabled` | `action/disabled/fg` |
| Text Field | `text/primary`, or `text/disabled` when disabled |

#### This is a Figma-only workaround

The mask and the colour plate exist to work around how Figma handles instance swapping. **They have no equivalent in application code.** In the app, bind the icon's colour to the same semantic token directly — an SVG with `currentColor` or an explicit token reference. Do not reproduce a mask-and-plate structure in the codebase.

---

## 6. Default variant

Figma determines a component set's default variant by **canvas position** — the top-left-most variant wins. It cannot be set through the plugin API:

- `editComponentProperty('Size', { defaultValue: 'MD' })` → `Cannot change defaultValue of a variant property`
- `componentSet.defaultVariant` → `read-only property on COMPONENT_SET node`
- Reordering children has no effect

The technical default is therefore `Style=Primary, Size=SM, State=Default`, because SM occupies the first row of the documentation matrix. Reordering the matrix to force MD into that position was rejected: it would break the SM → MD → LG reading order of the documentation for a Figma implementation detail.

**The rule stands regardless of what Figma inserts:** MD 48px is the mobile default, LG 56px for large mobile actions, SM 40px is desktop only. When placing a button on a mobile screen, set `Size=MD` explicitly.
