# Recommended IDE Setup

## Install VS Code
[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Install NodeJS runtime environment

The current code repository has been developed and tested on node.js version 20.13.1.

### Windows

Visit [https://nodejs.org/en/download](https://nodejs.org/en/download), and select v20.13.1 (LTS) 

![](img/win-nodejs-download.png)

### Linux (Ubuntu/Rocky Linux/UBI)

Install **Node Version Manager** (nvm)

```bash
# Download nvm
curl --insecure -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Activate nvm
. ~/.nvm/nvm.sh
# install lts version 20.13.1
nvm install v20.13.1
# check node version
node --version
```

## Install PNPM package manager

```bash
# install pnpm
npm install -g pnpm
# check pnpm version
pnpm --version
```

## Upgrade PNPM package manager

```bash
pnpm add -g pnpm
# or if on windows, do the following
npm install -g pnpm
```

# Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

# Build the project from the existing code repo

```bash
# From the root directory
pnpm install
```

To build the project from scratch, or building any VueJS/TailwindCSS project. Following the this [guide](Build-From-Scratch.md).

# Enable Google SSO

1. Navigate to [https://cloud.google.com/architecture/identity/single-sign-on](https://cloud.google.com/architecture/identity/single-sign-on).
1. Click on **Console** at the top right corner.
1. Click on **APIs & Services** from the **Quick access** section.
1. Click on **Credentials** from the left side menu.
1. Click on **+ CREATE CREDENTIALS** and choose OAuth client ID or choose an existing ID from your inventory.

:exclamation: Setup Authorized JavaScript origins with ***http://localhost:8101*** and ***http://localhost***. Port 8101 is defined in `vite.config.js`

# Project Setup

## Create the environment variables

Within the root directory, past the following code and modify the value within `<>` to your own.

```
VITE_APP_GOOGLE_CLIENT_ID="<Google SSO Client ID>"
VITE_APP_IMGURL="/img/"
VITE_APP_PROXY="<Backend URL>"
VITE_APP_SITE_SHORT="rgp"
VITE_APP_SITE_LONG="Resume360 Global Profiler"
```

## Compile and Hot-Reload for Development

```sh
pnpm dev
```

## Compile and Minify for Production

```sh
pnpm build
```

## Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
