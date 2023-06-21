<template>
  <section class="home">
    <h1>Главная</h1>
    <router-link :to="{ name: 'tasks' }">
      Перейти к списку задач
    </router-link>
  </section>
</template>

<style scoped>
.home {
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>