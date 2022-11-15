# See here for image contents: https://github.com/openinf/docker-fish

FROM dereknongeneric/fish

# Needed by Linguist
# See: https://github.com/github/linguist/blob/HEAD/README.md#dependencies
# TODO(@DerekNonGeneric): add these to shared devcontainer image and remove this
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends build-essential cmake pkg-config libicu-dev zlib1g-dev libcurl4-openssl-dev libssl-dev ruby-dev

################################################################################
# The below is for the codespaces devcontainer. Uncomment if you want to use it.
################################################################################

# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.2/containers/codespaces-linux/.devcontainer/base.Dockerfile

# FROM mcr.microsoft.com/vscode/devcontainers/universal:2-focal

# ** [Optional] Uncomment this section to install additional packages. **
# USER root
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
#
# USER codespace
