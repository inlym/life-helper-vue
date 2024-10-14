import {requestForData} from '@/core/http'

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
export type ImageExtension = 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp'

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
