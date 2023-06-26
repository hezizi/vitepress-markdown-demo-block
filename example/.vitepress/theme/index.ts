import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DemoBlockContainer from '@yuci/vitepress-markdown-demo-block/block'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import Demos from '../../demos/index'

export default <Theme>{
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ArcoVue)
    app.use(Demos)
    app.component('DemoBlockContainer', DemoBlockContainer)
  }
}
