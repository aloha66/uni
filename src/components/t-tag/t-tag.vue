<script lang="ts">
export default defineComponent({
  setup() {},
})
</script>
<template>
  <text class="text">
    <slot />
  </text>
</template>
<style scoped>
.text {
  display: inline-block;
}
</style>
