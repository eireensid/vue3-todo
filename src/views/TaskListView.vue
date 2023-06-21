<template>
  <section>
    <h1>Список задач</h1>
    <div class="flex align-items-center gap-2">
      <InputText class="task-list__input" id="add-task" v-model="value" aria-describedby="add-task-help" />
      <Button class="task-list__button" type="button" label="Добавить" icon="pi pi-plus" @click="addTask(value)" />
    </div>
    <div class="mt-5">
      <div v-for="todo of todos" :key="todo.key" class="flex align-items-center justify-content-between mb-3">
        <div class="flex align-items-center gap-2 ">
          <Checkbox v-model="selectedTodos" :inputId="todo.key" name="todo" :value="todo.name" />
          <label :for="todo.key">{{ todo.name }}</label>
        </div>
        <div></div>
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
  const value = ref(null)
  const selectedTodos = ref([])
  const { saveToLocalTodos } = useLocalStorage()

  const addTask = (value) => {
    store.commit('addTodo', value)
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