import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

import Tabs1 from '../views/tabs/Tabs1.vue'
import Tabs2 from '../views/tabs/Tabs2.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/addStudent'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tabs1'
      },
      {
        path: 'tabs1',
        component: Tabs1
      },
      {
        path: 'tabs2',
        component: Tabs2
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
