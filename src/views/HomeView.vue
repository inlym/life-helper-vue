<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <router-link to="/login"><v-btn>登录</v-btn></router-link>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {http} from '@/core/http'

http
  .post('/debug/apigw/sign', {name: 'mark', age: 19}, {params: {isGood: true, num: 222, nickname: 'goodBoy'}})
  .then((res) => {
    console.log(res)
    console.log(res.headers['x-ca-error-message'])
  })
</script>

<style scoped lang="scss"></style>
