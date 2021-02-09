import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router';
import home from '@/pages/home/index.vue'
import about from '@/pages/about/index.vue'

const routes:Array<RouteRecordRaw> =[
    {
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/about',
        name: 'About',
        component: about
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
