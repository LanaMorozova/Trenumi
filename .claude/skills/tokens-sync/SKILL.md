---
name: tokens-sync
description: Sync Trenumi design tokens from Figma into the repository — export every Variable to tokens.json in W3C DTCG form, rebuild tokens.css, tokens.dark.css and the Tailwind preset with Style Dictionary, show the diff, then commit. Use when a colour, spacing, radius or type value changed in Figma, when a variable was renamed, or when the generated CSS looks out of date.
---

# Tokens sync

Figma is the source of truth. `tokens.json` is an export, `src/styles/` is generated, and both are overwritten without ceremony. This skill runs that chain and stops at the two places where a human has to look.

Read `docs/design-system/tokens.md` before the first run — it explains why there are two token files and two configs.

## Before starting

- The **Figma desktop app must be running** with the file open. The MCP server talks to the app, not to the web API, so a headless or scheduled run fails here first.
- Default file: **`gYz2eydZiQ5ezFcutqS6DL`** (Trenumi). A `[FIGMA_URL]` argument overrides it — take the key from the `/design/<key>/` segment.
- Never run on a dirty `src/styles/`. Check `git status` first; if the generated files carry uncommitted hand-edits, stop and say so, because the build is about to erase them.

---

## Step 1 — EXPORT

Create one Figma MCP session, then run `references/figma-export.js` through `use_figma`. Do not improvise the mapping: the script is the contract, and re-deriving it per run is how two exports stop being comparable.

It returns two JSON documents, separated by `===TOKENS===` and `===DARK===`. Write them to `tokens.json` and `tokens.dark.json`, pretty-printed at 2 spaces.

What is deliberately **not** exported, and must stay that way:

| Left out | Why |
| --- | --- |
| the `Language` collection | UI strings are not design tokens; they belong in the message catalog with plural and locale handling (CLAUDE.md §4.4) |
| Tablet and Desktop modes of `Sizes` | nothing consumes them yet, and they need a breakpoint strategy first |
| the Lucide source library | third-party components whose raw strokes are correct by design |

Then prune: any token in `tokens.dark.json` whose value equals the light value is removed. A token that does not change between themes exists once, in `tokens.json`. Repeating it implies a per-theme decision that was never made.

## Step 2 — BUILD

```bash
npm run tokens
```

which is `style-dictionary build && style-dictionary build --config config.dark.js`. Two builds, because Style Dictionary merges every source into one tree and a single build would let the dark values overwrite the light ones inside `:root`.

If `config.js` is missing, create it from `docs/design-system/tokens.md` §1–3 rather than from memory. If `style-dictionary` is not installed, stop — adding a dependency needs the owner's go-ahead (CLAUDE.md §3 allows exactly one, and it is this one).

## Step 3 — DIFF

This is the step the skill exists for. Report, before touching git:

1. **Counts** — tokens before and after, in both files.
2. **Added** — new token paths, with values.
3. **Changed** — path, old value, new value.
4. **Removed** — see below.
5. **Probable renames** — a removed path and an added path carrying the *same value*. Report them as a pair, not as two unrelated events.

### A removal stops the run

Never delete a token and commit in the same breath. List what disappeared and ask. A token vanishing from Figma is usually a rename, occasionally a mistake, and rarely an intention.

### A rename needs a second check

A renamed variable changes the generated CSS custom property name, so any code using the old name breaks silently. For every probable rename, grep the repository for the **old** custom-property name and report every hit:

```bash
grep -rn -- "--old-token-name" --include=*.css --include=*.ts --include=*.tsx --include=*.js --include=*.jsx --include=*.cjs .
```

If there are hits, name them and ask before committing. If there are none, say so explicitly — "no references to the old name" is a finding, not silence.

## Step 4 — COMMIT

Invoking the skill is consent to export, build and commit for that run. It is **not** consent to push a diff nobody has read, so:

- If `git branch --show-current` is `main`, branch first: `chore/tokens-sync-<yyyy-mm-dd>`. CLAUDE.md §7 keeps commits off the default branch.
- Stage only what this pipeline owns: `tokens.json`, `tokens.dark.json`, `src/styles/`.
- Commit message — Conventional Commits, with a body only when something changed beyond values:

```
chore(tokens): sync from Figma

<one line per rename or removal, and why it is safe>
```

- **Push only after the owner confirms.** Show the commit SHA and ask. Push is outward-facing and the repository is public (CLAUDE.md §5).

### Flags

| Flag | Effect |
| --- | --- |
| `--dry-run` | stop after Step 3; change no files on disk |
| `--no-commit` | export and build, leave the working tree dirty |
| `--push` | push without a second prompt — only when the owner typed it |

## Report

Close with, and nothing more:

- token counts, light and dark, with the delta
- added / changed / removed, as numbers, then the paths
- renames, each with its grep result
- the commit SHA and branch, or why nothing was committed
- anything that needs a decision, labelled **[O]**

## Known failure modes

| Symptom | Cause |
| --- | --- |
| `Build failed; unable to find config file` | the CLI only auto-discovers `./config.json` or `./config.js` — pass `--config` for anything else |
| Dark values appear inside `:root` | both token files reached one build; they must stay in separate configs |
| `Token collisions detected` on the dark build | expected and silenced in `config.dark.js` — every token there deliberately collides with its light twin |
| A `nest` crash in the Tailwind format | a token path is both a leaf and a branch; Tailwind's `DEFAULT` convention handles it |
| Everything exports as `dimension` | `layout/columns` is a count, not a length — the script special-cases it |
