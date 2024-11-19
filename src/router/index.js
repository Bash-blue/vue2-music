import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRecommend from '../views/HomeRecommend.vue'
import HomeHot from '../views/HomeHot.vue'
import HomeSearch from '../views/HomeSearch.vue'
import PlaylistDetail from '../views/PlaylistDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: HomeRecommend
  },
  {
    path: '/hot',
    name: 'hot',
    component: HomeHot
  },
  {
    path: '/search',
    name: 'search',
    component: HomeSearch
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistDetail
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
