# Token coverage audit

**Run:** November 6, 2026, against the Figma file Trenumi (`gYz2eydZiQ5ezFcutqS6DL`).
**Scope:** every Trenumi component set plus the `Notification Badge`, and the Coach Dashboard screens. The Lucide icon library is excluded — its 1509 source components are third-party and intentionally carry raw paints (see `buttons.md` §5).

---

## 1. Colour — clean

| | Nodes checked | Unbound paints |
| --- | --- | --- |
| Component library, 18 components | 1337 | **0** |
| Coach Dashboard, 5 states | 829 | 0 real |

Every fill, stroke and shadow in the library resolves through a variable. Nothing is hardcoded.

### Icons

The Lucide library is excluded from the paint audit, not from the design system — every icon in Trenumi comes from it. The exclusion is structural: its 1509 source components carry a raw black stroke **on purpose**, because the Mask + Colour Plate structure uses the glyph as a shape and paints it with a token-bound rectangle beside it (`buttons.md` §5). Auditing them for unbound colour would report 1509 failures that are all correct behaviour.

The slots that consume those icons were audited, and they are the part that matters:

| | |
| --- | --- |
| Icon slots inside Trenumi components | 243 |
| `Glyph` frame is a mask | 243 / 243 |
| Colour plate present | 243 / 243 |
| Colour plate bound to a token | **243 / 243** |
| Glyph instance renamed by a swap | 0 |

The plates resolve through eleven foreground tokens — `action/*/fg`, `nav/fg-*`, `text/*` — so an icon's colour follows the control it sits in, in both themes.

The screen sweep flagged five vector strokes, all inside a masked `Glyph` frame, all of them Lucide internals where the colour is carried by the Colour plate beside the mask rather than by the vector. They are not defects — but the instance had been renamed from `Lucide` to `user-plus` by a swap, which is the rename tell-tale `buttons.md` §5 warns about. The binding survived because of the Mask + Colour Plate structure; under the old structure it would not have.

## 2. Spacing — real debt

993 spacing values were checked across the library.

| Category | Count | What it means |
| --- | --- | --- |
| Bound to a token | 619 | correct |
| Unbound, but a matching token exists | **172** | mechanical fix, zero visual change |
| Unbound, deliberate 1px border compensation | 74 | correct by design |
| Unbound and off the spacing scale | **300** | needs a decision |

The 74 are the `11 / 15 / 19 / 23` values on nodes that carry a visible stroke — `buttons.md` §1 records the rule: where a 1px border is present the padding is reduced by 1 so the box measures identically with and without it. Those are right.

The 300 are not. They use `6, 7, 9, 10, 14, 18` px, and the global spacing scale is multiples of 4 — the rule names 7, 9, 11, 15 and 18 as values that should never appear.

| Component | Off-scale values |
| --- | --- |
| Bottom Navigation | 14 ×80, 18 ×20 |
| Icon Button | 10 ×48 |
| Button | 9 ×14, 10 ×26 |
| Text Field | 6 ×8, 10 ×12, 14 ×16 |
| Textarea | 6 ×8, 10 ×4, 14 ×16 |
| Chip | 6 ×4, 7 ×4, 14 ×8 |
| Badge | 10 ×12 |
| List Item | 14 ×10 |
| Schedule Row | 10 ×8 |
| Switch | 10 ×6 |

## 3. Radius

| Category | Where |
| --- | --- |
| Unbound, token exists | Button 20 / 24, Checkbox 12, Radio 12 / 16, Switch 16 / 20 |
| Unbound, no token | Bottom Navigation 32 ×10, Button 22 ×5 |

Two of the radius **tokens themselves** sit off the global radius scale of 2, 4, 6, 8, 10, 12, 16, 20, 24:

- `radius/ml` = 18 — deliberate, and `buttons.md` explains why: it keeps the SM → MD → LG ramp visually proportional.
- `radius/3xl` = 28 — no written rationale.

## 4. What this costs to fix

**172 spacing values and the radius rows where a token already exists** can be bound mechanically. The value does not change, so nothing moves on screen. This is safe and worth doing.

**The 300 off-scale values are a different matter.** Binding them means first deciding what they should be, and every candidate answer moves pixels in components that are already approved:

1. Snap each to the nearest scale value — `6→8`, `7→8`, `9→8`, `10→8 or 12`, `14→12 or 16`, `18→16 or 20`. Cheapest, but it changes the geometry of Button, Text Field, Bottom Navigation and six others.
2. Add the missing tokens — `space/6`, `space/10`, `space/14`, `space/18`, `radius/22`, `radius/32`. Nothing moves, but the scale stops being a scale, and the global rule exists precisely to prevent that.
3. Leave them, and record the exception per component.

**Not resolved here.** Option 1 is the only one that keeps the scale meaningful, and it is a redesign of Phase 1B geometry, not a token cleanup. **[O]**

## 4.1 Duplicate navigation colour tokens

**[O]** The `Semantic Colors` collection carries two parallel sets for the tab bar:

| Token | Paints using it |
| --- | --- |
| `nav/active-bg` | 15 |
| `nav/fg-active` | 30 |
| `nav/fg-inactive` | 62 |
| `nav/selected/bg` | **0** |
| `nav/selected/fg` | **0** |
| `nav/unselected/fg` | **0** |

The flat names are the live ones; the nested set is dead. This is the same duplication the `Language` collection had before its seven unused nav strings were removed on November 6, and it was found the same way — by counting what actually references them.

Not removed, because deleting a token is the one thing the sync pipeline refuses to do unprompted. The three unused tokens can go whenever you say so.

It also caused a real defect: `tokens.json` was first transcribed by hand and kept the three dead tokens while dropping the three live ones, so `tokens.css` shipped without `--nav-active-bg`, `--nav-fg-active` and `--nav-fg-inactive`. Fixed on November 6, and the reason the `tokens-sync` skill generates the file rather than letting anyone retype it.

## 5. What was not checked

- Typography runs through text styles, not variables, so it is outside this audit. Figma cannot bind a text style to a variable set the way it binds a paint.
- The `Sizes` collection has Tablet and Desktop modes that nothing consumes yet.
- Opacity, blur and layout constraints are unbound throughout; no tokens exist for them and none are proposed.
