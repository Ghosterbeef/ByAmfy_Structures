import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'Домашняя',
    component: Home
  },
  {
    path: '/avl_tree',
    name: 'AVL дерево',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AVL_Tree')
  },
  {
    path: '/b_tree',
    name: 'B дерево',
    component: () => import('../views/BTree')
  },
  {
    path: '/hash_table',
    name: 'Хеш-таблица',
    component: () => import('../views/HashTable')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
