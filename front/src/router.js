import { createRouter, createWebHistory } from 'vue-router'
import PageAccueil from './components/PageAccueil.vue'
import PageConnection from './components/PageConnection.vue'
import PageAllConversation from './components/PageAllConversation.vue'
import PageNewConversation from './components/PageNewConversation.vue'
import PageInscription from './components/PageInscription.vue'

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
    path: '/inscription',
    name: 'PageInscription',
    component: PageInscription
  },
  {
    path: '/conversations',
    name: 'PageAllConversation',
    component: PageAllConversation
  },
  {
    path: '/new',
    name: 'PageNewConversation',
    component: PageNewConversation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router