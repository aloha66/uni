<script lang="ts">
import UniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
export default defineComponent({
  props: {
    title: String,
    visible: Boolean,
    style: {},
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const popup = ref(null)
    const open = () => {
      console.log(4444444444)
      popup.value.open()
      emit('update:visible', true)
    }

    const close = () => {
      popup.value.close()
      emit('update:visible', false)
    }

    watchEffect(() => {
      console.log('watchEffect props.visible', props.visible)
    })
    watch(
      () => props.visible,
      value => {
        console.log(333333333333333)
        if (value) {
          open()
        } else {
          close()
        }
      }
    )

    return {
      popup,
      close,
    }
  },
  components: {
    UniPopup,
  },
})
</script>

<template>
  <uni-popup class="round" background-color="#fff" ref="popup" type="bottom">
    <view class="popup" :style="style">
      <view class="title">{{ title }}</view>
      <view>
        <!-- <carbon-close class="close" @click="close" /> -->
        <view class="default-icon" @click="close">
          <t-icon src="carbon_close" />
        </view>
      </view>
      <slot />
    </view>
  </uni-popup>
</template>

<style>
.popup {
  position: relative;
}

.title {
  text-align: center;
  font-size: 16px;
  padding: 10px 0;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  padding: 10px;
}
</style>
