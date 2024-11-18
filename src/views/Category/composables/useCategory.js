// 封装分类数据业务相关代码
import { getCategoryAPI } from '@/apis/category'
import {onMounted, ref} from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    // 获取数据
    const categoryData = ref({})
    const route = useRoute()
    
    
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() => getCategory())
    
    // 目标：路由参数变化时，可以把分类接口函数重新调用一次
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了！')
        // 要获取新路由上的参数
        console.log(to)
        getCategory(to.params.id)
    })

    return {categoryData}
}