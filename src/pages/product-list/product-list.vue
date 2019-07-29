<template>
  <div class="product-list normal-box table">
    <base-layout class="layout-top">
      <base-form-item label="分类筛选" :inline="true" :required="false" verticalAlign="center">
        <base-select :data="arr" :value.sync="selectId" size="small" class="type-frist"></base-select>
        <base-select :data="arr" :value.sync="selectId" size="small"></base-select>
      </base-form-item>
      <base-form-item :inline="true" :required="false" verticalAlign="center">
        <base-search></base-search>
      </base-form-item>
    </base-layout>
    <base-table-tool iconUrl="images/icons/icon-product_list@2x.png" title="商品列表">
      <router-link tag="div" to="edit-product" append>
        <base-button type="primary" plain addIcon>新建商品</base-button>
      </router-link>
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box"></div>
        <div class="list">
          <div v-for="i in 2" :key="i" class="list-content list-box">
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
            <div class="list-item">1</div>
          </div>
        </div>
        <div class="pagination-box">
          <!--:pageDetail="contentClassPage"-->
          <base-pagination ref="pages"></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import API from '@api'

  const PAGE_NAME = 'PRODUCT_LIST'
  const TITLE = '商品列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {},
    data() {
      return {
        visible: false,
        selectId: '',
        inputValue: '1122',
        arr: [{id: 111, label: 'ajsdf'}]
      }
    },
    mounted() {
      // console.log(this.$confirm)
      // this.$confirm.confirm().then(() => {
      //   console.log('确认 ')
      // }, () => {
      //   console.log('取消 ')
      // })
    },
    methods: {
      showModal() {
        console.log(111)
        this.visible = true
      },
      changeVisible(val) {
        console.log(val)
        // this.visible = val
      },
      beforeClose(done) {
        console.log(1111)
        // console.log(done)
        done()
      },
      getValue() {
        console.log(1111)
        this.visible = true
        console.log(this.inputValue)
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .product-list
    width: 100%

  .layout-top
    padding: 24px
    margin-bottom: 20px

  .type-frist
    margin-right: 10px
</style>
