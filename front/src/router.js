import { createRouter, createWebHistory } from 'vue-router'
import PageAccueil from './components/PageAccueil.vue'
import PageConnection from './components/PageConnection.vue'
import PageAllConversation from './components/PageAllConversation.vue'

const routes = [
  {
    path: '/',
    name: 'PageAccueil',
    component: PageAccueil
  },
  {
    path: '/connection',
    name: 'PageConnection',
    component: PageConnection
  },
  {
    path: '/conversations',
    name: 'PageAllConversation',
    component: PageAllConversation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router