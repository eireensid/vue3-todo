<template>
  <section>
    <h1>Список задач</h1>
    <div class="flex align-items-center gap-2">
      <div class="flex flex-column gap-2 relative">
        <InputText class="task-list__input" id="add-task" v-model="addTodoValue" aria-describedby="add-task-help"
                   @keyup.enter="addTask(addTodoValue)" autocomplete="none" />
        <span class="absolute left-0 top-100 text-base text-red-500 py-1" v-show="store.getters.getTodoByName(addTodoValue)"
              id="add-task-help">Такая задача уже есть</span>
      </div>
      <Button class="task-list__button" type="button" label="Добавить" severity="success" icon="pi pi-plus"
              @click="addTask(addTodoValue)" :disabled="addTodoValue === '' || store.getters.getTodoByName(addTodoValue)" />
    </div>
    <div class="mt-5">
      <div v-for="todo of todos" :key="todo.key" class="flex align-items-center justify-content-between gap-4 mb-3">
        <div class="flex align-items-center gap-2 w-full">
          <Checkbox v-model="selectedTodos" :inputId="todo.key" name="todo" :value="todo.name" @input="toggleDone(todo)" />
          <label v-if="!todo.isEdit" :for="todo.key">{{ todo.name }}</label>
          <div v-else class="flex align-items-center gap-2 w-full">
            <InputText class="w-full" type="text" v-model="todo.name" @input="todo.done = false" @keyup.enter="editTask(todo)" v-focus />
            <Button class="flex-shrink-0" icon="pi pi-check" aria-label="Отредактировано" severity="success" @click="editTask(todo)" />
          </div>
        </div>
        <div class="flex align-items-center gap-2">
          <Button icon="pi pi-file-edit" aria-label="Редактировать" @click="clickEdit(todo)" />
          <Button icon="pi pi-times" aria-label="Удалить" severity="danger" @click="deleteTask(todo)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import store from "../store";
  import {onMounted, ref, watch} from "vue";
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
  import {useLocalStorage} from "../composables/useLocalStorage";
import { Todo } from "../types/todo";

  const todos = store.state.todos
  const addTodoValue = ref<string>('')
  const selectedTodos = ref<Array<string>>([])

  const { saveToLocalTodos } = useLocalStorage()

  onMounted(() => {
    store.commit('initTodos')
    selectedTodos.value = store.getters.getTodoByDone
  })

  watch(store.state.todos, () => {
    saveToLocalTodos()
  })

  const addTask = (value: string) => {
    if (!store.getters.getTodoByName(value)) {
      store.commit('addTodo', value)
      addTodoValue.value = ''
    }
  }

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
    todo.isEdit = false
    store.commit('editTodo', todo)
  }

</script>

<style>
.task-list__input {
  width: 400px;
}
.task-list__button .p-button-icon {
  padding-top: 2px;
}
</style>