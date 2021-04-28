import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'
import AVL_Tree from "../views/AVL_Tree";
import BTree from "../views/BTree";
import HashTable from "../views/HashTable";
const routes = [
    {
        path: '/',
        name: 'Домашняя',
        component: Home,
        meta: {title: "Главная"}
    },
    {
        path: '/avl_tree',
        name: 'AVL дерево',
        meta: {title: "AVL-дерево"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AVL_Tree
        //component: () => import(/* webpackChunkName: "about" */ '../views/AVL_Tree')
    },
    {
        path: '/b_tree',
        name: 'B дерево',
        meta: {title: "B-дерево"},
        component: BTree
        //component: () => import('../views/BTree')
    },
    {
        path: '/hash_table',
        name: 'Хеш-таблица',
        meta: {title: "Хеш-таблица"},
        component: HashTable
        //component: () => import('../views/HashTable')
    },
    {
        path: '/NotFound',
        name: '404',
        meta: {title: "Страничка не найдена"},
        component: () => import('../views/404')
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/NotFound',
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()

})

export default router
