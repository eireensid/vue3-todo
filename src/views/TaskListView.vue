<template>
  <section>
    <h1>Список задач</h1>
    <div class="flex align-items-center">
      <InputText id="add-task" v-model="value" aria-describedby="add-task-help" />
      <Button type="button" label="Добавить" icon="pi pi-plus" @click="addTask(value)" />
    </div>
    <div v-for="todo of todos" :key="todo.key" class="flex align-items-center gap-2">
      <Checkbox v-model="selectedTodos" :inputId="todo.key" name="todo" :value="todo.name" />
      <label :for="todo.key">{{ todo.name }}</label>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import store from "../store";
  import {ref} from "vue";
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';

  const todos = store.state.todos
  const value = ref(null)
  const selectedTodos = ref([])

  const addTask = (value) => {
    store.commit('addTodo', value)
  }
</script>