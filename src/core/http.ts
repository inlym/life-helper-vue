import {createAlova} from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'
import axios from 'axios'
import {requestInterceptor} from './alove/request-interceptor'

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  }
})

export const http = instance

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  statesHook: vueHook,
  requestAdapter: GlobalFetch(),
  timeout: 10000,
  beforeRequest: requestInterceptor,
  responded: {
    onSuccess: (response) => {
      return response.json()
    }
  }
})
