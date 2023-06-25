// https://github.com/feross/clipboard-copy/blob/master/index.js
// https://developer.mozilla.org/docs/Web/API/Clipboard

export async function clipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch((err) => {
      throw err !== undefined
        ? err
        : new DOMException('The request is not allowed', 'NotAllowedError')
    })
  }

  // 不支持clipboard api时
  const span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'
  document.body.appendChild(span)

  const selection = window.getSelection()
  const range = window.document.createRange()
  selection?.removeAllRanges()
  range.selectNode(span)
  selection?.addRange(range)

  let success = false
  try {
    success = window.document.execCommand('copy')
  } catch (err) {
    console.log('error', err)
  }
  selection?.removeAllRanges()
  window.document.body.removeChild(span)

  return success
    ? Promise.resolve()
    : Promise.reject(
        new DOMException('The request is not allowed', 'NotAllowedError')
      )
}

export function debounce(fn: () => void, delay = 300) {
  let timer: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
