<script lang="ts">
export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    console.log('props', props)

    watch(
      () => props.visible,
      val => {
        console.log(2222222)

        emit('update:visible', val)
      }
    )

    return {
      // comp,
    }
  },
})
</script>
<template>
  <view> </view>
</template>
