import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProdutoView from '../views/ProdutoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category',
      name: 'categorias',
      component: CategoryView,
    },
    {
      path: '/produto/:id',  
      name: 'produto',
      component: ProdutoView,
    },
  ],
})

export default router
