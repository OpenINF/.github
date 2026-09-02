# Only for packages that do not warrant a feature; everything else is one.
#
# ripgrep backs the Todo Tree extension, which probes four hardcoded paths
# under vscode.env.appRoot with bare existsSync calls and never consults PATH.
# VS Code now ships @vscode/ripgrep-universal/bin/<arch>/rg, matching none of
# them, so devcontainer.json also has to point todo-tree.ripgrep at this one.
FROM mcr.microsoft.com/devcontainers/typescript-node:5-24-trixie@sha256:4c09888a2acdaf619daa79d2e811329536450a1045be9243fe03d4b02c81e91e

# Debian drops superseded versions from the archive, so an apt pin breaks the
# build at the first security update, and nothing here tracks them the way
# renovate tracks the rest. Two pragmas because DeepSource and Codacy's
# hadolint each read only their own.
# skipcq: DOK-DL3008
# hadolint ignore=DL3008
RUN apt-get update \
  && apt-get install -y --no-install-recommends fish ripgrep \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
