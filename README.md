# IGGI — Community and Debate Client

IGGI is an Angular web client for a community platform centered on membership, structured discussions and projects emerging from collective debate. The application is intended to support members, moderators and administrators as they participate in the IGGI association's activities.

**Status:** historical application snapshot under review. This repository contains an Angular client; the identity and forum backend services it calls are not included here. Functionality described from the source has not been verified end to end.

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

- Angular and Angular CLI 7.2, TypeScript 3.2 and RxJS 6.3, as declared in `package.json`.
- Angular Material and Bootstrap for UI elements.
- Karma and Jasmine for unit tests; Protractor configuration for historical end-to-end tests.
- Redux-related packages, Pusher, mapping and document-viewing packages are included in the dependency list.

The project includes both `package-lock.json` and `yarn.lock`. Choose one package manager for a given installation and document any lockfile changes. Do not assume the two lockfiles resolve identical dependencies.

## Requirements and compatibility

Angular 7.2 is no longer supported. Angular's historical compatibility table lists Node.js `^8.9.0` or `^10.9.0` and TypeScript `>=3.1.3 <3.3.0` for Angular 7.2. These are obsolete Node versions; use a disposable isolated environment without production credentials or real personal data when reproducing this historical application. See [Angular version compatibility](https://angular.dev/reference/versions).

A browser compatible with the configured Karma launcher is needed for browser-based unit tests. The Protractor setup may require additional browser and driver configuration. External identity, forum and realtime services are needed for their respective integrated workflows unless replaced by controlled test doubles.

**Verification status:** this repository was inspected at commit `d950254203c81b894854e0a0042b01b9065f282f` on `master`. The available runtime was Node `24.22.1` and npm `11.9.0`, outside Angular 7.2's historical Node range. An `npm ci --ignore-scripts --no-audit --no-fund` attempt under that runtime was interrupted before completion; installation, build and tests were not verified. No browser or external API flow was exercised.

## Local setup

The commands below are a starting point for an isolated development environment. They have not been validated during the review; confirm the dependency installation and existing baseline before making changes.

```bash
git clone https://github.com/iggicm/chat.git
cd chat
node --version
npm --version
npm ci
npm start
```

The development server conventionally serves the Angular application at `http://localhost:4200/`. If the lockfile or dependencies cannot be installed in the selected runtime, capture the error and resolve the environment deliberately before changing versions or regenerating a lockfile. Avoid mixing npm and Yarn lockfile updates without understanding their effect.

### External services

Identity and forum API base URLs are currently defined in `src/app/Constants.ts`. Environment files under `src/environments/` and client services provide additional authentication and realtime configuration. These are client-side files: do not place secrets or real tokens in them.

Before running the application, review these references and point them to approved **local test services or mocks**. Do not assume that historical remote hosts are available, owned by you or safe to call. The identity and forum backends, their database setup and their complete API contracts are not supplied in this repository.

The actual debate view uses `DebateItemComponent` and includes realtime-event handling. `CommentsComponent` also exists, but its template is currently a placeholder; its presence should not be mistaken for proof that it is the active debate screen.

## Build and tests

```bash
npm run build
npm test -- --watch=false
npm run lint
```

`npm run e2e` invokes the repository's historical Protractor setup; browser and driver requirements must be established before it can be run. The commands above are defined in `package.json`, but their success has not been demonstrated in the reviewed environment. If an option is unavailable in the installed CLI or launcher, use the supported local equivalent and document it.

Many `*.spec.ts` files are present. Their existence does not establish meaningful coverage or a passing test suite. Test both successful and failed API responses with synthetic data, and record any pre-existing failures before evaluating a change.

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
| `e2e/` | Historical Protractor configuration and tests |

## Data protection and review before sharing

Historical source files contain authentication-related material and service configuration. Before sharing a working copy, inspect source files, generated JavaScript bundles, assets, environment files and Git history for credentials, tokens and personal data. Remove or replace sensitive values with synthetic ones; revoke or rotate any credential that may still be valid. Removing a value from the latest file does not remove it from Git history.

The client contains logs and realtime configuration that require review. Do not treat client-side guards as server authorization. Use isolated services and synthetic accounts while investigating authentication, membership and moderation flows.

## Contributing

Start from an identified commit, describe the user need and record the baseline build/test results. Keep changes focused, respect the existing application architecture and include meaningful tests for the behavior changed. Document the API assumptions and distinguish mocked behavior from end-to-end validation against real services.

## License

No root `LICENSE` file was found in the reviewed snapshot. Confirm the rights to the code and third-party assets and establish the intended license before redistributing or submitting a copy. Dependencies remain subject to their own license terms.

## Design reference

This overview draws on the supplied “Analysis and design of the IGGI Mobile application” document, whose detailed analysis sheets cover membership, identity and access, debates, projects and document archiving. The document describes objectives and requirements; the implementation status above is based on the inspected repository snapshot.
