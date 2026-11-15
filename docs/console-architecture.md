# Console architecture

Console uses Vite, React 18, React Router and JavaScript/JSX. It no longer uses a Next.js pages runtime.

## Source layout

```text
console/
  index.html
  src/
    app/
      main.jsx
      App.jsx
      providers/
      redux/
      router/
      store/
    components/
      ui/
      layout/
      navigation/
      shared/
      isometric/
      operations/
    features/
    data/
    helpers/
    hooks/
    services/
    styles/
    theme/
  tests/
  scripts/check-imports.cjs
```

app/ owns startup, providers, global state and routing. features/ owns domain pages and drawers. data/ groups static fixtures and options by domain; helpers/ holds reusable functions. Keep component-specific behavior next to its feature and reusable primitives under components/ui/.

## Routing and state

The route definitions are in src/app/router/routes.js. Views are lazy loaded. The home route renders Overview; /overview redirects to home. Management routes render a shared layout with a domain tab; /operations is a compatibility redirect. Host production builds with a history fallback to index.html so direct navigation to nested routes works.

Redux slices and middleware live under app/redux/; store creation and rootReducer are in app/store/. Use the existing feature hooks and service clients rather than introducing a second global store.

## UI

Shared shadcn-style primitives use Radix, class-variance-authority and Tailwind utilities: button, badge, card, input, textarea, table, dropdown menu and tooltip. DataSourceBadge identifies the data source. Existing domain views still use MUI/Emotion; this refactor is not a complete replacement of MUI.

## API behavior

src/services/apiClient.js reads VITE_API_BASE_URL and unwraps successful data envelopes. ApiError exposes message, statusCode, code and details; a network failure has statusCode 0. Legacy top-level errors remain supported. SSE clients consume telemetry snapshots directly.

Explicit demo mode uses VITE_DEMO_MODE=true. Domain hooks and backend fallback behavior should still be reviewed when assessing whether a view represents persisted data. See [response contract](../core/docs/api-response-contract.md).

## Validation

npm run lint --workspace terra-console checks local imports. npm test --workspace terra-console covers UI primitives, shared helpers and API client compatibility. npm run build:console creates the Vite production bundle. These checks do not replace browser interaction or accessibility testing.
