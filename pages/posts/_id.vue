<template>
  <section class="container">
    <h1 class="title">
      {{post.title}}
    </h1>
    <div v-html="post.content"></div>
    <nuxt-link class="backButton" to="/posts">
      << Back To All Posts
    </nuxt-link>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({params}) {
    const postID = parseInt(params.id)
    let { data } = await axios.get(`http://localhost:3000/api/posts/${postID}`)
    return { post: data }
  },

  head () {
    return {
      title: 'Post Here'
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.backButton
{
  margin-top: 30px;
  float: right;
}

</style>
