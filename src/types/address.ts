export interface ContactAddr {
  addrId: string
  name: string
  phone: string | number
  addr: string
  addrDetail: string
  showAll?: boolean
  isDefault: boolean
}

export interface GolobalAddr {
  label: string
  value: {
    provinceID: number
    cityID: number
    countyID: number
    townID: number
  }
  incomplete: boolean
  origin?: object
}
