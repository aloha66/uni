<script lang="ts">
import DemoPopup from '../t-popup/t-popup.vue'
export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    watch(
      () => props.visible,
      val => {
        console.log(2222222)
        visible.value = val
        emit('update:visible', val)
      }
    )

    return {
      visible,
      open,
    }
  },
  components: {
    DemoPopup,
  },
})
</script>

<template>
  <view>
    <DemoPopup
      title="配送至"
      style="min-height: 300px"
      v-model:visible="visible"
    >
      底部弹出 Popup</DemoPopup
    >
  </view>
</template>

<style>
.po {
  min-height: 300px;
}
</style>
