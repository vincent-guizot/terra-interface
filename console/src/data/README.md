# Domain data

- `homestead/`: profile, overview/production/resources/activities/intelligence datasets and master plan.
- `operations/`: starting forms, batch records, configuration and inventory datasets.
- `cultivation/`, `livestock/`, `aquaculture/`, `circular/`, `inventory/`, `microgrid/`: domain metadata and form option lists.
- `isometric/`, `map/`, `ui/`: visualization configuration, filters and data-source labels.

Keep static reference data here. Values derived from props, live telemetry, form state or user actions remain in the consuming component/hook. Component rendering configuration (for example icon components or CVA style variants) belongs in the UI layer.
