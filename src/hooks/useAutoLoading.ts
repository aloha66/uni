export function useAutoLoading(arr: { loading: boolean }[]) {
  watch(arr, (...val) => {
    console.log(val)
  })
}
