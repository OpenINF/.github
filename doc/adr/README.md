# Architecture Decision Records

A decision that shaped this organization is recorded here rather than left in
somebody's memory or in a closed pull request. [ADR 0001][] is the decision to
keep this log.

Decisions that apply to every OpenINF project belong in this log. A decision
that applies to one project belongs in that project's own `doc/adr` directory.

## The log

| ADR      | Title                                                                   | Status   |
| -------- | ----------------------------------------------------------------------- | -------- |
| [0001][] | Record Architecture Decisions in a Numbered Log                         | Final    |
| [0002][] | Keep Every OpenINF Package in One Repository                            | Approved |
| [0003][] | Build Logic in a Top-Level build/, Build Output in Each Package's dist/ | Approved |
| [0004][] | Maintenance Scripts in a Top-Level tools/                               | Approved |

## Adding one

Copy [`template.md`][] to `NNNN-<slug>.md`, where `NNNN` is the next number in
the log and `<slug>` says what was decided in a few kebab-case words. The number
is padded to four digits, which leaves room for the thousand decisions this
organization has yet to make.

The front matter carries five keys, and every record in the log has all five.
The template leaves each one as a placeholder to fill in:

```yaml
adr_name: ADR 0005
title: Decision for Something
date: 2026-01-01 09:00:00 -0800
updated: 2026-01-01 09:00:00 -0800
status: Proposed
```

`title` is what the record is called wherever it is listed, so it reads as a
decision rather than as a question. `date` is when the record was written and
does not change afterwards; `updated` is when it last changed. `status` is where
the decision stands: a new record is `Proposed`, a decision in force is
`Approved`, a decision that will not be revisited is `Final`, and a decision
another record has replaced is `Superseded`. A superseded record stays in the
log and names the record that replaced it.

A record keeps the headings the template gives it, in that order, and drops the
ones it has nothing to say under. Below those it is free to add headings of its
own where a section is long enough to need them. `Results` is filled in after
the decision has had time to prove itself, which is usually well after the rest.

<!-- BEGIN LINK DEFINITIONS -->

[ADR 0001]: 0001-decision-for-decisions.md
[0001]: 0001-decision-for-decisions.md
[0002]: 0002-decision-for-monorepos.md
[0003]: 0003-decision-for-build-dir-logic.md
[0004]: 0004-decision-for-tools-dir.md
[`template.md`]: template.md

<!-- END LINK DEFINITIONS -->
