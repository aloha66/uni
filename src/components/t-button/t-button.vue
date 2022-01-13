<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import { useThemeStore } from '@hook'

export default defineComponent({
  props: {
    loading: { type: Boolean },
    type: {
      type: String,
      // validator: function (value: string) {
      //   // 这个值必须匹配下列字符串中的一个
      //   return ['primary', 'warning', 'danger'].includes(value)
      // },
    },
    block: {
      type: Boolean,
    },
    square: {
      type: Boolean,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const themeStore = useThemeStore()
    // const { primaryColor } = storeToRefs(themeStore)
    const { theme } = storeToRefs(themeStore)

    const click = () => {
      if (props.loading) return
      emit('click')
    }

    const finalClass = computed(() => {
      return {
        primary: props.type === 'primary',
        block: props.block,
        square: props.square,
      }
    })

    return {
      click,
      finalClass,
      ...toRefs(props),
      // primaryColor,
      theme,
    }
  },
})
</script>

<template>
  <button
    size="mini"
    :class="finalClass"
    class="btn"
    :loading="loading"
    @click="click"
  >
    <slot />
  </button>
</template>
<style scoped>
.btn {
  color: #fff;
  border-radius: 20px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 14px;
}

.primary {
  /* background: var(--primary-color); */
  /* background: v-bind(primaryColor); */
  background: v-bind('theme.primaryColor');
}

.block {
  display: block;
}

.square {
  border-radius: unset;
}
</style>
