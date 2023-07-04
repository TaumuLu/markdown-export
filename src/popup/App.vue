<template>
  <el-config-provider :message="config">
    <div class="popup-box">
      <div class="popup-header">
        <img alt="Vue logo" src="/icons/icon128.png" />
        <h2>Markdown 导出</h2>
      </div>
      <div class="popup-body"></div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const config = reactive({
  max: 3,
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
  min-width: 320px;
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
</style>
