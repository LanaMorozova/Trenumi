# Section layout — technical reference

**Status:** Confirmed, October 30, 2026. Applies to every Trenumi screen from the Coach Dashboard onwards.
**Companion:** CLAUDE.md §4.10 carries the short form. This file carries the reasoning and the measurements.

---

## 1. The problem this solves

Before this standard the Coach Dashboard laid every block out as a sibling of every other block at one flat gap of 16. A section heading was therefore exactly as far from the cards it named as it was from the unrelated block above it. Visual proximity is the strongest grouping cue there is, and at an equal gap it says nothing — so "Quick actions" read as the end of the KPI row rather than the start of the quick actions, and "Today's schedule" read as the end of the quick actions.

Nothing was wrong with the spacing *values*. What was missing was a **difference** between them, and an Auto Layout structure that could express one.

---

## 2. The rule

A screen is a vertical stack of **sections**. A section is one Auto Layout frame that owns both its heading and its content.

```
Content                      VERTICAL, gap space/24
├─ Top bar
├─ Greeting
├─ Stats                     HORIZONTAL, gap space/12
├─ Section · Quick actions   VERTICAL, gap space/12
│  ├─ Heading  "Quick actions"
│  └─ Cards                  VERTICAL, gap space/12
│     ├─ Quick Action
│     └─ Quick Action
└─ Section · Today's schedule   VERTICAL, gap space/12
   ├─ Heading row  "Today's schedule" + "View schedule"
   └─ Schedule card          VERTICAL, gap space/12, padding space/16
```

| Gap | Token | Where |
| --- | --- | --- |
| 12 | `space/12` | heading → content |
| 12 | `space/12` | card → card inside one section |
| 24 | `space/24` | section → section |
| 16 | `space/16` | card internal padding (not part of the rhythm) |

The only thing that has to hold is **24 > 12**. The absolute values are a house choice; the inequality is what does the work.

### A section heading measures 24, whatever is in it

A heading row often carries a control on the right — `View schedule`, `See all`, `Edit`. That control must be a 48 touch target, but if it is 48 **in the layout** it drives the heading to 48, the title floats in the middle of it, and the 12 gap below the heading reads as 24. The spacing is correct and looks wrong.

So the rule is: the heading's **visual box is the title**, 24 high. The control is laid out at its own content height and centred on the title. Its 48 target is a transparent hit area, centred on the control and allowed to overflow into the gaps above and below.

Two Figma facts make this fiddlier than it sounds, and both cost time to find:

- **An absolutely positioned child still expands a hugging Auto Layout parent.** A hit area placed inside the control pushes the control back to 48. It has to live further out, on a layer whose size it cannot affect.
- **`minHeight` silently overrides `layoutSizingVertical = 'HUG'`.** A frame told to hug will sit at its `minHeight` with no indication why. If a frame refuses to shrink, check `minHeight` before anything else.

### Why a section needs its own frame

Three reasons, all of them practical rather than aesthetic:

1. A heading and its content move, show, hide and reorder as one thing.
2. The two gaps cannot differ at all unless they live at different levels of the tree. A flat stack has exactly one `itemSpacing`.
3. In code the section becomes one component with one `gap`, instead of a screen-level list of magic numbers.

---

## 3. Binding, not typing

Every gap, padding and corner radius is bound to a Figma Variable. A raw `24` that happens to match `space/24` looks identical and behaves differently: it does not follow a token change, and it does not show up when the library is audited.

The Dashboard audit checks exactly this and currently reports **0 unbound spacing values and 0 unbound radii** across all five states, including inside component instances.

### Known token gaps

Three padding values and one radius in the Phase 1B library have **no matching token**, so they could not be bound:

| Value | Where | Count |
| --- | --- | --- |
| padding 10 | `Badge` horizontal padding | 12 |
| padding 14 | `Bottom Navigation` tab horizontal padding | 80 |
| padding 18 | `Bottom Navigation` tab 1 horizontal padding | 20 |
| radius 32 | `Bottom Navigation` shell | 10 |

These are pre-existing, they are not visible defects, and fixing them is a **token decision**, not a local override: either add `space/10`, `space/14`, `space/18` and `radius/4xl`, or move those components onto the tokens that already exist and accept the small geometry change. Not resolved here, because changing approved component geometry is not a layout task. **[O]**

---

## 4. Navigation arrows

One arrow, one meaning, everywhere:

| Arrow | Container | Size | Meaning | Used by |
| --- | --- | --- | --- | --- |
| `chevron-right` | none | 16 | internal navigation / drill-down | Quick Action, Stat Card, Schedule Row, "View schedule" |

The circled `arrow-up-right` on Quick Actions was withdrawn on 30 October 2026. Starting a task and opening a screen are the same gesture in this product, so they no longer look different. Arrows with their own meaning are untouched: `chevron-down` for dropdowns, back arrows, and external-link arrows keep their own icons.

Both arrows come from the Lucide library through the Mask + Colour Plate structure described in [buttons.md §5](buttons.md), so their colour is bound to a semantic token and survives an icon swap.

Rules:

- The same scenario always takes the same arrow. `My clients` and `Need a plan` both open a client list, so both take a bare `chevron-right` — not one chevron and one contained arrow.
- An element that is not tappable gets no arrow. A decorative arrow is a false affordance and it costs a tap to discover that.
- Where the whole card is the target, the arrow is an **indicator**, not a control. The 36 circle inside a Quick Action is not a 48 touch target and does not need to be; the 78-tall card is the target.

---

## 5. Applying this to the next screen

1. Work out the sections first, on paper. A section is a heading plus what it names.
2. One Auto Layout frame per section, `space/12` inside, `space/24` between.
3. Bind every value. If a value has no token, stop and raise it rather than typing the number.
4. Audit before claiming it is done: zero raw paints, zero unbound spacing, zero unbound radii, zero detached instances.
