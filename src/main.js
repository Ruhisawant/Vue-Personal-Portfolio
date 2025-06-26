import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'
import './style.css'

createPinia().use(piniaPersist);
createApp(App).use(createPinia()).use(router).mount('#app');