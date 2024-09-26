import {requestForData} from '@/core/http'

export function debug(id: number, name: string) {
  return requestForData({method: 'post', url: '/debug', params: {id}, data: {name, age: 19}})
}

export function debugData(data: any) {
  return requestForData({method: 'post', url: '/debug/data', params: {id: 11111111}, data})
}
