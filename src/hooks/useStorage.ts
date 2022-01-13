import { Ref } from 'vue'
import type { MaybeRef, RemovableRef } from '@vueuse/shared'

export interface StorageOptions<T> {
  /**
   * Use shallow ref as reference
   *
   * @default false
   */
  shallow?: boolean
}

export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  initialValue: MaybeRef<T>,
  options: StorageOptions<T> = {}
): RemovableRef<T> {
  const { shallow } = options

  const data = (shallow ? shallowRef : ref)(initialValue) as Ref<T>

  //   onMounted(() => {
  const prev = uni.getStorageSync(key)
  if (prev) data.value = prev
  //   })

  watchEffect(() => {
    if (data.value === null) {
      uni.removeStorageSync(key)
    } else {
      uni.setStorageSync(key, data.value)
    }
  })

  return data as RemovableRef<T>
}
