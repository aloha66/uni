import { useStorage } from '@hook'

const initval = {
  primaryColor: '#ee2f30',
  bg: 'rgb(248, 248, 248)',
}
export const useThemeStore = defineStore('theme', () => {
  const theme = useStorage('theme', initval)

  const mergeTheme = (newTheme: any) => {
    theme.value = { ...theme.value, ...newTheme }
  }

  const themeChange = (newTheme: any) => {
    mergeTheme(newTheme)
  }

  return {
    themeChange,
    // ...toRefs(reactive(theme.value)), // vueuse的useStorage是ref，如果要使用toRefs解构需要reactive包裹
    theme,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot))
