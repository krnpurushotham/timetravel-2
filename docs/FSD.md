# Lego Time Patrol — Functional Specification Document (FSD)

> **Version:** 1.2 | **Date:** June 2026 | **Status:** Draft / Prototype Implemented

---

## 1. Product Overview

**Lego Time Patrol** is a character-driven, 24-hour linear daily planner designed for children aged 4+. It uses a Lego building metaphor where a customisable Lego Cadet Minifigure travels through the child's day along a horizontal studded timeline beam ("Baseplate"). Routines are represented as Lego bricks that lock onto the timeline, and the passage of time is visualised through sky gradients, sun/moon arcs, and background Lego models that get built brick-by-brick daily.

The app serves three audiences simultaneously:
- **Child (4–10+):** An engaging, icon-based planner with a Lego Cadet avatar.
- **Parent:** A powerful scheduling, oversight, and emotional-intelligence dashboard.
- **Family Unit:** A shared baseplate coordinating multi-member schedules.

---

## 2. Design Principles

| Principle | Description |
|-----------|-------------|
| **Child-first literacy** | No text dependency — all interactions icon, brick-shape, and animation based. |
| **Tactile aesthetics** | Emulates the look and feel of real Lego: primary colors, studs, clicky shadows, and snap-together sounds. |
| **Emotional safety** | The app never shames; negative states are handled with empathy (e.g. rain effects or a Cadet offering virtual support). |
| **Progressive complexity** | Features unlock as the child ages (4 → 7 → 10+). |
| **Lego metaphor consistency** | All UI terms map to bricks, plates, baseplates, studs, snapping, and models. |

---

## 3. System Architecture Overview

```

### 3.1 Current Prototype Status

The current implementation is a local-first Vite/React prototype using LocalStorage and Web Audio. The following major flows are implemented:

- Timeline navigation, inertia panning, zoom controls, date rollover, and neighboring-day context.
- Routine bricks with completion, skip, drag scheduling, resize handles, status styling, and parent/child constraints.
- Parent PIN gate with routine add/edit/delete/reset, today-only vs series confirmation, logs, and profile editing.
- Multi-day visual blocks through parent-entered minute durations converted to hour values internally.
- Mood Station with 2D mood/energy joystick.
- Profile-specific Lego minifig configuration and SVG minifig timeline mascot.
- Lego configurator page with reference-inspired selector panels and central minifig preview.
- Sunrise/sunset/moon phase sky system and procedural audio.

The following remain incomplete or prototype-only:

- Profile-scoped routine storage, logs, and calendar data.
- Configurable parent PIN.
- Automated tests and migration/versioning for LocalStorage.
- Stop-motion review, countdowns, active progress builder, weekly rhythm, bedtime, family, and social modules.
┌─────────────────────────────────────────────────────┐
│                   Child Interface                   │
│  Baseplate Timeline · Cadet Minifigure · Bricks     │
├─────────────────────────────────────────────────────┤
│                  Parental Layer                     │
│  Guardian Gate · Override · Action Logs · Locker     │
├─────────────────────────────────────────────────────┤
│                  Family Baseplate                   │
│  Multi-plate Map · Rolling Cars · Coupling Snaps    │
├─────────────────────────────────────────────────────┤
│                  Shared Building                    │
│  Station Map · Track-Merge · Handshake Protocol     │
├─────────────────────────────────────────────────────┤
│               Lego Build Environment                │
│  Growing Models · Celestial Arcs · Sky Gradient     │
└─────────────────────────────────────────────────────┘
```

---

## 4. Module Specifications

---

### M1 — Core Interface & Navigation

#### F-01: Baseplate Timeline Beam
- A fixed, horizontal timeline styled as a studded Lego beam representing a 24-hour cycle.
- Background sky gradient shifts based on current system time (dawn orange -> day blue -> dusk purple -> night dark).
- Serves as the central visual spine of the application.
- **Current status:** Implemented with continuous neighboring-day rendering, zoom, panning, inertia, date rollover, and a small footer-style now indicator.

#### F-02: Cadet Minifigure Mascot
- A Lego Minifigure avatar positioned on the current time mark.
- The timeline baseplate scrolls beneath it; Cadet walks in place during manual scrolling.
- States: `idle` | `walking` (manual scroll) | `activity-specific` | `no-no` | `cheer` | `shrug`.
- Points back toward current time when the user scrolls away to provide a "Return to Now" cue.
- Face changes expression based on the child's logged mood.
- **Current status:** Implemented as an SVG minifig driven by the active profile's configurator state. Walk and action hooks exist; activity-specific costume swaps are not yet implemented.

#### F-03: Lego Routine Bricks
- Color-coded, studded bricks placed at scheduled start times on the Baseplate Timeline.
- States: `pending` (locked flat) | `completed` (marked with a gold star trophy) | `skipped` (faded, grayed out).
- Bricks scale up slightly as they approach the Cadet's center position.
- Color schema: Mandatory = Yellow/Red | Optional = Blue/Green/Orange | Surprise = Purple.
- **Current status:** Implemented with zoom-aware minimum width and multi-day visual spans. Active-task pressure effects are not yet implemented.

#### F-04: Temporal Zoom
- **Macro View:** Full 24-hour cycle (big picture).
- **Micro View:** 2-hour window (precise scheduling and dragging).
- Pinch-to-zoom gesture or button controls.
- Zoom level drives Deconstruction Bin capacity (see F-23).
- **Current status:** Button-based zoom is implemented. Pinch-to-zoom and Deconstruction Bin capacity linkage are pending.

#### F-05: Parallax Baseplate Scroll
- Inertia-based horizontal scrolling moving the baseplate beneath the Cadet figure.
- High friction prevents accidental scrolling from sudden touches.
- **Current status:** Implemented with momentum and day rollover across 0:00/24:00.

#### F-06: Action Resolver
- Polls position every 500ms to detect which brick is in the Center Active Zone.
- Maps `activityType` to Cadet animations (e.g. Eating -> Chef Cadet, Brushing -> Dino Cadet).
- Returns to `idle` when no task occupies the center.

---

### M2 — Interaction Mechanics

#### F-18: Done-Stamping (Snap-Lock)
- **Trigger:** Double-tap a Routine Brick.
- **Before start time:** Marked `skipped` -> Cadet shrugs.
- **At/after start time:** Marked `completed` -> Satisfying Lego pop snap sound, star trophy pop-up, and 1x1 stud particle burst.
- Star crest remains permanently on the timeline.
- Logs: `scheduled_time` + `actual_time`.
- **Current status:** Completion toggle, pop sound, trophy styling, visual particles, and logs are implemented. Actual-vs-scheduled structured log fields and physics studs are pending.

#### F-19: Live-Planning Mode (Resize/Move)
- **Trigger:** Long-press or click routine brick.
- Selected brick displays a yellow border and right-side stud resize handle.
- Bricks can be dragged horizontally to change start times (snaps to 5-minute ticks).
- Dragging the right handle resizes task duration (snaps to 5-minute ticks).
- Default: Locked behind Parental PIN but editable for child-directed optional items.
- **Current status:** Implemented. Parent dashboard also supports form-based editing, duration input in minutes, and today-only vs series confirmation.

#### F-21: Deconstruction Bin (Skipping)
- **Trigger:** Swipe a Routine Brick downward.
- Brick detaches, plays a slide whistle sound, and morphs into a crumpled brick pile in the corner.
- Skip status logged in background data; skipped tasks excluded from stop-motion playback.

#### F-20: Passcode Provisioning
- Dormant 4-digit PIN lock (default PIN `1234`) with Lego Dial Keypad.
- Gates parental configuration and log review.
- **Current status:** Implemented as a hardcoded prototype PIN. Configurable PIN and recovery flow are pending.

---

### M3 — Review & Playback

#### F-07: Lego Stop-Motion Playback (Day-in-Review)
- **Trigger:** Parent-approved button or "How was your day?" prompt.
- Timeline resets to 07:00 and plays back at a constant speed.
- The Cadet walks stop-motion style from brick to brick, stopping to play task assembly animations for completed tasks.
- Skipped tasks are bypassed.

#### F-08: Narrative Stitching
- Cross-fading and frame interpolation between animation states.
- Playback accelerates during gaps between routines, slowing down at active bricks.

---

### M4 — Time Context & Countdowns

#### F-09: Routine Countdowns
- Tapping a future routine brick displays a Lego countdown timer showing time remaining until it starts.

#### F-10: In-Progress Lego Builder
- Tapping an active task displays a visual progress bar styled as a Lego brick being built layer-by-layer.

#### F-11: Time Pressure Cues
- Color temperature progression: Far away = Blue | Soon = Yellow | <5 min = Orange.
- Bricks subtly shrink in size as their remaining duration decreases.

---

### M5 — Priority & Constraint Engine

#### F-12: Priority Enforcement Layer
- **Mandatory (Fixed):** Locked in place. Resists dragging/swiping; misses trigger a "Look Back!" Cadet prompt.
- **Optional (Flexible):** Can be shifted within parent limits; exceeding limits turns the brick red.
- **Current status:** Mandatory drag blocking and error feedback are implemented. Missed-task prompts are pending.

#### F-13: Chain Reaction (Ripple Effect)
- Shifting an Optional/Flexible brick pushes subsequent optional bricks down the timeline.
- Fixed items block movement; exceeding limits snaps the brick back with a Cadet "no-no" head shake.
- **Current status:** Implemented for current-day task dragging with fixed-task boundaries.

---

### M6 — Weekly Rhythm & Prep Alerts

#### F-14: Template Engine
- Weekday profiles automatically seed recurring templates (e.g. Tuesday = Gym, Friday = Library).

#### F-15: Special Day Banner
- Display banner in top corner showing the day's special badge (e.g. Book badge for Library Day).

#### F-16: Lego Kit Alerts (Preparation Alerts)
- **Trigger:** 8:00 PM evening before event.
- Cadet holds a specific Lego kit (e.g. Swim kit). Child taps to "assemble" it into their backpack, locking it in as a completed sub-task.

---

### M7 — Parental Controls

#### F-17: Guardian Gate Settings
- Double-tapping and holding the Cadet for 3 seconds unlocks parent configuration.
- Actions: Hard-Lock, Blackout (hide TV task), Emergency Push, and Task Inventory Grant.

#### F-22: Spring Cleaning
- Clears the Deconstruction Bin. Skipped bricks are cleared away with a sweeper animation.

---

### M8 — Gamification & Rewards

#### F-23: Dynamic Capacity Scaling
- Deconstruction Bin capacity changes with timeline zoom (3 balls daily -> 21 weekly).
- At 2/3 capacity, the bin visually bulges. At full capacity, loose bricks spill out.

#### F-24: Lego Garbage Truck (Weekly Reward)
- Weekly cleanup animation where a Lego garbage truck drives across, empties the bin, and toots.

#### F-25: Mystery Gift Box
- Randomly spawned surprise gift boxes that appear on the timeline. Child must tap to claim.

#### F-26: Vanishing Act
- If a Mystery Box is ignored for 15 minutes, it floats away. Cadet reacts with an "Oops!" expression.

---

### M9 — Lego Build Environment (Background)

#### F-28: Seasonal Backgrounds
- Tree models and surrounding builds change foliage (green leaf plates, blossom plates, red/orange plates, white snow plates) synced to calendar month.

#### F-29: Lego Model Growth Cycles
- A large Lego model (e.g. Spaceship or Castle) sits in the mid-ground.
- It starts as a flat baseplate on Monday. Each day, new brick layers are added automatically.
- Model completes on Friday, allowing the child to tap and interact with it, before resetting or changing the next Monday.

#### F-30: Visual Layering
- Foreground: Cadet and Routine Bricks (real-time).
- Mid-ground: Lego Growth Models (weekly).
- Background: Sky gradients and Seasonal trees (seasonal/monthly).

---

### M10 — Emotional Intelligence & Locker

#### F-31: Mood Dial Console
- Accessible via Mood Station or Cadet tap.
- Joystick trackpad containing 6 columns: 😢 Sad, 😨 Afraid, 😡 Angry, 😌 Calm, 😊 Happy, 😜 Naughty.
- Background responds: rain effects for sad/angry, bright sunlight for happy.
- **Current status:** Mood Station UI and energy value are implemented. Background response and mood history storage are pending.

#### F-32: Personal Locker
- Styled as a Lego treasure chest. Gated/encrypted history of daily moods and achievements.

---

### M10A — Lego Cadet Configurator

#### F-C01: Minifig Character Builder
- Child/parent can customize the active profile's Lego Cadet.
- Categories: heads/expressions, headwear/hair, torso/outfits, leg choices, accessories/tools, and ability chips.
- The configurator uses a light blue Lego workshop layout with rounded selector trays, large part tiles, central minifig preview, studded baseplate, and save/preview area.
- Saved character state is stored on the active profile and used by the timeline mascot.
- **Current status:** Implemented.

#### F-C02: Profile-Specific Character State
- Each child profile stores its own minifig configuration.
- Switching profiles updates the timeline mascot.
- **Current status:** Implemented for minifig state only. Full schedule/log isolation by profile is pending.

---

### M11 — Bedtime Baseplate

#### F-34: Cozy Bedtime Mode
- Screen dims at bedtime, showing a cozy Lego bedroom. Timeline disappears, Cadet goes to sleep.

#### F-35: Appreciation Ledger
- Interactive bedtime reflection: Child drags a Gold Brick (Appreciation/Praise) and a Grey Brick (Growth area) into the treasure chest.

#### F-36: Gratitude Audio Logs
- Option to record a 10-second audio memory of the exchange, saved to the locker.

---

### M12 — Family Baseplate Junctions

#### F-F01: Multi-Plate Junction Map
- Parallel horizontal tracks representing schedules of family members (e.g. Mom, Dad, child).

#### F-F03: Magnetic Coupling Snaps
- Separate tracks merge into coupled plates during shared activities (e.g. morning drop-off, dinner).
- Coupling snaps together with a magnetic lock sound.

#### F-F04: Engine & Wagon Logic
- Parent Cadet cars act as "Engines" that guide and pull the child's "Wagon".

---

### M13 — Social Building Rails

#### F-S01: Station Playgrounds
- Permitted friends check in at public Lego hubs.

#### F-S06: Handshake Protocol
- Two-stage commitment: Playdate invite displays a semi-transparent Ghost Wagon on the timeline. Accepting locks it into a solid brick.

#### F-S07: Boundary Geofencing
- Home/office addresses obfuscated; logs show "Travelling to private baseplate".

---

## 5. Data Schemas

### Task Schema
```json
{
  "activity_id": "routine_001",
  "name": "Lego Spaceship Build",
  "priority": "flexible",
  "recurrence": ["Tuesday"],
  "status": "planned",
  "timing": {
    "planned_time": "10:00",
    "actual_time": null
  },
  "completion_data": {
    "is_starred": false,
    "off_road": false
  }
}
```

### Config Schema
```json
{
  "planner_config": {
    "is_passcode_enabled": true,
    "zoom_level": "daily",
    "bin": {
      "capacity": 3,
      "items": []
    }
  }
}
```
