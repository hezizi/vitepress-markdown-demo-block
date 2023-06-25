import fs from 'fs-extra'
import fg from 'fast-glob'

fg.sync('src/block/**').forEach((file) => {
  if (/\.ts$/.test(file)) return
  fs.copy(file, file.replace(/^src\//, 'lib/'))
})
