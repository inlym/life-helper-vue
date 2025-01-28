export interface Color {
  /** 英文标识符 */
  name: string
  /** 中文名称 */
  text: string
  /** 颜色值 */
  value: string
}

/**
 * 可选的颜色列表
 *
 * ### 维护说明
 * 1. 来源于 [中国传统颜色](https://www.zhongguose.com) 。
 * 2. 后端仅存储颜色名称（即 `name` 部分），不做任何逻辑处理。
 */
export const colorList: Color[] = [
  {name: 'PINHONG', text: '品红', value: '#ef3473'},
  {name: 'YUHONG', text: '玉红', value: '#c04851'},
  {name: 'ZAOHONG', text: '枣红', value: '#7c1823'},

  {name: 'DANJUCHENG', text: '淡橘橙', value: '#fba414'},
  {name: 'HAILUOCHENG', text: '海螺橙', value: '#f0945d'},

  {name: 'DIEHUANG', text: '蝶黄', value: '#e2d849'},
  {name: 'TUHUANG', text: '土黄', value: '#d6a01d'},

  {name: 'ZHULV', text: '竹绿', value: '#1ba784'},
  {name: 'DANCUILV', text: '淡翠绿', value: '#c6dfc8'},
  {name: 'XIANLV', text: '鲜绿', value: '#43b244'},

  {name: 'QUNQING', text: '群青', value: '#1772b4'},

  {name: 'YOULAN', text: '釉蓝', value: '#1781b5'},

  {name: 'XIANCAIZI', text: '苋菜紫', value: '#9b1e64'},

  {name: 'XINHUI', text: '锌灰', value: '#7a7374'},
  {name: 'HANBAIYU', text: '汉白玉', value: '#f8f4ed'},
]
