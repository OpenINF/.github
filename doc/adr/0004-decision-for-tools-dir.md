---
adr_name: ADR 0004
title: Maintenance Scripts in a Top-Level tools/
date: 2024-01-26 23:45:00 -0800
updated: 2026-09-24 23:00:00 -0800
status: Approved
---

## Problem Statement

A repository collects scripts that are not its product: generators, metadata
fixers, helpers a maintainer runs by hand. Without a place of their own, they
end up in the repository root, next to the source they act on, or wherever their
first author happened to be working.

## Context

[ADR 0003][] gives `build/` the code that builds, checks and lands a repository.
That leaves the scripts that do none of those.

In a monorepo ([ADR 0002][]) such a script usually acts on every package at
once. A script that rewrites the metadata every package has to agree on, for
instance, belongs to none of the packages, and so it belongs at the workspace
root.

### Exemplary Prior Art

[Node.js][], the [Web Platform Tests][] and [Test262][] each keep their
development scripts in a top-level `tools/` directory.

## Decision

Scripts that help develop or maintain a repository, but that its build, checks
and commit queue do not run, go in a top-level `tools/` directory.

## Results

What CI runs is in `build/`, and what a maintainer runs by hand is in `tools/`.
Knowing which kind of script something is tells a contributor where to find it.

<!-- BEGIN LINK DEFINITIONS -->

[ADR 0002]: 0002-decision-for-monorepos.md
[ADR 0003]: 0003-decision-for-build-dir-logic.md
[Node.js]: https://github.com/nodejs/node/tree/main/tools
[Web Platform Tests]:
  https://github.com/web-platform-tests/wpt/tree/master/tools
[Test262]: https://github.com/tc39/test262/tree/main/tools

<!-- END LINK DEFINITIONS -->
