/**
 * 查询参数序列化器
 */
export function paramsSerializer(params: Record<string, any>): string {
  if (!params) {
    return ''
  }

  return Object.keys(params)
    .sort()
    .map((key) => {
      const value = params[key]

      if (['string', 'number', 'boolean'].includes(typeof value)) {
        return key + '=' + String(value)
      }

      if (Array.isArray(value)) {
        return key + '=' + value.join(',')
      }

      return ''
    })
    .filter((str) => str !== '')
    .join('&')
}
