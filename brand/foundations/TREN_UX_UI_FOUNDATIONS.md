# Trenumi — UI Foundations v0.2

**Status:** Approved color direction; provisional UI usage guidance.  
**Product:** Trenumi — workout management for personal and online fitness coaches (iOS, Android, landing page).  
**Visual direction:** Mostly black, white and neutrals. Neon lime is reserved for high-value accents and selected states.

## Approved color palette

| Role | Hex | Intended use |
| --- | --- | --- |
| Brand / dark navigation | `#0B0515` | Bottom navigation, primary text, prominent dark CTAs |
| **Primary accent** | **`#D9FF00`** | Selected navigation tab, active controls, sparing highlight |
| White | `#FFFFFF` | Main screen background and text on dark surfaces |
| Subtle surface | `#F4F4F4` | Secondary cards, field backgrounds, subtle grouping |
| Border | `#E5E5E5` | Dividers and inactive outlines on white |
| Secondary text | `#737373` | Supporting text on white |
| Inactive dark-nav text | `#A3A3A3` | Unselected navigation icons and labels on dark background |

`#A1EF00` was evaluated but is **not** the approved primary accent. Do not mix the two as equivalent accents in production UI.

## Navigation pattern

**Bottom bar:** `#0B0515` background with comfortably sized, accessible touch targets.  
**Selected tab:** solid `#D9FF00` pill, `#0B0515` icon and label.  
**Unselected tabs:** icons and labels in `#A3A3A3`.  
**Selection signal:** shape + label + color, not color alone.  
The illustrated tabs Home / Workouts / Progress / Profile are *visual examples only*. Actual destinations must follow the approved information architecture for the Coach and Client roles.

## Interaction and accessibility

- White screens remain predominantly neutral. Accent color is **not** the default color for every button, card or icon.
- Prefer dark filled buttons with white labels for primary CTAs on light backgrounds.
- Use dark text/icons on lime backgrounds. Do not use white text on lime.
- Never use `#D9FF00` alone for small text or critical fine-line controls on white or `#F4F4F4` backgrounds; it does not provide sufficient contrast.
- Contrast ratios calculated under WCAG 2.x: `#D9FF00` against `#0B0515` **17.44:1**; against white **1.15:1**; against `#F4F4F4` **1.05:1**. `#737373` against white **4.74:1**.
- Non-text state indicators, focus indicators, touch targets, text contrast, dynamic text and keyboard navigation require separate accessibility review (target WCAG 2.2 AA as applicable).
- Ensure icons and selected tabs stay distinguishable in grayscale and to users with color-vision differences.

## Product and localization rules

- Target mobile platforms: iOS and Android; marketing landing page is separate.
- UI languages at MVP: Ukrainian (`uk-UA`) and English (`en`). Avoid text embedded in images, test flexible text widths.
- Coach and Client have distinct workflows. Avoid defining shared navigation destinations until the IA has been approved.
- One active coach per client in MVP; multiple coaches / coach-switcher are future features.
- No nutrition planning in the MVP.

## Implementation hand-off

Use the accompanying `trenumi.color-tokens.json` as the initial semantic color source. Treat these tokens as **foundation inputs**, not as a finished, audited design system. Final typography, layout grids, components, dark-mode behavior and interactive state coverage are to be designed and tested separately.

## Brand asset notes

The existing app icon, vector logo and splash assets remain based on the selected Trenumi geometric mark, with dark `#0B0515` and neon lime `#D9FF00`. Logo art is redrawn from a raster concept and must receive a final vector/brand similarity review before publication.
