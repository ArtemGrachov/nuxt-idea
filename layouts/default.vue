<template>
  <div>
    <div>
        <NuxtLink :to="'/'">Home</NuxtLink>
        <NuxtLink :to="'/articles'">Articles</NuxtLink>
        <NuxtLink :to="'/articles/create'">Create article</NuxtLink>
        <NuxtLink :to="'/notes'">Notes</NuxtLink>
    </div>
    <hr>
    <Nuxt />
  </div>
</template>
