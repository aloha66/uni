<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error?: string
  refresh?: () => void
}>()
</script>
<template>
  <view class="wrap">
    <slot />
    <slot v-if="loading" name="loading">
      <view class="loading"> <text>加载中</text> </view>
    </slot>
    <slot v-if="error" name="error">
      <view @click="refresh" class="loading">
        <text>错误请重试</text>
      </view>
    </slot>
  </view>
</template>
<style scoped>
.wrap {
  position: relative;
}

.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.98);
}
</style>
