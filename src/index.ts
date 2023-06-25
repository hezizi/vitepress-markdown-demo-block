import path from 'path'
import fs from 'fs-extra'
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import MdContainer from 'markdown-it-container'
import { getHighlighter } from 'shiki'

function symbolReplace(str: string, symbol = ['-', '/']) {
  return str.replace(symbol[0], symbol[1])
}

const highlighter = await getHighlighter({
  theme: 'github-light',
  langs: ['javascript', 'typescript', 'vue']
})

export default function demoBlockPlugin(md: MarkdownIt, demoDir = 'demos') {
  const markupInfo = 'demo'
  md.use(MdContainer, markupInfo, {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        const desc = token.info.trim().slice(markupInfo.length).trim()
        const descTemp = `<template #desc>${md.render(desc)}</template>`

        let source = ''
        // <MyComponent></MyComponent> or <my-component></my-component> or
        // <MyComponent /> or <my-component />
        const { content } = tokens[idx + 1]
        const symbols = ['/>', '></']
        if (content) {
          for (const symbol of symbols) {
            if (content.includes(symbol)) {
              source = content.split(symbol).shift().trim().substring(1, 100)
            }
          }
          if (source.includes('-')) {
            source = symbolReplace(source)
          } else {
            source = symbolReplace(
              source.replace(
                /[A-Z]/g,
                (match, index) =>
                  `${index === 0 ? '' : '-'}${match.toLowerCase()}`
              )
            )
          }
        }

        const root = process.cwd()
        const code = source
          ? fs.readFileSync(
              path.resolve(root, demoDir, `${source}.vue`),
              'utf-8'
            )
          : ''

        if (code) {
          const html = highlighter.codeToHtml(code, {
            lang: 'vue'
          })
          const codeTemp = `<template #code>${html}</template>`
          return `<DemoBlockContainer code="${encodeURIComponent(
            code
          )}">${descTemp}${codeTemp}\n`
        }
        return `<DemoBlockContainer>${descTemp}\n`
      }
      return '</DemoBlockContainer>\n'
    }
  })
}
