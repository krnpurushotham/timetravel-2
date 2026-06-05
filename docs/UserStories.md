# Lego Time Patrol — User Stories

> **Version:** 1.1 | **Date:** June 2026
> Personas: **Child (C)**, **Parent (P)**, **Family (F)**, **Grandparent (G)**

---

## Epic 1: Core Timeline & Navigation

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-01 | C | As a child, I want to see my daily routines laid out as Lego bricks locking onto a studded timeline beam so I can understand my day visually. | timeline beam renders with studs; Routine Bricks display icons and times. |
| US-02 | C | As a child, I want my Cadet Minifigure to walk along the timeline as time passes. | Cadet walks/idles at the current system time line; legs animate. |
| US-03 | C | As a child, I want to scroll forward to peek at what Lego builds are scheduled later. | Swiping timeline scrolls baseplate smoothly; Cadet walks in place, then points back to current time when idle. |
| US-04 | P | As a parent, I want to zoom into a 2-hour micro view to make precise brick duration adjustments. | Pinch gesture or zoom controls change visible window between 2h (micro) and 24h (macro). |

---

## Epic 2: Routine Brick Management

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-06 | C | As a child, I want to double-tap a brick when done so it snaps with a pop sound, star trophy, and particle explosion. | Double-tap plays snap sound; brick gets trophy styling; 1x1 studs emit. |
| US-07 | P | As a parent, I want to resize a routine's duration by dragging its right handle. | routine brick selected displays resize stud handle on the right edge; dragging shifts duration in 5-min steps. |
| US-08 | C | As a child, I want to swipe a routine brick down to skip it and watch it deconstruct into a pile. | Swiped-down brick triggers slide whistle and drops as loose bricks in the corner. |
| US-09 | P | As a parent, I want to ensure my child cannot drag or deconstruct mandatory bricks like bedtime or school. | Mandatory/Fixed bricks ignore swipe-down or horizontal drag actions. |

---

## Epic 3: Lego Stop-Motion Review & Countdowns

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-10 | C | As a child, I want to watch a stop-motion replay of my completed tasks at bedtime. | Playback walks Cadet from brick to brick, playing brick-building animation on starred items, and bypassing skipped items. |
| US-11 | C | As a tap gesture, I want to tap a future brick to see a Lego countdown timer showing time left. | Tapping future brick triggers a countdown overlay. |
| US-12 | C | As a child, I want my active task brick to change color and shrink when it is almost time to finish. | Brick shifts color tone (blue -> yellow -> orange) and reduces width near task end. |

---

## Epic 4: Lego Build Environments

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-13 | C | As a child, I want my background model (like a Lego Castle) to get built brick-by-brick daily throughout the week. | Background model adds brick layers based on day of week; completes on Friday; resets Monday. |
| US-14 | C | As a child, I want to tap the background model or trees to hear my Cadet comment on the build. | Tapping background triggers speechbubble/voice line and Cadet comment. |
| US-15 | C | As a child, I want the trees to have blossom plates in spring and white plates in winter. | Seasonal Canopy leaves swap styles synced to system date. |

---

## Epic 5: Bedtime Baseplate & Locker

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-16 | F | As a family, we want a dim, cozy bedroom mode at bedtime to reflect on the day. | Bedtime triggers dimming, removes timeline, plays soft lullaby, puts Cadet in bed. |
| US-17 | C | As a child, I want to drag a Gold Brick (praise) and Grey Brick (growth area) into my Lego chest at bedtime. | Plus/Delta ledger: dragging gold/grey bricks stores reflections in Personal Locker. |
| US-18 | P | As a parent, I want to check high-level trends of my child's logged feelings while keeping their exact entries encrypted. | Personal Locker trend reports visible to parents; raw entries locked behind PIN. |

---

## Epic 6: Family Coupling & Social Building

| ID | Persona | Story | Acceptance Criteria |
|----|---------|-------|---------------------|
| US-19 | F | As a family, we want our individual plates to couple together when we share routines. | Junction Map renders parallel plates; merges lock together with magnetic click sound. |
| US-20 | P | As a parent, I want to invite my child's friend to build together at the playground while hiding our home location. | Social station map lists playgrounds; friend invites display ghost wagons; home coordinates obfuscated. |
