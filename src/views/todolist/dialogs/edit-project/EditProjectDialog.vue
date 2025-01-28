<template>
  <div class="edit-project">
    <a-modal
      v-model:open="open"
      @ok="submit"
      :title
      :okButtonProps="{disabled: okButtonDisabled}"
      centered
      :maskClosable="false"
      :width="500"
      cancelText="取消"
      :okText
    >
      <div class="modal-content py-8">
        <!-- 表单组件 -->
        <a-form :model="formState" name="project" layout="vertical">
          <!-- 表单项 1: 项目名称 -->
          <a-form-item label="项目名称" name="name">
            <a-input v-model:value="formState.name" placeholder="请输入项目名称" />
          </a-form-item>

          <!-- 表单项 2: 颜色 -->
          <a-form-item label="颜色" name="color">
            <a-select v-model:value="formState.color" placeholder="请选择颜色">
              <a-select-option v-for="color in colorList" :value="color.name">
                <div class="flex items-center gap-4">
                  <div class="size-4 rounded-2xl" :style="{backgroundColor: color.value}"></div>
                  <div class="">{{ color.text }}</div>
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>

          <!-- 表单项 3: emoji 图标 -->
          <a-form-item label="图标" name="emoji">
            <a-select v-model:value="formState.emoji" placeholder="请选择图标">
              <a-select-option v-for="item in emojiList" :value="item">
                <div class="flex items-center text-lg">{{ item }}</div>
              </a-select-option>
            </a-select>
          </a-form-item>

          <!-- 表单项 4: 是否收藏 -->
          <a-form-item label="添加到收藏" name="favorite">
            <a-switch v-model:checked="formState.favorite" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {addProject, getProject, updateProject, type Project, type ProjectDTO} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {computed, onMounted, reactive, ref, toRaw} from 'vue'
import {colorList} from '../../services/color'
import {emojiList} from '../../services/emoji'

// =================================== 组件入参 ===================================

const props = defineProps({
  /** 项目 ID */
  projectId: {type: Number, required: false},
})

/** 根据是否传入主键 id 判断是“编辑”还是“新增” */
const isEdit = computed(() => Boolean(props.projectId))

// ================================= 注册HTTP请求 =================================

// 请求[1]: 获取项目信息
const {data: data1, run: run1} = useHttp(getProject, {onSuccess: onSuccess1})

// 请求[2]: 新增项目
const {data: data2, run: run2} = useHttp(addProject)

// 请求[3]: 更新项目
const {data: data3, run: run3} = useHttp(updateProject)

// ================================== 表单类数据 ===================================

const formState = reactive<Partial<ProjectDTO>>({
  name: undefined,
  emoji: undefined,
  color: undefined,
  favorite: false,
})

// ================================== 展示类数据 ===================================

/** 弹窗标题 */
const title = computed(() => (isEdit.value ? '编辑项目' : '添加项目'))

/** [确定]按钮文本 */
const okText = computed(() => (isEdit.value ? '保存' : '添加'))

// ================================== 状态类数据 ===================================

/** 对话框是否可见	 */
const open = ref(false)

/** emoji 面板浮层是否可见 */
const emojiPopoverOpen = ref(false)

/** [确定]按钮是否禁用 */
const okButtonDisabled = computed(() => !formState.name || !formState.color || !formState.emoji)

// =================================== 交互事件 ===================================

function submit() {
  if (isEdit.value) {
    // [编辑]情况处理
  } else {
    // [新增]情况处理
    run2(toRaw(formState))
  }
}

// =================================== 请求回调 ===================================

function onSuccess1(res: Project) {
  formState.name = res.name
  formState.color = res.color
  formState.emoji = res.emoji
  formState.favorite = res.favorite
}

// =================================== 事件监听 ===================================

// =================================== 生命周期 ===================================

onMounted(() => {
  open.value = true

  if (props.projectId) {
    // [编辑]情况处理
    run1(props.projectId)
  } else {
    // [新增]情况处理
  }
})
</script>

<style scoped lang="scss"></style>
