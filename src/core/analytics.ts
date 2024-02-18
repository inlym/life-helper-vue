import {createVueBaiduAnalytics} from '@web-analytics/vue'

// 官网地址：https://analytics.js.org/vue/

const {registerBaiduAnalytics} = createVueBaiduAnalytics()
const {VITE_BAIDU_ENABLED, VITE_BAIDU_WEBSITE_ID} = import.meta.env

const baiduEnable = VITE_BAIDU_ENABLED === 'true' ? true : false
const baiduWebsiteId = VITE_BAIDU_WEBSITE_ID

export {registerBaiduAnalytics, baiduEnable, baiduWebsiteId}
