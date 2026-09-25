---
adr_name: ADR 0003
title: Build Logic in a Top-Level build/, Build Output in Each Package's dist/
date: 2023-05-11 13:00:00 -0800
updated: 2026-09-24 23:00:00 -0800
status: Approved
---

## Problem Statement

A repository needs somewhere for the code that builds, checks and lands it, and
somewhere for what the build produces. Left undecided, the first ends up in the
repository root and the second next to the source it was built from.

## Context

Much of that code is the same in every OpenINF repository: the commit message
rules, the commit queue, and the checks a pull request has to pass. It can only
be copied between repositories as a unit if it sits in the same place, with the
same layout, in each of them.

Build output is disposable. It can be deleted and regenerated at any time, it
should never be edited by hand, and it is what npm publishes from a package.

### Exemplary Prior Art

[Chromium][] and [Firefox][] both keep their build configuration in a top-level
`build/` directory. `dist/` is the directory most npm packages build into, and
the one tools and contributors expect to find.

## Decision

Each OpenINF repository keeps the code that builds, checks and lands it in a
top-level `build/` directory, with the entry points in `build/tasks/` and the
modules they share in `build/shared/`. Each package writes its build output to
`dist/` in its own directory, and git ignores it.

## Results

Every repository keeps its build logic in the same place, so the shared parts
can be copied between repositories file for file, and a contributor who knows
one repository knows where to look in the others.

Build output never shows up in a diff. A package's `exports` map points into its
`dist/`, which is built fresh for every release.

<!-- BEGIN LINK DEFINITIONS -->

[Chromium]: https://source.chromium.org/chromium/chromium/src/+/main:build/
[Firefox]: https://searchfox.org/mozilla-central/source/build

<!-- END LINK DEFINITIONS -->
