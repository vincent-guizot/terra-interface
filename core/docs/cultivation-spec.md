# Cultivation module

## Implemented interface

The router is mounted at /api/v1/cultivation and delegates to CultivationController/CultivationService:

| Method | Relative path | Purpose |
| --- | --- | --- |
| GET | / or /summary | Cultivation summary |
| GET | /catalog | Crop catalog; optional category filter |
| POST | /catalog | Create a crop variety |
| GET | /batches/active | Active cultivation batches |
| GET | /microgreens/calibration | Microgreen calibration data |
| POST | /nutrient-dosing | Calculate nutrient dosing |

Responses follow [the API envelope](api-response-contract.md). Read the handler/service for accepted domain fields; there are no runtime TypeScript DTO classes validating all requests.

## Data and calculations

Reference crop data lives in src/constants/cultivation.constants.js. Microgreen yield and pest-control reference data live in src/constants/cultivation/. The service combines these references with Prisma-backed operations and calculation methods; review the method when determining its persistence guarantees.

Dosing and calibration responses are calculations/reference data, not proof that a physical pump was actuated. Greenhouse hardware control, mushroom humidity automation and soil-probe integration remain deployment-specific requirements to verify.

## Checks

The cultivation invariant suite covers selected domain calculations. Router/contract tests cover nutrient dosing responses. Add actual database and device integration evidence before describing stored operations or automatic hardware behavior as verified.
