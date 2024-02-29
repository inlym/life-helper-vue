import {createAlova} from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import vueHook from 'alova/vue'
import {requestInterceptor} from './alove/request-interceptor'

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  statesHook: vueHook,
  requestAdapter: GlobalFetch(),
  timeout: 10000,
  beforeRequest: requestInterceptor,
  localCache: null,
  responded: {
    onSuccess: (response) => {
      return response.json()
    }
  }
})
