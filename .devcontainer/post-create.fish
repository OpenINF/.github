#!/usr/bin/fish

# If there's a .ruby-version, then run `rbenv install`.
if test -e .ruby-version
    rbenv install --verbose
end

echo 'set -Ux fish_user_paths ~/.rbenv/shims/ $fish_user_paths' >> ~/.config/fish/config.fish

# To squelch yellow message re: specifying how divergent branches be reconciled.
echo 'git config pull.rebase true' >> ~/.config/fish/config.fish # rebase

source ~/.config/fish/config.fish

rbenv rehash

# If there's a Gemfile, then install Bundler and run `bundle install`.
if test -e Gemfile
    # Install Bundler.
    gem install bundler
    # Configure Bundler setting local gem install path to avoid permission errors.
    bundle config set --local path vendor/bundle
    # Install the dependencies specified in the Gemfile.
    bundle install
    # Ensure latest versions of Bundler's dependencies are installed.
    bundle update --bundler
else
    # If there's no Gemfile, install Jekyll.
    gem install jekyll
end

# If there's a `.nvmrc`, then run `nvm install`.
if test -e .nvmrc
    # Install the specified version of Node.js.
    nvm install
end

# If there's a package.json, then run `pnpm install`.
if test -e package.json
    corepack enable
    corepack prepare pnpm@latest --activate

    # Same thing as running "pnpm setup", but written in fish.
    # Needed for global CLIs & filesystem file permission issues.
    set -Ux PNPM_HOME $HOME/.local/share/pnpm
    echo 'set -Ux PNPM_HOME "$HOME/.local/share/pnpm"' >> ~/.config/fish/config.fish

    set -Ux fish_user_paths $PNPM_HOME $fish_user_paths
    echo 'set -Ux fish_user_paths $PNPM_HOME $fish_user_paths' >> ~/.config/fish/config.fish

    pnpm add -g pnpm
    pnpm install
end

# Install libssl1.1 (needed by Chomp). According to https://stackoverflow.com/a/73604364 it's risky
# on Ubuntu 22.04+ as it supports openssl-3.0.2, but we do it anyway since `dpkg` makes it easy to do.
# > A more preferable way would be to build and keep the libssl.so.1.1 and libcrypto.so.1.1 libraries
# > away from root and export LD_LIBRARY_PATH as needed.
curl -sLO http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb
rm libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# Globally-install Chomp CLI
pnpm add -g chomp

# Globally-install Shopify CLI & theme
pnpm add -g @shopify/cli@pre @shopify/theme@pre

echo 'rbenv rehash && nvm use' >> ~/.config/fish/config.fish

# Installs the moon and dprint tools, and it adds the tools to the user's $PATH.
# It makes the tools available to the user when they open a new terminal window.

# Install moon
curl -fsSL https://moonrepo.dev/install/moon.sh | bash >> /dev/null
echo 'set -Ux fish_user_paths $HOME/.moon/bin $fish_user_paths' >> ~/.config/fish/config.fish

# Install dprint
curl -fsSL https://dprint.dev/install.sh | sh >> /dev/null
echo 'set -Ux fish_user_paths $HOME/.dprint/bin $fish_user_paths' >> ~/.config/fish/config.fish

source ~/.config/fish/config.fish

# this will populate your ~/.gnupg directory with empty keyring files
# it will create the ~/.gnupg directory if it does not already exist (expected)
gpg --list-keys

# If there's a .gnupg directory, then perform the following setup tasks.
if test -e ~/.gnupg/
    # Configure Git to use `gpg2`.
    echo 'git config --global gpg.program gpg2' >> ~/.config/fish/config.fish

    echo 'set -gx GPG_TTY (tty)' >> ~/.config/fish/config.fish

    # To fix the " gpg: WARNING: unsafe permissions on homedir
    # '/home/path/to/user/.gnupg' " error, make sure that the .gnupg directory and
    # its contents is accessibile by your user.
    # chown -R (whoami) ~/.gnupg/

    # Also correct the permissions and access rights on the directory.
    # chmod 600 ~/.gnupg/*
    # chmod 700 ~/.gnupg

    echo no-autostart >> ~/.gnupg/gpg.conf

    # Remove an existing Unix-domain socket file for remote port forwarding before
    # creating a new one when gpgtunnel connection is made.
    # rm ~/.gnupg/S.gpg-agent

    printf '\n%s\n\n\t%s\n\n' 'Enable commit signing:' 'git config --global commit.gpgsign true'
end
