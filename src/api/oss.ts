import {requestForData} from '@/core/http'
import axios from 'axios'

/** 阿里云 OSS 直传凭据 */
export interface OssPostCredential {
  /** 客户端使用时参数改为 `OSSAccessKeyId` */
  accessKeyId: string
  /** 上传地址，即绑定的域名，示例值：`https://res.weutil.com` */
  url: string
  /** 上传至 OSS 后的文件路径，示例值：`upload/20240608/r7OPIjuso1rR.png` */
  key: string
  /** 用户表单上传的策略，是经过 Base64 编码过的字符串 */
  policy: string
  /** 对 policy 签名后的字符串 */
  signature: string
}

/** 图片文件支持的后缀名 */
export type ImageExtension = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'svg'

/**
 * 获取阿里云 OSS 直传凭据

 * @param extension 图片文件的后缀名
 */
export function getOssPostCredential(extension: ImageExtension) {
  return requestForData<OssPostCredential>({
    method: 'post',
    url: '/oss/credential',
    data: {extension},
    requireAuth: false,
  })
}

/**
 * 根据图片类型解析后缀名
 *
 * @param type 图片 MIME 类型
 * @returns 对应的后缀名
 *
 * @date 2024/12/02
 * @since 3.0.0
 */
function parseImageType(type: string): ImageExtension {
  if (type === 'image/gif') {
    return 'gif'
  }

  if (type === 'image/jpeg') {
    return 'jpg'
  }

  if (type === 'image/png') {
    return 'png'
  }

  if (type === 'image/svg+xml') {
    return 'svg'
  }

  if (type === 'image/webp') {
    return 'webp'
  }

  throw new Error('不支持的图片类型')
}

/**
 * 上传图片文件
 *
 * @param file 图片文件
 *
 * @returns 上传文件在 OSS 的路径地址
 *
 * @date 2024/12/02
 * @since 3.0.0
 */
export async function uploadImageFile(file: File): Promise<string> {
  const extension = parseImageType(file.type)
  // 发送请求获取直传凭据
  const crt = await getOssPostCredential(extension)

  const fd = new FormData()
  fd.append('policy', crt.policy)
  fd.append('key', crt.key)
  fd.append('OSSAccessKeyId', crt.accessKeyId)
  fd.append('Signature', crt.signature)
  // file 必须放在最后
  fd.append('file', file)

  const res = await axios.post(crt.url, fd)

  return crt.key
}
