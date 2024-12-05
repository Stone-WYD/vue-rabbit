// 封装购物车模块

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    // 1. 定义 state - cartList
    const cartList = ref([])
    // 2. 定义 action - addCart
    const addCart = (goods) => {
        // 添加购物车
        
        // 没有添加过，直接 push
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item) {
            // 已添加过， count + 1
            item.count++
        } else {
            cartList.value.push(goods)
        }
    }
    // 删除购物车商品
    const delCart = (skuId) => {
        // 1. 找到要删除的项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    return {cartList, addCart, delCart}
}, {persist: true})
