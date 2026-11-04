---
name: design-pass
description: Take a finished Trenumi screen or flow through the whole review in one go — compliance, structure, platform and accessibility, copy and localization, then handoff notes — and return a single consolidated report. Use when a screen is drawn and ready to be judged, before it goes anywhere near implementation.
---

# Design pass

Four stages, in this order, on one screen or one flow. The order is not cosmetic: a screen whose structure is wrong will have its copy rewritten anyway, so judgement comes after compliance.

Load `CLAUDE.md` §4.3, §4.4, §4.9, §4.10 before starting. Every finding cites the rule it rests on, or it is an opinion and must be labelled as one.

## Stage 0 — compliance

Hand this to the **design-review** subagent. It measures values: spacing, type size, radius, token binding.

**Stop rule:** if it returns a `blocker`, report it and stop. Do not continue to critique, copy or handoff. Fixing a structural defect changes the thing the later stages would judge.

## Stage 1 — structure and hierarchy

- Does the screen answer the one question the user arrived with? Name that question first; if it cannot be named, that is the finding.
- Section containers: every heading sits inside the section it names, never as a loose sibling (§4.10).
- The rhythm reads correctly: 12 heading → content, 12 between sibling cards, 24 between sections. The between-section gap must *look* larger, not merely be larger.
- Section heading visual height is its title — 24 — even when a control sits on the right (§4.10).
- Order of blocks matches the order of the user's decision, not the order of the data model.
- Component library placement: product screens are not built on the UI Kit page; prose belongs in the sidebar, not under the components (§1, §4.9).

## Stage 2 — platform and accessibility

Apple HIG, App Store Review Guidelines and Android a11y are **requirements**, not references (§4.3).

- Touch targets **48 × 48 minimum** — buttons, icon buttons, checkbox, radio, switch, interactive chips. The visual may be 20–24 px inside that target; extend with padding or `hitSlop`, never by enlarging the graphic.
- Button sizes: **MD 48 / r18** is the smallest on mobile, **LG 56 / r20** above it. **SM 40 / r16 is desktop only** — in the mobile app it is a defect. If a Figma instance reports `Size=SM` on a mobile screen, it is the known default artefact, not a decision (§4.3).
- Button and control labels: Manrope SemiBold 600 via `Label/SM` 14/20 or `Label/MD` 16/24. Everything else stays `Body/*` Regular 400.
- Contrast against WCAG 2.2 AA. Flag anything that relies on colour alone to carry meaning.
- Focus and reading order are sensible when the screen is traversed without sight.
- Any state that is only communicated by an icon needs a text equivalent.

## Stage 3 — copy and localization

- **uk-UA and en from day one** (§4.4). Every string must work in both; check the Ukrainian length, it is routinely longer.
- No sentence assembled from fragments — Ukrainian case and gender break concatenation (§4.4).
- Plurals go through a locale-aware API. Ukrainian has three categories; a one-or-many branch is a bug.
- Dates, numbers, weekday and month names are formatted per locale, never written by hand.
- Nothing claims a feature, price, limit or behaviour that is not in README.md or PRD.md (§2).
- Plain language over product vocabulary: say what the user gets, not what the system does.
- Never invent App Store or Google Play links (§4.6).

## Stage 4 — handoff notes

Not a spec document — the notes an implementer would otherwise have to ask for:

- Which tokens each spacing, radius and colour resolves to. A literal number is a defect, not a handoff note (§4.10).
- States that exist but are not drawn: empty, loading, error, offline, long content, longest plausible Ukrainian string.
- What is interactive, and what each interaction leads to.
- Which rules in §4.1 and §4.2 this screen depends on — whose relationship, whose entitlement.
- Open questions as `[O]`, never guessed into `[C]`.

## Output

**One report**, not four. Each stage a section; within a section, findings only — no restatement of what is correct.

```
## Compliance      (from design-review, or "clean")
## Structure
## Platform & accessibility
## Copy & localization
## Handoff notes
## Open questions   [O] — what needs a decision before implementation
```

Severity on every finding: **blocker** breaks a CONFIRMED rule · **should-fix** off the rule with no stated reason · **note** defensible, worth a decision.

Where a finding is judgement rather than rule, say so in the line itself. Do not dress an opinion as a violation.

## Don't

- Don't run the stages out of order, and don't continue past a Stage 0 blocker.
- Don't review scope, pricing or product decisions — surface them as `[O]` and move on.
- Don't rewrite copy wholesale; show the line, the problem, and one alternative.
- Don't propose a redesign. This pass judges what exists.
- Don't commit anything.
