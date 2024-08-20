// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    // 懒加载指令逻辑
    install(app) {
        // 定义全局指令
        app.directive('img-lazy', {
            mounted(el, binding) {
                // el：指令绑定的元素
                // binding： binding.value， 指令等号后面绑定的表达式的值
                // console.log(el, binding.value)
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            // 如果进入视口区域，则进行图片加载的操作
                            el.src = binding.value
                            stop()
                        }
                    }
                )
            }
        })
    }


}