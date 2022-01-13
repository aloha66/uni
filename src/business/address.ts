//@ts-nocheck
import type { GolobalAddr, ContactAddr } from '@type'
const combineAddr = addr => {
  const {
    provinceName,
    provinceID,
    cityID,
    cityName,
    countyID,
    countyName,
    townID,
    townName,
  } = addr
  return {
    label: `${provinceName}${cityName}${countyName}${townName ?? ''}`,
    value: {
      provinceID,
      cityID,
      countyID,
      townID,
    },
  }
}

export function transformAddressList(obj): ContactAddr[] {
  if (obj.result === 'success') {
    const ss = obj.data.list.map(item => {
      return {
        ...item,
        addrId: item.contactID,
        name: item.receiver,
        addr: combineAddr(item).label,
        addrDetail: item.street,
      }
    })

    // return [...ss, ...ss, ...ss, ...ss, ...ss, ...ss]
    return ss
  } else {
    return []
  }
}

export function transformLocationAddr(obj) {
  if (obj.result === 'success') {
    return obj.data
  } else {
    return []
  }
}

export function transformGlobalAddr(addr, incomplete) {
  if (incomplete) {
    return { ...combineAddr(addr), incomplete }
  }

  return {
    origin: { ...addr },
    ...combineAddr(addr),
    incomplete,
  }
}

export function transformDeleteAddr(contactID) {
  return { contactID }
}

export function getH5LocationBus(reslove, reject) {
  return {
    url: 'https://restapi.amap.com/v3/ip?key=b78019ebfcf43136fe13bbec6d556d16',
    success(res) {
      // @ts-expect-error
      if (res.data.status === '1') {
        const [, lng1, lat1, lng2, lat2] =
          // @ts-expect-error
          res.data.rectangle.match(/(.*),(.*);(.*),(.*)/)
        const lng = +lng1 + (lng2 - lng1) / 2
        const lat = +lat1 + (lat2 - lat1) / 2
        reslove({ lng, lat })
      }
      reject(res)
    },
    fail(err) {
      reject(err)
    },
  }
}
