# Design tokens — the Figma → CSS pipeline

**Status:** Working, November 6, 2026.
**Source of truth:** the Figma file **Trenumi** (`gYz2eydZiQ5ezFcutqS6DL`), collections `_Primitives`, `Semantic Colors` and `Sizes`.

Nothing in this repository is the source of a token value. `tokens.json` is an export, `src/styles/` is generated from it, and both are overwritten without ceremony.

---

## 1. The chain

```
Figma Variables
      │  export
      ▼
tokens.json          primitives + semantic light      146 tokens
tokens.dark.json     only what differs in dark         47 overrides
      │  npm run tokens
      ▼
src/styles/tokens.css          :root { --… }
src/styles/tokens.dark.css     [data-theme="dark"] { --… }
src/styles/tailwind-preset.cjs theme.extend, pointing at the CSS variables
```

Load `tokens.css` first and `tokens.dark.css` after it. The dark file holds references such as `var(--color-dark-900)` whose primitives are defined in the light file, which is why the order matters and why the dark file is small.

## 2. Why two token files

Style Dictionary merges every source into one tree, so feeding it both files in one build would let the dark values overwrite the light ones inside `:root`. The dark theme is therefore its own build, from `config.dark.js`, filtered down to the tokens `tokens.dark.json` actually redefines.

A token with the same value in both themes is emitted once, in `tokens.css`. Ten tokens were pruned from the dark file on the first build for exactly this reason — the lime accent, the navigation bar and the notification badge are deliberately theme-independent, so repeating them would have implied a choice that was never made.

## 3. Why the Tailwind preset holds variables, not hex

`theme.extend.colors.text.primary` is `var(--text-primary)`, not `#0b0515`. A Tailwind class and a hand-written rule then resolve through the same custom property, so `[data-theme="dark"]` re-themes both at once and there is no second colour map to keep in step.

The one exception is `fontWeight`, which Tailwind needs as a number.

## 3.1 How a token name becomes a class

A token whose last segment names the property it paints is mapped to that property, so the class says the thing once:

| Token | Class | Resolves to |
| --- | --- | --- |
| `action/primary/bg` | `bg-action-primary` | `var(--action-primary-bg)` |
| `action/primary/fg` | `text-action-primary` | `var(--action-primary-fg)` |
| `action/secondary/border` | `border-action-secondary` | `var(--action-secondary-border)` |
| `text/primary` | `text-primary` | `var(--text-primary)` |
| `surface/default` | `bg-default` | `var(--surface-default)` |
| `bg/canvas` | `bg-canvas` | `var(--bg-canvas)` |
| `color/brand/lime` | `bg-brand-lime` | `var(--color-brand-lime)` |
| `space/24` | `p-24`, `gap-24` | `var(--space-24)` |
| `radius/2xl` | `rounded-2xl` | `var(--radius-2xl)` |

Primitives are exposed twice — as `color.brand.lime` and as `brand.lime` — so the brand palette reads as `bg-brand-lime` rather than `bg-color-brand-lime`. Every token also stays reachable through the full `colors` map.

Where a name is both a leaf and a branch, Tailwind's `DEFAULT` convention applies: `nav/bg` and `nav/selected/bg` give `bg-nav` and `bg-nav-selected`.

## 3.2 What the bridge is, and what it is not

The bridge is a **naming contract plus a generated file**. There is no live link: Tailwind classes do not exist inside Figma, and Figma cannot read the preset. What keeps the two sides aligned is that both derive from the same variable names, and that the preset is generated rather than written.

The one place they can still drift is between Figma and `tokens.json`, because the export is manual. A renamed variable in Figma does not announce itself — it simply arrives as a new token and a missing one at the next export, and any class built on the old name breaks then. Re-export after renaming, not later.

## 4. What survives the trip

Figma variable descriptions come through as CSS comments, so the reasoning sits next to the value where someone will actually read it:

```css
--action-accent-border: var(--color-brand-ink); /** Lime measures 1.15:1 on a white card, so light mode needs a dark edge. Dark mode resolves this to transparent. */
--action-disabled-fg: var(--color-neutral-550); /** 3.61:1. Low contrast is reserved for disabled — nothing else may borrow it. */
```

## 5. Deliberate gaps

- **The `Language` collection is not exported.** UI strings are not design tokens; they belong in the app's message catalog with plural and locale handling (CLAUDE.md §4.4).
- **Only the Mobile mode of `Sizes` is exported.** Tablet and desktop values exist in Figma and will need a breakpoint strategy before they mean anything in CSS. **[O]**
- **Four semantic colours carry raw values rather than aliases**, each for a stated reason: `badge/count/*` are per-mode alpha derivations that no alias can express, and `notification/badge/*` are deliberately independent of the error palette.
- **The export is manual.** There is no Figma webhook and no CI step. See §6.

## 6. When a token changes in Figma

Change the value in Figma, re-export `tokens.json`, run `npm run tokens`, and check the diff in `src/styles/` before committing. The export is a read of the Figma Variables API — ask Claude to re-run it rather than editing the JSON by hand, because hand-edits drift from Figma silently and the next export erases them.

Two things to check in the diff: a primitive that changed should ripple into every semantic token that aliases it, and a semantic token that stopped being an alias is almost always a mistake.

**[O] Automating the export** — a Figma webhook, a GitHub Action, or a `figma-export` style tool — is not set up. Worth doing once tokens change often enough to be annoying, and not before.
