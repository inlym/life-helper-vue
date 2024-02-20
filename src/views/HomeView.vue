<template>
  <HomeHeader></HomeHeader>
  <div class="one">
    <div class="content common-container">
      <div class="left">
        <div class="title">让<span class="name">小鸣助手</span>，成为你的随身管家</div>
        <div class="desc">让生活更简单一些</div>
        <div class="button">免费使用</div>
      </div>
      <div class="right one-center">
        <img class="img" :src="img1Url" />
      </div>
    </div>
  </div>

  <!-- 客户端设备信息 -->
  <div class="device">
    <div class="content common-container">
      <div class="title">随时随地，在各种设备上使用</div>
      <div class="items">
        <div class="item" v-for="item of devices" :key="item.imageUrl">
          <img :src="item.imageUrl" class="img" />
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 用户评价 -->
  <div class="customer">
    <div class="content common-container">
      <div class="title">20万+用户正在使用小鸣助手</div>
      <div class="items">
        <div class="item" v-for="item of customers" :key="item.name">
          <img class="avatar" :src="item.avatarUrl" />
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div class="cont">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="two">
    <div class="content common-container">
      <div class="text">现在使用小鸣助手，开启智慧高效生活</div>
      <div class="button">免费使用</div>
    </div>
  </div>

  <HomeFooter />
</template>

<script setup lang="ts">
import HomeFooter from '@/components/HomeFooter.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import {ref} from 'vue'

const img1Url = ref('https://static.lifehelper.com.cn/web/001.png')

/** 用户评价列表 */
const customers = ref([
  {
    avatarUrl: 'https://res.lifehelper.com.cn/avatar/236acfb5ce294a0ab3c0dd56b3739598',
    name: '会**鱼',
    desc: '3年老用户',
    content:
      '我是从「小鸣助手」上线的时候就开始用了，总体来说，还是很好用的，有很多功能蛮实用的，在「小鸣助手」上查天气比其他的 APP 都要更准。'
  },
  {
    avatarUrl: 'https://res.lifehelper.com.cn/avatar/2cc99f099606400dbf4f6859314369fd',
    name: '小**白',
    desc: '2年老用户',
    content:
      '用了「小鸣助手」2年了，几乎每天都会登录上去看一下，因为我把纪念日都记在上面了。我觉得最大的优点就是免费吧，其他软件的同类功能要不是收费的，要不就是有广告，就「小鸣助手」的界面最清爽好用。'
  },
  {
    avatarUrl: 'https://res.lifehelper.com.cn/avatar/33b01afea08e4b228d2287dfeafa0a1b',
    name: '神**蛙',
    desc: '2年老用户',
    content:
      '「小鸣助手」最大的优点就是手机上和电脑上都能用，日常查看就用微信小程序，要打字多的就用网页打开用。'
  }
])

/** 客户端设备信息列表 */
const devices = ref([
  {
    type: 'miniprogram',
    imageUrl: 'https://static.lifehelper.com.cn/web/device01.png',
    desc: '使用小程序'
  },
  {
    type: 'web',
    imageUrl: 'https://static.lifehelper.com.cn/web/device03.png',
    desc: '使用网页版'
  },
  {
    type: 'pc',
    imageUrl: 'https://static.lifehelper.com.cn/web/device02.png',
    desc: '下载桌面端'
  }
])
</script>

<style scoped lang="scss">
.one {
  height: 700px;
  padding-top: var(--ming-header-height);
  background-color: #fafbfc;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    .left {
      .title {
        font-size: 40px;
        color: #45586c;
      }

      .name {
        color: var(--ming-green);
      }

      .desc {
        margin-top: 40px;
        font-size: 24px;
        color: #8c95a8;
      }

      .button {
        width: 200px;
        height: 50px;
        margin-top: 100px;
        font-size: 16px;
        line-height: 50px;
        color: var(--ming-white);
        text-align: center;
        background-color: var(--ming-green);
        border-radius: 50px;
      }
    }

    .right {
      .img {
        width: 700px;
      }
    }
  }
}

.two {
  height: 360px;
  background-color: var(--ming-purple);

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 80px;

    .text {
      height: 100px;
      font-size: 50px;
      font-weight: bold;
      line-height: 100px;
      color: var(--ming-white);
    }

    .button {
      width: 200px;
      height: 60px;
      margin-top: 40px;
      font-size: 20px;
      line-height: 60px;
      color: var(--ming-purple);
      text-align: center;
      background-color: var(--ming-bg-2);
      border-radius: 60px;
      transition: all 0.2s linear;
    }

    .button:hover {
      cursor: pointer;
      background-color: var(--ming-bg-1);
      transform: scale(1.03);
    }
  }
}

// 用户评价
.customer {
  height: 650px;
  padding: 100px 0 0;
  background-color: #f8f6f6;

  .title {
    font-size: 40px;
    text-align: center;
  }

  .items {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 420px;
      height: 360px;
      padding: 32px 15px 0;
      margin: 0 20px;
      background-color: var(--ming-bg-2);
      border: 1px solid #e9e9e9;
      border-radius: 10px;

      .avatar {
        width: 90px;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
      }

      .name {
        margin-top: 20px;
        font-size: 16px;
      }

      .desc {
        margin-top: 6px;
        color: var(--ming-text-desc);
      }

      .cont {
        padding: 0 20px;
        margin-top: 20px;
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
}

.device {
  height: 540px;
  padding: 100px 0 0;
  background-color: #eff6fc;

  .content {
    .title {
      font-size: 40px;
      text-align: center;
    }

    .items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 90px;

      .item {
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease-in-out;

        &:hover {
          transform: translateY(-6px);
        }

        .img {
          width: 350px;
        }

        .desc {
          height: 60px;
          font-size: 20px;
          line-height: 60px;
          color: var(--ming-text-link);
          text-align: center;
          background-color: var(--ming-bg-2);
          border-radius: 0 0 40px 40px;
        }
      }
    }
  }
}
</style>
