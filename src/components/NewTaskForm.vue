<template>
  <form class="flex align-items-center gap-2" @click.prevent="addTask(newTodoValue)">
    <div class="flex flex-column gap-2 relative">
      <InputText class="task-list__input" id="add-task" v-model="newTodoValue" aria-describedby="add-task-help"
                 @keyup.enter="addTask(newTodoValue)" autocomplete="none" />
      <span class="absolute left-0 top-100 text-base text-red-500 py-1" v-show="store.getters.getTodoByName(newTodoValue) && newTodoValue !== ''"
            id="add-task-help">Такая задача уже есть</span>
    </div>
    <Button type="submit" class="task-list__button" label="Добавить" severity="success" icon="pi pi-plus"
            :disabled="newTodoValue === '' || store.getters.getTodoByName(newTodoValue)" />
  </form>
</template>

<script lang="ts" setup>
  import store from "../store";
  import {ref} from "vue";

  const newTodoValue = ref<string>('')

  const addTask = (value: string) => {
    if (!store.getters.getTodoByName(value) && value !== '') {
      store.commit('addTodo', value)
      newTodoValue.value = ''
    }
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