import { createApp } from 'vue'
import App from './app.vue'
import routes from './routes' // <---
import axios from 'axios'
import VueAxios from 'vue-axios'

import { createWebHistory, createRouter } from "vue-router";
const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(VueAxios, axios).use(router).mount('#app')
