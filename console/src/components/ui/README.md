# Shared shadcn UI

This folder owns the React/Tailwind UI primitives using the project's shadcn configuration in `components.json`. Button uses Radix Slot, tooltip and dropdown-menu use Radix primitives, and variants use CVA. Card, input, textarea and table follow the same shadcn component API and semantic tokens.

Import components directly, for example `@/components/ui/button`. Keep business datasets in `src/data/` and reusable functions in `src/helpers/`. Page-specific MUI rendering remains in feature and isometric components; shared UI primitives here do not import MUI.

Inputs require a visible label (or accessible name) from their caller. Use native table headers/captions. Tooltip triggers must remain keyboard focusable.
