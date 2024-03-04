<!-- markdownlint-disable-next-line line-length -->

<a href="##"><img src="https://raw.githubusercontent.com/OpenINF/openinf.github.io/live/assets/img/svg/logogram-color.svg?sanitize=true" alt="OpenINF logo" title="OpenINF" align="right" height="96" width="96" /></a>

<div align="left">

## `.github` [![Stars][stargazers-badge--shields]][stargazers-badge-url]

> Org-level default metadata & community health files

<br />

[!['View on npm (coming soon)'][npm-badge--shields]][npm-badge-url]
[!['License: MIT/Apache-2.0'][license-badge--shields]][license-badge-url]

</div>

<br />

The OpenINF `.github` repository is a one-stop shop for default metadata and
community health files for all [**@OpenINF**][] projects on GitHub. If a file
does not exist for a specific project, these organization-wide defaults will be
used. We are constantly working to improve this repository, so please feel free
to [contribute](#contributing) if you notice any omissions or errors.

Thanks!

<br />

<div align="center">

[![Code Style: Prettier][prettier-badge]][prettier-url]
[![Chat on Matrix][matrix-badge--shields]][matrix-url]

</div>

<br /><br />

---

<br />

<details open>
<summary>

### Contents

</summary>

1. [Cascading Metadata &amp; Community Health Files](#cascading-metadata-community-health-files)
1. [Local Metadata &amp; Community Health Files](#local-metadata-community-health-files)
1. [Contributing](#contributing)
1. [License](#license)

</details>

<br /><br />

---

<br />

<section id="cascading-metadata-community-health-files">

<a name="cascading-metadata-community-health-files">

### Cascading&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

</a>

<br />

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/light-theme/info.svg">
  <img alt="Info" src="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/dark-theme/info.svg">
</picture><br>

While these files themselves won't appear in the file browser or Git history of
each repository, they will be surfaced throughout developers' workflows, such as
when opening a new issue or when viewing the project's [Community Profile][],
just as if it were committed to the repository directly.[^1]

<br /><div align="center">

| File name                                    | Title                        | Description                                                                                                          |
| :------------------------------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| [`CODE_OF_CONDUCT.md`][]                     | Code&nbsp;of&nbsp;Conduct    | Defines standards for how to engage in a community                                                                   |
| [`CONTRIBUTING.md`][]                        | Contribution&nbsp;Guidelines | Communicates how people should contribute to a project                                                               |
| [`FUNDING.yml`][]                            | Funding                      | Displays a sponsor button per repository increasing visibility of project funding options                            |
| `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE` |                              | Issue and PR templates customize and standardize information contributors are to include when opening issues and PRs |
| [`SECURITY.md`][]                            | Security&nbsp;Policy         | Gives instructions for how to report a security vulnerability in a project                                           |
| [`SUPPORT.md`][]                             | Support&nbsp;Resources       | Lets people know about ways to get help with a project                                                               |

</div></section>

<br />

<section id="local-metadata-community-health-files">

<a name="local-metadata-community-health-files">

### Local&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

</a>

<br />

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/light-theme/issue.svg">
  <img alt="Issue" src="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/dark-theme/issue.svg">
</picture><br>

We cannot create organization-wide defaults for the following files as they are
often unique per project. Therefore, they must be added to each individual
repository so that they will be included when the project is cloned, packaged,
or downloaded. Refer to the ones contained in this repository for guidance on
how these files are expected to look.

<br /><div align="center">

| File name        | Title               | Description                                                             |
| :--------------- | :------------------ | :---------------------------------------------------------------------- |
| [`AUTHORS`][]    | The OpenINF Authors | Lists the contributors of their respective project repositories[^2][^3] |
| [`README.md`][]  | Homepage            | Serves as a project landing page of sorts                               |
| [`/LICENSE/`][]  | Software License(s) | The open-source software license(s) associated with a project           |
| [`VISION.md`][]  | Project Vision      | The goal(s) and/or scope of a project                                   |

</div><br />

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/light-theme/tip.svg">
  <img alt="Tip" src="https://raw.githubusercontent.com/OpenINF/GitHub-Markdown/HEAD/blockquotes/badge/dark-theme/tip.svg">
</picture><br>

The [`VISION.md`][] file can be useful for offloading project goals that should
typically be specified in the root [`README.md`][] file. It may optionally exist
alongside it as an alternative location to even include project scope as well,
but should be linked to from the root [`README.md`][] file in these cases.

</section>

<br /><br />

---

<br />

<section id="contribution">

### Contributing

<br />

Pull requests are welcome. If you plan to make significant changes, please open
an issue to discuss the change first. If you notice something that needs fixing
but can't do it yourself, please let us know by [opening an issue][].

</section>

<br /><br />

<section id="licenses">

### License

<br />

This project is licensed under either of the following:

- [The MIT License](https://opensource.org/licenses/MIT)
- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [Blue Oak Model License, Version 1.0.0](https://blueoakcouncil.org/license/1.0.0)

at your option.

The [SPDX](https://spdx.dev) license identifier for this project is
`MIT OR Apache-2.0 OR BlueOak-1.0.0`.

</section>

<br /><br />

---

<br />

<div align="center">

<a title="The OpenINF website" href="https://open.inf.is" rel="author">
  <!-- markdownlint-disable-next-line line-length -->
  <img alt="The OpenINF logo" height="32px" width="32px" src="https://raw.githubusercontent.com/openinf/openinf.github.io/live/assets/img/svg/logo.svg?sanitize=true" />
</a>

</div>

<br /><br />

<!-- LINK LABEL DEFINITIONS - START -->

[^1]:
    <https://github.blog/changelog/2019-02-21-organization-wide-community-health-files>

[^2]:
    <https://docs.npmjs.com/cli/v8/configuring-npm/package-json#default-values>

[^3]: <https://opensource.google/documentation/reference/releasing/authors>

[`AUTHORS`]:
  https://github.com/OpenINF/.github/blob/HEAD/AUTHORS
  'List of people who have contributed code to this project'
[`CODE_OF_CONDUCT.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/CODE_OF_CONDUCT.md
  'Standards for how to engage with the project community'
[`CONTRIBUTING.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/CONTRIBUTING.md
  'Contribution guidelines for this project'
[`FUNDING.yml`]:
  https://github.com/OpenINF/.github/blob/HEAD/.github/FUNDING.yml
  'How to financially support maintenance/development of @OpenINF projects'
[`/LICENSE/`]:
  https://github.com/OpenINF/.github/blob/HEAD/LICENSE
  'The open source software license(s) associated with this project'
[`README.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/README.md
  'The landing/home page of this project'
[`SECURITY.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/SECURITY.md
  'Instructions on how to report security vulnerabilities for this project'
[`SUPPORT.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/SUPPORT.md
  'Where to get help on this project'
[`VISION.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/VISION.md
  'What the goal(s) and/or scope are of this project'
[**@OpenINF**]: https://github.com/OpenINF
[Community Profile]: https://github.com/OpenINF/.github/community
[license-badge--shields]:
  https://img.shields.io/badge/license-MIT%2FApache--2.0-blue.svg?logo=github
  'License: MIT/Apache 2.0'
[license-badge-url]: #license 'License: MIT/Apache 2.0'
[matrix-badge--shields]:
  https://img.shields.io/badge/matrix-join%20chat-%2346BC99?logo=matrix
  'Chat on Matrix'
[matrix-url]:
  https://matrix.to/#/#openinf-space:matrix.org
  "You're invited to talk on Matrix"
[npm-badge--shields]:
  https://img.shields.io/badge/packages-6-2a2a2a.svg?logo=npm
  'View our packages on npm'
[npm-badge-url]:
  https://www.npmjs.com/org/openinf
  "View all of OpenINF's packages published to the npm registry"
[opening an issue]: https://github.com/OpenINF/.github/issues
[prettier-badge]:
  https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier
  'Code Style: Prettier'
[prettier-url]: https://prettier.io/playground 'Code Style: Prettier'
[stargazers-badge-url]:
  https://github.com/OpenINF/.github/stargazers
  'Stargazers'
[stargazers-badge--shields]:
  https://img.shields.io/github/stars/OpenINF/.github.svg?style=social&maxAge=3600&label=Star
  'Stargazers'

<!-- LINK LABEL DEFINITIONS - END -->
