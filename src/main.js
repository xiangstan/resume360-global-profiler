import './assets/styles/tailwind.css'
import './assets/styles/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { languages, defaultLocale } from '@/assets/i18n/index.js'

const messages = Object.assign(languages)
const getLang = localStorage.getItem('langLocale')
const setLang = (getLang) ? getLang : defaultLocale
localStorage.setItem('langLocale', setLang)
const i18n = createI18n({
  allowComposition: true,  // to use with Composition API
  legacy: false,
  locale: setLang,
  messages
})

const app = createApp(App)

app.use(createPinia())
app.use(router).use(i18n)

app.mount('#app')
