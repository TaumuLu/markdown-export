<template>
  <div v-show="props.isInspect" class="inspect" :style="style"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, toValue, reactive, watch } from 'vue'
import { parseStyle } from './help'

const initStyle = { top: 0, left: 0, width: 0, height: 0 }

const style = reactive({ ...initStyle })

const props = defineProps({
  isInspect: Boolean,
})

const emit = defineEmits<{
  select: [dom: HTMLElement]
}>()

const selectDom = ref<HTMLElement>()

const conditions = (dom: HTMLElement) => toValue(props.isInspect) && dom

const onMove = (event: MouseEvent) => {
  const dom = event.target as HTMLElement
  if (conditions(dom)) {
    selectDom.value = dom
  }
}

const onClick = (event: MouseEvent) => {
  const dom = event.target as HTMLElement
  if (conditions(dom)) {
    event.stopPropagation()
    event.preventDefault()

    selectDom.value = undefined
    emit('select', dom)
  }
}

const onScroll = () => {
  if (selectDom.value) {
    selectDom.value = undefined
  }
}

watch(
  () => selectDom.value,
  newValue => {
    if (newValue) {
      const { top, left, width, height } = newValue.getBoundingClientRect()
      Object.assign(
        style,
        parseStyle({
          top,
          left,
          width,
          height,
        }),
      )
    } else {
      Object.assign(style, initStyle)
    }
  },
)

onMounted(() => {
  document.addEventListener('mousemove', onMove)
  document.addEventListener('scroll', onScroll)
  document.addEventListener('click', onClick, true)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClick, true)
})
</script>

<style lang="scss" scoped>
.inspect {
  pointer-events: none;
  cursor: pointer;
  position: fixed;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
