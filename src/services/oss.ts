import {alovaInstance, ossAlovaInstance} from '@/core/http'

/** 阿里云 OSS 临时上传凭证 */
export interface OssPostCredential {
  /** 客户端使用时参数改为 `OSSAccessKeyId` */
  OSSAccessKeyId: string
  url: string
  key: string
  policy: string
  signature: string
}

/** 获取直传凭证 */
export const getOssPostCredential = (ext: string) => alovaInstance.Get<OssPostCredential>('/oss/credential', {params: {ext}})

/** 将 SVG 文本类型图片直传到 OSS  */
export const uploadSvgToOss = async (svg: string) => {
  const credential = await getOssPostCredential('svg')

  const formData = new FormData()
  formData.append('x-oss-content-type', 'image/svg+xml')
  formData.append('OSSAccessKeyId', credential.OSSAccessKeyId)
  formData.append('key', credential.key)
  formData.append('policy', credential.policy)
  formData.append('signature', credential.signature)
  formData.append('file', svg)

  return ossAlovaInstance.Post(credential.url, formData)
}
