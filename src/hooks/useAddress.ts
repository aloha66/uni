import { acceptHMRUpdate, defineStore } from 'pinia'
import {
  getUserAddressList,
  getAddressFromLatLng,
  deleteAddress,
  setUserDefaultAddress,
} from '@api'
import useRequest from 'useRequest'
import {
  transformAddressList,
  transformLocationAddr,
  getH5LocationBus,
  transformGlobalAddr,
  hasSuccess,
  transformDeleteAddr,
} from '@bus'
import { useStorage } from '@hook'
import type { GolobalAddr } from '@type'
import { showToast } from '@util'

export function useAddress() {
  const setUserDefaultAddrReq = useRequest(setUserDefaultAddress)
  const setUserDefaultAddr = (id: any, cb: Function) => {
    setUserDefaultAddrReq.runAsync({ id }).then((res: unknown) => {
      if (hasSuccess(res)) {
        cb()
      }
    })
  }

  const gotoCreateAddress = () => {
    uni.navigateTo({ url: '/pages/address/edit' })
  }
  const gotoEditAddress = ({ id }: { id: string }) => {
    uni.navigateTo({ url: '/pages/address/edit?id=' + id })
  }

  const getH5Location = () => {
    return new Promise((reslove, reject) => {
      uni.request(getH5LocationBus(reslove, reject))
    })
  }
  const getWXLocation = async () => {
    /* #ifdef MP-WEIXIN */
    return new Promise((reslove, reject) => {
      // hack uni对ts支持不完善
      uni.getLocation({
        type: 'wgs84',
        success(res) {
          reslove({ lat: res.latitude, lng: res.longitude })
        },
        async fail(err) {
          // 用户拒绝授权改用h5获取地址
          if (err.errMsg === 'getLocation:fail auth deny') {
            const locat = await getH5Location()
            return reslove(locat)
          }
          reject(err)
        },
      })
    })
    /* #endif */
  }
  const getLocation = async () => {
    let h5
    /* #ifdef H5 */
    h5 = getH5Location()
    /* #endif */
    const wx = getWXLocation()
    return (await h5) || (await wx)
  }
  const locationAddrReq = useRequest(locat => getAddressFromLatLng(locat), {
    formatResult(e) {
      return transformLocationAddr(e)
    },
  })
  const getAddrByLocation = async () => {
    const locat = await getLocation()
    return await locationAddrReq.runAsync(locat)
  }

  const deleteAddrReq = useRequest(deleteAddress)
  /**
   * 删除这里有两个问题
   * 1. cb的类型感觉直接写ts的类型在vue里面不太方便  TODO后期script setup改进ts
   * 2. 删除或者编辑其实也会有属于自己的差异化业务
   * 例如：
   * 在列表页删除后，应该刷新列表页再做其他操作
   * 在地址详情删除后应该返回到列表页再做其他操作
   * cb可以解耦，让业务环境自己处理自己的问题
   *
   * 另外这里也有一个vue的问题
   * 如果这里以刷新列表页为例开展业务
   * 逻辑上可以直接调用addressListReq.refresh
   * 表现结果是有数据请求但没有重新渲染（computed里面的函数也没有重新执行）
   * 因为在页面上并没有依赖收集到useAddress里面的addressListReq
   * 虽然是同一个addressListReq引用
   * 正确做法是需要用页面上已经依赖收集过的addressListReq来发起refresh
   * 按照这个页面理解上就有点怪了
   *
   * 综上得出了这个回调函数方案
   *
   * @param id 地址id
   * @param cb 回调函数
   */
  const openDelAddr = (id: any, cb: Function) => {
    uni.showModal({
      content: '是否删除该地址',
      success: function (res) {
        console.log('id', id)
        if (res.confirm) {
          console.log('用户点击确定')
          deleteAddrReq.runAsync(transformDeleteAddr(id)).then(res => {
            if (hasSuccess(res)) {
              showToast('删除成功')
              cb()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  }

  return {
    gotoCreateAddress,
    gotoEditAddress,
    getAddrByLocation,
    openDelAddr,
    setUserDefaultAddr,
  }
}

export const useAddrStore = defineStore('address', () => {
  const { getAddrByLocation } = useAddress()

  const addressListReq = useRequest(getUserAddressList, {
    formatResult(e) {
      return transformAddressList(e)
    },
  })

  const globalAddr = useStorage<GolobalAddr | null>('globalAddr', null)
  const setGlobalAddr = (addr: any, incomplete = false) => {
    globalAddr.value = transformGlobalAddr(addr, incomplete)
  }

  const fetchGlobalAddr = async () => {
    // 最终在页面显示的地址（持久化）
    // 优先获取已缓存的地址(可能是默认地址,或者是用户手动选择的地址)
    // 其次是后端存储的默认地址或者第一个地址
    // 最后是附近地址兜底
    if (globalAddr.value) return

    const addressList = await addressListReq.runAsync()
    if (Array.isArray(addressList) && addressList.length > 0) {
      setGlobalAddr(addressList[0])
      return
    }

    setGlobalAddr(await getAddrByLocation(), true)
  }

  const cleanGlobalAddr = () => {
    globalAddr.value = null
  }

  return {
    fetchGlobalAddr,
    cleanGlobalAddr,
    globalAddr,
    addressListReq,
    ...addressListReq,
  }
})

// @ts-expect-error
if (import.meta.hot)
  // @ts-expect-error
  import.meta.hot.accept(acceptHMRUpdate(useAddrStore, import.meta.hot))
