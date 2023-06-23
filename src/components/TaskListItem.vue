<template>
  <Checkbox v-model="isChecked" :inputId="todo.key" name="todo" @input="toggleDone(todo)" binary />
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
</template>

<script lang="ts" setup>
import {ref} from "vue";
  import { Todo } from "../types/todo";
  import store from "../store";

  const props = defineProps<({
    todo: Todo
  })>()

  const isChecked = ref<boolean>(props.todo.done)

  const toggleDone = (todo: Todo) => {
    store.commit('filterTodo', todo)
  }

  const editTask = (todo: Todo) => {
    if (todo.name !== '') {
      todo.isEdit = false
      store.commit('editTodo', todo)
    }
  }

</script>