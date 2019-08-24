<template>
  <div class="brand-list">
    <router-link tag="div" :to="{path:'brand-edit'}" append>
      <base-button type="primary" plain addIcon>创建品牌</base-button>
    </router-link>
    <router-view @update="updatePage"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

  const PAGE_NAME = 'BRAND_LIST'
  const TITLE = '品牌列表'
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

  .brand-list
    position relative
    width: 100%
    display flex
    flex-direction column

</style>
