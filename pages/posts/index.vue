<template>
  <section class="container">
    <h1 class="title">
      Posts
    </h1>
    <ul class="posts">
      <li v-for="(post, index) in posts" :key="index" class="post">
        <nuxt-link :to="'posts/' + post.id">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData () {
    let { data } = await axios.get('http://localhost:3000/api/posts')
    console.log(data);
    return { posts: data }
  },
  head () {
    return {
      title: 'Posts'
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
