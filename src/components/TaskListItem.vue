<template>
	<Checkbox v-model="isChecked" :inputId="todo.key" name="todo" @input="toggleDone(todo)" binary />
	<label v-if="!todo.isEdit" :for="todo.key">{{ todo.name }}</label>
	<div v-else class="flex align-items-center gap-2 w-full">
		<div class="flex flex-column gap-2 relative w-full">
			<InputText
				type="text"
				v-model="todo.name"
				@input="todo.done = false"
				@keyup.enter="editTask(todo)"
				v-focus />
			<span class="absolute left-0 top-100 text-base text-red-500" id="add-task-help">{{
				valueError
			}}</span>
		</div>
		<Button
			class="flex-shrink-0"
			icon="pi pi-check"
			aria-label="Отредактировано"
			severity="success"
			@click="editTask(todo)"
			:disabled="todo.name === '' || store.getters.getTodosByNameLength(props.todo.name) > 1" />
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Todo } from '../types/todo'
import store from '../store'

const props = defineProps<{
	todo: Todo
}>()

const isChecked = ref<boolean>(props.todo.done)

const valueError = computed(() => {
	if (props.todo.name === '') {
		return 'Задача не может быть пустой'
	} else if (store.getters.getTodosByNameLength(props.todo.name) > 1) {
		return 'Такая задача уже есть'
	}
})

const toggleDone = (todo: Todo) => {
	store.commit('filterTodo', todo)
}

const editTask = (todo: Todo) => {
	if (todo.name !== '' && store.getters.getTodosByNameLength(props.todo.name) <= 1) {
		todo.isEdit = false
		isChecked.value = false
		store.commit('editTodo', todo)
	}
}
</script>
