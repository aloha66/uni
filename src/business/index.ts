export * from './address'

interface HasSuccess {
  result: 'success' | 'fail'
}
export function hasSuccess(res: HasSuccess | unknown) {
  // @ts-expect-error
  return res.result === 'success'
}
