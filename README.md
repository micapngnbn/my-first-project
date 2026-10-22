# VMG Playwright

Clean Playwright automation baseline for end-to-end tests.

## Layout - Sample

Per-application structure (Admin Portal, Citadel, Sentinel):

```text
tests/<application>/<feature>/          # test specs
tests/<application>/pages/<Module>/     # page objects
tests/<application>/flows/<Module>/     # reusable flows
tests/<application>/fixtures/           # app fixtures (Citadel, Sentinel)
specs/<application>/<feature>/          # test plans
helpers/                                # shared helpers only
utils/                                  # shared utilities only
test-data/                              # shared or app test data