import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import 'animate.css'
import router from './router'
import { createPinia } from 'pinia'
import './router/permission.js'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

// 自定义指令，自动聚焦
app.directive('focus', {
  mounted: (el: HTMLElement) => {
    // 元素被插入到真实DOM中时触发，如果用 display:none 隐藏了，那么再显示的时候就不会触发
    // 指令的根标签是div，而input是在内部
    // el可能是div 也可能是一个input或者textarea
    // 使用原生DOM操作获取到标签名
    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
      // 说明这个节点本身就是输入框
      el.focus()
    } else {
      // 尝试在内部寻找一下输入框
      let theInput = el.querySelector('input')
      let theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theTextArea.focus()
    }
  },
  updated(el: HTMLElement) {
    // 元素更新时显示
    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
      // 说明这个节点本身就是输入框
      el.focus()
    } else {
      // 尝试在内部寻找一下输入框
      let theInput = el.querySelector('input')
      let theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theTextArea.focus()
    }
  },
})

app.config.globalProperties.$serveURL = 'http://127.0.0.1:8081' // 全局变量

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
