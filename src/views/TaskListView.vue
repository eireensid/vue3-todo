<template>
  <section>
    <h1>Список задач</h1>
    <div class="flex align-items-center gap-2">
      <InputText class="task-list__input" id="add-task" v-model="addTodoValue" aria-describedby="add-task-help" @keyup.enter="addTask(addTodoValue)" />
      <Button class="task-list__button" type="button" label="Добавить" severity="success" icon="pi pi-plus" @click="addTask(addTodoValue)" :disabled="addTodoValue === '' ? true : false" />
    </div>
    <div class="mt-5">
      <div v-for="todo of todos" :key="todo.key" class="flex align-items-center justify-content-between gap-4 mb-3">
        <div class="flex align-items-center gap-2 w-full">
          <Checkbox v-model="todo.key" :inputId="todo.key" name="todo" :value="todo.name" @change="toggleDone(todo)" />
          <label v-if="!todo.isEdit" :for="todo.key">{{ todo.name }}</label>
          <div v-else class="flex align-items-center gap-2 w-full">
            <InputText class="w-full" type="text" v-model="todo.name" @keyup.enter="editTask(todo)" v-focus />
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
  import {ref} from "vue";
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
  import {useLocalStorage} from "../composables/useLocalStorage";

  const todos = store.state.todos
  const addTodoValue = ref(null)

  const { saveToLocalTodos } = useLocalStorage()

  const addTask = (value) => {
    store.commit('addTodo', value)
    saveToLocalTodos()
  }

  const toggleDone = (todo) => {
    store.commit('checkTodo', todo)
    console.log('che', todo)
    saveToLocalTodos()
  }

  const deleteTask = (task) => {
    store.commit('deleteTodo', task)
    saveToLocalTodos()
  }

  const clickEdit = (todo) => {
    todo.isEdit = true
  }

  const editTask = (todo) => {
    todo.isEdit = false
    store.commit('editTodo', todo)
    saveToLocalTodos()
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