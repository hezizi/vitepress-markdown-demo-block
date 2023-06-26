import { defineConfig } from 'vitepress'
import demoBlockPlugin from '@yuci/vitepress-markdown-demo-block'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'markdown-demo-block',
  description: 'markdown-demo-block',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/components' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [{ text: 'Markdown Examples', link: '/components' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config: (md) => md.use(demoBlockPlugin)
  }
})
