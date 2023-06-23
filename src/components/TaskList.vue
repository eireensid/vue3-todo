<template>
	<div class="mt-5">
		<div
			v-for="todo of todos"
			:key="todo.key"
			class="flex align-items-center justify-content-between gap-4 mb-3">
			<div class="flex align-items-center gap-2 w-full">
				<TaskListItem :todo="todo" />
			</div>
			<div class="flex align-items-center gap-2">
				<Button icon="pi pi-file-edit" aria-label="Редактировать" @click="clickEdit(todo)" />
				<Button
					icon="pi pi-times"
					aria-label="Удалить"
					severity="danger"
					@click="deleteTask(todo)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import store from '../store'
import { onMounted, watch } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { Todo } from '../types/todo'
import TaskListItem from '../components/TaskListItem.vue'

const todos = store.state.todos

const { saveToLocalTodos } = useLocalStorage()

onMounted(() => {
	store.commit('initTodos')
})

watch(store.state.todos, () => {
	saveToLocalTodos()
})

const deleteTask = (todo: Todo) => {
	store.commit('deleteTodo', todo)
}

const clickEdit = (todo: Todo) => {
	todo.isEdit = true
}
</script>
