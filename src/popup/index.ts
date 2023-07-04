import { createApp } from 'vue'
import App from './App.vue'
import { getCurrentTabId } from '../utils/tabMessage'

createApp(App).mount('#app')

const injectContentJs = () => {
  const [scriptPath] =
    chrome.runtime.getManifest().content_scripts?.[0].js ?? []

  getCurrentTabId().then(tabId => {
    if (tabId) {
      // eslint-disable-next-line no-undef
      chrome.scripting.executeScript({
        target: {
          tabId,
        },
        files: [scriptPath],
      })
    }
  })
}

injectContentJs()
