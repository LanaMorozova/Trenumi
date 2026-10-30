# Trenumi — User Research Plan

**Version:** 0.1 — October 28, 2026
**Status:** Draft, no interviews conducted yet. Nothing in this document is a finding.
**Method:** 5–8 semi-structured interviews with practising trainers, ~30 minutes each.
**Related:** [PRD.md](PRD.md) §13 open decisions · Figma file "Coach" (personas and journeys — all hypotheses).

---

## 1. Why this research exists

Trenumi's entire positioning rests on one unvalidated belief: that trainers want to build and edit training programs on a phone. Competitor research established that mobile builders are absent or weak across Trainerize, TrueCoach, Everfit and Hevy Coach. **It did not establish that trainers want one.** Absence of a feature is not evidence of demand.

If that belief is wrong, the positioning, the information architecture and a large part of the MVP scope change. This is therefore the cheapest possible moment to test it.

Secondary purpose: Ukrainian market facts currently rest on commercial blogs with no primary source. Interviews replace guesses about roster size, pricing tolerance and terminology with something real.

---

## 2. Research objectives

| # | Objective |
| --- | --- |
| O1 | Determine whether trainers want to author and edit programs on a phone, and under what circumstances |
| O2 | Map how trainers actually build and deliver programs today, step by step, including the tools they abandon and why |
| O3 | Establish realistic roster size, pricing tolerance and willingness to pay in UAH |
| O4 | Test whether minimal client logging is enough, or whether the absence of full tracking is disqualifying |
| O5 | Check whether static illustrations are acceptable in place of demonstration video |
| O6 | Collect the Ukrainian fitness vocabulary trainers actually use, including where they default to English |

---

## 3. Hypotheses under test

Each hypothesis states what would confirm it and what would kill it. Write the verdict only after all interviews are complete — not after the first enthusiastic participant.

| ID | Hypothesis | Confirmed if | Refuted if |
| --- | --- | --- | --- |
| **H1** | Trainers want to build and edit programs on a phone | ≥5 of 8 describe building or wanting to build on a phone unprompted, or react strongly to the constraint when it surfaces | Most say they are content building at a desk and see no problem to solve |
| **H2** | Re-creating similar programs per client is a top-three time cost | Mentioned unprompted by ≥5 of 8 when walking through their week | Treated as trivial, or already solved by their current tooling |
| **H3** | Trainers cannot reliably tell whether a client trained | ≥5 of 8 describe chasing clients or guessing | They have a working routine (in-person contact, messages) and do not experience this as a gap |
| **H4** | Minimal logging (mark done + actual weights/reps) is sufficient for the MVP | Trainers say it would meet their needs for most clients | They require full tracking — RPE, tempo, history editing — before they would switch |
| **H5** | Static illustrations are acceptable instead of video | Trainers say descriptions plus images are adequate, or that they send their own video anyway | Video is stated as non-negotiable for client safety or client expectation |
| **H6** | A Ukrainian interface is a meaningful reason to choose a product | Raised unprompted, or strong agreement when asked | Trainers are comfortable in English tools and consider it irrelevant |

**H1 is the decisive one.** If H1 is refuted, stop and re-plan the positioning before any UI design work.

---

## 4. Participants

**Target: 5–8 trainers.** Aim for a spread, not a representative sample — this is qualitative.

**Must have:**
- Currently training paying clients, at least 3
- Writes individual programs for clients (not only running group classes or gym-floor shifts)
- Works in Ukraine, or trains Ukrainian-speaking clients remotely

**Aim for a mix of:**
- 2–3 gym-based trainers, 2–3 online or hybrid coaches
- At least 2 with rosters above 15 clients
- At least 2 currently using a dedicated platform (Trainerize, TrueCoach, Everfit, Hevy, StableFit)
- At least 2 using spreadsheets, documents or messengers only

**Exclude:**
- Gym managers who do not program personally
- Trainers who have not worked with a client in the last 3 months
- Friends and acquaintances who would struggle to be critical — their politeness is more expensive than their time is cheap

**Recruiting:** Instagram and Telegram fitness communities, gym noticeboards, trainer education course alumni groups. Offer a fair incentive; do not promise early access in exchange for positive feedback.

---

## 5. Interview guide (~30 minutes)

Rules for the interviewer, which matter more than the questions themselves:

- **Ask about the past, not the future.** "When did you last build a program?" beats "Would you use an app that…". Stated future intent is close to worthless.
- **Do not describe Trenumi until section E.** Anything said before that is contaminated by knowing what you want to hear.
- **Never mention the phone first.** If H1 is real, it surfaces without prompting. Prompting it guarantees a false positive.
- **Follow silence.** The useful material arrives after the pause.

### A. Warm-up (3 min)
1. Tell me about your clients — how many, and how do you work with them?
2. How long have you been training people?

### B. Current process (10 min) — objectives O2, O3
3. Walk me through the last program you wrote. Start from the moment you decided to write it.
4. Where were you physically, and what were you using?
5. How long did it take?
6. What did you start from — a blank page, a previous client's program, something else?
7. How did the client receive it?
8. When did you last change a program that was already running? What happened?
9. What is the most annoying part of all this?

### C. Tracking and feedback (6 min) — objectives O4, H3
10. How do you know whether a client did their workout?
11. When did you last find out a client had skipped sessions? How did that come up?
12. What do you record about how a session went, and where?

### D. Tools (5 min) — objectives O1, O3
13. What have you tried for this? What made you stop using it?
14. What do you pay for anything you use now?
15. *(if a platform is used)* What do you do on a phone versus on a computer, and why?
16. *(only if not raised already)* Is there anything you wish you could do from your phone?

### E. Reaction (5 min) — only now describe the concept
> One sentence, neutral: "An app for trainers where programs are built and edited on the phone, clients see their plan free, and the whole interface is in Ukrainian."

17. What is your first reaction?
18. What would stop you using this?
19. *(O5)* The exercise library would have descriptions and illustrations, not video. Does that change anything for you?
20. *(O6)* Do you use Ukrainian or English terms for exercises with clients?
21. What would it need to do before you would move your clients to it?

### F. Close (1 min)
22. Anything I should have asked and didn't?
23. Would you be willing to try a prototype later?

---

## 6. Usability testing tasks — later round

Run after interviews and after a clickable prototype exists; not part of this round. Moderated, think-aloud, on the participant's own phone where possible.

| # | Task | What it tests |
| --- | --- | --- |
| U1 | Build a 3-day training week for a new client, from scratch | The core bet: is phone authoring actually faster than their current method? |
| U2 | Reuse last week's program and change two exercises | Templates and duplication (PRD FR-PRG-08/09) |
| U3 | Change one exercise across the next four weeks | Bulk editing — the capability competitors solve on desktop |
| U4 | Invite a client and set up their profile | Onboarding friction (FR-CLI-03) |
| U5 | Find out whether a client completed last week | Does minimal logging deliver the feedback loop? |
| U6 | Record a client's results after a session | Trainer-entered progress (FR-PRO-01) |

**Measure:** time on task, completion without help, errors and recoveries, and where the participant stops to think. **Benchmark U1 against the stopwatch:** compare with the time they reported for the same job in their current tool during the interview.

---

## 7. How results will be judged

**Per hypothesis:** confirmed / refuted / inconclusive, against the thresholds in §3. "Inconclusive" is a legitimate verdict and must not be rounded up to confirmed.

**Decision rules agreed in advance, so the data is not reinterpreted after the fact:**

| Outcome | Action |
| --- | --- |
| H1 confirmed | Proceed as planned; builder keeps first claim on the time budget |
| H1 inconclusive | Proceed, but treat the mobile builder as a bet rather than a strategy, and plan a usability test before UI build |
| **H1 refuted** | **Stop. Re-open positioning before any screen design.** The IA, personas and scope all follow from it |
| H4 refuted | Re-scope logging upward; it becomes a sizeable addition for a solo build |
| H5 refuted | Video returns to the critical path, with its cost and licensing — revisit decision #9 |
| H2 or H3 refuted | Re-examine whether the problem we are solving is the one trainers have |

**Sample-size honesty:** 5–8 interviews find patterns, not proportions. Report as "6 of 8 said…", never as a percentage. Anything mentioned once is a lead to explore, not a finding.

**Output:** a short synthesis — verdict per hypothesis, direct quotes as evidence, and a list of PRD decisions the research resolves or reopens. Personas and journey maps in Figma get updated from hypotheses to evidence-backed, with the label changed accordingly.

---

## 8. Ethics and data handling

- State at the start that this is research, not a sales call, and that the product does not exist yet.
- Ask permission before recording; transcribe and delete recordings afterwards.
- Store notes without names — participant codes only (P1…P8).
- No health information about the trainers' own clients is to be collected.
- Participants may withdraw at any point, including after the interview.
