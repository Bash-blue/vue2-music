import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRecommend from '../views/HomeRecommend.vue'
import HomeHot from '../views/HomeHot.vue'
import HomeSearch from '../views/HomeSearch.vue'
import PlaylistDetail from '../views/PlaylistDetail.vue'
import SongDetail from '../views/SongDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: HomeRecommend,
    meta:{showNav:true},
  },
  {
    path: '/hot',
    name: 'hot',
    component: HomeHot,
    meta:{showNav:true},
  },
  {
    path: '/search',
    name: 'search',
    component: HomeSearch,
    meta:{showNav:true},

  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlaylistDetail,
  },
  {
    path: '/song',
    name: 'song',
    component: SongDetail,
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
