import { MessageType, appId, appName } from '../constant'
import { setStorageValue } from '../utils/storage'

import { createApp, ref } from 'vue'
import Inspect from './inspect.vue'
import { runtimeSendMessage } from '../utils/runtime'
import { isFeishuDoc, onCopyAll } from './feishu'

console.info('content load')

const openOptions = () => {
  runtimeSendMessage({ type: MessageType.OpenOptions })
}

const lute = Lute.New()

const props = {
  isInspect: ref(false),
  onSelect(dom: HTMLElement) {
    props.isInspect.value = false

    onDom2Md(dom)
  },
}

// const funDownload = function (content: string, filename: string) {
//   // 创建隐藏的可下载链接
//   const eleLink = document.createElement('a')
//   eleLink.download = filename
//   eleLink.style.display = 'none'
//   // 字符内容转变成blob地址
//   const blob = new Blob([content])
//   eleLink.href = URL.createObjectURL(blob)
//   // 触发点击
//   document.body.appendChild(eleLink)
//   eleLink.click()
//   // 然后移除
//   document.body.removeChild(eleLink)
// }

const onDom2Md = async (dom: HTMLElement) => {
  const html = dom.innerHTML
  await onHTML2Md(html)
}

const onHTML2Md = async (html: string) => {
  const result = lute.HTML2Md(html)

  await setStorageValue('md', result).then(() => {
    openOptions()
  })
}

const htmlMimeType = 'text/html'

async function getHtmlText() {
  try {
    const clipboardItems = await navigator.clipboard.read()
    for (const clipboardItem of clipboardItems) {
      if (clipboardItem.types.includes(htmlMimeType)) {
        const text = await clipboardItem
          .getType(htmlMimeType)
          .then(async blob => await blob.text())

        return text
      }
    }
    return await navigator.clipboard.readText()
  } catch (err) {
    console.error(err)
    throw err
  }
}

const onExportPage = async () => {
  const isFeishu = isFeishuDoc()
  if (isFeishu) {
    onCopyAll()
  }
  // const text = await getHtmlText()
  // await onHTML2Md(text)
}

const onExportSelect = async () => {
  props.isInspect.value = true
}

// funDownload(result, `${document.title}.md`)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case MessageType.ExportPage:
      onExportPage()
      break
    case MessageType.ExportSelect:
      onExportSelect()
      break
    default:
      break
  }
  sendResponse()
})

const onInitApp = () => {
  const id = `#${appId}`
  let container = document.querySelector(id)
  if (container) {
    container.remove()
  }
  container = document.createElement(appName)
  container.id = appId
  document.body.appendChild(container)

  createApp(Inspect, props).mount(id)
}

onInitApp()
