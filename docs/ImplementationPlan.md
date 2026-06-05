# Lego Time Patrol — Implementation Plan

> **Version:** 1.1 | **Date:** June 2026
> **Stack:** Vite + React + HTML5 Canvas/CSS3 | TailwindCSS / Vanilla CSS | Web Audio API | LocalStorage

---

## Overview

This implementation plan outlines the development path for **Lego Time Patrol**, taking into account **what is already built** (timeline baseplate scrolling, brick dragging/resizing, parent PIN locks, custom audio synthesis, 2D mood joystick) and mapping out **what is required** to complete the spec.

---

## Current Build Audit

The following core infrastructure is already built and verified:
1.  **Timeline Viewport:** Draggable/panning studded baseplate, time markings, centering, zoom controls.
2.  **Lego Routine Bricks:** Brick styling with studs. Drag horizontally to reschedule start time. Drag right handles to adjust duration. Swipe down to skip (deconstruct). Double-tap to complete.
3.  **Lego Cadet Marker:** Visual Minifigure avatar at "Now", displaying face expression based on active mood.
4.  **Mood Station:** 2D trackpad joystick with 6 columns for emotional check-in.
5.  **Parent lock (Guardian Gate):** PIN padlock gate (1234) and dashboard (Routines CRUD, Logs, Profiles).
6.  **Synthesizer Audio:** Web Audio API sound effects.

---

## Phase-Wise Roadmap for Required Features

### Phase 1: Cadet Animations, Particles & Constraints (M1, M2, M5)
*Focus: Inject life, physics-based Lego feedback, and scheduling rules.*
- **Lego Cadet Legs Walk Loop:** Animate Cadet legs (swapping states or rotational offsets) while scrolling/walking.
- **Stud Particle Burst:** Implement a particle emitter class. On double-tapping bricks, spray small 1x1 circular studs matching the brick's color, utilizing basic gravity physics.
- **Priority Constraint Layer:**
  - Mandatory (Fixed) bricks resist drags/swipes. Cadet shakes head "no-no".
  - Flexible/Optional bricks push subsequent flexible bricks on the timeline (Ripple Effect/Chain Reaction).

### Phase 2: Playback & Countdowns (M3, M4)
*Focus: Let the child review their day as a movie and manage timers.*
- **Stop-Motion Day-in-Review (DIR):** Auto-scroll the timeline from morning to night. The Cadet walks stop-motion style from brick to brick, stopping to play a quick Lego assembly animation for completed builds.
- **Routine Countdowns & Visual Fill:** Tapping a brick shows countdown. Active bricks fill up layer-by-layer (Lego builder style) proportional to time elapsed.
- **Visual Time Pressure Cues:** Bricks change tone (blue -> yellow -> orange) and shrink in width as they near completion.

### Phase 3: Growing Lego Backgrounds & Weekly Rhythm (M6, M9)
*Focus: Background model progression and weekly loops.*
- **Lego Growth Models:** Render a mid-ground baseplate containing a Lego model (e.g., Spaceship/Castle). Seed a daily JSON build instruction that adds block layers daily, completing on Friday, and resetting Monday.
- **Lego Kitalerts (Bag Logic):** 8:00 PM alert. Cadet holds a specific Lego kit (e.g. library book kit). Child taps it to pack it into their backpack, locking it in as a morning departure sub-task.
- **Lego Garbage Truck:** Weekly cleanup animation where a Lego truck empties the Deconstruction Bin on weekly view zoom.

### Phase 4: Gamification, Bedtime Mode & Locker (M8, M10, M11)
*Focus: Surprise boxes, bedside reflection, and chest storage.*
- **Mystery Gift Boxes:** Spawn random gift boxes on the timeline. If ignored for 15 minutes, they float away (Vanishing Act).
- **Cozy Bedtime Baseplate:** Dimensions dim at bedtime, Cadet sleeps in a cozy bedroom build.
- **Appreciation chest:** Drag a Gold Brick (praise) and Grey Brick (growth area) into the Personal Locker chest.

### Phase 5: Family Coupling Plates (M12)
*Focus: Coordinate sibling and parent schedules on parallel baseplates.*
- **Multi-Plate Junction Map:** Display Mom/Dad/Child timelines side-by-side.
- **Magnetic Coupling snaps:** Snap Cadet vehicles together with a magnetic lock sound when tracks merge.
- **Engine & Wagon Logic:** Parent Cadet cars act as "Engines" that couple and pull child "Wagons".

### Phase 6: Social Rails & Notice Boards (M13, M14)
*Focus: Safe playdates with friends and photo archiving.*
- **Station Playgrounds:** permitted friend nodes on shared stations. Handshake protocols (Ghost Wagons).
- **Privacy Boundary Geofencing:** Obfuscate private baseplate locations.
- **Notice Board Gallery:** Pin photos to specific stations with a brick-framed Polaroid aesthetic. Grandparent view-only links.
