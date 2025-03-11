const removeAllSelection = () => {
  window.getSelection()?.removeAllRanges()
}

export const onCopyAll = () => {
  removeAllSelection()

  // 模拟执行 ctrl + a 操作
  // @ts-expect-error
  window.getEventListeners(document).keydown.forEach(item => {
    const event = new KeyboardEvent('keydown', {
      metaKey: true,
      code: 'KeyA',
      key: 'a',
      keyCode: 65,
    })
    const proxy = new Proxy(event, {
      get: function (target, property, receiver) {
        switch (property) {
          case 'target':
          case 'srcElement':
            return document.body
        }

        // @ts-expect-error
        const value = target[property]
        if (typeof value === 'function') {
          return value.bind(target)
        }
        return value
      },
    })
    item.listener(proxy)
  })

  const isCopy = document.execCommand('copy')

  removeAllSelection()

  return isCopy
}

export const isFeishuDoc = () => {
  const { hostname } = window.location
  const textarea = document.querySelector('.docx-selection-hidden-textarea')
  const docx = document.getElementById('docx')
  const block = document.querySelector('.page-block')
  const head = document.querySelector('.page-block .page-block-header')
  const children = document.querySelector('.page-block .page-block-children')
  const domFlag = textarea ?? docx ?? block ?? head ?? children
  if (hostname.includes('feishu') && domFlag) {
    return true
  }
  return false
}
