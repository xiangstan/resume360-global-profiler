# chainlink-js

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Create the project from scratch

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

## Libraries

### Install TailwindCSS

With `pnpm`

```sh
pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

With `yarn`

```sh
vue add tailwind
```

### Install i18n

```sh
pnpm add vue-i18n@9
```

### Install Google SSO

```sh
pnpm add vue3-google-login
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
