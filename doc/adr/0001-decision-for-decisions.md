---
adr_name: ADR 0001
title: Record Architecture Decisions in a Numbered Log
date: 2023-01-03T11:14:00-08:00
updated: 2026-09-24T23:00:00-08:00
status: Final
---

## Problem Statement

A decision about how OpenINF's repositories are laid out, built or released
outlives the conversation that made it. The pull request that carried it gets
closed, the discussion it was argued in scrolls away, and the people who weighed
the options move on. What is left is the code, which shows what was chosen but
not why, or what else was on the table.

A contributor who cannot find the reason has two bad options: follow a rule they
cannot explain, or undo it without knowing what it was protecting. Either way
the same argument gets had again, with less to go on than the first time.

## Context

OpenINF spans several repositories. Some decisions bind all of them and others
bind one. A decision that binds all of them needs a home that is not any single
project's, and this repository is already where the organization keeps what
applies everywhere: GitHub reads its community health files as the default for
every repository in the organization.

A decision can also change. A log that only shows the current rule cannot say
what it replaced, and a replaced rule with no record looks like one that was
never made.

### Alternatives Considered

Pull request descriptions and commit messages. They carry the reasoning for a
change, but they are scattered across repositories, and nothing in them marks a
decision that binds future work apart from one that fixed a bug.

A wiki. It sits outside the repositories, so its edits are not reviewed the way
code is, and nothing ties a page to the change that made it true.

## Decision

OpenINF records each architecture decision as a numbered Markdown file in a
`doc/adr/` directory. A decision that binds every OpenINF repository goes in
this repository's log, and a decision that binds one repository goes in that
repository's own.

A record is revised in place while its decision stands, and its `updated` date
says when. A decision that is reversed keeps its record, marked `Superseded`,
and the decision that replaces it gets a new record, with the next number.

## Results

A rule and its reason live in one place, reviewed like any other change. A
contributor who questions a rule can read why it exists before proposing to
change it, and the proposal is a pull request against its record, which puts the
old reasoning and the new side by side.
