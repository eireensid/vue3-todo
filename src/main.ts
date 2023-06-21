import { createApp } from 'vue'

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import './style.css'
import App from './App.vue'
import store from "./store"
import router from "./router"
import PrimeVue from 'primevue/config';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue)
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
app.mount('#app')
