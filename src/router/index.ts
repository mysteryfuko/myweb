import {createRouter,createWebHashHistory,RouteRecordRaw}  from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        component:()=>import('../page/index.vue')
    },
]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})


export default router