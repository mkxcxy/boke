// import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from './views/layout/Layout'

// Vue.use(Router)


//全局设置路由
export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},

    //主页
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index')
        }]
    },


    //权限页面
    {
        path: '/permissions',
        component: Layout,
        children: [
            {
                path: ':id',
                name: 'Permissions',
                component: () => import('@/views/permissions/index'),
                meta: {title: '权限', icon: 'el-icon-search'}
            },
        ]
    },

    //首页的轮播
    {
        path: '/swipt',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Swipt',
                component: () => import('@/views/swipt/index'),
                meta: {title: '轮播', icon: 'fa fa-user-circle'}
            }
        ]
    },
    //首页的轮播
    {
        path: '/navbar',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Navbar',
                component: () => import('@/views/navbar/index'),
                meta: {title: '路由', icon: 'el-icon-platform-eleme'}
            }
        ]
    },
//友情链接
    {
        path: '/friendship',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Friendship',
                component: () => import('@/views/friendship/index'),
                meta: {title: '友情链接', icon: 'el-icon-platform-eleme'}
            }
        ]
    },

    //发布新闻
    {
        path: '/news',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'News',
                component: () => import('@/views/news/index'),
                meta: {title: '发布新闻', icon: 'el-icon-platform-eleme'}
            },
            {
                path: 'change/:id',
                name: 'Change',
                component: () => import('@/views/news/change'),
                hidden: true
                // meta: {title: '发布新闻', icon: 'icon-xinfengtianchong'}
            }
        ]
    },

    {
        path: '/types',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Types',
                component: () => import('@/views/types/index'),
                meta: {title: '文章类别', icon: 'el-icon-platform-eleme'}
            }
        ]
    },

    //所有评论
    {
        path: '/comments',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Comments',
                component: () => import('@/views/comments/index'),
                meta: {title: '评论列表', icon: 'el-icon-platform-eleme'}
            }
        ]
    },

    {path: '*', redirect: '/404', hidden: true}
];
export default new Router({
    mode: "hash",
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});
