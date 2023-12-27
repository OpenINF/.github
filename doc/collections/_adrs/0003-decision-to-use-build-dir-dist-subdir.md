## ADR 0003: Use of a &ldquo;build&rdquo; Directory for Build System Logic

Date: 2023-05-11 Status: Accepted

Authors: Bard, Claude, @DerekNonGeneric

### Context

We needed to determine where to place build-related scripts/configurations as
well as build artifacts (object files, binaries, etc.) in the repository
structure.

### Decision

We decided to have two directories:

- A "build" directory at workspace root containing build config and scripts
- A "dist" subdirectory in each package root to contain final build artifacts

#### Codebase Overview

```dir
├── 📁 build
│   └── 📂 tasks
└── 📁 packages
    └── 📦 inf-log
            └── 📂 dist
```

### Consequences

#### For "build"

- Provides isolation of build-specific logic from source code
- Allows flexibility for platform/configuration-specific builds
- Follows conventions established by large cross-platform web browsers like
  Firefox and Chromium
- Simplifies contribution for new contributors by following expected conventions

Linguist prefers `.gitattributes` to be configured as below; otherwise, may
believe this directory to contain generated (non-source) build products.[^1]

```gitattributes
build/** linguist-generated=false
```

#### For "dist"

- Final build artifacts clearly separated from the source code and buildsystem
- Artifacts can be packaged or deployed directly from the "dist" directory
- The "dist" directory can be emptied or archived without impacting source or
  build files

We configure `.gitattributes` to be configured like so.[^1]

```gitattributes
dist/** linguist-generated=true
```

### Next Steps

- Implement the decision
- Test the implementation
- Release the implementation to the public

[^1]: https://github.com/github-linguist/linguist/blob/master/docs/overrides.md
