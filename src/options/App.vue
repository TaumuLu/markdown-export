<template>
  <main>
    <el-config-provider :message="config">
      <Editor
        :value="content"
        :plugins="plugins"
        :locale="locales[localeKey]"
        @change="handleChange"
      />
    </el-config-provider>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Editor } from '@bytemd/vue-next'
import highlight from '@bytemd/plugin-highlight'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import { Dict } from '../types'

import 'bytemd/dist/index.css'
import 'highlight.js/styles/default.css'
import 'katex/dist/katex.css'
import { getStorageValue } from '../utils/storage'

const stripPrefixes = async (obj: Record<string, any>) => {
  const result: Dict = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key.split('/').slice(-1)[0].replace('.json', '')] = await value()
  }
  return result
}

const locales = ref<Dict>({})
const gfmLocales = ref<Dict>({})
const mathLocales = ref<Dict>({})

const config = reactive({
  max: 3,
})

const content = ref('')

const localeKey = ref('zh_Hans')

const plugins = computed(() => {
  const key = localeKey.value

  return [
    gfm({
      locale: gfmLocales.value[key],
    }),
    highlight(),
    frontmatter(),
    math({
      locale: mathLocales.value[key],
      katexOptions: { output: 'html' },
    }),
    mediumZoom(),
    gemoji(),
    breaks(),
  ]
})

const handleChange = (v: string) => {
  content.value = v
}

const initLocales = async () => {
  locales.value = await stripPrefixes(
    import.meta.glob('/node_modules/bytemd/locales/*.json'),
  )
  gfmLocales.value = await stripPrefixes(
    import.meta.glob('/node_modules/@bytemd/plugin-gfm/locales/*.json'),
  )
  mathLocales.value = await stripPrefixes(
    import.meta.glob('/node_modules/@bytemd/plugin-math/locales/*.json'),
  )
}

initLocales()

getStorageValue('md').then(res => {
  content.value = res
})

chrome.storage.onChanged.addListener(res => {
  console.log(111111, res)
})
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
  display: flex;
  flex-direction: column;
}

.el-message {
  transform: none;
  left: 0;
  right: 0;
  margin: 0 auto;
}

body {
  margin: 0 10px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}

.bytemd {
  height: 100vh;
}
</style>
