# Lego Time Patrol — Current Task Board

This task board tracks the implementation status of **Lego Time Patrol** after the June 2026 stabilization and configurator work.

---

## Current Build Status

*   [x] **Build health:** `npm run lint` and `npm run build` pass.
*   [x] **React/Vite baseline:** Vite + React app with LocalStorage persistence, Web Audio API effects, and componentized minifig configurator.
*   [x] **Git status:** Current source state has been committed through `7119a6e Refine Lego configurator visuals`.

---

## Completed Tasks

*   [x] **Studded Timeline Baseplate (F-01 / F-05):** Panning horizontal studded timeline with inertia scrolling, center hour anchors, zoom controls, and date rollover at day boundaries.
*   [x] **Continuous Multi-Day Timeline Context:** Timeline renders neighboring days so long blocks can span across midnight; parent-entered durations support multi-day values in minutes.
*   [x] **Now Footer Indicator:** The current-time marker is a small semi-transparent footer indicator with time label and viewport-edge clamping.
*   [x] **Cadet Mascot (F-02):** Dynamic SVG minifig mascot integrated into timeline, driven by the active profile's configured character.
*   [x] **Lego Minifig Character Configurator:** Dedicated configurator page with heads/expressions, hair/headwear, torso/outfits, legs, accessories, ability chips, save/preview panel, and Lego-style reference-matched layout.
*   [x] **Routine Bricks (F-03 / F-19):** Stud decoration, color status coding, zoom-aware minimum widths, right-side resize handle, horizontal scheduling drag, and current-day interaction guard for neighboring-day context.
*   [x] **Parent Routine Editing:** Parent dashboard supports add, edit, delete, reset, today-only updates, and all-days/series updates. Edit mode populates the form and cancel clears without saving.
*   [x] **Duration Input in Minutes:** Parent form accepts duration in minutes while internal timeline math continues using hours.
*   [x] **Done-Stamping (F-18):** Double-tap completion, procedural pop sounds, star trophy state, and burst particles.
*   [x] **Deconstruction Skipping (F-21):** Swipe down skips, slide-whistle feedback, restored/pending toggles, and action logs.
*   [x] **Cadet Mood Station (F-31):** Dedicated mood page with 2D head joystick tracking mood columns and energy levels.
*   [x] **Guardian Gate Settings (F-17 / F-20):** PIN gate, parent dashboard, records logger, routine creation/editing, and profile editors.
*   [x] **Profile-Specific Minifig State:** Profiles include `minifig` configuration and timeline mascot uses the active profile.
*   [x] **Web Audio API Engine:** Clicky pops, slide whistle, centering zip, unlock chime, error buzz, and timeline tick synthesis.
*   [x] **Pastel Sky & Clouds (F-01 / F-30):** Sunrise/sunset-aware sky gradients, comic clouds, sun/moon arcs, Amsterdam time calculations, moon visibility, and moon phase rendering.
*   [x] **Comic Scenery Backdrop:** City skyline and mountain/ocean background elements behind the timeline.
*   [x] **Shift Constraints (F-12 / F-13):** Mandatory tasks block child dragging; optional/flexible tasks ripple against fixed tasks with error feedback.
*   [x] **Code Stabilization:** Removed stale Antigravity scaffolding, disabled ambient particle loop, unused activity-scene calculations, and lint violations.

---

## Pending Tasks (Implementation Roadmap)

### Phase 1: Interaction Polish & Tests
- [ ] **Automated Tests:** Add Vitest coverage for date keys, Amsterdam time conversion, day rollover, task duration conversion, series updates, and drag constraints.
- [ ] **Configurator Responsiveness:** Tune configurator panel sizing for small tablets and phones; verify no overlap at narrow widths.
- [ ] **Timeline Visual QA:** Use browser screenshots to verify cadet placement, now footer indicator, zoom-aware brick sizing, and multi-day block rendering across desktop/mobile.
- [ ] **Stud Particle Burst Upgrade (F-18):** Replace simple burst particles with physics-based falling 1x1 studs.
- [ ] **Cadet Walk Refinement (F-02):** Improve leg/arm walk loop offsets for the SVG minifig mascot.

### Phase 2: Playback & Countdowns
- [ ] **Stop-Motion Day-in-Review (F-07 / F-08):** Playback movie mode auto-scrolling timeline and playing assembly animations.
- [ ] **Routine Countdowns (F-09):** Tapping future routines shows a Lego countdown overlay.
- [ ] **In-Progress Lego Builder (F-10):** Active task progress display as stacked Lego layers proportional to elapsed time.
- [ ] **Time Pressure Cues (F-11):** Color and sizing transitions as active routines approach completion.

### Phase 3: Data Model & Profiles
- [ ] **Per-Profile Schedule Isolation:** Move routine templates, daily task maps, logs, and surprise reveal state into profile-scoped storage.
- [ ] **LocalStorage Migration:** Add versioned migration for existing `lego_*` keys to avoid data loss.
- [ ] **Configurable Parent PIN:** Replace hardcoded `1234` with parent-managed PIN setup/change flow.
- [ ] **Log Semantics:** Record planned time, actual time, duration edits, and series-vs-today scope in structured fields.

### Phase 4: Weekly Rhythm
- [ ] **Weekly Template Engine (F-14):** Weekday profiles seed recurring templates.
- [ ] **Special Day Banner (F-15):** Show badges such as library/gym/swim day.
- [ ] **Lego Growth Models (F-29):** Castle/spaceship mid-ground build progresses Monday-Friday and resets Monday.
- [ ] **Lego Kit Alerts (F-16):** 8:00 PM preparation/packing list alert.
- [ ] **Lego Garbage Truck (F-24):** Weekly cleanup animation for skipped/deconstructed items.

### Phase 5: Gamification & Bedtime
- [ ] **Mystery Gift Boxes (F-25 / F-26):** Spawn surprise boxes and float away if ignored.
- [ ] **Cozy Bedtime Baseplate (F-34):** Dim screen, lullaby mode, and sleeping Cadet bedroom.
- [ ] **Appreciation Chest Ledger (F-35 / F-36):** Drag praise/growth bricks into a chest log and optionally record gratitude audio.

### Phase 6: Family Coupling & Social
- [ ] **Multi-Plate Junction Map (F-F01):** Side-by-side coordinate plates for family members.
- [ ] **Magnetic Coupling Snaps (F-F03 / F-F06):** Snap vehicle cars on merging schedules.
- [ ] **Engine & Wagon Logic (F-F04):** Parent Cadet cars guide and pull child wagons.
- [ ] **Social Notice Boards (F-S01 / F-S06):** Friend playground stations, ghost wagons, and photo board concepts.
