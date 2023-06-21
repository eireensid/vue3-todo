<template>
  <section class="section">
    <h1>Главная</h1>
    <router-link :to="{ name: 'tasks' }">
      Перейти к списку задач
    </router-link>
  </section>
</template>

<style>
.section {
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>