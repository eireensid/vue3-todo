<template>
  <section>
    <h1>Главная</h1>
    <router-link :to="{ name: 'tasks' }">
      Перейти к списку задач
    </router-link>
  </section>
</template>