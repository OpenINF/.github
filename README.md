<div align="center">

## @openinf/.github

Org-level default metadata & community health files

<br />

[!['View on npm (coming soon)'][npm-badge--shields]][npm-badge-url]
[!['License: MIT/Apache-2.0'][license-badge--shields]][license-badge-url]

</div>

<br />

The `@openinf/.github` repository is a one-stop shop for default metadata and
community health files for all [**@OpenINF**][] projects on GitHub. If a file
does not exist for a specific project, these organization-wide defaults will be
used. We are constantly working to improve this repository, so please feel free
to [contribute](#contributing) if you notice any omissions or errors.

Thanks!

<br />

<div align="center">

[![Code Style: Prettier][prettier-badge]][prettier-url]
[![Commit Style: Conventional Commits][conventional-commits-badge]][conventional-commits-url]
[![Chat on Matrix][matrix-badge--shields]][matrix-url]

</div>

<br /><br />

---

<br />

### Cascading&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

<br />

> **Note**: While these files themselves won't appear in the file browser or Git
> history of each repository, they will be surfaced throughout developers'
> workflows, such as when opening a new issue or when viewing the project's
> [Community Profile][], just as if it were committed to the repository
> directly.[^1]

<br /><div align="center">

| File name                                    | Title                        | Description                                                                                                          |
| -------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`CODE_OF_CONDUCT.md`][]                     | Code&nbsp;of&nbsp;Conduct    | Defines standards for how to engage in a community                                                                   |
| [`CONTRIBUTING.md`][]                        | Contribution&nbsp;Guidelines | Communicates how people should contribute to a project                                                               |
| [`FUNDING.yml`][]                            | Funding                      | Displays a sponsor button per repository increasing visibility of project funding options                            |
| `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE` |                              | Issue and PR templates customize and standardize information contributors are to include when opening issues and PRs |
| [`SECURITY.md`][]                            | Security&nbsp;Policy         | Gives instructions for how to report a security vulnerability in a project                                           |
| [`SUPPORT.md`][]                             | Support&nbsp;Resources       | Lets people know about ways to get help with a project                                                               |

</div><br />

### Local&nbsp;Metadata&nbsp;&amp; Community&nbsp;Health&nbsp;Files

<br />

> **Warning**: We cannot create organization-wide defaults for the following
> files as they are often unique per project. Therefore, they _must_ be added to
> each individual repository so that they will be included when the project is
> cloned, packaged, or downloaded. Refer to the ones contained in
> [**@openinf/.github**][] for guidance on how these files are expected to look.

<br /><div align="center">

| File name        | Title               | Description                                                              |
| ---------------- | ------------------- | ------------------------------------------------------------------------ |
| [`AUTHORS`][]    | The OpenINF Authors | Lists the code contributors of their respective project repositories[^2] |
| [`README.md`][]  | Homepage            | Serves as a project landing page of sorts                                |
| [`LICENSE.md`][] | Software License(s) | The open source software license(s) associated with a project            |
| [`VISION.md`][]  | Project Vision      | The goal(s) and/or scope of a project                                    |

</div><br />

> **Note**: The [`VISION.md`][] file can be useful for offloading project goals
> that should typically be specified in the root [`README.md`][] file. It may
> optionally exist alongside it as an alternative location to even include
> project scope as well, but should be linked to from the root [`README.md`][]
> file in these cases.

<br /><br />

---

<br />

### Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change. If for whatever reason you spot something
to fix but cannot patch it yourself, please [open an issue][].

<br />

### License

This project is licensed under either of

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](https://opensource.org/licenses/MIT)

at your option.

The [SPDX](https://spdx.dev) license identifier for this project is
`MIT OR Apache-2.0`.

<br /><br />

---

<br />

<div align="center">

### Show Your Support

<br />

If you like the project (or want to bookmark it)&nbsp;&mdash;<br />
&mdash;&nbsp;[give it a star ⭐️][]&nbsp;&mdash;&nbsp;it will greatly encourage
us.

<br /><br />

&copy; The OpenINF Authors

<br />

<a title="The OpenINF website" href="https://open.inf.is" rel="author">
  <img alt="The OpenINF logo" height="32px" width="32px" src="https://raw.githubusercontent.com/openinf/openinf.github.io/live/assets/img/svg/logo.svg?sanitize=true" />
</a>

</div>

<br /><br />

<!-- BEGIN LINK DEFINITIONS -->

[^1]:
    <https://github.blog/changelog/2019-02-21-organization-wide-community-health-files>

[^2]:
    <https://docs.npmjs.com/cli/v8/configuring-npm/package-json#default-values>

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
[`LICENSE.md`]:
  https://github.com/OpenINF/.github/blob/HEAD/LICENSE.md
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
[**@OpenINF/.github**]: https://github.com/OpenINF/.github
[Community Profile]: https://github.com/OpenINF/.github/community
[conventional-commits-badge]:
  https://img.shields.io/badge/commit%20style-Conventional-%23fa6673?logoColor=white&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggc3R5bGU9ImZpbGw6ICNGRkYiIGQ9Ik0xNSwyQTEzLDEzLDAsMSwxLDIsMTUsMTMsMTMsMCwwLDEsMTUsMm0wLTJBMTUsMTUsMCwxLDAsMzAsMTUsMTUsMTUsMCwwLDAsMTUsMFoiLz48L3N2Zz4K
  'Commit Style: Conventional Commits'
[conventional-commits-url]:
  https://www.conventionalcommits.org
  'Commit Style: Conventional Commits'
[give it a star ⭐️]: https://github.com/OpenINF/.github/stargazers
[license-badge--shields]:
  https://img.shields.io/badge/license-MIT%2FApache--2.0-blue.svg?logo=github
  'License: MIT/Apache 2.0'
[license-badge-url]: #license 'License: MIT/Apache 2.0'
[matrix-badge--shields]:
  https://img.shields.io/badge/matrix-join%20chat-%2346BC99?logo=matrix
  'Chat on Matrix'
[matrix-url]:
  https://matrix.to/#/#openinf:matrix.org
  "You're invited to talk on Matrix"
[npm-badge--shields]:
  https://img.shields.io/badge/packages-6-2a2a2a.svg?logo=npm
  'View our packages on npm'
[npm-badge-url]:
  https://www.npmjs.com/org/openinf
  "View all of OpenINF's packages published to the npm registry"
[open an issue]: https://github.com/OpenINF/.github/issues
[prettier-badge]:
  https://img.shields.io/badge/code_style-Prettier-ff69b4.svg?logo=prettier
  'Code Style: Prettier'
[prettier-url]: https://prettier.io/playground 'Code Style: Prettier'

<!-- END LINK DEFINITIONS -->
