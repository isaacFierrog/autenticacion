import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../stores/counter'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/bienvenido',
      name: 'bienvenido',
      component: () => import('@/views/BienvenidoView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useCounterStore();
  const { autenticado } = storeToRefs(store);

  if(to.name !== 'home' && !autenticado.value){
    next({ name: 'home' })
  }else{
    next();
  }
})

export default router
