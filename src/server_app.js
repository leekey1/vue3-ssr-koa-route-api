import {createSSRApp} from 'vue'
import App from './app.vue'

import {createMemoryHistory, createRouter} from "vue-router";
import routes from './routes'
import axios from 'axios'

function createRouterS () {
    return createRouter({
        history: createMemoryHistory(),
        routes,
    });
}

function createAppS () {
    const router = createRouterS()
    const app = createSSRApp(App)
    app.use(router)
    return { app, router }
}


export default async context => {
    const { app, router } = createAppS()
    app.config.globalProperties.axios = axios.create({
        baseURL: context.request.origin,
        timeout: 1000,
        headers: context.request.headers
    })
    app.config.globalProperties.isSSR = true
    router.push(context.request.url)
    await router.isReady()
    return app
}
