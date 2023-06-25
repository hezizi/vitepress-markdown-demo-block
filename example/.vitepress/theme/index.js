import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DemoBlockContainer from 'vitepress-markdown-demo-block/block'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import Demos from '../../demos'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ArcoVue)
    app.use(Demos)
    app.component('DemoBlockContainer', DemoBlockContainer)
  }
}
