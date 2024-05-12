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

# Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

# Build the project from the existing code repo

```bash
# Front end
# From the root directory
pnpm install
# back end
cd src/server
pnpm install
```

# Create the project from scratch

```sh
pnpm create vue@latest
```

* Project name: ... chainlink-js
* Add TypeScript? ... No
* Add JSX Support? ... No
* Add Vue Router for Single Page Application development? ... Yes
* Add Pinia for state management? ... Yes
* Add Vitest for Unit Testing? ... No
* Add an End-to-End Testing Solution? » No
* Add ESLint for code quality? ... Yes
* Add Prettier for code formatting? ... Yes
* Add Vue DevTools 7 extension for debugging? (experimental) ... No

# Libraries

## Install TailwindCSS

With `pnpm`

```sh
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

With `yarn`

```sh
vue add tailwind
```

## Install i18n

```sh
pnpm add vue-i18n@9
```

## Install Google SSO

```sh
pnpm add vue3-google-login
```

# Project Setup

```sh
pnpm install
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
