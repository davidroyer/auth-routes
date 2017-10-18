<template lang="html">
  <nav>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/secret">Secret page</nuxt-link>
    <a href="/api">Api Page</a>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css">
nav {
  display: flex;
  justify-content: space-around;
  max-width: 400px;
}
</style>
