// 获取用户地址列表
export function getUserAddressList() {
  return {
    url: `/api/account/account/api/v1/UserContactAddressShow`,
    method: 'POST',
  }
}

// 根据经纬度查询地址
export function getAddressFromLatLng(data: { lat: number; lng: number }) {
  return {
    url: `/api/account/account/api/v1/GetAddressFromLatLng`,
    method: 'POST',
    data,
  }
}

// 删除地址
export function deleteAddress(data: any) {
  return {
    url: `/api/account/account/api/v1/DeleteContactAddress`,
    method: 'POST',
    data,
  }
}

// 设置默认地址
export function setUserDefaultAddress(data: any) {
  return {
    url: `/api/account/account/api/v1/SetDefaultUserAddress`,
    method: 'POST',
    data,
  }
}

// // 省
// export function getProvince(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/GetProvince`,
//     method: 'post',
//     data,
//   })
// }

// // 市
// export function getCity(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/GetCity`,
//     method: 'post',
//     data,
//   })
// }

// //   区
// export function getCounty(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/GetCounty`,
//     method: 'post',
//     data,
//   })
// }

// // 街道
// export function getTown(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/GetTown`,
//     method: 'post',
//     data,
//   })
// }

// // 添加地址
// export function addUserContactAddress(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/AddUserContactAddress`,
//     method: 'post',
//     data,
//   })
// }

// // 编辑地址
// export function updateUserContactAddress(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/UpdateUserContactAddress`,
//     method: 'post',
//     data,
//   })
// }

// // 获取单个用户地址
// export function getContactAddress(data) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/GetContactAddress`,
//     method: 'post',
//     data,
//   })
// }

// export function checkContactAddressByContactID(contactID) {
//   return fetch({
//     url: `${ACCOUNTMS}/api/v1/CheckContactAddressByContactID?contactID=${contactID}`,
//     method: 'post',
//     // data,
//   })
// }
