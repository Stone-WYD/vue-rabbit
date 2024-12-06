// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";
import  {insertCartAPI, findNewCartListAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    // 是否登录
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 1. 定义 state - cartList
    const cartList = ref([])
    // 2. 定义 action - addCart
    const addCart = async (goods) => {
        const {skuId, count} = goods
        // 添加购物车
        if(isLogin) {
            // 登录之后的加入购物车逻辑
            console.log('传参为：', 'skuId: ',skuId, 'count: ',count)
           await insertCartAPI({skuId, count})
           const res = await findNewCartListAPI()
           cartList.value = res.result
        } else {
            // 没有添加过，直接 push
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item) {
            // 已添加过， count + 1
            item.count++
        } else {
            cartList.value.push(goods)
        }
        }
        
    }
    // 3. 删除购物车商品
    const delCart = (skuId) => {
        // 1. 找到要删除的项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1) 
    }
    // 4. 计算属性
    const allCount = computed(() => 
         cartList.value.reduce((a, c) => a + c.count, 0)
    )
    const allPrice = computed(() => 
         cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    )
    const selectedCount = computed(() => 
        cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0)
    ) 

    const selectedPrice = computed(() => 
        cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count * c.price, 0)
    ) 

    // 5. 单/全选功能
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find(item => item.skuId === skuId)
        item.selected = selected
    }
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 6. 是否全选
    const isAll = computed(() => cartList.value.every(item => item.selected))
    return {cartList, allCount, allPrice, selectedCount, selectedPrice, isAll,
         addCart, delCart, singleCheck, allCheck}
}, {persist: true})
