# See here for image contents: https://github.com/openinf/docker-fish

FROM dereknongeneric/fish

# Needed by Linguist
# See: https://github.com/github/linguist/blob/HEAD/README.md#dependencies
# TODO(@DerekNonGeneric): add these to shared devcontainer image and remove this
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends sudo apt-get install build-essential cmake pkg-config libicu-dev zlib1g-dev libcurl4-openssl-dev libssl-dev ruby-dev
