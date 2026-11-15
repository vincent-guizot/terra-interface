# Terra Console

Vite + React JavaScript application using React Router, Redux Toolkit, Material UI and Tailwind.

The entry point is `src/app/main.jsx`. Providers, Redux slices/middleware/store, and routes live in `src/app/`. Page implementations and operational drawers live in `src/features/`. Shared layout, navigation, isometric graphics and shadcn UI live in `src/components/`.

Datasets and option lists live in `src/data/`, grouped by domain. Reusable presentation functions live in `src/helpers/`. See `src/components/ui/README.md` for the shared shadcn component API.

API requests use the fetch client in `src/services/apiClient.js`. Configure `VITE_API_BASE_URL` (or `VITE_API_URL`) and `VITE_DEMO_MODE` in the Console environment. The client preserves unwrapping of `{ success, data }` responses and propagates request errors.

Structured API errors expose `message`, `statusCode`, `code` and `details` on `ApiError`. The client accepts both the Core nested error contract and legacy top-level error messages. Run `npm test` for UI/helper and API client regression tests.

## Commands

Run these in `console/`, or use `npm --prefix console` from the workspace root:

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

The lint command checks local import resolution; it is not a full JavaScript style linter.

## Routes

The application provides overview (`/`), map, production, resources, activities and intelligence routes. Management routes under `/management` select cultivation, livestock, aquaculture, circular, inventory, energy-water or catalog. `/overview` redirects to `/`; `/operations` redirects to management.

Deploy the generated `dist/` as an SPA with unknown paths rewritten to `index.html`. See [CLEANUP.md](CLEANUP.md) for the source consolidation and removed legacy files.
