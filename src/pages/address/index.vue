<script lang="ts">
// import { ref, defineComponent, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { onShow, onReady, onLoad } from '@dcloudio/uni-app'
import { useAddress, useAddrStore, useStorage } from '@hook'
import AddrCard from './coms/card.vue'

interface Query {
  addrId?: string
}

export default defineComponent({
  setup() {
    const color = ref('blue')
    const curAddrId = ref() // 地址传过来的id，有就进入选择地址模式
    const hiddenCls = computed(() => {
      return {
        'hidden-op': curAddrId.value,
      }
    })

    // @ts-ignore
    onLoad((q: Query) => {
      if (q.addrId) {
        curAddrId.value = +q.addrId
      }
    })

    const { gotoCreateAddress, gotoEditAddress } = useAddress()
    const addrStore = useAddrStore()
    const {
      globalAddr,
      data: addrList,
      loading: addrLoading,
      error: addrError,
    } = storeToRefs(addrStore)

    const test = () => {
      addrStore.runAsync()
    }

    test()

    // addrStore.fetchGlobalAddr()

    const addressList = computed(() => {
      if (curAddrId.value && addrList?.value) {
        const arr = [...addrList.value]
        const index = arr.findIndex(item => item.addrId === curAddrId.value)
        const [cur] = arr.splice(index, 1)
        return [cur, ...arr]
      }

      return addrList?.value
    })

    return {
      curAddrId,
      hiddenCls,
      addressList,
      // addressList: addressListReq.data,
      gotoCreateAddress,
      gotoEditAddress,
      globalAddr,
      test,
      addrLoading,
      addrError,
      addrStore,
    }
  },
  components: {
    AddrCard,
  },
})
</script>

<template>
  <t-wrapper :loading="addrLoading" :error="addrError">
    <view class="default-page address">
      <view class="ttt"> {{ globalAddr?.label }}</view>
      <view class="address-list">
        <view :class="hiddenCls">
          <template v-for="item in addressList" :key="item.addrId">
            <!-- <AddrCard v-bind="item" /> -->
            <AddrCard
              :name="item.name"
              :addr="item.addr"
              :addrDetail="item.addrDetail"
              :isDefault="item.isDefault"
              :addrId="item.addrId"
              :phone="item.phone"
              :curAddrId="curAddrId"
              :delSuccessCB="addrStore.refresh"
              @editClick="gotoEditAddress"
            />
          </template>
        </view>
      </view>

      <view class="create-btn_wrap">
        <t-button block type="primary" @click="gotoCreateAddress">
          添加收货地址</t-button
        >
      </view>
    </view>
  </t-wrapper>
</template>
<style scoped>
.address {
  display: flex;
  flex-direction: column;
}
.address-list {
  flex: 1;
  padding: 5px;
  margin-bottom: 60px;
}

.create-btn_wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 16px 20px;
  background: #fff;
}

.hidden-op {
  overflow: hidden;
  border-radius: 12px;
}
</style>
