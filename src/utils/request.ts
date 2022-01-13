import { resOldToNew } from './requestAdapter'

// function request(payload: any) {
//   const param = {
//     header: {
//       Authorization: 'st3157f2924d00ae13d2687c8404a0',
//     },
//     ...payload,

//     /* #ifdef MP-WEIXIN */
//     url: 'https://s.ismart720.com' + payload.url,
//     /* #endif */
//   }
//   return uni.request(param)
// }

function request(payload: any) {
  return new Promise((reslove, reject) => {
    const param = {
      header: {
        Authorization: 'st315802C94710b9ba1c6c052f4960',
      },
      ...payload,

      /* #ifdef MP-WEIXIN */
      url: 'https://s.ismart720.com' + payload.url,
      /* #endif */
      success(res) {
        reslove(resOldToNew(res.data))
      },
      fail(err) {
        reject(err)
      },
    }

    uni.request(param)
  })
}

export default request
