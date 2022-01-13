<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import { onShow, onReady, onLoad, onLaunch } from '@dcloudio/uni-app'
import { useAddrStore, useThemeStore } from '@hook'
export default defineComponent({
  data() {
    const themeStore = useThemeStore()
    return {
      ...storeToRefs(themeStore),
      color: '#ee2f30',
    }
  },
  setup() {
  },
  onLaunch: function () {
    const { fetchGlobalAddr, cleanGlobalAddr } = useAddrStore()

    // TODO 改成登录后的逻辑   每次打开首先清除一次地址
    // 再获取一次地址 确保获取最新的默认地址或者附近地址
    // cleanGlobalAddr()
    fetchGlobalAddr()
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
})
</script>

<style>
view,
button,
text {
  --bg: rgb(248, 248, 248);
  --primary-color: v-bind('theme.primaryColor');
  --border-color: #c8c7cc;
  --text-color-grey: #999;
}
</style>
