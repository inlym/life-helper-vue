import {h, render} from 'vue'
import EditProjectDialog from './EditProjectDialog.vue'

/**
 * 打开待办项目编辑弹窗
 *
 * @param projectId 项目 id
 */
export function openEditProjectDialog(projectId?: number) {
  const divDom = document.createElement('div')
  divDom.id = `edit-project-dialog-${Math.floor(Math.random() * 10000)}`
  document.body.appendChild(divDom)

  const vNode = h(EditProjectDialog, {projectId})

  render(vNode, divDom)
}
