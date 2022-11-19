#!/usr/bin/fish

# If there's a .ruby-version, then run `rbenv install`.
if test -e .ruby-version
    rbenv install --verbose
end

echo 'set -Ux fish_user_paths ~/.rbenv/shims/ $fish_user_paths' >>~/.config/fish/config.fish

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
    corepack enable
    corepack prepare pnpm@latest --activate
end

# If there's a package.json, then run `pnpm install`.
if test package.json
    pnpm install
end

echo 'rbenv rehash && nvm use' >>~/.config/fish/config.fish

# Configure Git to use `gpg2`.
echo 'git config --global gpg.program gpg2' >>~/.config/fish/config.fish

echo 'set -gx GPG_TTY (tty)' >>~/.config/fish/config.fish

# To fix the " gpg: WARNING: unsafe permissions on homedir
# '/home/path/to/user/.gnupg' " error, make sure that the .gnupg directory and
# its contents is accessibile by your user.
chown -R (whoami) ~/.gnupg/

# Also correct the permissions and access rights on the directory.
chmod 600 ~/.gnupg/*
chmod 700 ~/.gnupg

echo no-autostart >>~/.gnupg/gpg.conf

# Remove an existing Unix-domain socket file for remote port forwarding before
# creating a new one when gpgtunnel connection is made.
rm ~/.gnupg/S.gpg-agent

printf '\n%s\n\n\t%s\n\n' 'Enable commit signing:' 'git config --global commit.gpgsign true'
