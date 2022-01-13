type Toast =
  | {
      title: string
    }
  | string
export function showToast(obj: Toast) {
  if (typeof obj === 'string') {
    uni.showToast({ title: obj })
  } else {
    uni.showToast(obj)
  }
}
