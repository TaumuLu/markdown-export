<template>
  <el-config-provider :message="config">
    <div class="popup-box">
      <div class="popup-header">
        <img alt="Vue logo" src="/icons/icon128.png" />
        <h2>{{ getMessage('extName') }}</h2>
      </div>
      <div class="popup-body">
        <el-button
          type="primary"
          :onclick="onExportSelect"
          :disabled="isDisabled"
          >选择内容导出</el-button
        >
        <el-button type="primary" :onclick="onExportPage" :disabled="isDisabled"
          >导出整页</el-button
        >
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getCurrentTab, tabSendMessage } from '../utils/tabMessage'
import { getMessage } from '../utils'
import { MessageType } from '../constant'

const isDisabled = ref(true)
const isLoadContent = ref(false)

const config = reactive({
  max: 3,
})

const onExportPage = () => {
  tabSendMessage({ type: MessageType.ExportPage })
  window.close()
}

const onExportSelect = () => {
  tabSendMessage({ type: MessageType.ExportSelect })
  window.close()
}

const injectContentJs = () => {
  const [scriptPath] =
    // eslint-disable-next-line no-undef
    chrome.runtime.getManifest().content_scripts?.[0].js ?? []

  getCurrentTab().then(tab => {
    const tabId = tab.id
    if (tabId) {
      // eslint-disable-next-line no-undef
      chrome.scripting
        .executeScript({
          target: {
            tabId,
          },
          files: ['lute.min.js', scriptPath],
        })
        .then(() => {
          isLoadContent.value = true
        })
        .catch(() => {
          isLoadContent.value = false
        })
    }
  })
}

injectContentJs()

watch(
  () => isLoadContent.value,
  newValue => {
    isDisabled.value = !newValue
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 220px;
  display: flex;
  flex-direction: column;
}

.el-message {
  transform: none;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.popup-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;

  img {
    width: 28px;
    margin-right: 4px;
  }

  h2 {
    font-size: 18px;
    font-weight: normal;
  }
}

.popup-body {
  padding: 0 16px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  .el-button {
    margin: 0;
    margin-bottom: 12px;
  }
}
</style>
