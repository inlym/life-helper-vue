<template>
  <a-descriptions class="mx-auto w-[1200px] pt-10" title="服务器信息" bordered v-if="server">
    <a-descriptions-item label="状态" :span="3">
      <a-badge status="processing" text="正常" />
    </a-descriptions-item>

    <a-descriptions-item label="服务器时间">{{ server.now }}</a-descriptions-item>
    <a-descriptions-item label="项目启动时间">{{ server.launchTime }}</a-descriptions-item>
    <a-descriptions-item label="已运行">{{ server.duration }}秒</a-descriptions-item>

    <a-descriptions-item label="配置文件">{{ server.activeProfiles }}</a-descriptions-item>
    <a-descriptions-item label="服务器端口">{{ server.serverPort }}</a-descriptions-item>
    <a-descriptions-item label="Spring Boot 版本号">{{ server.springBootVersion }}</a-descriptions-item>

    <a-descriptions-item label="主机名">{{ server.hostName }}</a-descriptions-item>
    <a-descriptions-item label="IP 地址">{{ server.ip }}</a-descriptions-item>
    <a-descriptions-item label="时区">{{ server.timeZone }}</a-descriptions-item>
  </a-descriptions>
</template>

<script setup lang="ts">
import {getServerInfo} from '@/api/debug'
import {useHttp} from '@/hooks/useHttp'

// ============================= 注册页面请求 =============================

// 获取服务器信息
const {data: server} = useHttp(getServerInfo, {manual: false})
</script>

<style scoped lang="scss"></style>
