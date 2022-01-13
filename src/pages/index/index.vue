<template>
  <view class="default-page">
    {{ globalAddr }}
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <t-button square type="primary" @click="changeColor('skyblue')"
      >蓝色</t-button
    >
    <t-button square type="primary" @click="changeColor('orange')"
      >橙色</t-button
    >
    <t-button block square type="primary" @click="gotoSelectAddress"
      >选择地址</t-button
    >
    <t-button block type="primary" @click="gotoCreateAddress"
      >地址列表</t-button
    >
  </view>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useAddrStore, useThemeStore } from '@hook'
export default {
  data() {
    return {
      color: '#ee2f30',
    }
  },
  setup() {
    const addrStore = useAddrStore()
    const { globalAddr } = storeToRefs(addrStore)
    const title = ref('Hello')
    // const color = ref('#ee2f30')

    const { themeChange } = useThemeStore()
    const changeColor = (color: string) => {
      themeChange({ primaryColor: color })
    }

    return {
      title,
      globalAddr,
      changeColor,

      // color,
    }
  },
  onLoad() {},
  methods: {
    gotoSelectAddress() {
      uni.navigateTo({ url: '/pages/address/index?addrId=2280&name=uniapp' })
    },
    gotoCreateAddress() {
      uni.navigateTo({ url: '/pages/address/index' })
    },
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.wrap {
  min-height: 90vh;
  background: var(--bg);
}
</style>
