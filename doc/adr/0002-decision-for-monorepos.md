---
adr_name: ADR 0002
title: Keep Every OpenINF Package in One Repository
date: 2023-04-19T13:00:00-08:00
updated: 2026-09-24T23:00:00-08:00
status: Approved
---

## Problem Statement

OpenINF's npm packages depend on one another. With one repository per package, a
change low in the dependency graph means a release in that repository, then a
dependency bump, a build and a release in each repository above it. Each of
those repositories also needs its own copy of the tooling that builds, checks
and releases it, and the copies drift apart unless someone keeps them in step by
hand.

## Context

The packages are layered. A foundational package with no dependencies sits at
the bottom, and others build on it. Some re-export what is beneath them:
`@openinf/util` re-exports `@openinf/util-core`, so a change to `util-core`
reaches a consumer of `util` even when `util`'s own code has not changed.

Much of what surrounds a package has to agree across all of them: the supported
Node.js versions, the `repository` and `license` metadata, the shape of the
`exports` map, and the lint, test and release configuration. In one repository
each of those is written once. Across repositories each one is a copy, and a fix
has to land once per copy.

Two OpenINF repositories each have one job that GitHub gives them by name, and
hold no packages: GitHub uses the community health files in `.github` as the
defaults for the whole organization, and serves the organization's GitHub Pages
site from `openinf.github.io`.

### Alternatives Considered

One repository per package. Each package would keep its own version, which reads
well until a breaking change in a foundational package reaches consumers through
a re-export: the re-exporting package would ship it as a patch, because nothing
in its own code changed.

## Decision

Every OpenINF package published to npm lives in [OpenINF/sdk][], in `packages/`,
as one pnpm workspace, and all of them are released together at one version.

## Results

Packages depend on each other through `workspace:*`, so a change and everything
it affects are one pull request and one CI run. Adding or splitting a package is
an ordinary change, with no new repository or CI setup to create.

The shared version, kept by Changesets' `fixed` mode, makes a breaking change
anywhere a major release everywhere. The cost is that every release bumps every
package, including the ones it does not touch.

<!-- BEGIN LINK DEFINITIONS -->

[OpenINF/sdk]: https://github.com/OpenINF/sdk

<!-- END LINK DEFINITIONS -->
