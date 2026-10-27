# Angular 7 → Angular 22 migration

Migration date: 27 October 2026.

The application now targets Angular **22.2.3**, the stable `@angular/core`
release returned by the npm registry on the migration date. Angular CLI,
build tooling, Material, CDK, and Google Maps use their corresponding latest
22.2 patch, **22.2.4**. Patch numbers across these separately released packages
need not be identical. Framework packages and compiler packages are aligned.

## 1. Inspect the existing application

I inspected `package.json`, both lockfiles, `angular.json`, TypeScript
configuration, bootstrap code, component templates, imports, and tests. The
starting point was Angular 7.2, Material 7, TypeScript 3.2, RxJS 6.3, the legacy
browser builder, TSLint, and Protractor.

I checked `git status` before editing. Your existing `README.md` changes and
untracked `README-backup.md` were preserved. This document records the migration
without replacing your README.

## 2. Verify the target and runtime requirements

I consulted Angular's release and compatibility documentation and queried npm:

```sh
npm view @angular/core version
npm view @angular/core@22.2.3 peerDependencies engines --json
npm view @angular/cli version
```

Angular 22 requires Node `^22.22.3`, `^24.15.0`, or `>=26.0.0`, TypeScript 6.0,
and compatible RxJS. I added `.nvmrc` selecting **24.15.0** and `engines` in
`package.json`. The installed system Node was 24.14.1, so verification used a
separate Node 24.15.0 installed under `/tmp/angular-upgrade-tools`; the system
runtime was not replaced.

## 3. Choose and apply the migration approach

Angular's supported `ng update` workflow advances **one major at a time**.
A conventional staged migration would run and validate 7 → 8 → 9 → … → 22
with the Node/TypeScript versions appropriate to each stage.

For this checkout I performed a **manual source and configuration migration
directly to the current toolchain**. I did not run or claim to run every
intermediate version's migration schematics. Several original third-party
packages have no usable current Angular release, so they needed replacement
regardless. The resulting source was checked with the current Angular compiler,
production builder, unit tests, and browser smoke tests.

The main source compatibility changes were:

- Import Material classes from supported secondary entry points such as
  `@angular/material/dialog` instead of the removed root barrel.
- Add `standalone: false` to existing component and pipe declarations so they
  remain in their existing NgModule. A standalone rewrite was unnecessary.
- Remove `entryComponents`; current Angular discovers dialog components itself.
- Give `ViewChild` queries an explicit `static: false` setting.
- Keep existing dynamic form behavior using `UntypedFormControl`,
  `UntypedFormGroup`, and `UntypedFormBuilder` rather than introducing a separate
  typed-form redesign.
- Explicitly preserve non-strict TypeScript behavior. This migration does not
  claim strict template or strict-null compliance.
- Move TypeScript output to ES2022 and use bundler module resolution.
- Update Zone.js imports and explicitly provide Zone change detection.
- Provide the current HTTP client with its XHR backend, preserving upload
  progress events used by the existing upload UI.
- Update Material chips and list-line directives to current names.
- Replace unsupported `>>>` CSS selectors with `::ng-deep` and remove the
  webpack-specific `~` prefix from the Material theme import.
- Replace UUID-library calls with the browser's `crypto.randomUUID()`.
- Use Redux's `Action` type for the existing custom store, avoiding an unused
  Angular NgRx dependency and an unused private RxJS scheduler import.

## 4. Resolve third-party dependencies

| Previous dependency | Result |
| --- | --- |
| Angular Material/CDK 7 | Material/CDK 22.2.4; current APIs and theme |
| `@angular/flex-layout` | CSS flex, gap, and responsive visibility classes |
| AGM, overlays, and marker clusterer | Official `@angular/google-maps`, marker clustering, photo markers, member information windows, and a lazy API loader |
| `ng-simple-slideshow` | Small local slideshow preserving autoplay, links, image strings/objects, click actions, and timer cleanup |
| `ngx-scroll-event` | Local directive preserving the scroll-boundary event contract used by comments |
| `ngx-toastr` | Local service preserving existing success/error calls, backed by Material snack bars; presentation and stacking differ from toastr |
| ng-bootstrap 4 / Bootstrap 4 | ng-bootstrap 21 / Bootstrap 5, matching Angular 22 peer requirements |
| Retired ng-bootstrap accordion elements | Native `details`/`summary`, initially opening the first item |
| Old ng-bootstrap alert `(close)` event | Current `(closed)` event |
| Bootstrap 4 utility names | Bootstrap 5 float and grid utility names |
| Angular Redux, obsolete upload/link-preview/PDF wrappers, and related unused dependencies | Removed after checking active template usage; current native upload and iframe document views remain |
| `ng-chat` | Removed unused module; its only chat widget is commented out. The unused adapter retains local data contracts |
| `angular2-uuid` | Native browser UUID generation |
| TSLint/Codelyzer | Removed unsupported builder/configuration; `npm run typecheck` checks the app compiler. This is not a replacement style linter |
| Protractor | Playwright browser smoke tests |

I checked package versions and peer dependencies before installation. The latest
published toastr release still declared Angular 21 peers, so I replaced it
instead of bypassing peer checks. No `--force` or `--legacy-peer-deps` was used.
Pusher remains on a compatible 4.x release to limit changes to the existing
server integration. This is an Angular migration, not an upgrade of every
independent library to its newest major.

## 5. Modernize build and dependency configuration

- Replace `@angular-devkit/build-angular:browser` with
  `@angular/build:application`, including `browser` entry configuration.
- Replace obsolete `browserTarget` settings with `buildTarget`.
- Define explicit production and development build/serve configurations.
- Remove options and targets no longer supported, including the old TSLint and
  Protractor targets and `defaultProject`.
- Use current CLI browser defaults, removing the obsolete browser-support file.
- Keep asset copying, environment replacement, the existing Pusher global
  script, and bundle budgets.
- Remove obsolete ES5/core-js and Hammer dependencies.
- Generate a fresh npm lockfile. The old lockfile initially made npm try to
  resolve Angular 7 peers; it was backed up to
  `/tmp/chat-angular7-package-lock.json` before regeneration.
- Standardize this checkout on npm and remove the stale Yarn lockfile; its
  original is available at `/tmp/chat-angular7-yarn.lock` during this session.
- Ignore Angular cache and browser test artifacts in Git.

**Deployment change:** the application builder writes deployable browser files
under **`dist/chat/browser`**. Configure hosting/CI to publish that directory.
Continue configuring the host to route application URLs to `index.html`.

## 6. Migrate and repair tests

I updated Angular testing API usage (`async` → `waitForAsync`, `TestBed.get` →
`TestBed.inject`), Jasmine/Karma dependencies, coverage configuration, and test
discovery. The old webpack `require.context` test entry is no longer used.

The first browser run exposed missing imports/providers/input data in the
original scaffold tests. I repaired their setup using the real application
module, a testing HTTP backend, dialog fixtures, user/debate inputs, and isolated
Pusher/Maps connections. No schemas suppress unknown component errors. I also
replaced the stale welcome-heading assertion with checks for this app's actual
header and router outlet, and supplied the sanitizer dependency in the pipe test.

Three additional tests cover comment-scroll boundaries, slideshow autoplay and
timer cleanup, and custom image click actions. Playwright replaces the old
welcome-page Protractor test with home/login navigation, invalid login form
behavior, password-reset navigation, and mobile visibility checks. Browser
smoke tests fail on uncaught page errors.

## 7. Run locally and reproduce verification

With nvm and Google Chrome installed:

```sh
nvm install
nvm use
npm ci
npm start
```

Then run:

```sh
npm run typecheck
npm run build:development
npm run build
npm test
npm run e2e
```

Karma discovers Chrome automatically. Playwright uses the installed Chrome
channel. Set `CHROME_BIN` to override the Chrome executable for either runner.
Production builds inline the existing Google Fonts stylesheet and therefore
need access to `fonts.googleapis.com`. In this environment I requested network
access for that build and local-server/browser permissions for the test runners.

Verification results:

- Development application build: passed.
- Angular compiler type check: passed.
- Production application build: passed.
- Jasmine/Karma: **58 tests passed**.
- Playwright/Chrome: **2 browser tests passed**.
- npm dependency tree: no invalid or missing direct dependencies.
- `git diff --check`: passed.

## 8. Practical limits and release review

Material's current component implementation and Bootstrap 5 change some spacing
and styling. Notifications now use snack bars and accordions use native
disclosure controls. Review the application's main authenticated pages visually
before deploying.

The tests isolate external HTTP, Pusher, and Maps in component tests; browser
smoke tests exercise public pages. Live login, admin/debate operations, uploads,
websocket events, Google Maps authorization, and marker interaction require your
configured services and credentials and were not verified against a live backend.
The existing Maps browser key is preserved. Native `crypto.randomUUID()` requires
a secure browser context (HTTPS or localhost).

The migration keeps supported but deprecated compatibility APIs where that
reduces scope, including module bootstrap, Angular's animation module,
non-typed forms, some `::ng-deep` styling, and RxJS 7's `toPromise()` calls.
Future refactoring can address these separately.

## References

- [Angular release policy](https://angular.dev/reference/releases)
- [Angular version compatibility](https://angular.dev/reference/versions)
- [Angular Update Guide](https://angular.dev/update-guide)
- [Official Angular Google Maps integration](https://github.com/angular/components/tree/main/src/google-maps)
