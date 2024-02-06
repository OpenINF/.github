---
adr_name: ADR 0003
title: Adoption of Dedicated Top-Level “Build” Directory in Codebase Layouts
date: 2023-05-11 13:00:00 -0800
updated: 2024-02-06 13:00:00 -0800
status: Approved
---

## Context

We needed to determine where to place build-related scripts/configurations as
well as build artifacts (object files, binaries, etc.).

### Decision

We decided to have two directories:

- A "build" directory at workspace root containing build config and scripts
- A "distrib" subdirectory in each package root to contain final build artifacts

#### Codebase Overview

```dir
├── 📁 build
│   └── 📂 tasks
└── 📁 packages
    └── 📦 inf-log
            └── 📂 distrib
```

### Results

#### For `build`

- Provides isolation of build-specific logic from source code
- Allows flexibility for platform/configuration-specific builds
- Follows conventions established by large cross-platform software
- Simplifies contribution for new contributors by following expected conventions

Linguist prefers `.gitattributes` to be configured as below; otherwise, may
believe this directory to contain generated (non-source) build products.[^1]

```gitattributes
build/** linguist-generated=false
```

#### For `dist`

- Final build artifacts clearly separated from the source code and buildsystem
- Artifacts can be packaged or deployed directly from the "distrib" directory
- The "distrib" directory can be emptied or archived without impacting source or
  buildsystem files.

We configure `.gitattributes` to be configured as seen here:[^1]

```gitattributes
distrib/** linguist-generated=true
```

### Next Steps

> P.1 The development of AI without a blueprint of ethical principles will have
> dangerous, unintended consequences. P.2 We must prevent dangerous, unintended
> consequences. C. We must develop AI with a blueprint of ethical principles to
> prevent dangerous, unintended consequences. &mdash; OpenINF Community Effort

[^1]: https://github.com/github-linguist/linguist/blob/master/docs/overrides.md
