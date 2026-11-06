# Trenumi — Product Requirements Document

**Document version:** 0.8 — October 29, 2026
**Status:** Draft for review. Not approved. No implementation may start from this document.
**Changes in 0.2:** permission model, field ownership, progress visibility and relationship-end behavior confirmed (§14 Decision log).
**Changes in 0.3:** permission model simplified to **one active trainer per client**; Coach Switcher and multi-trainer deferred to a future release; **Ukrainian + English localization added to MVP scope** (§6.9).
**Changes in 0.6:** MVP changes approved after Product Discovery Review — day/week duplication P0; both roles may record results with a no-conflict model (§6.6.1); critical notifications individual, client activity batched; goal simplified to one client-owned field; full offline sync out of scope; bulk edit P1 pending decision 4. Competitive bet downgraded from confirmed to **hypothesis** (§1.1.1), and the claim that no competitor solves bulk editing **withdrawn**.
**Changes in 0.4:** informed by competitor research (Figma file "Coach", October 28, 2026) and by the confirmation that this is a **solo-built product**. Minimal client logging added to MVP; trial changed to 14 days / 3 clients; exercise library ships with static illustrations instead of video; mobile-first builder confirmed as the product's competitive bet.
**Source of truth:** [README.md](README.md). Where this PRD and README disagree, README wins and this PRD must be corrected.
**Scope of this version:** MVP only — workout management.
**Language policy:** this document, README.md, CLAUDE.md, code, and Figma UX documentation are written in English. Spoken and written communication with the product owner is in Ukrainian. The product interface is localized into Ukrainian and English.

---

## 0. How to read this document

Every statement in this PRD carries one of three labels. Nothing is unlabeled.

| Label | Meaning |
| --- | --- |
| **[C]** Confirmed | Stated in README.md or explicitly decided by the product owner. Authoritative. |
| **[A]** Assumption | A proposed default written by Claude to make the document usable. **Not approved.** Must be confirmed, changed, or rejected before implementation. |
| **[O]** Open | A decision that is not made yet. Listed in [§13 Open product decisions](#13-open-product-decisions). No default is assumed. |

Rules for maintaining this document:
- An **[A]** becomes **[C]** only after the product owner approves it in writing. Update the label at the same time.
- An **[O]** must never be silently resolved by inventing behavior. It is resolved by a decision, then rewritten as **[C]**.
- Requirement IDs (`FR-*`, `NFR-*`) are permanent. Do not renumber; mark removed requirements as `WITHDRAWN`.

---

## 1. Product summary

**[C]** Trenumi is a subscription-based workout management platform for personal gym trainers and online fitness coaches, delivered as iOS and Android mobile applications plus a marketing landing page.

**[C]** Trainers create and manage personalized training programs, assign them to clients, maintain an exercise library, and record or review client progress.

**[C]** Clients use the mobile application free of charge to view their assigned training schedule, workout details, and exercise demonstrations.

**[C]** Product goal: make building and updating client programs faster and more organized than spreadsheets, documents, and messaging apps.

**[C]** MVP covers workout management only. Nutrition and in-app chat are excluded.

### 1.1 Problem statement

**[A]** Independent trainers today assemble programs in spreadsheets or documents, deliver them over messaging apps, and track results in private notes. This causes: duplicated manual work for each client, no reusable program library, version confusion when a program changes mid-week, and progress history scattered across chat threads.

### 1.1.1 Competitive bet — HYPOTHESIS, NOT CONFIRMED

**[C]** The product's intended differentiator is a **mobile-first workout builder**: making the creation and editing of individual programs as fast, simple and flexible as possible **from a phone**. Supporting pillars: full Ukrainian + English localization of both roles, and transparent pricing with no add-ons.

**[C]** This is a **product hypothesis and must not be treated as validated** until tested with trainers. See RESEARCH_PLAN.md, hypothesis H1. If H1 is refuted, positioning, information architecture and scope are all re-opened before any UI design.

#### What competitor research established

**[C] Verified.** Program authoring is a desktop activity across the market. Hevy's help centre states that program creation happens in the web app while the Coach mobile app covers logging and chat. Everfit documents copy/paste for the web app only. A TrueCoach review states that workout editing must happen on desktop or tablet. No competitor currently claims a full mobile program builder.

**[C] Verified — and it narrows our claim.** Bulk editing across weeks is **already solved**, on desktop: Everfit copies a single workout, several workouts or a full week across clients and calendars, and its **Program Copilot (Beta)** applies natural-language edits at exercise, workout, day and week level. TrueCoach documents copying workouts and whole weeks. Trainerize documents duplicating a training phase. An earlier draft of this PRD claimed no competitor solved this; that claim was **withdrawn on October 28, 2026**.

**[C]** Consequence: speed and flexibility of editing are **not** differentiators in themselves. The differentiator narrows to one word — **on a phone**. AI-assisted program editing also already exists in beta at a competitor, so it cannot be treated as a future advantage either.

**[C] Not established.** That trainers *want* to author on a phone. Research shows mobile builders are absent or weak; it does not show demand. TrueCoach shipped an "Enhanced Coach Edit Workout" change in August 2025, so even the absence needs re-checking.

**[C]** Localization is **table stakes, not an advantage**: StableFit already operates in Ukrainian in this niche (free up to 3 clients, ~$20/month). No claim is made about its traction — public sources do not support one either way.

**[A]** Consequence for scope: while the hypothesis stands, the builder's quality has first claim on the time budget. Cutting elsewhere is preferable to shipping a mediocre builder.

### 1.2 MVP success criteria

**[A]** Proposed, to be confirmed. These are product targets, not technical requirements.

| ID | Metric | Target |
| --- | --- | --- |
| M1 | Trainer creates and assigns a first program within the trial | ≥ 60% of trial signups |
| M2 | Trial-to-paid conversion | ≥ 15% |
| M3 | Time to build a 4-week program from a template | < 5 minutes |
| M4 | Client opens an assigned workout at least once per week | ≥ 50% of active clients |
| M5 | Trainer-reported replacement of spreadsheets | qualitative, via interview |

**[O]** Whether any of these are launch gates.

---

## 2. Users and roles

### 2.1 Trainer (paying user)

**[C]** Capabilities:
- Create a trainer account; access the product through a subscription with a 7-day free trial.
- Add, invite, and manage clients.
- Create, save, reuse, assign, and edit workout programs.
- Use the built-in exercise library and add custom exercises.
- Record client progress and view previous results.
- Receive relevant notifications.

**[A]** Persona: independent trainer, 25–45, works with 5–40 clients, mixes in-person and online coaching, phone-first, limited tolerance for setup work.

### 2.2 Client (free user)

**[C]** Capabilities:
- Use the app free of charge after joining a trainer.
- View assigned workouts, exercise instructions, demonstration videos, and a training calendar.
- View and edit permitted personal profile data.
- Be connected to **exactly one active trainer** at a time, and move to a different trainer after ending the current relationship. **[C]**
- Marks a session as done and may record **actual** weights and reps against the prescribed values. **[C]** — minimal logging, decided October 28, 2026. Comprehensive self-logging (RPE, timers, supersets, history editing) remains out of scope.

### 2.3 Roles explicitly not in the MVP

**[A]** No admin/back-office role, no gym-owner or multi-trainer-organization role, no assistant-trainer role, no nutritionist role. Internal support actions are handled out of band (direct database/console access by the product owner).

**[O]** Whether a minimal internal admin view is needed at launch for support (e.g. look up an account, extend a trial).

### 2.4 Account identity model

**[A]** One person = one account, identified by a single login identity. A single account may hold a trainer capability, a client capability, or both. Consequences:
- A trainer can also be someone else's client without a second account.
- A client has at most one **active** relationship at a time, but may accumulate several *ended* ones over time. Relationships are records on one account; changing trainer never creates a second account. **[C]**
- Role selection at signup determines the initial capability, not a permanent account type.

**[A]** The MVP ships **one role per account** in the user interface, while the data model stays capable of an account holding both capabilities. Proposed and not objected to on October 28, 2026; reversible without a migration. See decision 14 in §13.

---

## 3. Access, permissions, and privacy model

### 3.1 Core principle

**[C]** A trainer can access only client relationships and information they are authorized to view.

**[C]** README's original framing — "where a client has multiple trainers, data-sharing boundaries must be designed explicitly" — is satisfied in the MVP by removing the case rather than solving it: a client has exactly one active trainer. The boundary itself is still designed explicitly (§3.2) so that admitting several trainers later is a rule change, not a redesign (§3.2.4).

### 3.2 Boundary rules — CONFIRMED

**[C]** Decided October 28, 2026, revised the same day. The model is **relationship-scoped isolation with a single active trainer**.

1. **[C]** A client is connected to **exactly one active trainer** at a time. A trainer has many clients.
2. **[C]** Each trainer–client link is a separate `Relationship`, and the relationship is the permission boundary. A trainer can access and manage only their own clients, programs, and progress.
3. **[C]** A client may end the current relationship and move to another trainer. Past relationships remain as history on the same account; the account is never duplicated.
4. **[C]** Client profile information is shared with the trainer with the client's consent. **Sensitive health information requires separate, explicit consent.** Consent is scoped to the relationship, so a new trainer never inherits the previous trainer's access. See §3.3.
5. **[C]** Multiple simultaneous trainers, any cross-trainer data sharing, and the **Coach Switcher** are **out of MVP scope**, deferred to a future release.
6. **[C]** The client's *stated* goal is client-owned. The trainer's *assessment* of goal and experience level is relationship-scoped. See §3.4.

### 3.2.1 Permission matrix

Scope column states where the data lives, which is what keeps the future multi-trainer case open.

| Data | Owner | Scope | Visible to the client | Visible to the active trainer | Visible to a previous trainer |
| --- | --- | --- | --- | --- | --- |
| Account identity (name, email, avatar) | Client | Account | Yes | Yes | No |
| Body metrics (age, gender, height, weight) | Client | Account | Yes | With consent | No |
| Client's stated training goal | Client | Account | Yes | With consent | No |
| Health limitations / injuries | Client | Account | Yes | **Only with separate explicit consent** | No |
| Trainer's assessment (goal, experience level) | Trainer | Relationship | No | Yes | No |
| Programs and templates | Trainer | Trainer | Assigned programs only | Yes | Retained by that trainer |
| Assignments and sessions | Trainer | Relationship | Yes | Yes | No |
| Progress entries | Trainer | Relationship | **Yes** — own performance data | Yes | Retained by that trainer |
| Trainer's private notes | Trainer | Relationship | **No** | Yes | Retained by that trainer |
| Custom exercises | Trainer | Trainer | Only inside an assigned workout | Yes | Retained by that trainer |
| Trainer's other clients | Trainer | Trainer | No | Yes | n/a |

**[A]** "Retained by that trainer" means the data stays in the former trainer's own records — their programs and the progress they recorded are their professional record — but they can no longer reach it *through that client*, and they lose all access to the client's profile.

### 3.2.2 Changing trainer — CONFIRMED

**[C]** A client can end the current relationship and join a different trainer.

**[A]** Proposed mechanics, to confirm:
- Accepting an invitation while a relationship is active shows an explicit screen: joining the new trainer ends the relationship with the current one. The client confirms, and the switch happens in one step rather than leaving them stuck with no way forward.
- The former trainer sees the relationship as `ended`, with the date, and is notified.
- Consent granted to the former trainer does **not** transfer. The new trainer starts with no profile access until the client consents again.

**[O]** Whether accepting a new invitation auto-ends the current relationship as above, or is blocked until the client ends it explicitly.
**[O]** Whether a trainer can see that a client left for another trainer, or only that they left.

### 3.2.3 Relationship end — CONFIRMED

**[C]** When a trainer–client relationship ends, by either party:

- The **trainer immediately loses all access** to that client's data.
- The **client retains read-only access** to previously assigned workout programs for **30 days**.
- The client's **account and workout history are not automatically deleted**.

**[C]** Future release, not MVP: a client will be able to purchase their own subscription to keep using previously assigned workout programs independently, with no trainer. **The MVP architecture must not preclude this.**

**[A]** Architectural consequence, stated as a design constraint and not a feature: access to a program must never be expressed as "the relationship is active". It resolves through an access rule that today admits one ground (an active relationship, or an ended one within its 30-day window) and can later admit another (a client-held subscription). No code, stub, table, or flag for client subscriptions is to be written in the MVP — see CLAUDE.md §2 rule 7.

**[A]** The 30-day window is evaluated at read time from `ended_at`, so no scheduled job is required.

**[A]** If the same trainer and client reconnect later, the existing relationship is reactivated so history stays continuous, rather than a second relationship being created.

### 3.2.4 Keeping multi-trainer support open — CONFIRMED CONSTRAINT

**[C]** The MVP must not introduce architectural limits that would make supporting several simultaneous trainers hard later.

**[A]** What that requires in practice. These are cheap now and expensive to retrofit:

- `Relationship` stays a **first-class entity**. Do **not** put `trainer_id` on the client profile, and do not treat "the client's trainer" as a property of the client.
- Programs, assignments, sessions, progress, consent, and trainer assessments are keyed by **`relationship_id`**, never by `client_id` alone.
- "One active trainer" is enforced as an **invariant** — at most one relationship per client in `active` status — not baked into the schema shape. Lifting it later is a rule change, not a migration.
- Authorization resolves "does this account own this relationship", which already works unchanged for many relationships.
- No UI assumption that a client has exactly one trainer should leak into data or API shapes; the client's workout queries carry a relationship context even though the MVP always resolves it to one.

**[A]** Deliberately **not** built now: the Coach Switcher, per-trainer filtering, merged calendars, cross-trainer visibility, and any sharing matrix.

### 3.3 Sensitive data

**[C]** Health limitations and injuries are shared with the trainer only under **separate explicit consent**, distinct from the consent covering the rest of the profile. A client may share their general profile while withholding health information. Consent is scoped to the relationship and does not transfer when the client changes trainer.

**[A]** Health limitations, injuries, weight, and progress data are treated as sensitive personal data throughout. Implications to confirm before build:
- Consent is captured per relationship, at the point of granting, naming what the trainer will be able to see.
- Consent is **revocable**: withdrawing it removes the trainer's access from that moment on.
- The client can delete their own sensitive fields.
- No sensitive data in analytics events, logs, crash reports, or push-notification payloads.
- A privacy policy and data-processing terms must exist before public launch.

**[O]** What a trainer sees in place of withheld fields — nothing at all, or an explicit "not shared" state. The second is more honest and lets the trainer ask; it also reveals that a field exists.
**[O]** Whether a trainer may *request* health consent in-app, or must ask the client out of band.
**[O]** Whether the general profile consent is a separate step or is implied by accepting the invitation. Implied is simpler and defensible, since joining a trainer is itself a deliberate act; health consent stays a distinct, explicit toggle either way.

**[O]** Launch markets and therefore the applicable regime (GDPR, UK GDPR, CCPA, other). README decision 12.
**[A]** Design to GDPR-equivalent standards regardless, as the stricter baseline.

### 3.4 Profile field ownership — CONFIRMED

**[C]** Goal and experience level are split across two owners:

| Field | Owner | Scope | Written by |
| --- | --- | --- | --- |
| Name, email, avatar | Client | Account | Client |
| Age / date of birth, gender, height | Client | Account, shared per consent | Client |
| Current weight (self-reported) | Client | Account, shared per consent | Client |
| **Training goal** (single field) | Client | Account, shared per consent | Client |
| Health limitations / injuries | Client | Account, shared per separate consent | Client |
| ~~Trainer's assessed goal~~ | — | **WITHDRAWN** Oct 28, 2026 — duplicated the client's stated goal | — |
| **Assessed experience level** | Relationship | That relationship only | Trainer |
| Trainer's private notes | Relationship | That relationship only | Trainer |
| Body metrics recorded by a trainer | Relationship | That relationship only | Trainer |

**[C]** Simplified October 28, 2026. There is **one goal field**, owned and written by the client. The trainer keeps no parallel structured goal — their reading of the client lives in free-text notes, alongside a single structured **experience level**.

**[A]** Rationale: two structured goal fields duplicated the same concept once multiple simultaneous trainers left the MVP. The client's stated goal travels with them across trainers; the trainer's experience assessment and observations stay in the relationship and are not inherited by the next trainer. Removing the parallel field also removes a field from a solo build.

**[A]** Weight has exactly one writer per record: the profile holds the client's self-reported current value, and trainer-measured body metrics are progress entries inside the relationship. The two are never the same field.

---

## 4. MVP scope boundary

### 4.1 In scope

**[C]** Trainer signup/signin and subscription with a **14-day / 3-client trial** · client profile management · client invitation and account linking · ready-to-use exercise library with descriptions and **static illustrations** · trainer-created custom exercises with optional external video links · **mobile-first** workout program builder with reusable templates · assignment and post-assignment editing of programs · client training calendar and workout view · **minimal client logging** (mark done, actual weights and reps) · trainer-entered progress and progress review · notifications about workout assignments and changes · marketing landing page · **Ukrainian and English localization of both roles and the landing page** (§6.9) · **minimal in-app feedback** (§6.11) · **minimal internal admin and analytics** (§6.12).

### 4.1.1 Solo-build reality — CONFIRMED

**[C]** This product is designed, built, and maintained by **one person** (a Product Designer) using AI-assisted development. There is no engineering team, no QA, and no DevOps. See CLAUDE.md §0.

**[A]** Consequences that shape this PRD, not just its implementation:
- Every requirement carries an implementation and maintenance cost borne by one person. A feature that is cheap to specify may not be cheap to own.
- Managed services are preferred over anything requiring operational work.
- Automated tests for authorization, payments, and personal data are **not optional** — without QA, they are the only safety net (CLAUDE.md §4.4).
- Scope discipline matters more than usual: the MVP must stay buildable while still being genuinely useful to a working trainer. Over-cutting is as damaging as over-scoping.

### 4.2 Out of scope for the MVP

**[C]** Nutrition plans, recipes, meal tracking · in-app trainer–client chat · AI assistant for creating or modifying workouts · comprehensive client-driven workout logging · **multiple simultaneous trainers per client, cross-trainer data sharing, and the Coach Switcher** · **client-purchased subscriptions for trainer-less access** · **advanced custom admin dashboard** (§9) · **gym / organization subscriptions** (§9) · **replying to feedback from inside the product** (FR-FB-09).

**[A]** Also out of scope, proposed: video calls · payments between trainer and client · wearable/HealthKit/Google Fit integration · social or community features · web application for trainers (mobile only at launch) · offline program building (trainer side) · body measurement photos · PDF export of programs · languages beyond Ukrainian and English.

**Note:** multi-language support is **in** scope — Ukrainian and English. Only *additional* languages are deferred.

**[O]** Whether a trainer web app is needed at launch. Program building on a phone is the single biggest usability risk in this product; a tablet or web builder is the usual answer. Flagging it now because it is an architecture-shaping decision, not a later feature.

---

## 5. User flows

Each flow lists the happy path, then alternates and errors. Steps marked **[O]** depend on an unresolved decision and are written as placeholders.

### 5.1 Trainer onboarding and trial start

1. Trainer installs the app and selects "I'm a trainer". **[A]**
2. Trainer signs up. **[O]** Auth methods — email+password, Apple, Google, magic link.
3. Trainer confirms their identity. **[O]** Email verification required before or after trial start.
4. Trainer sees a short setup step: display name, optional photo, optional specialization. **[A]**
   4a. The interface language is already set from the device locale (§6.10); no language step is required during onboarding. **[A]**
5. Trial starts automatically; trainer lands on an empty client list with a primary "Add client" action. **[A]**
6. Trial state is visible persistently: days remaining and client slots used. **[A]**

**[A]** No credit card required to start the trial.
**[O]** Whether the trial starts on signup or on first client invitation.

### 5.2 Adding and inviting a client

1. Trainer taps "Add client" and enters the client's name and **[O]** an identifier (email / phone / nothing).
2. Trainer optionally fills profile fields now or leaves them for later. **[A]**
3. Trainer sends an invitation. **[O]** Mechanism: emailed link, shareable deep link the trainer sends over their own messaging app, or a short join code.
4. Client receives the invitation and opens it.
   - 4a. Client has no account → signs up as a client, relationship is created on completion.
   - 4b. Client already has an account → signs in, is shown "Trainer X wants to add you as a client", and accepts. The relationship is created on the **same** account; no second account is ever created. **[C]**
   - 4c. Client already has an **active trainer** → is told that joining this trainer ends the current relationship, and confirms before the switch. **[A]** See §3.2.2.
   - 4d. Client declines → trainer sees the invitation as declined. **[A]**
5. Client completes the profile fields they own and grants profile consent; health-information consent is a separate, explicit step. **[A]** See §3.3.
6. Trainer is notified that the client joined. **[A]**

**[A]** Invitation expiry: 14 days, resendable, revocable by the trainer.
**[A]** A trainer may keep a client record in a "pending" state and build programs for it before the client accepts; the client sees content only after accepting.
**[A]** Trial limit enforcement happens at invitation time: if the trainer is at the cap, the action is blocked with an upgrade prompt.

**[O]** Decision 1 in README: the invitation and account-linking mechanism. This blocks flows 5.2 and 5.1 and the client-side onboarding screens.

### 5.3 Building a workout program

1. Trainer opens a client and taps "New program", or opens their template library.
2. Trainer either starts blank or picks a template to copy. **[C]**
3. Trainer sets program-level fields: name, duration (weeks), start date, notes. **[A]**
4. Trainer adds training days. **[O]** Structure: repeating weekly pattern vs. explicit per-date sessions. See §6.4.
5. For each training day, the trainer adds exercises in a chosen order. **[C]**
6. For each exercise, the trainer sets training parameters. **[O]** Which parameters are required vs. optional, and how strength and cardio differ. See §6.3.
7. Trainer saves the program as a draft. **[A]**
8. Trainer assigns the program to the client. Client is notified. **[C]**
9. Trainer may later edit an assigned program; the client sees the updated information. **[C]**

**[A]** Editing an assigned program takes effect immediately and the client is notified when the change affects a future session. Past sessions are not rewritten.
**[A]** A program can be saved to the template library at any point, stripped of client-specific values.
**[O]** Whether two programs may be active for the same client at the same time (e.g. a strength block plus a conditioning block).

### 5.4 Client workout consumption

1. Client opens the app and lands on their calendar / "today" view. **[A]**
2. Client sees upcoming and past sessions. **[C]**
3. Client opens a session and sees the ordered exercise list with parameters.
4. Client opens an exercise and sees the description and demonstration video. **[C]**
5. Client follows the workout and marks it done; optionally enters actual weights and reps per exercise. **[C]**
6. The trainer sees completion and any logged values without having to ask. **[C]**

**[C]** A client has one active trainer, so the calendar needs no trainer selection, labeling, or filtering. No Coach Switcher in the MVP.
**[A]** Even so, the client's workout queries carry a relationship context internally (§3.2.4), so adding a switcher later does not require reshaping the data or the API.
**[A]** After a relationship ends, the client sees the previous trainer's assigned workouts read-only for 30 days, clearly marked as from an ended relationship.
**[A]** Client-side access requires network connectivity in the MVP, pending the open question below.
**[C]** Neither guaranteed offline viewing nor offline synchronisation is in the MVP. What **is** required is that connectivity loss is handled gracefully: clear offline and error states, a retry affordance, and no loss of data already saved successfully (FR-CWX-08a–08d).

**[C]** Complex caching and synchronisation are explicitly not to be built. Offline viewing of the current week stays a **P1 potential improvement** (FR-CWX-08e).

**[O]** How often trainers and clients actually face poor connectivity in the gym. This is an untested assumption — no evidence was found in competitor research — and is on the interview agenda (RESEARCH_PLAN.md).

### 5.5 Trainer records progress

1. Trainer opens a client, opens a past session or the progress view.
2. Trainer enters results. **[O]** What is recorded: actual sets/reps/weight per exercise, a 1RM estimate, a free-text note, body metrics, or some combination. README decision 5.
3. Trainer saves; the entry is timestamped and attributed. **[A]**
4. Trainer reviews history for an exercise or metric over time. **[O]** Presentation: table, chart, or both.

**[A]** Progress entries are editable and deletable by the trainer who created them, with the last-modified timestamp retained.
**[C]** The client **can** see progress recorded about them, as it is their own performance data. The trainer's **private notes are a separate, trainer-only field** and are never shown to the client.
**[A]** The interface must make the distinction unmistakable at the moment of writing — a trainer must never be unsure whether what they are typing is client-visible. Without that separation trainers either self-censor or keep notes outside the product.

### 5.6 Changing the interface language

1. User opens Settings and selects the interface language: Українська or English. **[C]**
2. The interface updates without reinstalling or signing out. **[A]**
3. The choice persists across restarts and is stored on the account, so server-generated content such as notifications uses the same language. **[C]** persistence, **[A]** mechanism
4. If no choice has ever been made, the device locale decides; anything other than Ukrainian falls back to English. **[C]** device default, **[A]** fallback rule

### 5.7 Subscription lifecycle

1. Trial runs for **14 days**, capped at **3 clients**. **[C]**
2. Trainer is reminded before expiry. **[A]** Proposed: day 10 and day 13.
3. Trainer subscribes. **[O]** Tiers, prices, billing period, payment provider.
4. On expiry without subscribing: **[O]** README decision 2. Proposal **[A]**: trainer account becomes read-only — existing clients keep seeing already-assigned workouts, the trainer cannot create or edit anything or invite clients, and data is retained for a defined grace period.

**[A]** Clients are never billed and never see billing UI.

---

## 6. Functional requirements

Priority: **P0** = MVP must-have, **P1** = MVP should-have, **P2** = post-MVP.
Any requirement whose behavior depends on an **[O]** decision is marked `BLOCKED` and cannot be implemented yet.

### 6.1 Authentication and accounts

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-AUTH-01 | A user can create an account and choose an initial role of trainer or client. | P0 | [A] |
| FR-AUTH-02 | A user can sign in and remain signed in across app restarts. | P0 | [A] |
| FR-AUTH-03 | A user can reset or recover access to their account. | P0 | [A] |
| FR-AUTH-04 | Supported authentication methods. | P0 | [O] `BLOCKED` |
| FR-AUTH-05 | A user can sign out on a device. | P0 | [A] |
| FR-AUTH-06 | A user can delete their account and request deletion of their data. | P0 | [A] — required by both app stores |
| FR-AUTH-07 | One account can hold both trainer and client capabilities. | P2 | [A] — model stays capable, UI ships one role per account |
| FR-AUTH-08 | A user can change the interface language in Settings; the choice persists and is stored on the account. | P0 | [C] |

**Acceptance criteria — FR-AUTH-06:** account deletion is reachable from inside the app; it ends all relationships; the trainer's clients are notified that programs are no longer maintained; data retention after deletion follows a documented policy.

### 6.2 Client management

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-CLI-01 | A trainer can create a client record with at minimum a name. | P0 | [A] |
| FR-CLI-02 | A client record holds: name, age, gender, height, weight, **one stated training goal**, optional health limitations — all client-owned; plus the trainer's **experience level** assessment and free-text notes, relationship-scoped. | P0 | [C] ownership per §3.4, [O] which fields are required |
| FR-CLI-03 | A trainer can invite a client to join. | P0 | [O] `BLOCKED` — mechanism |
| FR-CLI-04 | An existing client account can accept a trainer's invitation without a second account being created. | P0 | [C] |
| FR-CLI-04a | A client has at most one trainer in `active` status at any time, enforced as an invariant. | P0 | [C] |
| FR-CLI-05 | A trainer can see a list of their clients with status (pending / active / disconnected). | P0 | [A] |
| FR-CLI-06 | A trainer can disconnect a client; the trainer's access ends immediately. | P0 | [C] |
| FR-CLI-07 | A client can leave their trainer and join a different one. | P0 | [C] |
| FR-CLI-07a | Accepting a new trainer's invitation while a relationship is active requires explicit confirmation that the current relationship ends. | P0 | [A] — see §3.2.2 |
| FR-CLI-08 | A client can view and edit the profile fields they own. | P0 | [C] scope, [O] which fields |
| FR-CLI-09 | A trainer can archive a client without deleting history, and archived clients do not count against plan limits. | P1 | [A] |
| FR-CLI-10 | A trainer can search and sort their client list. | P1 | [A] |
| FR-CLI-11 | A client grants and can revoke consent for the trainer to see their general profile. | P0 | [C] |
| FR-CLI-12 | A client grants and can revoke **separate explicit** consent for health information. Revoking removes access from that moment on. | P0 | [C] |
| FR-CLI-13 | Consent is scoped to the relationship and is never inherited by a subsequent trainer. | P0 | [C] |
| FR-CLI-14 | When a relationship ends, the client keeps read-only access to previously assigned programs for 30 days; the account and history are not deleted. | P0 | [C] |

**Acceptance criteria — FR-CLI-04:** when an invitation is opened by a signed-in account that already has a client relationship with another trainer, no new account is created, the client sees an explicit consent screen naming the inviting trainer and what that trainer will be able to see, and after acceptance the two relationships are independent per §3.2.

### 6.3 Exercise library

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-EX-01 | The app ships with a ready-to-use exercise library; each exercise has a name, description, and **static illustrations**, in Ukrainian and English. **No built-in demonstration videos in the MVP.** | P0 | [C] revised October 28, 2026 |
| FR-EX-02 | Library size and coverage at launch. | P0 | [O] — proposal [A]: 150–250 exercises covering major barbell/dumbbell/machine/bodyweight/cardio movements |
| FR-EX-03 | Exercise metadata: primary muscle group, secondary muscles, equipment, movement category, difficulty. | P0 | [A] |
| FR-EX-04 | A trainer can search the library by name and filter by muscle group and equipment. | P0 | [A] |
| FR-EX-05 | A trainer can create a custom exercise with a name, description, and optional media. | P0 | [C] |
| FR-EX-06 | Custom exercises are private to the creating trainer and visible to a client only inside an assigned workout. | P0 | [A] |
| FR-EX-07 | A trainer can mark exercises as favorites. | P1 | [A] |
| FR-EX-08 | A trainer can attach an **external video link** to an exercise, for demonstrations they have the right to use. The app links out and **does not host, re-encode, or store video**. | P0 | [C] |
| FR-EX-09 | ~~Trainer uploads their own demonstration video.~~ **WITHDRAWN** from the MVP — replaced by FR-EX-08 external links; requires video hosting infrastructure this project will not build. | — | [C] |
| FR-EX-10 | Illustration sourcing and licensing for the built-in library. | P0 | [O] `BLOCKED` — README decision 9, now scoped to static images rather than video |
| FR-EX-11 | A comprehensive built-in video library. | P2 | [C] future release |

### 6.4 Program builder

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-PRG-01 | A trainer can create a program covering a week, month, or another period. | P0 | [C] |
| FR-PRG-02 | A program contains training days; each day contains an ordered list of exercises. | P0 | [C] |
| FR-PRG-03 | Program scheduling model: repeating weekly pattern vs. explicit per-date sessions vs. both. | P0 | [O] `BLOCKED` — README decision 4 |
| FR-PRG-04 | Per-exercise training parameters. | P0 | [O] `BLOCKED` — README decision 3 |
| FR-PRG-05 | A trainer can reorder exercises within a day. | P0 | [A] |
| FR-PRG-05a | A trainer can **duplicate a training day**. | P0 | [C] |
| FR-PRG-05b | A trainer can **duplicate a whole week** of the program. | P0 | [C] |
| FR-PRG-06 | A trainer can group exercises into supersets/circuits. | P1 | [A] |
| FR-PRG-07 | A trainer can add a free-text note to a program, a day, and an exercise. | P0 | [A] |
| FR-PRG-08 | A trainer can save a program as a reusable template. | P0 | [C] |
| FR-PRG-09 | A trainer can create a new program for a client by copying a template or an existing program. | P0 | [C] |
| FR-PRG-10 | A trainer can assign a program to a client. | P0 | [C] |
| FR-PRG-11 | A trainer can edit an assigned program and the client sees the updated content. | P0 | [C] |
| FR-PRG-12 | A trainer can unassign, pause, or end a program. | P1 | [A] |
| FR-PRG-13 | Whether multiple programs may be active for one client simultaneously. | P1 | [O] |
| FR-PRG-14 | Edits to an assigned program do not alter sessions already in the past. | P0 | [A] |
| FR-PRG-15 | Bulk edit: change one exercise and apply it across subsequent weeks. | P1 | [C] candidate — final priority decided with the scheduling model (decision 4) |

**Acceptance criteria — FR-PRG-11:** after a trainer edits a future session of an assigned program, a client opening that session sees the new content without reinstalling or re-accepting anything, and the client is notified per §6.7.

### 6.5 Client workout experience

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-CWX-01 | A client sees a training calendar with upcoming and past sessions. | P0 | [C] |
| FR-CWX-02 | A client sees a "today" entry point with the current day's session, if any. | P0 | [A] |
| FR-CWX-03 | A client opens a session and sees its ordered exercises with parameters and notes. | P0 | [C] |
| FR-CWX-04 | A client opens an exercise and sees the description and demonstration video. | P0 | [C] |
| FR-CWX-05 | A client can mark a session as done, and can enter actual weights and reps against the prescribed values. Program content itself stays read-only — a client never edits the program. | P0 | [C] |
| FR-CWX-05a | Logging is **optional**: a client who logs nothing still has a fully usable app, and the trainer still sees the session as not marked done. | P0 | [A] |
| FR-CWX-05b | A client's entry never overwrites a trainer's entry, and vice versa — see §6.6.1. | P0 | [C] |
| FR-CWX-06 | Calendar session statuses: upcoming, today, done, missed. `done` is set by the client marking it; `missed` is derived from a past date with no completion. | P0 | [C] that completion exists, [A] the exact status set |
| FR-CWX-07 | The calendar shows the active trainer's sessions; no trainer selection, labeling, or filtering in the MVP. | P0 | [C] |
| FR-CWX-08 | **Neither guaranteed offline viewing nor offline synchronisation is in the MVP.** | — | [C] |
| FR-CWX-08a | Loss of connectivity is handled correctly — no crash, no silent failure, no partial render presented as complete. | P0 | [C] |
| FR-CWX-08b | Clear offline and error states, distinguishable from an empty state. | P0 | [C] |
| FR-CWX-08c | The user can retry a failed load. | P0 | [C] |
| FR-CWX-08d | **No loss of data that was already saved successfully.** A completed save survives connection loss. | P0 | [C] |
| FR-CWX-08e | Offline viewing of the current week — potential improvement, not committed. | P1 | [C] as priority, [O] as scope |
| FR-CWX-08f | Complex caching and synchronisation are **not** to be implemented in the MVP. | — | [C] |
| FR-CWX-09 | After a relationship ends, previously assigned workouts stay visible read-only for 30 days, marked as from an ended relationship. | P0 | [C] behavior, [A] presentation |

### 6.6 Progress

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-PRO-01 | A trainer can record a client's exercise results, and can review results the client logged. | P0 | [C] |
| FR-PRO-02 | A progress entry holds actual sets, reps and weight against the prescribed values, plus an optional note. It records **who** entered it — client or trainer. | P0 | [C] shape, [O] whether body metrics share this entity |
| FR-PRO-03 | A trainer can review a client's results over time. | P0 | [C] |
| FR-PRO-04 | Progress presentation (table, chart, per-exercise history). | P0 | [O] |
| FR-PRO-05 | A trainer can edit or delete progress entries they created. | P1 | [A] |
| FR-PRO-06 | The client can view progress recorded about them. | P0 | [C] |
| FR-PRO-07 | Progress entries are keyed by relationship, not by client account. | P0 | [C] |
| FR-PRO-08 | A trainer can record **private notes**, never visible to the client, presented so that the trainer cannot mistake them for client-visible content. | P0 | [C] separation, [A] presentation |
| FR-PRO-09 | Both the client and the trainer can record results for the same session and exercise. Entries are stored separately and attributed; neither overwrites the other. | P0 | [C] |
| FR-PRO-10 | Where both exist, which entry leads in progress history and trends. | P0 | **[O] PROPOSED, NOT APPROVED** — proposal in §6.6.1, to be settled during UX design |
| FR-PRO-11 | A client can see when the trainer recorded something different from what they logged. | P1 | [A] |

#### 6.6.1 Trainer and client entries — avoiding conflicts

**[C]** Both roles can record results for the same session and exercise. **[A]** The following model is proposed to make that impossible to get wrong:

**There is no write conflict, by construction.** A progress entry is keyed by *(session item, author)*, not by session item alone. A client entry and a trainer entry for the same exercise are two separate rows, so simultaneous editing cannot overwrite anything and no merge logic is needed.

| Situation | Behaviour |
| --- | --- |
| Only the client logged | That entry is the result |
| Only the trainer recorded | That entry is the result |
| Both recorded, values agree | Shown once; no duplication in the interface |
| Both recorded, values differ | **PROPOSED, NOT APPROVED:** trainer's entry leads in history and trends, client's value retained and shown next to it, attributed. To be decided during UX design |
| Trainer edits their own entry | Allowed; last-modified timestamp retained (FR-PRO-05) |
| Trainer edits the client's entry | **Not allowed.** The trainer records their own entry instead |

**[C] What is settled:** both roles may record, entries are stored separately and attributed, and neither overwrites the other. This removes an entire class of sync bugs and is independent of the open question below.

**[O] What is not settled:** which entry leads when the two disagree. The proposal above — trainer leads — is **not approved** and will be decided during UX design. Alternatives worth weighing then: show both without ranking; let the trainer explicitly confirm or override; or treat the client's entry as the record of what happened and the trainer's as a correction note.

**[A]** Argument for the proposal: a trainer correcting a client's number is a professional judgement, not a data fix — the client reported what they believed they lifted. Overwriting hides a disagreement that is often useful ("you logged 80, I counted 75 with a form breakdown"). Argument against: it quietly tells the client their own record counts for less, which may discourage logging — the very behaviour the feature depends on.

**[A]** The interface must always show *who* recorded a value. An unattributed number in a shared history is a support request waiting to happen.

**[O]** Whether the client is notified when the trainer records a different value, or simply sees it on next open (FR-PRO-11).

### 6.7 Notifications

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-NOT-01 | A client is notified when a program is assigned to them. | P0 | [C] |
| FR-NOT-02 | A client is notified when an assigned program changes in a way that affects a future session. | P0 | [C] |
| FR-NOT-03 | Notification channels. | P0 | [O] `BLOCKED` — README decision 10 |
| FR-NOT-04 | A trainer is notified when an invited client joins or declines. | P1 | [A] |
| FR-NOT-05 | A trainer is notified before trial expiry. | P0 | [A] |
| FR-NOT-09 | **Critical events are delivered individually and immediately**: program assigned, future session changed, invitation received, invitation accepted or declined, trial expiring. | P0 | [C] |
| FR-NOT-10 | **Non-critical client activity is batched into a digest**: sessions marked done, results logged. One digest, not one push per event. | P0 | [C] |
| FR-NOT-11 | Digest frequency and delivery time. | P1 | [O] — proposal [A]: once daily, at a time the trainer sets; falls back to end of day |
| FR-NOT-12 | A trainer can see client activity in-app without waiting for the digest. | P0 | [A] — the digest is a notification policy, not an access restriction |
| FR-NOT-06 | Users can control which notifications they receive. | P1 | [A] |
| FR-NOT-07 | Notification payloads contain no health or sensitive data. | P0 | [A] |
| FR-NOT-08 | Workout reminders on a schedule. | P2 | [A] |

### 6.8 Subscription and trial

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-SUB-01 | A new trainer gets a **14-day** free trial. | P0 | [C] revised October 28, 2026 |
| FR-SUB-02 | The trial allows up to **3 clients**. | P0 | [C] revised October 28, 2026 |
| FR-SUB-03 | The trainer can always see trial days remaining and client slots used. | P0 | [A] |
| FR-SUB-04 | Subscription tiers, limits, and prices. | P0 | [O] `BLOCKED` — README decision 2 |
| FR-SUB-05 | Payment provider and billing mechanism. | P0 | [O] `BLOCKED` — must consider Apple/Google in-app-purchase policy; see §8.3 |
| FR-SUB-06 | Behavior on trial expiry and on subscription lapse. | P0 | [O] `BLOCKED` |
| FR-SUB-07 | A trainer can cancel and see their renewal date. | P0 | [A] |
| FR-SUB-08 | Enforcement of the client cap happens when inviting a client, with a clear upgrade path. | P0 | [A] |

### 6.9 Localization

**[C]** The MVP ships two languages: **Ukrainian (uk-UA)** and **English (en)**. Both roles get a fully localized interface, and the landing page supports both.

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-LOC-01 | The entire interface is localized into Ukrainian and English for **both** the Trainer and Client roles. | P0 | [C] |
| FR-LOC-02 | The default language comes from the device locale. | P0 | [C] |
| FR-LOC-03 | The user can choose the language in Settings, independently of the device locale. | P0 | [C] |
| FR-LOC-04 | The chosen language persists across restarts and reinstall-with-same-account. | P0 | [C] persistence, [A] whether it survives reinstall |
| FR-LOC-05 | The language is stored on the account, so server-generated content (notifications, emails) is sent in the user's language. | P0 | [A] — follows from FR-NOT-* being server-sent |
| FR-LOC-06 | The landing page supports Ukrainian and English. | P0 | [C] |
| FR-LOC-07 | The localization architecture allows adding a language without code changes to screens — externalized message catalogs, no hard-coded user-facing strings, no string concatenation to build sentences. | P0 | [C] extensibility, [A] mechanism |
| FR-LOC-08 | A missing translation falls back to English rather than showing a key or an empty string. | P0 | [A] |
| FR-LOC-09 | Dates, numbers, and weekday/month names format per locale. | P0 | [A] |
| FR-LOC-10 | Plural forms are handled per locale. Ukrainian has three plural categories against English's two, so a naive "1 / many" split is wrong. | P0 | [A] |
| FR-LOC-11 | **Built-in exercise library content** — names and descriptions — exists in both Ukrainian and English. Illustrations are language-neutral (no embedded text), so they need no translation. | P0 | [C] requirement, [O] who produces the Ukrainian text — see §6.9.1 |
| FR-LOC-12 | Trainer-authored content (custom exercises, program names, notes) is stored as entered and **not** translated. | P0 | [A] |
| FR-LOC-13 | Units of measurement (kg/cm) and their presentation. | P1 | [O] |
| FR-LOC-14 | Legal documents (privacy policy, terms) available in both languages. | P0 | [A] — legal review needed per language |

#### 6.9.1 Content localization is a separate problem from UI localization

**[A]** Localizing the interface is a solved engineering task. Localizing the **content** is a sourcing and budget task, and it is the part that can delay launch:

- The exercise library (PRD proposes 150–250 exercises, FR-EX-02) needs names **and** descriptions in two languages. That is a translation deliverable with a real cost and a quality bar — mistranslated exercise instructions are a safety matter, not a polish matter.
- **Illustrations must carry no embedded text**, so that one asset serves both languages. This is a sourcing requirement, not a preference.
- Videos are out of the MVP (FR-EX-08), which removes voice-over and subtitle localization from the critical path entirely.
- Ukrainian fitness terminology is inconsistent in practice; many trainers use transliterated English. A terminology decision is needed, ideally reviewed by a practising Ukrainian-speaking trainer.

**[O]** Who produces the Ukrainian exercise content, at what quality bar, and whether launch requires both languages complete or can ship Ukrainian-first with English following. This is tied to README decision 9 (video sourcing and licensing).

#### 6.9.2 Design implications

**[A]** For the UI/UX review, since these are design constraints rather than code concerns:
- Ukrainian strings run roughly 15–30% longer than English. Fixed-width buttons, tab labels, and single-line truncation will break first. Layouts need to be reviewed in Ukrainian, not only English.
- Avoid text baked into images.
- Avoid sentences assembled from fragments; grammatical case and gender make this fail in Ukrainian.
- Both languages are Latin/Cyrillic and left-to-right, so no RTL work is required.

### 6.10 Landing page — CONFIRMED, IN SCOPE

**[C]** Trenumi ships two products: the mobile application and a **marketing landing page**. The landing page is a standalone responsive site aimed at **personal trainers**, and its job is to move them to install the app.

**[C]** Funnel: landing → App Store / Google Play → install → coach onboarding → 14-day trial → paid subscription. **Clients do not enter through the site** — they arrive by trainer invitation, so the landing page is a trainer-acquisition channel only.

**[C]** It is a **separate workstream**, scheduled after the core mobile flows are agreed. Final copy, full section structure and the site's technical stack are open.

**[C]** Scope boundary: the website presents the product and hands off to the stores. **No web dashboard and no web workout builder in the MVP** — all product functionality lives in the mobile app.

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-LND-01 | Explains the product to trainers, with app store links. | P0 | [A] |
| FR-LND-02 | Email capture for pre-launch / launch notification. | P0 | [A] |
| FR-LND-03 | Hosts the privacy policy, terms of service, and support contact (required by app stores). | P0 | [A] |
| FR-LND-04 | Hosts the account-deletion request route (required by Google Play). | P0 | [A] |
| FR-LND-05 | Pricing and subscription plans, including the 14-day free trial as the current business hypothesis. | P1 | [C] presence, [A] figures — blocked by FR-SUB-04 |
| FR-LND-09 | Hero with a clear value proposition. | P0 | [C] |
| FR-LND-10 | Demonstration of the mobile app and the key benefits for trainers. | P0 | [C] |
| FR-LND-11 | The workout builder presented as a headline capability. | P0 | [C] |
| FR-LND-12 | "How Trenumi works" explainer. | P0 | [C] |
| FR-LND-13 | FAQ. | P1 | [C] |
| FR-LND-14 | App Store and Google Play download buttons. **No invented store links before publication.** | P0 | [C] |
| FR-LND-15 | QR code for desktop visitors, where it helps. | P2 | [C] |
| FR-LND-16 | Analytics on store click-throughs, and where feasible installs and trainer activation. | P0 | [C] |
| FR-LND-17 | Visual consistency with the mobile app, built on the approved brand kit. | P0 | [C] |
| FR-LND-06 | Responsive, fast, SEO-basic (title/meta/OG), analytics-instrumented. | P0 | [A] |
| FR-LND-07 | Hosts client invitation deep links with app-store fallback. | P0 | [A] — depends on README decision 1 |
| FR-LND-08 | Ukrainian and English versions, with separate URLs per language and correct `hreflang` so both are indexable. | P0 | [C] languages, [A] URL and SEO mechanism |

---

### 6.11 In-app feedback — CONFIRMED, IN SCOPE (minimal)

**[C]** Both roles can send feedback from inside the app. This is **not** an in-app chat and **not** a support platform.

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-FB-01 | A trainer or client can send feedback from the app. | P0 | [C] |
| FR-FB-02 | Three types: **Feature request**, **Bug report**, **General feedback**. | P0 | [C] |
| FR-FB-03 | Free-text message. | P0 | [C] |
| FR-FB-04 | Submission confirms receipt and sets expectations — no promise of a reply. | P0 | [A] |
| FR-FB-05 | An administrator sees a **Feedback inbox**. | P0 | [C] |
| FR-FB-06 | The inbox filters by type. | P0 | [C] |
| FR-FB-07 | Each item carries a status: **New / In review / Planned / Resolved**. | P0 | [C] |
| FR-FB-08 | The inbox supports reviewing recurring problems and requests. | P1 | [C] intent, [A] how — counting by type and reading, not analytics tooling |
| FR-FB-09 | Replying to a user from inside the product. | P2 | [A] — out of the MVP; that is a support platform |

#### 6.11.1 Data minimisation — CONFIRMED

**[C]** Collect the minimum that makes feedback actionable, and nothing more.

| Field | Collected | Why |
| --- | --- | --- |
| Type | Yes | Routing and filtering |
| Message | Yes | The content itself |
| Created at | Yes | Ordering and trend |
| Role (trainer / client) | Yes | Interpreting the report |
| App version, platform, OS version | Yes | A bug report without these is usually unusable |
| Locale | Yes | Reproducing language-specific issues |
| Account reference | **[O]** | Needed only to follow up — see below |

**[A]** Explicitly **not** collected: name, email typed into the form, screenshots unless the user attaches one deliberately, device identifiers beyond platform and OS version, location, and **any health or training data**. A free-text field can still contain whatever the user types; the submission screen should say so plainly rather than pretending otherwise.

**[O]** Whether feedback carries an account reference. Linking it allows a follow-up and spam control; not linking it is more private and encourages candour. A middle option is a per-submission opt-in: "let the team contact me about this".

---

### 6.12 Internal admin and analytics — CONFIRMED, IN SCOPE (minimal)

**[C]** A closed web admin surface exists for the platform owner, to monitor the business, user activity, subscriptions and feedback.

**[C] For the MVP this is deliberately minimal.** Prefer off-the-shelf analytics and a simple query surface over a custom dashboard. A bespoke admin product is a second product, and this one is built by one person.

| ID | Requirement | Priority | Label |
| --- | --- | --- | --- |
| FR-ADM-01 | Admin access is authenticated, separate from the app's user accounts. | P0 | [C] |
| FR-ADM-02 | Admin access is role-based with explicit permissions. | P0 | [C] |
| FR-ADM-03 | Administrators **cannot** read clients' private training data without a defined need and a lawful basis. | P0 | [C] |
| FR-ADM-04 | Access to any personal or health-related record is logged. | P0 | [A] |
| FR-ADM-05 | The metrics in §6.12.1 are available to the owner. | P0 | [C] metrics, [O] surface |
| FR-ADM-06 | Feedback inbox (FR-FB-05…08) lives in the admin surface. | P0 | [C] |
| FR-ADM-07 | Account lookup and support actions (extend a trial, deactivate an account). | P1 | [A] |
| FR-ADM-08 | A custom analytics dashboard with charts and segments. | P2 | [C] future — see §9 |

#### 6.12.1 Metric definitions — CONFIRMED

**[C]** Definitions are fixed now, because a metric defined later cannot be computed backwards. Instrumentation must exist from the first release.

**Activity**

| Metric | Definition |
| --- | --- |
| **Active coach** | An account with a trainer capability that performed at least one **meaningful action** in the period. Meaningful = created, edited, assigned or duplicated a program; added or invited a client; recorded progress. **Opening the app is not activity.** |
| **Active client** | A client account that opened a session detail or marked a session done in the period. Opening the calendar alone is not activity. |
| **DAU / WAU / MAU** | Distinct active accounts over 1 / 7 / 30 rolling days, counted separately for coaches and clients. Never summed into one number — the two roles behave differently and a combined figure hides both. |
| **Registered coach / client** | Accounts that completed sign-up, regardless of activity. Reported separately from active counts. |

**Product usage**

| Metric | Definition |
| --- | --- |
| **Programs created** | Programs created in the period, **excluding** templates duplicated into themselves. Counted at creation, not assignment. |
| **Completed workouts** | Sessions marked done by a client, plus sessions a trainer recorded results against. **[A]** Deduplicated where both happened for the same session. |

**Commercial**

| Metric | Definition |
| --- | --- |
| **Trial user** | A trainer within an active 14-day trial window who has not yet subscribed. |
| **Trial-to-paid conversion** | Of trainers whose trial **ended** in a cohort month, the share that held a paid subscription within **30 days** of expiry. Cohort by trial end, not by sign-up — otherwise conversion looks worse the faster you grow. |
| **Active paid subscription** | A subscription in `active` status, **including** billing-retry grace periods, **excluding** cancelled-but-not-yet-expired ones. Those are counted as churn at cancellation, not at expiry. |
| **MRR** | Sum of active paid subscriptions normalised to a month: annual plans ÷ 12. Excludes trials, taxes and store commission. |
| **Churn** | Paid subscriptions cancelled in the period ÷ paid subscriptions active at its start. **Voluntary** (user cancelled) and **involuntary** (payment failed) reported separately — they call for completely different responses. |

**[A]** Store commission matters for a real revenue picture: Apple and Google take their share before the money arrives (§8.3). MRR as defined above is gross; a net figure needs the provider's payout data.

---

## 7. Proposed domain model

**[A]** Entire section is a proposal, provided so the architecture review has something concrete to argue with. It implies no database or framework choice.

```
Account            identity, auth, email, display name, locale, created_at
  └─ TrainerProfile      optional; specialization, bio, subscription_id
  └─ ClientProfile       optional; client-owned fields — dob/age, gender, height,
                         self-reported weight, goal (single field), health limitations

Relationship       trainer_account_id, client_account_id, status (invited|active|ended),
                   invited_at, accepted_at, ended_at
                   INVARIANT: at most one relationship per client with status = active
  └─ Consent            profile_consent, health_consent (separate), granted_at, revoked_at
  └─ TrainerAssessment  experience level, private notes   (no parallel goal field)

Exercise           global library entry: name + description PER LOCALE, media_ref,
                   muscle groups, equipment, category, difficulty
CustomExercise     owner_trainer_id + same shape, single locale as entered, private to owner

Program            owner_trainer_id, name, description, duration, is_template,
                   source_template_id
  └─ ProgramDay         order, label, notes
       └─ ProgramItem   order, exercise_ref (library or custom), parameters (shape [O]),
                        group_id (superset), notes

Assignment         program_id, relationship_id, start_date, status, assigned_at
  └─ Session        resolved date, source ProgramDay, status (upcoming|today|done|missed),
                    completed_at, completed_by
       └─ ProgressEntry  recorded_by (client|trainer), session_item_ref,
                         actual sets/reps/weight vs prescribed, note, recorded_at
                         UNIQUE (session_item_ref, recorded_by) — both roles may
                         record; neither overwrites the other (§6.6.1)

Subscription       trainer_account_id, plan, status, trial_ends_at, provider refs
Notification       recipient, type, locale, payload (non-sensitive), read_at
```

**[C]** Keyed by `relationship_id`, never by `client_id` alone: `Assignment`, `Consent`, `TrainerAssessment`, and through them `Session` and `ProgressEntry`. This is what keeps future multi-trainer support open (§3.2.4) while the MVP enforces one active trainer as an invariant.

**[A]** `Account.locale` holds the chosen interface language so server-generated notifications and emails match it (FR-LOC-05).

**[A]** Library `Exercise` carries per-locale name and description; `CustomExercise` does not, because a trainer authors in one language and is not a translator (FR-LOC-11, FR-LOC-12).

**[A]** Program access is resolved by an **access rule**, not by `relationship.status == active`. Today it admits an active relationship or an ended one inside its 30-day window; it must be able to admit a client-held subscription later without reshaping anything (§3.2.3).

Open modeling questions:
- **[O]** Whether `Session` rows are materialized at assignment time or derived from the program plus a start date. This follows directly from README decision 4 and is the central modeling decision of the MVP.
- **[O]** How a program edit propagates to already-materialized future sessions.
- **[O]** Whether `parameters` is a typed column set per exercise type or a flexible structure. Depends on README decision 3.
- **[O]** Whether per-locale exercise text is a translation table or locale-keyed fields. Either works; the choice affects how a third language is added.

---

## 8. Non-functional requirements

### 8.1 General

| ID | Requirement | Label |
| --- | --- | --- |
| NFR-01 | iOS and Android mobile apps. | [C] |
| NFR-02 | Minimum supported OS versions. | [O] — proposal [A]: iOS 16+, Android 10+ |
| NFR-03 | Phone-first layouts; tablet usable but not optimized. | [A] |
| NFR-04 | Cold start under 3s and list screens interactive under 1s on mid-range hardware. | [A] |
| NFR-05 | All client-visible workout content loads over the network; graceful empty, loading, and error states everywhere. | [A] |
| NFR-06 | Accessibility: dynamic type, VoiceOver/TalkBack labels, WCAG AA contrast. | [A] |
| NFR-07 | Video playback streams rather than requiring full download, with a poster image and bandwidth consideration. | [A] |
| NFR-08 | Crash and error reporting in production. | [A] |
| NFR-09 | Analytics instrumentation sufficient to measure §1.2, with no sensitive data in events. | [A] |
| NFR-10 | Technical stack and backend architecture. | [O] — README decision 11. See CLAUDE.md §3. |
| NFR-11 | Localization into Ukrainian and English for both roles and the landing page, with no hard-coded user-facing strings anywhere. | [C] |
| NFR-12 | Layouts tolerate Ukrainian string lengths (~15–30% longer than English) without truncation or overflow; reviewed in both languages. | [A] |
| NFR-13 | The architecture permits adding a language without touching screen code. | [C] |
| NFR-14 | The data model keeps future multi-trainer support viable per §3.2.4. | [C] |
| NFR-15 | Focus management: while a modal, sheet or dialog is open, keyboard and switch-control focus is trapped inside it. Controls behind the scrim are not reachable, not focusable and not announced by VoiceOver or TalkBack; focus returns to the element that opened the overlay when it closes. | [C] |
| NFR-16 | The keyboard focus indicator is drawn outside the control with a visible separation and never relies on colour alone; it is distinct from the pressed and the selected appearance. Any control placed over a photograph, video or other arbitrary backdrop needs its own focus treatment, because a single theme-dependent indicator colour cannot be guaranteed to contrast there. | [C] |

### 8.2 Security

**[A]** All proposals: authorization enforced server-side on every request and scoped by relationship; no client-side-only permission checks; transport encryption everywhere; secrets never in the repository or client bundle; sensitive fields encrypted at rest; audit trail for access to health-related fields; rate limiting on invitation and auth endpoints.

### 8.3 Platform and store constraints

**[C]** Trenumi is built to the **Apple Human Interface Guidelines**, the **App Store Review Guidelines** and **Android accessibility guidance**. Mobile touch targets are **48 x 48 minimum** wherever practical — this satisfies Apple's 44x44 pt and Android's 48x48 dp at once. See CLAUDE.md §4.3.

**[A]** Flagged early because they constrain the business model and the release plan:
- Apple and Google generally require digital subscriptions sold inside an app to use in-app purchase, with their revenue share. This affects pricing and may argue for subscribing on the web. Needs a deliberate decision alongside README decision 2.
- Health-related data triggers additional app-store privacy declarations.
- A public privacy policy and an in-app account-deletion path are mandatory for both stores.
- App review requires working demo credentials for both roles.

---

## 9. Out of scope and future opportunities

**[C]** Excluded from the MVP: nutrition plans, recipes, meal tracking; in-app trainer–client chat.
**[C]** Future possibility, not approved: AI assistant for trainers to create or modify workouts via natural language (e.g. "add a workout for this client next Tuesday").
**[C]** Future consideration: **comprehensive** client-driven workout logging — RPE, rest timers, superset handling, editing past entries. Minimal logging (mark done, actual weights and reps) is **in** the MVP.
**[C]** Future release: **multiple simultaneous trainers per client**, with a Coach Switcher and an explicit cross-trainer sharing model. The MVP must not block this — see §3.2.4.
**[C]** Future release: **client-purchased subscription** allowing a client to keep using previously assigned programs with no trainer. See §3.2.3.
**[A]** Future: additional interface languages beyond Ukrainian and English, which FR-LOC-07 is meant to make cheap.

### 9.1 Advanced admin dashboard — FUTURE, NEEDS VALIDATION

**[C]** A custom analytics dashboard with charts, segments and cohort views is a **future** product. The MVP covers the same questions with off-the-shelf analytics plus a simple query surface (§6.12).

**[A]** Build it only once the metrics in §6.12.1 are actually being read weekly and the off-the-shelf route demonstrably gets in the way. Until then it is a second product competing for the same single pair of hands.

### 9.2 Gym / organization subscription — FUTURE, BUSINESS HYPOTHESIS

**[C]** A B2B model for gyms is a future direction, **not** an approved requirement. Sketch:

- A gym owner buys an organization subscription.
- The subscription covers access for several trainers.
- The owner invites and manages those trainers.
- Each trainer still manages their own clients and programs.
- The organization may have its own billing and basic analytics.

**[C] Pricing hypothesis, unvalidated:** around **$100 per gym per month**. This is a starting point for research, not a decision.

**[O]** To research before any commitment:
1. How many trainer seats a subscription includes.
2. Seat-based versus flat-rate pricing.
3. Organization roles and permissions.
4. What happens when a trainer belongs to a gym **and** holds an individual subscription.
5. Client data ownership and privacy inside an organization — who sees what, and on what lawful basis.
6. Billing and subscription management at the organization level.

**[C]** Not implemented in the MVP. **[A]** But two architectural choices should not foreclose it, and both are free today — see CLAUDE.md §4.7.

**[C]** A progress entry records *who* recorded it, so client-entered and trainer-entered results share one shape from the start. Extending to comprehensive logging later adds fields, not a new entity.

---

## 10. Dependencies and prerequisites

| # | Prerequisite | Blocks | Label |
| --- | --- | --- | --- |
| D1 | Licensed **static illustrations** for the exercise library, text-free so one asset serves both languages | FR-EX-01, FR-EX-10 | [O] — materially cheaper and faster than the video library originally assumed |
| D2 | Stack and backend decision | all implementation | [O] |
| D3 | Payment/subscription provider | FR-SUB-04/05/06 | [O] |
| D4 | Privacy policy and terms | launch, FR-LND-03 | [O] |
| D5 | Apple Developer and Google Play accounts | release | [O] |
| D6 | Push notification infrastructure | FR-NOT-* | [O] |
| D7 | Brand, product name, and visual identity | landing page and app UI | [O] — README decision 12 |
| D8 | Ukrainian translation of the exercise library (names + descriptions), to a reviewed quality bar | FR-LOC-11, FR-EX-01, launch | [O] — see §6.9.1 |
| D9 | Ukrainian and English legal documents | FR-LOC-14, FR-LND-03, launch | [O] |

---

## 11. Release approach

**[A]** Proposal for discussion:

- **Phase 0 — definition.** This PRD approved, open decisions closed, user flows and UI/UX reviewed, stack chosen. No code.
- **Phase 1 — foundation.** Auth, accounts, relationships and the permission model, consent, invitation flow, **and the localization scaffolding**. Nothing else works without these and they are the hardest to retrofit. Localization belongs here, not at the end: strings added later are strings someone has to go back and extract.
- **Phase 2 — content.** Exercise library, program builder, templates.
- **Phase 3 — delivery.** Assignment, client calendar, client workout view, notifications.
- **Phase 4 — commercial.** Progress recording and review, subscription and trial enforcement.
- **Phase 5 — launch.** Store submission, privacy documents, closed beta with a handful of real trainers.
- **Parallel workstream — internal admin and analytics.** Instrumentation for §6.12.1 must ship **with Phase 1**, not after: a metric that was not recorded cannot be reconstructed. The admin surface itself can be off-the-shelf and can lag.
- **Parallel workstream — marketing landing page.** Starts once the core mobile flows are agreed; independent of the app's build phases, but its pricing section depends on decision 2 and its store links cannot exist before publication (§6.10).

**[A]** The permission model in §3.2 (now settled) and the scheduling model in §7 are the two decisions most expensive to change later. The scheduling model should be settled in Phase 0.

**[A]** Content translation (D8) runs in parallel with Phases 1–3, not after them, since it is a sourcing task with its own lead time.

---

## 12. Acceptance of this document

**[A]** This PRD is ready for implementation only when: every `BLOCKED` requirement is resolved, §3.2 is approved as the permission model, §13 contains no P0 open decisions, and the stack is recorded in CLAUDE.md.

---

## 13. Open product decisions

Carried over from README §7, expanded with impact and a proposed default where one is safe to propose. **None of these are decided.**

| # | Decision | Impact if unresolved | Proposed default **[A]** | Needed by |
| --- | --- | --- | --- | --- |
| 1 | Client invitation and account-linking mechanism | Blocks onboarding for both roles, and FR-CLI-03 | Shareable deep link the trainer sends over their own channel, plus optional email invite; link resolves to signup or to an add-trainer consent screen if already signed in | Phase 1 |
| 2 | Subscription tiers, pricing, trial-expiry behavior. **Trial itself RESOLVED**: 14 days / 3 clients | Blocks FR-SUB-04/06, landing page pricing, and the IAP question in §8.3 | Expiry → read-only trainer account, client access to already-assigned workouts preserved. Benchmarks: Everfit free to 5, Trainerize $9/mo for 2, StableFit ~$20/mo, TrueCoach $26/mo for 5 | Phase 4, but pricing is needed earlier for the landing page |
| 3 | Required exercise parameters, strength vs. cardio | Blocks FR-PRG-04, the builder UI, and the parameter data shape | Strength: sets, reps, weight, rest, optional tempo/RPE, note. Cardio: duration or distance, intensity, note | Phase 2 |
| 4 | Scheduling: repeating weekly pattern vs. per-date workouts | Blocks FR-PRG-03, the §7 session model, and **the cost of FR-PRG-15 bulk edit** — trivial under a weekly pattern, a real bulk operation under per-date sessions. The most structural open question | Support both: a weekly pattern as the authoring default, materialized into per-date sessions that the trainer can then override individually | Phase 1 (model), Phase 2 (UI) |
| 5 | **Presentation** of progress. Definition RESOLVED → FR-PRO-02 | Blocks FR-PRO-04 | History as a per-exercise list with a simple trend; charts deferred — they are disproportionate work for one person | Phase 4 |
| 6 | ~~Calendar statuses; can a workout be marked complete?~~ | **RESOLVED** Oct 28, 2026 → FR-CWX-06. Client marks done; statuses upcoming / today / done / missed. Residual: exact `missed` rule | Phase 3 |
| 7 | ~~Permission and privacy model with multiple trainers~~ | **RESOLVED** Oct 28, 2026 → §3.2. Relationship-scoped isolation, one active trainer in the MVP, multi-trainer deferred (§3.2.4) | — | Done |
| 8 | ~~Profile field ownership and handling of health information~~ | **RESOLVED** Oct 28, 2026 → §3.4. Client owns identity, body metrics, stated goal and health info; trainer owns their assessment and private notes; health shared under separate explicit consent. Residual: which fields are *required* | Phase 1 |
| 9 | Exercise **illustration** sourcing and licensing. Scope reduced Oct 28, 2026 — video removed from the MVP | Legal blocker on FR-EX-01/FR-EX-10 and on launch | None — requires a commercial decision, but far cheaper than the video library originally assumed | Phase 2, decided in Phase 0 |
| 10 | Notification channels and triggers | Blocks FR-NOT-03 | Push as primary with in-app inbox; email only for invitations and billing | Phase 3 |
| 11 | Technical stack and backend architecture | Blocks all implementation | Deliberately none — to be decided in the architecture review | Phase 0 |
| 12 | Branding and launch market. **Name RESOLVED**: Trenumi | Blocks landing page, app store listing, and the privacy regime | Name **resolved**: Trenumi. Visual identity, logo and trademark/domain clearance still open. **Localization resolved**: Ukrainian + English (§6.9) | Phase 0 for the privacy regime, Phase 5 for the rest |

**README cross-reference:** README §7 numbers decisions 1–12, matching the table above one-to-one. Everything numbered 13 and above exists only in this document; README refers to them by these numbers rather than renumbering. Numbers are permanent in both files and are never reused.

### Additional open questions raised by this PRD

| # | Question | Why it matters |
| --- | --- | --- |
| 13 | ~~Is a trainer web or tablet builder needed at launch?~~ | **RESOLVED** Oct 28, 2026 → §1.1.1. Inverted by research: the gap competitors left is the *mobile* builder, so mobile-first is the bet and no web builder ships in the MVP |
| 14 | ~~Can one account be both trainer and client in the MVP?~~ | **RESOLVED** Oct 28, 2026 → §2.4. One role per account in the UI; the model stays capable. Reversible without migration |
| 15 | ~~Can a client see progress recorded about them?~~ | **RESOLVED** Oct 28, 2026 → §5.5, FR-PRO-06. Yes; trainer's private notes stay trainer-only (FR-PRO-08) |
| 16 | Is **read-only** offline access to the current week required? Full offline sync is already excluded | Gym connectivity; untested assumption, no evidence found in competitor research (FR-CWX-08a) |
| 17 | Can multiple programs be active for one client at once? | FR-PRG-13, builder and calendar UX |
| 18 | Is a minimal internal admin/support view needed at launch? | §2.3 |
| 19 | Does the MVP need any pre-launch client-facing legal consent flow for health data? | §3.3, legal exposure |
| 20 | ~~What happens to assigned programs when a relationship ends?~~ | **RESOLVED** Oct 28, 2026 → §3.2.3. Trainer access revoked immediately; client read-only for 30 days; account and history retained |
| 21 | Does accepting a new trainer's invitation auto-end the current relationship, or is it blocked until the client ends it? | §3.2.2, FR-CLI-07a — the difference between a smooth switch and a dead end |
| 22 | Does the former trainer learn that the client left *for another trainer*, or only that they left? | §3.2.2, trainer trust and privacy |
| 23 | Is general profile consent a separate step, or implied by accepting the invitation? | §3.3 — health consent stays explicit either way |
| 24 | What does a trainer see in place of fields the client withheld — nothing, or an explicit "not shared"? | §3.3, trainer experience vs. information leakage |
| 25 | Who produces the Ukrainian exercise library content, to what quality bar, and must both languages be complete at launch? | §6.9.1, FR-LOC-11, D8 — a launch-gating sourcing task, tied to decision 9 |
| 26 | ~~Are demonstration videos free of spoken or on-screen language?~~ | **RESOLVED** Oct 28, 2026 — no built-in video in the MVP. Replaced by: illustrations must contain no embedded text (§6.9.1) |
| 29 | Does feedback carry an account reference, or stay anonymous? | §6.11.1 — linking enables follow-up and spam control, anonymity encourages candour |
| 30 | Which analytics tool, and does it satisfy the health-data constraints in §3.3? | §6.12 — the choice is coupled to the stack decision (#11) |
| 31 | Does the admin surface need an account-lookup view at launch, or can support run on direct database access? | FR-ADM-07 — supersedes the earlier question #18 |
| 32 | Seat-based or flat-rate pricing for gyms, and how many seats? | §9.2 — pure research, no MVP impact |
| 33 | What exactly counts as a `missed` session, and does a client see that label? | FR-CWX-06 — a label that shames the client is a retention risk |
| 30 | Does the trainer get notified per completed session, or a daily digest? | FR-NOT-09 — per-session notifications do not survive 20+ clients |
| 27 | Units of measurement: metric only, or imperial for English? | FR-LOC-13 — affects the data model if both must be stored |
| 28 | Which language does the landing page serve by default, and on what signal? | FR-LND-08, SEO and first impression |

---

## 14. Decision log

| Date | Decision | Where |
| --- | --- | --- |
| 2026-10-28 | Permission model: relationship-scoped isolation | §3.2 |
| 2026-10-28 | Goal and experience level split — client states, trainer assesses | §3.4 |
| 2026-10-28 | Client can see progress recorded about them; trainer's private notes stay private | §5.5, FR-PRO-06/08 |
| 2026-10-28 | Relationship end: trainer access revoked immediately, client read-only 30 days, nothing auto-deleted | §3.2.3 |
| 2026-10-28 | Client-purchased subscription deferred to a future release; architecture must not preclude it | §3.2.3, §9 |
| 2026-10-28 | **Revised:** one active trainer per client in the MVP; multiple trainers and the Coach Switcher deferred | §3.2, §3.2.4 |
| 2026-10-28 | Localization: Ukrainian (uk-UA) and English (en) in the MVP, both roles and the landing page | §6.9 |
| 2026-10-28 | One role per account in the UI; the model stays capable of both | §2.4 |
| 2026-10-28 | **Minimal client logging in the MVP** — mark done, actual weights and reps | §2.2, FR-CWX-05 |
| 2026-10-28 | Trial changed from 7 days / 2 clients to **14 days / 3 clients** | FR-SUB-01/02 |
| 2026-10-28 | Exercise library ships with **static illustrations, no built-in video**; external links only | FR-EX-01, FR-EX-08 |
| 2026-10-28 | Competitive bet: **mobile-first workout builder** | §1.1.1 |
| 2026-10-28 | Confirmed **solo-built product**, one person, AI-assisted | §4.1.1, CLAUDE.md §0 |
| 2026-10-28 | Product name: **Trenumi** (working title, replaces "Fitness Coach App") | README §7 decision 12 |
| 2026-10-28 | Duplicate training day and whole week — **P0** | FR-PRG-05a/05b |
| 2026-10-30 | Focus indicator: external ring, 2px with a 2px gap, dark in light mode and light in dark mode | NFR-16, CLAUDE.md §4.3 |
| 2026-10-30 | Focus is trapped inside an open modal; controls under the scrim cannot receive focus | NFR-15 |
| 2026-10-30 | Controls over photo or video backdrops get a contextual focus treatment, deferred until such a screen exists | NFR-16 |
| 2026-10-30 | Two-tone focus ring measured and **rejected** for global use; one tone per theme stands | NFR-16, docs/design-system/buttons.md §3 |
| 2026-10-30 | Disabled buttons: Primary, Destructive and Accent neutral filled; Secondary keeps its outline; Ghost fully transparent | docs/design-system/buttons.md §4 |
| 2026-10-30 | Accent button carries a 1px dark border in light mode only — lime on white is 1.15:1; in dark the token resolves to transparent | docs/design-system/buttons.md §2 |
| 2026-10-30 | Button labels are **Manrope SemiBold 600** via `Label/SM` and `Label/MD`; `Body/*` stays Regular 400 for everything else. Supersedes the Medium 500 draft of the same day | CLAUDE.md §4.3 |
| 2026-10-30 | Library presentation standard: documentation in the left sidebar, components and examples on the right | CLAUDE.md §4.9 |
| 2026-10-30 | Lucide `INSTANCE_SWAP` discards icon colour bindings; **fixed** by Mask + Colour Plate, migrated across all 160 icon slots and verified | docs/design-system/buttons.md §5 |
| 2026-10-30 | Mask + Colour Plate is a **Figma-only** workaround; in application code icon colour binds to the semantic token directly | docs/design-system/buttons.md §5 |
| 2026-10-30 | Library layout applied to every section: documentation sidebar left, components right; `Proposals / Stage B` removed, QA regrouped as `Internal / QA` | CLAUDE.md §4.9 |
| 2026-10-28 | Both trainer and client may record results; entries keyed by author, neither overwrites. **Which entry leads on disagreement is PROPOSED, not approved** | §6.6.1, FR-PRO-09/10 |
| 2026-10-28 | Critical notifications delivered individually; client activity batched into a digest | FR-NOT-09/10 |
| 2026-10-28 | **Simplified:** one client-owned goal field; trainer keeps experience level + free-text notes only | §3.4, FR-CLI-02 |
| 2026-10-28 | No guaranteed offline viewing or sync in MVP; graceful connectivity handling is **P0**; offline viewing of current week is a P1 improvement | FR-CWX-08a–08f |
| 2026-10-28 | Bulk edit across weeks kept as **P1 candidate**, priority decided with the scheduling model | FR-PRG-15 |
| 2026-10-28 | **Withdrawn:** claim that no competitor solves bulk editing. Everfit, TrueCoach and Trainerize all do, on desktop | §1.1.1 |
| 2026-10-28 | **Downgraded:** mobile-first builder is a hypothesis, not a confirmed advantage, pending interviews | §1.1.1, RESEARCH_PLAN.md H1 |
| 2026-10-28 | **Marketing landing page CONFIRMED, IN SCOPE** as a separate workstream — trainer acquisition only, no web dashboard or web builder | §6.10, README §5.1 |
| 2026-10-29 | **Minimal in-app feedback CONFIRMED, IN SCOPE** — three types, admin inbox with four statuses, minimised data | §6.11 |
| 2026-10-29 | **Minimal internal admin and analytics CONFIRMED, IN SCOPE** — off-the-shelf tools preferred over a custom dashboard | §6.12 |
| 2026-10-29 | **Metric definitions fixed** — active user, trial-to-paid, MRR, churn. Instrumentation must ship with Phase 1 | §6.12.1 |
| 2026-10-29 | Advanced admin dashboard and **gym / organization subscriptions** recorded as FUTURE, needing validation. $100/gym/month is an unvalidated hypothesis | §9.1, §9.2 |

| 2026-10-30 | Screen layout rhythm **12 / 12 / 24**: heading to content 12, card to card 12, section to section 24; 16 is card padding and not part of the rhythm. Every value bound to a Figma Variable | CLAUDE.md §4.10, docs/design-system/section-layout.md |
| 2026-10-30 | Every screen section is its own Auto Layout container holding both its heading and its content; a heading is never a loose sibling of the block it names | CLAUDE.md §4.10 |
| 2026-10-30 | Navigation arrows unified product-wide: a bare `chevron-right` at 16 for **every** internal navigation and drill-down, including Quick Actions. The circled `arrow-up-right` is withdrawn. Arrows with their own meaning (`chevron-down`, back, external link) are unaffected. A non-tappable element gets no arrow | CLAUDE.md §4.10, docs/design-system/section-layout.md §4 |
| 2026-10-30 | Today's Schedule shows at most **five** clients per hour. Over five adds a `Showing 5 of 50 clients` caption, not a second button. The in-card `View all` control is **removed** — `View schedule` in the heading is the only navigation out of the card | docs/design-system/dashboard.md §2 |
| 2026-10-30 | Schedule sorting: `Need a plan`, then `Ending soon`, then everyone else in a stable predictable order. Never random | docs/design-system/dashboard.md §2 |
| 2026-10-30 | **`Review Progress` removed entirely** — not in the design, not in demo data, not a planned feature. The rule that would trigger it is not agreed and cannot be inferred safely: programs contain heavy, medium and light weeks, so one drop in working weight is not a regression. No automatic progress assessment and no AI conclusions on the Dashboard | docs/design-system/dashboard.md §2 |
| 2026-10-30 | An hour with no clients shows a compact empty state, never placeholder rows or reserved space | docs/design-system/dashboard.md §2 |
| 2026-10-30 | New main component **`Notification Badge`**: lime fill, ink digit, 1px separator `badge/notification/border` (ink at 50% in light, transparent in dark). Sits on the outer top-right of the bell, which stays fully visible. 1-9 shows the digit, 10+ shows `9+`, zero hides the badge. The count must also appear in the host control's accessible name | docs/design-system/dashboard.md §4 |
| 2026-10-30 | Time Tab count becomes a translucent pill with min-width, on two new per-mode tokens `badge/count/bg` and `badge/count/bg-on-selected` derived from the tab's own foreground at low alpha. Light-mode alpha set to **6%**, because 8% drops the 12px digit to 4.48:1 and fails AA | docs/design-system/dashboard.md §3 |
| 2026-10-30 | `Show status` boolean added to `Schedule Row`, so a row with no attention state no longer needs its badge sublayer hidden by hand | docs/design-system/dashboard.md §2 |
| 2026-10-30 | **[O]** Library token gaps: padding 10, 14, 18 and radius 32 exist in `Badge` and `Bottom Navigation` with no matching token. Either add tokens or move those components onto existing ones — a token decision, not a local override | docs/design-system/section-layout.md §3 |
| 2026-10-30 | **[O]** How the Time Tabs strip is generated — booked hours only, or the whole working day — is undecided. Hourly booking itself is a design assumption; a Scheduling module is not in the confirmed MVP scope | docs/design-system/dashboard.md §2 |

| 2026-10-30 | Program status and session format are **semantically separate** badges on the same `Badge` component: `Program status` is `Need a plan` (error tone) or `Ending soon` (warning tone); `Session format` is `In person` or `Online`, both neutral. The two actionable statuses never share a colour | docs/design-system/dashboard.md §2 |
| 2026-10-30 | `Self-guided` removed from the hourly schedule — a session with no scheduled time with the trainer does not belong in it | docs/design-system/dashboard.md §2 |
| 2026-10-30 | **[O]** `Ending soon` has no agreed threshold; it is shown only where a program has a defined end date | docs/design-system/dashboard.md §2 |
| 2026-10-30 | Badge labels use sentence case, like every other Trenumi string: `Need a plan`, `Ending soon` | docs/design-system/dashboard.md §2 |
| 2026-10-30 | Schedule Row internals: name to workout `space/2`, workout to badges `space/4`, between badges `space/4`. Badges wrap, so a longer Ukrainian label grows the row instead of pushing the chevron out of the card | docs/design-system/dashboard.md §2 |
| 2026-10-30 | A section heading's visual height is its **title** (24), even when it carries a control. The control is centred on the title and its 48 touch target is a hit area overflowing into the surrounding gaps | CLAUDE.md §4.10, docs/design-system/section-layout.md §2 |
| 2026-10-30 | Neutral `Badge` tone moved onto a dedicated `badge/neutral/bg` (`#f0f0f0` light), lifting its 12px label from 4.23:1 to **4.68:1** and clearing AA. `border/subtle` was left alone because it also draws dividers and the Secondary button outline | docs/design-system/dashboard.md §2 |

| 2026-10-30 | Full localised date on the Dashboard: `FRIDAY, 30 OCTOBER` / `П'ЯТНИЦЯ, 30 ЖОВТНЯ`, from a locale-aware formatter in the user's own time zone | docs/design-system/dashboard.md §1 |
| 2026-10-30 | **Both KPI cards are always white**, whatever the counts are: white surface, ink number, secondary label, neutral chevron. The count-driven ink card for `Need a plan`, agreed earlier the same day, is **withdrawn** | docs/design-system/dashboard.md §1 |
| 2026-10-30 | Quick Action circular icon is **ink with a white glyph** (`text/primary` circle, `text/inverse` glyph), which inverts correctly in dark mode and never falls back to lime. The global lime token is untouched | docs/design-system/dashboard.md §1 |
| 2026-10-30 | Notification Badge is **red with a white digit and no stroke**, on independent tokens `notification/badge/bg` and `notification/badge/fg`. They carry the value of `color/error/600` and white but are deliberately **not aliases**, so a change to the error palette cannot move the badge. White on red 5.62:1; badge vs white button 5.62:1, vs dark surface 3.32:1, so no outline is needed. Supersedes the lime badge and both of its measured outline treatments | docs/design-system/dashboard.md §4 |
| 2026-10-30 | Session format badges are **both neutral grey**, on the same `badge/neutral/bg` + `text/secondary` (4.68:1 light, 5.34:1 dark). A soft-blue `Online` was tried and reverted the same day: colour is reserved for statuses that need attention, not for distinguishing formats | docs/design-system/dashboard.md §2 |
| 2026-10-30 | Badge order in a schedule row is **session format first, then program status**. Format is stable information and reads quieter; status is conditional and must be noticed | docs/design-system/dashboard.md §2 |
| 2026-10-30 | No divider under the Time Tabs. The schedule card's own `space/12` gap separates the strip from the client list | docs/design-system/dashboard.md §2 |

| 2026-10-30 | Schedule rows use a 40 px **`Avatar`** component instead of a repeated exercise icon: `Type=Photo` for a client-uploaded photo (circular crop, scaleMode FILL), `Type=Initials` as the fallback. A photo is optional and only the client can add one; the upload mechanism is not designed yet | docs/design-system/dashboard.md §2 |
| 2026-10-30 | Schedule Row internal spacing revised: workout description to badges raised from `space/4` to **`space/8`**. Name to workout stays `space/2` and badge to badge stays `space/4` | docs/design-system/dashboard.md §2 |
| 2026-10-30 | **Learning prototype sandbox CONFIRMED** — a four-week course prototype lives in a separate `trenumi-ui-lab` repository on its own React + TypeScript + Vite + Storybook stack. It consumes the Trenumi design system but may not change it, uses no real client data, and sets no architectural precedent: PRD NFR-10 / README decision 11 stay open | CLAUDE.md §4.11 |

| 2026-11-06 | **Low contrast is reserved for disabled.** A neutral badge or chip is made quiet by its plate, size and weight, never by weakening its text colour: `Badge` Tone=Neutral and the unselected `Time Tab` count now carry `text/primary` (17.60:1 and 17.63:1 light). Both previously used `text/secondary` on a filled plate, within 1.11:1 of the `action/disabled/*` pair, and read as switched off | docs/design-system/dashboard.md §2 |

| 2026-11-06 | `color/neutral/100` (`#f0f0f0`) added to the primitives ramp and `badge/neutral/bg` aliased to it. Every semantic colour is now an alias except four with documented reasons: `badge/count/*` are per-mode alpha derivations, `notification/badge/*` are deliberately independent of the error palette | CLAUDE.md §10 |
| 2026-11-06 | Seven duplicate navigation strings removed from the `Language` collection (`nav/today`, `nav/clients`, `nav/programs`, `nav/library`, `nav/progress`, `nav/calendar`, `nav/profile`). They duplicated the role-scoped `nav/coach/*` and `nav/client/*` keys, which the Bottom Navigation actually uses, and no layer was bound to them | CLAUDE.md §4.4 |
| 2026-11-06 | Dashboard copy moved into the `Language` catalog: 16 new strings in `uk-UA` and `en`, with 73 layer and instance-property bindings, so the screen renders fully in Ukrainian by switching the collection mode. Satisfies rule 9 in CLAUDE.md §2 for this screen | docs/design-system/dashboard.md §6 |
| 2026-11-06 | **[O]** The Ukrainian greeting needs a decision on the **vocative** (`Роксолано`) versus the nominative (`Роксолана`) before the string ships | docs/design-system/dashboard.md §6 |
| 2026-11-06 | **[O]** `Showing 5 of 50 clients` is plural-dependent; the Figma variable holds one mock form and the implementation must use a locale-aware plural API with Ukrainian's three categories | docs/design-system/dashboard.md §6 |
| 2026-11-06 | Ukrainian layout check found and fixed a widow in the Create program subtitle, and recorded that the schedule heading row fills its 350 px exactly in Ukrainian with no slack left | docs/design-system/dashboard.md §6 |

| 2026-11-06 | **Design-token pipeline CONFIRMED, IN SCOPE** — `style-dictionary` generates `src/styles/tokens.css`, `tokens.dark.css` and a Tailwind preset from `tokens.json`, exported from the Figma Variables. Approved as a **narrow exception** to CLAUDE.md §3: it is design-system build tooling and resolves none of the open stack decisions (NFR-10 / README decision 11 stay open) | CLAUDE.md §3, docs/design-system/tokens.md |
| 2026-11-06 | 146 tokens exported from Figma with 47 dark-mode overrides. The Tailwind preset resolves to CSS custom properties rather than hex, so one theme switch re-themes Tailwind classes and hand-written rules together | docs/design-system/tokens.md §3 |
| 2026-11-06 | **[O]** Token export is manual — no webhook and no CI step. Automate once tokens change often enough to be worth it | docs/design-system/tokens.md §6 |
| 2026-11-06 | **[O]** Only the Mobile mode of the `Sizes` collection is exported; tablet and desktop need a breakpoint strategy before they mean anything in CSS | docs/design-system/tokens.md §5 |

| 2026-11-06 | Token coverage audit: **colour is fully bound** — 1337 nodes across 18 components and 829 nodes across the Dashboard states, zero hardcoded paints | docs/design-system/token-coverage.md §1 |
| 2026-11-06 | **[O]** Spacing debt found: of 993 library spacing values, 172 are unbound though a matching token exists (mechanical fix), and **300 sit off the multiples-of-4 scale** (6, 7, 9, 10, 14, 18 px) across Bottom Navigation, Icon Button, Button, Text Field, Textarea, Chip, Badge, List Item, Schedule Row and Switch. Snapping them to the scale is a Phase 1B geometry change, not a token cleanup, and is not resolved | docs/design-system/token-coverage.md §2 |
| 2026-11-06 | **[O]** Radius: Bottom Navigation 32 and Button 22 have no token; `radius/3xl` (28) sits off the global radius scale with no written rationale, unlike `radius/ml` (18) which has one | docs/design-system/token-coverage.md §3 |
| 2026-11-06 | Tailwind preset maps a token's trailing `bg` / `fg` / `border` segment to the matching Tailwind property, so classes read `bg-action-primary` and `text-action-primary` rather than stuttering. Primitives are also exposed unprefixed as `bg-brand-lime` | docs/design-system/tokens.md §3.1 |

| 2026-11-06 | **[O]** `Semantic Colors` carries duplicate tab-bar tokens: `nav/active-bg`, `nav/fg-active` and `nav/fg-inactive` are used by 107 paints, while `nav/selected/*` and `nav/unselected/*` are used by none. Same pattern as the `Language` nav strings. Not removed — deleting a token needs a go-ahead | docs/design-system/token-coverage.md §4.1 |
| 2026-11-06 | `tokens.json` was first transcribed by hand and shipped without the three nav tokens the components actually use. Fixed, and the `tokens-sync` skill now generates the file so it cannot recur | docs/design-system/token-coverage.md §4.1 |
| 2026-11-06 | Custom skill `/tokens-sync` added at `.claude/skills/tokens-sync/`, automating export, build, diff and commit. It stops on a token removal, checks renames against the repository before committing, and asks before pushing because the repository is public | .claude/skills/tokens-sync/SKILL.md |

| 2026-11-06 | **[O] No PRD requirement covers a trainer Dashboard.** The KPI cards and quick actions trace partially to FR-CLI-05 and FR-PRG-10; `Today's schedule` traces to nothing, implies booking (not in MVP scope, §6.2) and sits downstream of BLOCKED decision #4. Needs a scope decision before implementation — no requirement was invented to close the gap | docs/design-system/dashboard.md §5.1 |
| 2026-11-06 | Dashboard Loading and Error states designed, closing CLAUDE.md §8 rule 5 for this screen. Loading is a skeleton of the real layout rather than a spinner; Error fails only the section that failed and leaves KPI and quick actions usable, with copy bound to `errors/load-failed`, `errors/try-again` and `actions/retry` | docs/design-system/dashboard.md §5 |
| 2026-11-06 | Ukrainian greeting uses the **nominative**, not the vocative. Inflecting a name needs morphology this project will not build, and a wrong vocative reads worse than a plain nominative. Recorded on the `dashboard/greeting-morning` variable | docs/design-system/dashboard.md §6 |
| 2026-11-06 | Three unused tab-bar tokens removed (`nav/selected/*`, `nav/unselected/*`); 127 spacing values and 29 radii bound to tokens that already carried the same value, with no visual change | docs/design-system/token-coverage.md §4.1 |

| 2026-11-06 | Dark surface changed from `#15101f` to **`#1c1a22`**: the old value sat 1.08:1 from the canvas and read purple. Separation rises to 1.17:1 and the blue-green gap drops from 15 to 8. Changed on the primitive `color/dark/900`, so `surface/default`, `input/bg` and all four `status/*/bg` move with it — status text stays above 6.3:1 | docs/design-system/tokens.md |
| 2026-11-06 | **[C] `Today's schedule` stays in the product** — confirmed November 6, 2026. The Dashboard therefore needs new PRD requirements for a trainer home screen and an hourly schedule, which in turn needs the booking question answered. Option 1 (drop the schedule from the MVP) is **withdrawn** | docs/design-system/dashboard.md §5.1 |

**[A]** Superseded on the same day: an earlier draft of §3.2 assumed multiple simultaneous trainers with a Coach Switcher and a merged calendar. That is now a future release. Anything still describing a Coach Switcher, per-trainer filtering, or a cross-trainer matrix is stale and should be reported as a defect in this document.

## 15. Glossary

| Term | Meaning |
| --- | --- |
| **Relationship** | A link between one trainer account and one client account. The unit of permission scoping. A client has at most one `active` relationship in the MVP. |
| **Consent** | A client's grant of profile or health-information visibility to a trainer, scoped to the relationship and revocable. |
| **Trainer assessment** | A trainer's own record of a client's goal and experience level, private to that relationship, distinct from the client's stated goal. |
| **Locale** | The user's interface language, `uk-UA` or `en`, stored on the account. |
| **Program** | A trainer-authored training plan made of days and exercises. May be a template or client-specific. |
| **Template** | A reusable program not tied to a client. |
| **Assignment** | A program given to a client through a relationship, with a start date. |
| **Session** | A single dated training day a client sees in their calendar. |
| **Progress entry** | A record of actual performed results, recorded by a trainer in the MVP. |
| **Trial** | The 7-day free period for a trainer, capped by client count. |
