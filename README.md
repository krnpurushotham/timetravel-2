# Lego Time Patrol

Lego Time Patrol is a local-first child routine planner prototype. It uses a horizontal Lego baseplate timeline, routine bricks, a configurable Lego Cadet mascot, parent controls, a mood station, sky/time context, and Web Audio feedback.

## Tech Stack

- Vite + React
- CSS3/SVG UI
- Web Audio API
- SunCalc for Amsterdam sunrise/sunset and moon calculations
- LocalStorage for prototype persistence

## Current State

Implemented:

- Panning/zooming timeline with inertia and day rollover.
- Neighboring-day rendering and multi-day routine blocks.
- Routine add/edit/delete/reset in the parent dashboard.
- Today-only vs all-days routine update confirmation.
- Duration input in minutes with internal hour conversion.
- Completion, skip, resize, drag scheduling, and action logs.
- Mood Station with 2D mood/energy joystick.
- Profile-specific Lego minifig configuration.
- Lego configurator page with heads, hair, outfits, legs, accessories, ability chips, and central preview.
- Dynamic sky, sun, moon, clouds, and scenery.
- Procedural sound effects.

Pending:

- Profile-scoped schedules/logs.
- Configurable parent PIN.
- Automated tests.
- Stop-motion day review.
- Countdown and active routine progress overlays.
- Weekly recurrence, kit alerts, bedtime, family, and social modules.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The app runs locally through Vite, usually at:

```text
http://localhost:5173/
```

## Documentation

- [Task board](TODO.md)
- [Implementation plan](docs/ImplementationPlan.md)
- [Functional spec](docs/FSD.md)
- [User stories](docs/UserStories.md)
- [Feature index](docs/TimeTraveler_FeatureIndex.docx)

## Notes

This is still a prototype. Data is stored in browser LocalStorage and should not be treated as production-safe persistence.
