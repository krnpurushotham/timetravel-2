# Lego Time Patrol — Implementation Plan

> **Version:** 1.2 | **Date:** June 2026
> **Stack:** Vite + React | CSS3/SVG | Web Audio API | LocalStorage | SunCalc

---

## Overview

This implementation plan reflects the current **Lego Time Patrol** prototype after the stabilization, parent routine editing, multi-day timeline, and minifig configurator work.

The app is currently a local-first Vite/React planner prototype. It stores profiles, routines, logs, daily task overrides, and character configuration in `localStorage`. The primary user flows are usable, but profile-scoped schedule data, automated tests, playback/countdown features, and production-grade parent security remain pending.

---

## Current Build Audit

The following core infrastructure is built and verified:

1.  **Timeline Viewport:** Draggable/panning studded timeline, inertia scroll, 1-hour jump arrows, zoom controls, date rollover, continuous neighboring-day context, and a subtle always-visible now footer indicator.
2.  **Multi-Day Routine Blocks:** Parent-entered durations are accepted in minutes and converted to internal hour values. Long routines can visually span across midnight and multiple days.
3.  **Lego Routine Bricks:** Color-coded, studded bricks with status states, zoom-aware minimum widths, drag-to-reschedule, right-handle resize, double-tap completion, and swipe-down skip.
4.  **Parent Dashboard:** Guardian PIN gate, routine add/edit/delete/reset, today-only vs all-days confirmation, records log, and profile editor.
5.  **Lego Cadet Mascot:** Active-profile SVG minifig rendered on the timeline with walk/action hooks.
6.  **Character Configurator:** Reference-inspired Lego configurator page with heads/expressions, hair/headwear, torso/outfits, legs, accessories/tools, ability chips, central preview, and save/preview layout.
7.  **Mood Station:** 2D joystick with six mood columns and energy value.
8.  **Sky/Backdrop System:** Amsterdam sunrise/sunset, moon rise/set/phase, pastel sky states, clouds, city/mountain scenery, and date/time widget.
9.  **Synthesizer Audio:** Web Audio API sound effects for pops, whistles, zip, unlock, error, and tick feedback.
10. **Code Health:** `npm run lint` and `npm run build` pass.

---

## Known Technical Debt

- `App.jsx` still contains a large amount of state and workflow logic. It should be decomposed gradually after behavior tests are added.
- Schedule data is not fully profile-scoped. The active profile owns minifig configuration, but routines/templates/logs are still shared.
- Parent PIN is hardcoded to `1234`.
- There is no automated test suite.
- LocalStorage schema is unversioned and lacks migrations.
- The configurator is visually improved, but needs responsive QA on phones/tablets.
- The timeline supports multi-day visual context, but recurring/template semantics for holidays, weekly plans, and profile-specific calendars are still incomplete.

---

## Phase-Wise Roadmap

### Phase 1: Stabilization, QA & Data Boundaries

*Focus: protect current behavior before adding larger features.*

- Add Vitest tests for:
  - date-key generation
  - Amsterdam decimal hour conversion
  - day rollover
  - minutes-to-hours duration conversion
  - today-only vs series routine updates
  - drag/resize constraints
- Add screenshot/manual QA checklist for:
  - desktop/mobile timeline layout
  - configurator layout
  - parent edit flow
  - multi-day routine block visibility
- Extract pure helpers:
  - `utils/time.js`
  - `utils/storage.js`
  - `utils/scheduling.js`
  - constants/configuration data
- Introduce profile-scoped schedule data:
  - `profiles[*].minifig` already exists
  - add profile-scoped templates, daily task maps, logs, and surprise reveal state
- Add localStorage versioning and migration.
- Replace hardcoded parent PIN with configurable local PIN setup.

### Phase 2: Playback & Countdown Features

*Focus: make the planner useful during and after routines.*

- **Stop-Motion Day-in-Review (F-07 / F-08):** Auto-scroll timeline and play task assembly moments for completed tasks.
- **Routine Countdowns (F-09):** Future routine tap opens countdown overlay.
- **In-Progress Builder (F-10):** Active routine shows progress as Lego layers.
- **Time Pressure Cues (F-11):** Active/soon bricks change tone and size as end time approaches.

### Phase 3: Weekly Rhythm & Recurrence

*Focus: move beyond daily/default routines.*

- **Weekly Template Engine (F-14):** Seed weekday-specific routines.
- **Special Day Banner (F-15):** Display gym/library/swim badges.
- **Multi-day Event Semantics:** Support holiday blocks and long events as first-class records, not only long durations.
- **Preparation Alerts (F-16):** Evening bag/kit checklist tasks.
- **Lego Growth Models (F-29):** Mid-ground model progresses Monday-Friday.

### Phase 4: Rewards, Bedtime & Locker

*Focus: engagement loops and parent-child reflection.*

- **Mystery Gift Boxes (F-25 / F-26):** Claimable/vanishing surprise boxes.
- **Cozy Bedtime Baseplate (F-34):** Dimmed bedtime scene and sleeping Cadet.
- **Appreciation Chest Ledger (F-35):** Drag praise/growth bricks into locker.
- **Gratitude Audio Logs (F-36):** Optional 10-second local audio memories.

### Phase 5: Family Coupling Plates

*Focus: coordinate multiple household schedules.*

- **Multi-Plate Junction Map (F-F01):** Parallel plates for family members.
- **Rolling Stock / Vehicles (F-F02):** Character vehicles on schedule rails.
- **Magnetic Coupling (F-F03 / F-F06):** Snap shared activities together.
- **Engine & Wagon Logic (F-F04):** Parent schedules guide child schedules.

### Phase 6: Social Rails & Notice Boards

*Focus: safe, privacy-aware social scheduling.*

- **Station Playgrounds (F-S01):** Friend/public-location nodes.
- **Ghost Wagon Invitations (F-S02 / F-S06):** Tentative playdate blocks.
- **Privacy Boundary Geofencing (F-S07):** Obfuscate home/private locations.
- **Notice Board Gallery:** Brick-framed photos tied to safe public stations.
