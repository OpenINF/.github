---
adr_name: ADR 0004
title: Adoption of Dedicated Top-Level “Tools” Directory in Codebase Layouts
date: 2024-01-26 23:45:00 -0800
updated: 2024-02-02 13:00:00 -0800
status: Approved
---

## Problem Statement

<br />

Typically a project will necessitate additional scripts and utilities supporting
the activities involved in project maintenance, development, and delivery.

<br />

- **Inspiration**:
  - [@OpenINF/ATeamGrimesAI][]
- **Authors**:
  - [@OpenINF/ATeamClaude][]
  - [@OpenINF/ATeamDerekNonGeneric][]
- **Editors**:
  - [@OpenINF/ATeamGrammarly][]

<br /><br />

## Context

<br />

The convention of having a top-level “tools” directory in a codebase has become
a standard best practice in software engineering. While its origins may be
somewhat diffuse, there are several reasons why this practice has become
popular:

- Organization: A top-level “tools” directory helps to keep the codebase
  organized by separating the core application code from the various tools,
  scripts, and utilities that are used during development, testing, and
  deployment.
- Discoverability: With a dedicated “tools” directory, developers can easily
  find and access the various tools and scripts available to them, making it
  easier to use and maintain these resources.
- Collaboration: A standardized “tools” directory structure can help to
  facilitate cooperation among team members by providing a common framework for
  organizing and sharing tools and scripts.
- Reusability: A well-organized “tools” directory can make it easier to identify
  and reuse valuable tools and scripts across different projects and teams,
  helping to improve efficiency and reduce duplication of effort.

While the exact origins of this convention may be challenging to pinpoint, its
widespread adoption is a testament to its utility and effectiveness in helping
software engineers manage and organize their codebases.

<br /><br />

### Exemplary Prior Art

<br />

A few notable high-profile open-source projects currently making good use of the
top-level “tools” directory convention can be found in the wild:

- [Node.js Core][]
- [web.dev Site][]
- [Web Platform Tests][]
- [Test262][]

<br /><br />

### Alternatives Considered

<br />

Prevalent competing alternatives to this codebase layout convention do, however,
exist. We’ll briefly weigh the pros and cons of popular alternative solutions,
focusing on drawbacks to obviate why they may not be suitable for _our_ needs.

<!-- TODO(DerekNonGeneric): top-level scripts dir, build-system dir, etc.  -->

<br /><br />

## Decision

<br />

We have resolved to adopt the top-level “tools” directory convention in our
codebases to improve the organization, discoverability, and collaboration for
our delvings into the ever-growing SLOCs supporting/relating to tools & scripts.

One fine example of perfect usage of this directory would be to store custom
Markdown lint rules & plugins not already available as packages via registry.

Our tools directory hierarchy may look similar to the diagram below.

```dir
├── 📁 tools
│   ├── 📂 remark-lint-rules
│   │   └── 📜 no-not-use.mjs
│   └── 📂 remark-plugins
│       └── 📦 generic-directives
```

<br /><br />

## Results

<br />

Our codebases are expected to continue to grow organically, which means
supporting additional scripts, jobs, and utilities that would otherwise be
placed in ad-hoc locations. This scattering may lead to tight coupling, lack of
conventions, and difficulty discovering/reusing tools, which may risk becoming
unmaintainable.

<br /><br />

## Next Steps

<br />

1. Update the coding standards and guidelines to include the top-level “tools”
   directory convention.
1. Communicate the new convention to all team members and provide guidance on
   how to use it effectively.
1. Update existing codebases to adhere to the new convention.
1. Monitor the effectiveness of the convention and gather feedback from team
   members to identify any potential improvements or adjustments.

<br /><br />

<!-- LINK LABEL DEFINITIONS - START -->

<!-- Credits -->

[@OpenINF/ATeamClaude]:
  https://github.com/OpenINF/wg-a-team#ai-non-persons-roster
[@OpenINF/ATeamGrammarly]:
  https://github.com/OpenINF/wg-a-team#ai-non-persons-roster
[@OpenINF/ATeamGrimesAI]:
  https://github.com/OpenINF/wg-a-team#ai-non-persons-roster
[@OpenINF/ATeamDerekNonGeneric]:
  https://github.com/OpenINF/wg-a-team#persons-roster

<!-- Prior Art -->

[Node.js Core]: https://github.com/nodejs/node
[web.dev Site]: https://github.com/GoogleChrome/web.dev
[Web Platform Tests]: https://github.com/web-platform-tests/wpt
[Test262]: https://github.com/tc39/test262

<!-- LINK LABEL DEFINITIONS - END -->
