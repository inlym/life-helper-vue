import SlsTracker from '@aliyun-sls/web-track-browser'
import dayjs from 'dayjs'

const options = {
  host: 'cn-hangzhou.log.aliyuncs.com',
  project: 'lifehelper',
  logstore: 'lifehelper_web',
  time: 10,
  count: 10,
  topic: 'lym_topic',
  source: 'lym_source'
}

const tracker = new SlsTracker(options)

function now() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export const logger = {
  debug(message: string | object) {
    const msgStr = typeof message === 'string' ? message : JSON.stringify(message)
    tracker.send({
      level: 'DEBUG',
      message: msgStr,
      time: now()
    })
  },

  info(message: string | object) {
    const msgStr = typeof message === 'string' ? message : JSON.stringify(message)
    tracker.send({
      level: 'INFO',
      message: msgStr,
      time: now()
    })
  }
}
