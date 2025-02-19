<template>
  <!-- 导航条定高不定宽，宽度和边框样式由外层容器设定 -->
  <div class="app-header h-15 flex w-auto items-center px-4">
    <!-- 左侧区域 -->
    <div class="flex items-center">
      <LogoWithName />

      <!-- 按钮组 -->
      <div class="ml-20 flex items-center gap-3">
        <!-- 菜单1 - 首页 -->
        <a-button type="text" size="large" @click="goTo('/')">首页</a-button>
        <!-- 菜单2 - 产品 -->
        <a-popover placement="bottom" :getPopupContainer>
          <template #content>
            <!-- 列表外层容器 -->
            <div class="flex w-64 flex-col gap-2">
              <!-- 产品列表项 -->
              <div class="flex cursor-pointer gap-4 rounded-md p-2 hover:bg-gray-200" v-for="item in productList" :key="item.name" @click="goTo(item.link)">
                <!-- 左侧产品图片 -->
                <div class="flex size-12 items-center justify-center">
                  <img :src="item.imgUrl" />
                </div>
                <!-- 右侧产品名称和描述 -->
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-4">
                    <div class="text-base font-bold">{{ item.name }}</div>
                    <a-tag v-if="item.tag" color="success">已上线</a-tag>
                  </div>
                  <div class="text-xs text-gray-600">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </template>
          <a-button class="product-btn" type="text" size="large">产品</a-button>
        </a-popover>

        <!-- 菜单3 - xxxx -->
        <a-button type="text" size="large">会员</a-button>

        <!-- 菜单4 - xxxx -->
        <a-button type="text" size="large">帮助</a-button>

        <!-- 菜单5 - xxxx -->
        <a-button type="text" size="large">关于</a-button>
      </div>
    </div>

    <!-- 自适应宽度填充区域 -->
    <div class="flex-1"></div>

    <!-- 右侧区域 -->
    <div class="flex items-center">
      <!-- 未登录情况 -->
      <a-button v-if="!logined" type="primary" size="large" @click="goTo('/login')">登录 / 注册</a-button>
      <!-- 已登录情况 -->
      <AvatarWithMenu v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import {StaticResource} from '@/core/constant'
import {useAuthStore} from '@/stores/auth'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import LogoWithName from '../logo/LogoWithName.vue'
import AvatarWithMenu from '../user/AvatarWithMenu.vue'

const router = useRouter()

// ================================== 跨组件数据 ===================================

const {logined} = storeToRefs(useAuthStore())

// ================================== 展示类数据 ===================================

/** 产品列表 */
const productList = ref([
  {name: '小鸣 AI', desc: '探索智能生活的最优解', imgUrl: StaticResource.PRODUCT_AI, tag: false, link: '/developing'},
  {name: '小鸣清单', desc: '将生活打理地井井有条', imgUrl: StaticResource.PRODUCT_REMINDER, tag: true, link: '/developing'},
  {name: '小鸣笔记', desc: '好记性不如烂笔头', imgUrl: StaticResource.PRODUCT_NOTE, tag: false, link: '/developing'},
  {name: '小鸣相册', desc: '定格这一刻的美好', imgUrl: StaticResource.PRODUCT_ALBUM, tag: false, link: '/developing'},
])

// =================================== 交互事件 ===================================

/** 链接跳转 */
function goTo(path: string) {
  router.push(path)
}

// ==================================== 其他 ====================================

function getPopupContainer() {
  return document.querySelector('.product-btn')
}
</script>

<style scoped lang="scss"></style>
