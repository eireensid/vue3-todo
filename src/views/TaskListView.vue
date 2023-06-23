<template>
  <section>
    <h1>Список задач</h1>
    <NewTaskForm/>
    <TaskList/>
  </section>
</template>

<script lang="ts" setup>
  import NewTaskForm from "../components/NewTaskForm.vue";
  import TaskList from "../components/TaskList.vue";
</script>