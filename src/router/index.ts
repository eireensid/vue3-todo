import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskListView from '../views/TaskListView.vue'

const router = createRouter({
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskListView
    }
  ],
  history: createWebHistory()
})

export default router