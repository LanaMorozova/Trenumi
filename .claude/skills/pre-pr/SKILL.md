---
name: pre-pr
description: Check a branch before it is shown to the owner or opened as a pull request — verify that generated files match their source, that nothing secret is staged, that the docs were kept in sync, and that every claim in the summary names the evidence that proves it. Use before opening a PR, before pushing, or whenever a piece of work is about to be reported as done.
---

# Pre-PR check

Two halves. The first is mechanical and either passes or fails. The second is a discipline the first cannot enforce.

Run both. Report both. A failing check is not a reason to stop working — it is a reason not to call the work done.

---

## Part 1 — mechanical

```bash
git branch --show-current                      # must not be main
npm run tokens && git diff --exit-code tokens.json src/styles/
git diff --cached --name-only                  # nothing secret, nothing unintended
git log --oneline origin/main..HEAD            # Conventional Commits, one change each
```

**The token check is the one that matters today.** A non-zero exit means the generated CSS no longer matches `tokens.json` — someone hand-edited the output, or changed the source and did not rebuild. That has already cost this project a colour used in 62 places.

Also confirm, by looking rather than by assuming:

- **Docs in sync** (CLAUDE.md §2 rule 8). A decision made in this branch needs a row in PRD §14 dated today. If CLAUDE.md §10 says something this branch made untrue, fix it here, not later.
- **Nothing deleted silently.** A removed token, variable, component or requirement is named in the summary, with why.
- **No invented requirements** (§2 rule 2). If a screen or field has no PRD requirement, say so. Do not map it to a loosely related FR to make the traceability look complete.

### When code lands, this section grows

Add the linter, the type check, and the §4.5 invariant tests — authorization, consent, the 30-day window, the one-active-relationship rule. Those come before feature tests. Nothing above gets rewritten; it moves to CI as the same commands.

---

## Part 2 — what proves it

Every claim in the summary names its evidence. Build this table and put it in the PR description or the report:

| Claim | Evidence |
| --- | --- |
| the heading is 24 px now | measured: `heading 24, gap to card 12` |
| tokens are bound | audit: `0 unbound of 1337 nodes` |
| dark mode works | screenshot in `uk` + dark |
| the build is reproducible | `git diff --exit-code` clean after rebuild |

**A row with no evidence is not allowed to say "done".** Either go and get the evidence, or rewrite the claim as *not verified* and say what is missing.

### Not evidence

- **A tool call that succeeded.** The Figma API returning success proves a command ran, not that the design is right. This is the failure this project has corrected most often — see the PRD decision log, October 30.
- **A build that printed no error.** Check the output file.
- **A script whose own logic was never tested.** A filter that silently matched nothing reports a clean result.
- **A count that was not compared to anything.** "146 tokens" means nothing until it is held against what was there before.

### Where the evidence goes

Measurements and audits belong in the report. Screenshots go to the owner. A finding that outlives the branch belongs in `docs/design-system/` and PRD §14, not only in the PR.

---

## Report

Short. In this order:

1. **Checks** — pass or fail, one line each. Failures first.
2. **Evidence table** — every claim, every proof.
3. **Not verified** — what was not checked, and why. An empty section here is itself a claim; be sure it is true.
4. **Needs a decision** — labelled **[O]**, with the options, not a recommendation dressed as a fact.

## What this does not do

It does not make the work reliable. It is invoked by the same person who did the work, so a determined omission survives it. What it catches is the ordinary kind of mistake: the rebuild that was forgotten, the claim that drifted ahead of the proof, the deletion nobody mentioned.

When the project has CI, Part 1 belongs there and stops depending on anyone remembering.
