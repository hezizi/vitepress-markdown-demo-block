import { startCase } from 'lodash-es'

const modules = import.meta.glob('./**/*.vue')

export default {
  install: (app) => {
    // eslint-disable-next-line guard-for-in
    for (const path in modules) {
      const index = path.indexOf('.vue')
      const newPath = path.substring(0, index)
      const name = startCase(newPath).split(' ').join('')
      modules[path]().then((mod) => {
        app.component(name, mod.default)
      })
    }
  }
}
