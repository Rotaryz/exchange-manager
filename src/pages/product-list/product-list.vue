<template>
  <div class="product-list normal-box table">
    <div v-for="i in 1" :key="i" class="down-content">
      <base-search></base-search>
    </div>
    <base-input v-model="inputValue" placeholder="safdsaf ;fk"></base-input>
    <base-input v-model="selectId" placeholder="sdfkasdl;fk" type="textarea"></base-input>
    <base-select :data="arr" :value.sync="selectId"></base-select>
    <base-form-item label="我说的司法" labelHeight="50px" :inline="true" :required="true" verticalAlign="center">
      <base-input v-model="selectId" placeholder="sdfkasdl;fk" type="textarea"></base-input>

    </base-form-item>
    <div>
      <base-button  addIcon @click="getValue">get</base-button>
      <base-button type="primary" disable plain @click="getValue">get</base-button>
    </div>
    <button>9999</button>
    <div class="table-content">
      <div class="identification">
        <div class="identification-page">
          <img src="./icon-product_list@2x.png" class="identification-icon">
          <p class="identification-name">商品列表</p>
        </div>
        <div class="function-btn">
          <router-link tag="div" to="edit-product" append class="btn-main">新建商品<span class="add-icon"></span></router-link>
        </div>
      </div>
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

  // import * as Helpers from './helpers'
  // import API from '@api'
  const PAGE_NAME = 'PRODUCT_LIST'
  const TITLE = '商品列表'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        selectId:'',
        inputValue: '1122',
        arr:[{id:111,label:'ajsdf'}]
      }
    },
    methods:{
      getValue() {
        console.log(this.inputValue)
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .product-list
    width: 100%
</style>
