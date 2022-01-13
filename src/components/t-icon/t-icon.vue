<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    color: [String],
    width: [Number],
    height: [Number],
  },
  setup(props) {
    /* #ifdef MP-WEIXIN */
    console.log('props', props)
    const query = computed(() => {
      let result = ''
      for (let prop in props) {
        // @ts-ignore
        const val = props[prop]
        if (prop !== 'src' && val) {
          if (result === '') {
            result += `${[prop]}=${encodeURIComponent(val)}`
          } else {
            result += `&${[prop]}=${encodeURIComponent(val)}`
          }
        }
      }

      return result ? '?' + result : ''
    })
    const url = computed(() => {
      const tar = props.src.replace('_', '/')

      return `https://api.iconify.design/${tar}.svg${query.value}`
    })

    return {
      url,
    }
    /* #endif */
  },
})
</script>
<template>
  /* #ifdef MP-WEIXIN */
  <image class="img" :src="url" />
  /* #endif */
</template>
<style scoped>
.img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
