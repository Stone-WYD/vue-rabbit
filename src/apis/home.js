import httpInstance from "@/utils/http";

// 获取轮播图
export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}