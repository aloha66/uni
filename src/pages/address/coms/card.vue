<script lang="ts">
import { defineComponent, toRefs } from 'vue'
// @ts-ignore
// import uniTag from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
import { useThemeStore, useAddress } from '@hook'

export default defineComponent({
  props: {
    addrId: [String, Number],
    isDefault: { type: Boolean },
    isSelected: [Boolean],
    curAddrId: [Boolean, String, Number], // 在确认订单等页面用到，隐藏部分设置
    name: [String],
    phone: [String, Number],
    addr: [String],
    addrDetail: [String],
    delSuccessCB: { type: Function, required: true },
  },
  emits: ['editClick'],
  setup(props, { emit }) {
    const themeStore = useThemeStore()
    const { theme } = storeToRefs(themeStore)
    const { openDelAddr, setUserDefaultAddr } = useAddress()
    const hiddenOpClass = computed(() => {
      return {
        'hidden-op': !props.curAddrId,
      }
    })

    const editClick = () => {
      emit('editClick', props)
    }

    return {
      ...toRefs(props),
      hiddenOpClass,
      editClick,
      theme,
      openDelAddr,
      setUserDefaultAddr,
    }
  },
  components: {
    // uniTag,
  },
})
</script>

<template>
  <view class="card" :class="hiddenOpClass">
    <view class="wrap">
      <view class="check" v-if="addrId === curAddrId">
        <!-- <akar-icons-circle-check-fill class="set-default-addr" /> -->
        <view class="default-icon">
          <t-icon
            src="akar-icons_circle-check-fill"
            :color="theme.primaryColor"
          />
        </view>
      </view>
      <view class="content">
        <!-- <uni-tag
          v-if="isDefault"
          type="warning"
          size="small"
          text="默认"
          style="margin-right: 5px"
        ></uni-tag> -->
        <text class="addr">{{ addr }}</text>
        <view class="addr-detail">{{ addrDetail }}</view>
        <text class="name">{{ name }}</text>
        <text class="phone">{{ phone }}</text>
      </view>
      <view class="edit" @click="editClick">
        <view class="edit-container">
          <!-- <bx-bx-edit-alt /> -->
          <t-icon src="bx_bx-edit-alt" />
        </view>
      </view>
    </view>
    <view v-if="!curAddrId" class="option">
      <view
        class="default-wrap"
        @click="setUserDefaultAddr(addrId, delSuccessCB)"
      >
        <template v-if="isDefault">
          <!-- <akar-icons-circle-check-fill class="set-default-addr" /> -->
          <view class="default-icon">
            <t-icon
              src="akar-icons_circle-check-fill"
              :color="theme.primaryColor"
            />
          </view>
        </template>
        <view v-else class="default-check"></view>
        <text class="ml5">设置默认地址</text>
      </view>
      <view @click="openDelAddr(addrId, delSuccessCB)">删除</view>
    </view>
  </view>
</template>
<style scoped>
.card {
  overflow: hidden;
  padding: 0 10px;
  background: #fff;
  /* border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px; */
}

.hidden-op {
  border-radius: 12px;
  margin-bottom: 10px;
}

.wrap {
  display: flex;
  padding: 10px 0;
}

.check {
  align-self: center;
  margin-right: 6px;
}
.content {
  flex: 1;
  color: var(--text-color-grey);
}

.name {
  display: inline-block;
  width: 100px;
}

.addr-detail {
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0 0;
  color: #000;
}

.edit {
  margin: auto;
}

.edit-container {
  width: 20px;
  height: 20px;
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.default-wrap {
  display: inline-flex;
  align-items: center;
}

.default-check {
  display: inline-block;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 1px solid var(--text-color-grey);
}

/* #ifdef MP-WEIXIN */
.default-icon {
  display: inline-block;
  height: 20px;
  width: 20px;
}

.default-check {
  width: 18px;
  height: 18px;
}

/* #endif */

.set-default-addr {
  color: var(--primary-color);
  color: v-bind('theme.primaryColor');
}
</style>
