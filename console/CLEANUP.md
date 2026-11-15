# Console source layout

The Vite entry is `src/app/main.jsx`. All application code lives under `src/`:

- `app/`: application providers and Redux store.
- `router/`: route registry and path constants.
- `features/`: page implementations and operational drawers.
- `components/`: shared layout, navigation, isometric graphics and UI.
- `services/`: the shared fetch client and domain requests.
- `hooks/`, `data/`, `redux/`, `theme/`, `styles/`: supporting application code.

`PageHead` updates the document title. `AppLink` adapts existing `href` callers to React Router. There are no Next.js module aliases.

Run `npm run lint` for local import resolution and `npm run build` for production compilation. The import check is not a full JavaScript style linter.

The previous unused Axios service facade, duplicate layout/navigation and badge implementations, page wrappers, unused hooks/selectors, unused UI primitives and duplicate CSS entry were removed after checking reachability from the Vite entry. The operational fetch client's response unwrapping is preserved. Vite API configuration accepts `VITE_API_BASE_URL` (or `VITE_API_URL`) and `VITE_DEMO_MODE`; legacy environment names remain accepted for compatibility.
