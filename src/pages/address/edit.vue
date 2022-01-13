<script lang="ts">
import DeliveryTo from '@com/delivery-to/index.vue'
export default {
  setup() {
    const visible = ref(false)

    watch(visible, () => {
      console.log('edit change')
    })

    const open = () => {
      console.log(23)
      visible.value = true
    }

    return {
      visible,
      open,
    }
  },
  components: {
    DeliveryTo,
  },
}
</script>
<template>
  <view class="form">
    <view class="form-item">
      <view class="label">收货人</view>
      <view><input /></view>
    </view>
    <view class="form-item">
      <view class="label">手机号码</view>
      <view><input type="number" /></view>
    </view>
    <view class="form-item">
      <view class="label">所在地区</view>
      <view @click="open">eee</view>
    </view>
    <view class="form-item">
      <view class="label">详细地址</view>
      <view><input type="number" /></view>
    </view>

    <DeliveryTo v-model:visible="visible" />
  </view>
</template>
<style scoped>
.form {
  padding: 0 10px;
}

.form-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.label {
  width: 80px;
  flex: 0 0 80px;
}
</style>
