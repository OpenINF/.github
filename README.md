<div align="center">

# @openinf/.github

Org-level default metadata & community health files

<br />

[!['View on npm (coming soon)'][npm-badge--shields]][npm-badge-url]
[!['License: MIT'][license-badge--shields]][license-badge-url]
[!['DeepScan grade'][deepscan-badge]][deepscan-url]

</div>

<br />

_The high-level goal of `@openinf/.github` is to serve as a ✨special✨
repository for default metadata and community health files for use across all
projects in the [**@OpenINF**] organization on GitHub. If a given file doesn't
exist for a repository, the organization-wide defaults in this repository will
be used. As is the case with any software project in continuous development,
omissions and errors may exist, for which contributions are welcome._

<br />

<div align="center">

[![Code Style: Prettier][prettier-badge]][prettier-url]
[![Commit Style: Conventional Commits][conventional-commits-badge]][conventional-commits-url]
[![Active Issues: DeepSource][deepsource-badge]][deepsource-url]
[![Chat on Matrix][matrix-badge--shields]][matrix-url]

</div>

<br />

---

<br />

## Cascading&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

<br />

> **Note**: While these files themseves won't appear in the file browser or Git
> history of each repository, they will be surfaced throughout developers'
> workflows, such as when opening a new issue or when viewing the project's
> [Community Profile], just as if it were committed to the repository
> directly.[^1]

<br /><div align="center">

| File name                                    | Title                        | Description                                                                                                          |
| -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`CODE_OF_CONDUCT`]                          | Code&nbsp;of&nbsp;Conduct    | Defines standards for how to engage in a community                                                                   |
| [`CONTRIBUTING`]                             | Contribution&nbsp;Guidelines | Communicates how people should contribute to a project                                                               |
| [`FUNDING`]                                  | Funding                      | Displays a sponsor button per repository increasing visibility of project funding options                            |
| `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE` |                              | Issue and PR templates customize and standardize information contributors are to include when opening issues and PRs |
| [`SECURITY`]                                 | Security&nbsp;Policy         | Gives instructions for how to report a security vulnerability in a project                                           |
| [`SUPPORT`]                                  | Support&nbsp;Resources       | Lets people know about ways to get help with a project                                                               |

</div><br />

## Local&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

<br />

> **Warning**: We cannot create organization-wide defaults for the following
> files as they are often unique per project. Therefore, they _must_ be added to
> each individual repository so that they will be included when the project is
> cloned, packaged, or downloaded. Refer to the ones contained in
> [**@openinf/.github**] for guidance on how these files are expected to look.

<br /><div align="center">

| File name   | Title               | Description                                                              |
| ----------- | ------------------- | ------------------------------------------------------------------------ |
| [`AUTHORS`] | The OpenINF Authors | Lists the code contributors of their respective project repositories[^2] |
| [`README`]  | Homepage            | Serves as a project landing page of sorts                                |
| [`LICENSE`] | Software License(s) | The open source software license(s) associated with a project            |
| [`VISION`]  | Project Vision      | The goal(s) and/or scope of a project                                    |

</div><br />

> **Note**: The [`VISION`] file can be useful for offloading project goals that
> should typically be specified in the root [`README`] file. It may optionally
> exist alongside it as an alternative location to even include project scope as
> well, but should be linked to from the root [`README`] file in these cases.

<br /><br />

---

<br />

<div align="center">

## Show Your Support

<!-- Give a ⭐️ if this project helped you! -->

If you like the project, [give it a star ⭐️], it will be a great encouragement to us.

<br /><br />

&copy; The OpenINF Authors

<br />

<a title="The OpenINF website" href="https://open.inf.is" rel="author">
  <img alt="The OpenINF logo" height="32px" width="32px" src="https://raw.githubusercontent.com/openinf/openinf.github.io/live/logo.svg?sanitize=true" />
</a>

</div>

<br /><br />

[^1]:
    <https://github.blog/changelog/2019-02-21-organization-wide-community-health-files/>

[^2]:
    <https://docs.npmjs.com/cli/v8/configuring-npm/package-json#default-values>

<!-- prettier-ignore-start -->
<!-- PRESERVE LINK DEFINITION LABEL CASE - START -->

[give it a star ⭐️]: https://github.com/openinf/.github/stargazers

[**@openinf**]: https://github.com/openinf
[**@openinf/.github**]: https://github.com/openinf/.github
[`AUTHORS`]:
  https://github.com/openinf/.github/blob/HEAD/AUTHORS
  'List of people who have contributed code to this project'
[`CODE_OF_CONDUCT`]:
  https://github.com/openinf/.github/blob/HEAD/CODE_OF_CONDUCT.md
  'Standards for how to engage with the project community'
[`CONTRIBUTING`]:
  https://github.com/openinf/.github/blob/HEAD/CONTRIBUTING.md
  'Contribution guidelines for this project'
[`FUNDING`]:
  https://github.com/openinf/.github/blob/HEAD/.github/FUNDING.yml
  'How to financially support maintenance/development of @openinf projects'
[`LICENSE`]:
  https://github.com/openinf/.github/blob/HEAD/LICENSE
  'The open source software license(s) associated with this project'
[`README`]:
  https://github.com/openinf/.github/blob/HEAD/README.md
  'The landing/home page of this project'
[`SECURITY`]:
  https://github.com/openinf/.github/blob/HEAD/SECURITY.md
  'Instructions on how to report security vulnerabilities for this project'
[`SUPPORT`]:
  https://github.com/openinf/.github/blob/HEAD/SUPPORT.md
  'Where to get help on this project'
[`VISION`]:
  https://github.com/openinf/.github/blob/HEAD/VISION.md
  'What the goal(s) and/or scope are of this project'

[Community Profile]:
  https://github.com/openinf/.github/community

[deepscan-badge]: https://badgen.net/deepscan/grade/team/18447/project/22132/branch/651065?icon=deepscan 'DeepScan grade'
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=18447&pid=22132&bid=651065 'DeepScan grade'
[deepsource-badge]: https://deepsource.io/gh/openinf/.github.svg/?label=active+issues&show_trend=true&token=L0v9-o_H8dv7EsWlUtV0899k
[deepsource-url]: https://deepsource.io/gh/openinf/.github/?ref=repository-badge 'Active Issues: DeepSource'
[conventional-commits-badge]: https://img.shields.io/badge/commit%20style-Conventional-%23fa6673?logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggc3R5bGU9ImZpbGw6ICNGRkYiIGQ9Ik0xNSwyQTEzLDEzLDAsMSwxLDIsMTUsMTMsMTMsMCwwLDEsMTUsMm0wLTJBMTUsMTUsMCwxLDAsMzAsMTUsMTUsMTUsMCwwLDAsMTUsMFoiLz48L3N2Zz4K 'Commit Style: Conventional Commits'
[conventional-commits-url]: https://www.conventionalcommits.org 'Commit Style: Conventional Commits'
[matrix-badge--badgen]: https://badgen.net/matrix/members/openinf/matrix.org 'Chat on Matrix'
[matrix-badge--shields]: https://img.shields.io/badge/matrix-join%20chat-%2346BC99?logo=matrix 'Chat on Matrix'
[matrix-url]: https://matrix.to/#/#openinf:matrix.org 'You&apos;re invited to talk on Matrix'
[license-badge-url]: https://spdx.org/licenses/MIT.html 'License: MIT'
[license-badge--shields]: https://img.shields.io/github/license/openinf/gh-file-importer?color=blue&logo=github 'License: MIT'
[conventional-commits-badge]: https://img.shields.io/badge/commit%20style-Conventional-%23fa6673?logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggc3R5bGU9ImZpbGw6ICNGRkYiIGQ9Ik0xNSwyQTEzLDEzLDAsMSwxLDIsMTUsMTMsMTMsMCwwLDEsMTUsMm0wLTJBMTUsMTUsMCwxLDAsMzAsMTUsMTUsMTUsMCwwLDAsMTUsMFoiLz48L3N2Zz4K 'Commit Style: Conventional Commits'
[conventional-commits-url]: https://www.conventionalcommits.org 'Commit Style: Conventional Commits'
[npm-badge--shields]: https://img.shields.io/npm/v/@openinf/.github/latest.svg?logo=npm 'View on npm'
[npm-badge-url]: https://www.npmjs.com/package/@openinf/.github#top 'View on npm'
[prettier-badge]: https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier 'Code Style: Prettier'
[prettier-url]: https://prettier.io/playground 'Code Style: Prettier'

<!-- PRESERVE LINK DEFINITION LABEL CASE - END -->
<!-- prettier-ignore-end -->
