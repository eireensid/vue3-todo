<template>
  <div class="mt-5">
    <div v-for="todo of todos" :key="todo.key" class="flex align-items-center justify-content-between gap-4 mb-3">
      <div class="flex align-items-center gap-2 w-full">
        <Checkbox v-model="selectedTodos" :inputId="todo.key" name="todo" :value="todo.name" @input="toggleDone(todo)" />
        <label v-if="!todo.isEdit" :for="todo.key">{{ todo.name }}</label>
        <div v-else class="flex align-items-center gap-2 w-full">
          <div class="flex flex-column gap-2 relative w-full">
            <InputText type="text" v-model="todo.name" @input="todo.done = false" @keyup.enter="editTask(todo)" v-focus />
            <span class="absolute left-0 top-100 text-base text-red-500 py-1" v-show="todo.name === ''"
                  id="add-task-help">Задача не может быть пустой</span>
          </div>
          <Button class="flex-shrink-0" icon="pi pi-check" aria-label="Отредактировано" severity="success" @click="editTask(todo)"
                  :disabled="todo.name === ''"/>
        </div>
      </div>
      <div class="flex align-items-center gap-2">
        <Button icon="pi pi-file-edit" aria-label="Редактировать" @click="clickEdit(todo)" />
        <Button icon="pi pi-times" aria-label="Удалить" severity="danger" @click="deleteTask(todo)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import store from "../store";
  import {onMounted, ref, watch} from "vue";
  import {useLocalStorage} from "../composables/useLocalStorage";
  import { Todo } from "../types/todo";

  const todos = store.state.todos
  const selectedTodos = ref<Array<string>>([])

  const { saveToLocalTodos } = useLocalStorage()

  onMounted(() => {
    store.commit('initTodos')
    selectedTodos.value = store.getters.getTodoByDone
  })

  watch(store.state.todos, () => {
    saveToLocalTodos()
  })

  const toggleDone = (todo: Todo) => {
    store.commit('filterTodo', todo)
  }

  const deleteTask = (todo: Todo) => {
    store.commit('deleteTodo', todo)
  }

  const clickEdit = (todo: Todo) => {
    todo.isEdit = true
  }

  const editTask = (todo: Todo) => {
    if (todo.name !== '') {
      todo.isEdit = false
      store.commit('editTodo', todo)
    }
  }
</script>