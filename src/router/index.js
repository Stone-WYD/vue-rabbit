// createRouter 创建路由实例
// createWebHistory：创建 history 的路由模式
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path 和 component 对应关系的位置
  routes: [
      {
        path: "/",
        component: Layout,
        children: [
          {
            path: '',
            component: Home
          },
          {
            path: '/category/:id',
            component: Category
          },
          {
            path: '/category/sub/:id',
            component: SubCategory
          },
          {
            path: '/detail/:id',
            component: Detail
          },
          {
            path: 'cartlist',
            component: CartList
          },
          {
            path: 'checkout',
            component: Checkout
          }
        ]
      },
      {
        path: "/login",
        component: Login
      }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
