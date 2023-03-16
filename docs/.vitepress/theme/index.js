// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import APIEndpoint from "./components/api/api-endpoint.vue"
import APIParams from "./components/api/api-params.vue"
import QrCodeView from "./components/qr-code-view.vue"
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('APIEndpoint', APIEndpoint)
    ctx.app.component('APIParams', APIParams)
    ctx.app.component('QrCodeView', QrCodeView)
    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
}