# IGGI — Community and Debate Client

IGGI is an Angular web client for a community platform centered on membership, structured discussions and projects emerging from collective debate. The application is intended to support members, moderators and administrators as they participate in the IGGI association's activities.

**Status:** Modernized to Angular 22 with automated CI (GitHub Actions), Docker containerization with Nginx, and automated test coverage (Karma/Jasmine unit tests and Playwright end-to-end tests). External backend services are mocked or configured separately.

## Purpose

The accompanying IGGI analysis and design document describes a platform for the general interest: people can apply for membership, collaborate through organized debates and, as a broader goal, view their community on a geographical map. The design also describes identity and access management, moderation and document archiving.

This repository represents the web client for parts of that vision. A requirement in the design document does not by itself establish that the feature is complete, secure or operational in this snapshot.

## Product vision and client code

| Area | Design objective | Evidence in this repository |
| --- | --- | --- |
| Membership | Apply for membership; administrators review applications. | Application form, application list and application detail components and routes are present. |
| Identity and access | Sign-in, member and administrator access, groups and roles. | Login, password-reset, authentication and administrator guard components/services are present. Server-side enforcement is outside this repository. |
| Debates | Suggest, validate, conduct, close and reopen discussions; members contribute comments. | Debate lists, suggestions, discussion, closing and reopening components and services are present. |
| Moderation and results | Members may apply as moderators; administrators or moderators draw conclusions. | Moderator-candidature and debate-result components are present. |
| Projects | Record a project arising from a debate. | A projects component and route are present; completeness and persistence have not been verified. |
| Documents and community map | Archive related documents and visualize the community geographically. | File-related dialogs/services and mapping dependencies are present; the complete archive and map workflows are unverified. |

Presence of a component or dependency indicates code exists; it does not guarantee working API contracts, access control or end-to-end functionality.

## Technology stack

- Angular 22 (`@angular/core` 22.2.3, `@angular/cli` 22.2.4), TypeScript 6.0, and RxJS 7.8, using the modern `@angular/build:application` builder.
- Angular Material 22 and Bootstrap 5 (`@ng-bootstrap/ng-bootstrap` 21.0.0) for UI elements.
- Karma and Jasmine for unit and component tests (configured for local and headless CI execution).
- Playwright for end-to-end browser smoke tests.
- Official `@angular/google-maps` integration with lazy API loading.
- Redux and Pusher for state management and realtime events.
- Standardized package management via `npm` with `package-lock.json`.

## Requirements and compatibility

- **Node.js:** `^22.22.3 || ^24.15.0 || >=26.0.0` (see `.nvmrc`).
- **npm:** `>=10`.
- **Browser:** Google Chrome / Chromium for Karma unit tests and Playwright end-to-end tests.
- External identity, forum, and realtime services are needed for integrated workflows unless replaced by test doubles or mocks.

## Local setup

```bash
git clone https://github.com/iggicm/chat.git
cd chat
nvm use
npm ci
npm start
```

The development server serves the Angular application at `http://localhost:4200/`.

### External services

Identity and forum API base URLs are defined in `src/app/Constants.ts`. Environment files under `src/environments/` and client services provide additional authentication and realtime configuration. These are client-side files: do not place secrets or real tokens in them.

Before running the application against live systems, review these references and point them to approved **local test services or mocks**. The identity and forum backends, database setup, and complete backend API contracts are maintained separately.

The actual debate view uses `DebateItemComponent` and includes realtime-event handling. `CommentsComponent` provides a scrollable discussion view.

## Build and tests

```bash
# Type check using the Angular compiler
npm run typecheck

# Run unit and component tests with Karma
npm test

# Run end-to-end tests with Playwright
npm run e2e

# Build production bundle (output in dist/chat/browser)
npm run build

# Build development bundle
npm run build:development
```

- **Unit tests:** Runs 58 Jasmine/Karma specs with headless Chrome. In CI environments (`CI=true`), `ChromeHeadlessCI` is used with flags `--no-sandbox --disable-gpu --disable-dev-shm-usage`.
- **E2E tests:** Runs Playwright smoke tests covering navigation, responsive layouts, and authentication workflows.
- **Production output:** The `@angular/build:application` builder writes deployable client assets to `dist/chat/browser`. Web servers must be configured to route application URLs to `index.html`.

## Continuous Integration (CI) and Docker

### GitHub Actions CI Workflow

A GitHub Actions workflow is defined in `.github/workflows/ci.yml`. It runs automatically on `push` and `pull_request` targeting `master` or `main`:

1. **Lint, Test & Build Job:**
   - Checks out the repository and sets up Node.js 24 with npm caching.
   - Installs dependencies via `npm ci`.
   - Runs TypeScript/Angular compilation checks (`npm run typecheck`).
   - Executes Karma unit tests in headless mode (`npm test`).
   - Builds the production distribution (`npm run build`).
   - Runs Playwright browser smoke tests (`npm run e2e`).
   - Archives the production artifacts (`dist/chat/browser`).

2. **Docker Build & Verification Job:**
   - Builds the production multi-stage Docker image.
   - Spawns the container and verifies HTTP response on port 80.

### Docker and Containerization

The repository provides a multi-stage `Dockerfile` and a `docker-compose.yml` configuration:

- **Build Stage:** Uses `node:24-alpine` to compile the application and generate static assets into `dist/chat/browser`.
- **Production Stage:** Uses `nginx:alpine` with a custom `nginx.conf` supporting Single Page Application (SPA) HTML5 routing fallback and static asset caching.

#### Build and run with Docker:

```bash
# Build the Docker image
docker build -t iggi-chat .

# Run the container
docker run -d -p 8080:80 --name iggi-chat iggi-chat

# Access the application at http://localhost:8080/
```

#### Run with Docker Compose:

```bash
docker compose up --build -d
```

## Code overview

| Path | Purpose |
| --- | --- |
| `src/app/app-routing.module.ts` | Client routes, including authentication and administrator guards |
| `src/app/application/` | Membership application form |
| `src/app/applications/` | Administrator application list and detail views |
| `src/app/debate-list/`, `src/app/debate-item/` | Debate listing and discussion view |
| `src/app/debate.service.ts` | Requests related to debate operations |
| `src/app/closed-debates/`, `src/app/debate-to-close/` | Closed debates and related actions |
| `src/app/users/` | User-related screens |
| `src/app/file.service.ts`, file dialogs | Document-related client code |
| `src/app/Constants.ts`, `src/environments/` | Historical API and client configuration requiring review |
| `src/app/**/*.spec.ts` | Unit/component test files |
| `e2e/` | Playwright end-to-end tests |

## Data protection and review before sharing

Historical source files contain authentication-related material and service configuration. Before sharing a working copy, inspect source files, generated JavaScript bundles, assets, environment files and Git history for credentials, tokens and personal data. Remove or replace sensitive values with synthetic ones; revoke or rotate any credential that may still be valid. Removing a value from the latest file does not remove it from Git history.

The client contains logs and realtime configuration that require review. Do not treat client-side guards as server authorization. Use isolated services and synthetic accounts while investigating authentication, membership and moderation flows.

## Contributing

Start from an identified commit, describe the user need and record the baseline build/test results. Keep changes focused, respect the existing application architecture and include meaningful tests for the behavior changed. Document the API assumptions and distinguish mocked behavior from end-to-end validation against real services.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. Dependencies remain subject to their own license terms.

## Design reference

This overview draws on the supplied “Analysis and design of the IGGI Mobile application” document, whose detailed analysis sheets cover membership, identity and access, debates, projects and document archiving. The document describes objectives and requirements; the implementation status above is based on the inspected repository snapshot.
