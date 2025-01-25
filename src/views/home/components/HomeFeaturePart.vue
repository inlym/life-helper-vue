<template>
  <!-- AI 介绍部分 -->
  <div class="flex w-full items-center justify-center bg-zinc-50">
    <div class="flex w-300 flex-col items-center py-20">
      <div class="colorful-text text-2xl font-bold">丰富多样的功能</div>
      <div class="mt-4 text-3xl font-bold">满足你的所有个性化需求</div>
      <div class="mt-16 flex flex-wrap items-center justify-around gap-8">
        <!-- 列表项 -->
        <div
          v-for="item in list"
          :key="item.title"
          class="flex h-26 w-90 cursor-default items-center gap-4 rounded-xl bg-white px-4 shadow-2xs transition-transform duration-300 ease-in-out hover:scale-110"
        >
          <!-- 左侧图片 -->
          <div class="flex size-12 items-center justify-center">
            <img class="size-12 rounded-lg" :src="item.imgUrl" />
          </div>
          <!-- 右侧标题和描述 -->
          <div class="flex flex-1 flex-col gap-2">
            <div class="text-base font-bold">{{ item.title }}</div>
            <div class="text-xs text-gray-500">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ================================== 展示类数据 ===================================

const list = [
  {
    title: 'PPT 助手',
    desc: 'PPT 无处不在，只需要你一句话，我能帮你制作详尽且有说服力的 PPT 文稿，让你惊艳全场',
    imgUrl: 'https://static.weutil.com/web/haci6nv5lmu7.png',
  },
  {
    title: '长文生成器',
    desc: '告诉我你想研究的领域，我能搜索和学习更多信息，生成更长、更深入、更丰富的长文报告',
    imgUrl: 'https://static.weutil.com/web/w14zqifueyzs.png',
  },
  {
    title: '爆款网文生成器',
    desc: '你可以和我一起脑暴选题、拆解爆文、从0开始撰写网文小说',
    imgUrl: 'https://static.weutil.com/web/bbi4xptm4cb8.png',
  },
  {
    title: '什么值得买',
    desc: '电子产品、大件家电、生活好物……什么值得买？来问我！科学消费，认真生活',
    imgUrl: 'https://static.weutil.com/web/4tpjo3u8a884.png',
  },
  {
    title: '翻译通',
    desc: '一键中英互译，直译意译，样样精通',
    imgUrl: 'https://static.weutil.com/web/o5xbw97w4ywd.png',
  },
  {
    title: '提示词专家',
    desc: '不知道如何发问？说出想法，提示词专家帮你精心设计提示词',
    imgUrl: 'https://static.weutil.com/web/srgm7f7cn0az.png',
  },
  {
    title: 'IT 百事通',
    desc: '无论是软件使用小技巧、硬件小疑问，还是电脑操作的便捷方法，我随时为你解答',
    imgUrl: 'https://static.weutil.com/web/4uu5rb3czesn.png',
  },
  {
    title: '小红书爆款生成器',
    desc: '我精通平台规则，能够帮你抓住读者的眼球，让你的文章在人海中脱颖而出',
    imgUrl: 'https://static.weutil.com/web/en47552r1wf6.png',
  },
  {
    title: '办公室笔杆子',
    desc: '我是你的办公室笔杆子，可以完成纪要、汇报材料、讲话稿、调研报告等各种类型的写作',
    imgUrl: 'https://static.weutil.com/web/pm8o40r7bj5v.png',
  },
  {
    title: '论文写作助手',
    desc: '遇到写作难题？需要研究建议？请介绍你的文章主题，我会开始优化你的写作过程，从构思到完成',
    imgUrl: 'https://static.weutil.com/web/fo80ml11okg7.png',
  },
  {
    title: '学术搜索',
    desc: '有什么关心的学术问题？问问我吧！',
    imgUrl: 'https://static.weutil.com/web/r0x4yaggmqzu.png',
  },
  {
    title: '论文改写',
    desc: '提交你的文本，我可以帮你降低相似度、以及消除AI写作风格',
    imgUrl: 'https://static.weutil.com/web/ddz4io2i66z4.png',
  },
]
</script>

<style scoped lang="scss">
.colorful-text {
  background: linear-gradient(270deg, #d55dff, #964dff 33%, #694dff 66%, #4db4ff);
  color: transparent;
  background-clip: text;
}
</style>
