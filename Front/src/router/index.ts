import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/categorias' // Redireciona a home para a lista de categorias
  },
  {
    path: '/categorias',
    name: 'Categorias',
    // Lazy loading: o componente só é carregado se o usuário acessar essa rota
    component: () => import('@/views/CategoriaView.vue')
    }
  // {
  //   path: '/produtos',
  //   name: 'Produtos',
  //   component: () => import('@/views/ProdutoView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router