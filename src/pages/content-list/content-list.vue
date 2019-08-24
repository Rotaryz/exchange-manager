<template>
  <div class="content-list">
    <router-link tag="div" :to="{path:'content-edit', query:{type: 'common'}}" append>
      <base-button type="primary" plain addIcon>创作文章</base-button>
    </router-link>
    <router-view @update="updatePage"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

  const PAGE_NAME = 'CONTENT_LIST'
  const TITLE = '内容列表'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {

    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      updatePage() {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .content-list
    position relative
    width: 100%
    display flex
    flex-direction column

</style>
