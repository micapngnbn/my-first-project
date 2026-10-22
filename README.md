<<<<<<< HEAD
# VMG Playwright

Clean Playwright automation baseline for end-to-end tests.

## Layout

Per-application structure (Admin Portal, Citadel, Sentinel):

```
tests/<application>/<feature>/          # test specs
tests/<application>/pages/<Module>/     # page objects
tests/<application>/flows/<Module>/     # reusable flows
tests/<application>/fixtures/           # app fixtures (Citadel, Sentinel)
specs/<application>/<feature>/          # test plans
helpers/                                # shared helpers only
utils/                                  # shared utilities only
test-data/                              # shared or app test data
```

Applications:

- `admin-portal`
- `citadel`
- `sentinel`

## Setup

```bash
npm ci
npx playwright install
```

Create a local `.env` as needed (gitignored).

## Commands

```bash
npm test
npm run typecheck
```
=======
# my-first-project
>>>>>>> be8f6f9fb602baf3026cbfabfa97e3c807995f90
