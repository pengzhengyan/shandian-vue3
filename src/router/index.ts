import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { useConfigStore, useMemberStore } from '@/stores'
import { PageLayout } from '@/enums/config'

let routes: RouteRecordRaw[] = [
  /** 主页 */
  {
    path: '/',
    name: 'main',
    redirect: '/login'
  },
  /** 登录页 */
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue')
  },
  {
    path: '/applications-review',
    name: 'applications-review',
    component: () => import('@/pages/reviews/ApplicationsReview.vue')
  },
  {
    path: '/application-detail',
    name: 'application-detail',
    component: () => import('@/pages/reviews/ApplicationDetail.vue')
  },
  {
    path: '/oders-review',
    name: 'oders-review',
    component: () => import('@/pages/reviews/OdersReview.vue')
  },
]

let router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, _from, next) => {
  const mumberStore = useMemberStore()

  if (to.name !== 'Login' && !mumberStore) next({ name: 'Login' })
  else next()
})

router.afterEach((to) => {
  let { setPagelayout } = useConfigStore()

  if (to.name === 'Login') {
    setPagelayout(PageLayout.FullScreen)
  } else setPagelayout(PageLayout.HasSidebar)
})

export default router
