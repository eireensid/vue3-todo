import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TaskListView from '../views/TaskListView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/tasks',
			name: 'tasks',
			component: TaskListView
		},
		{
			path: '/:catchAll(.*)',
			name: 'NotFound',
			component: NotFoundView
		}
	],
	history: createWebHistory()
})

export default router
