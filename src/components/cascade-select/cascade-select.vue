<template>
  <div class="cascade-select">
    <base-select v-model="goodsCategoryFirst"
                 :data="goodsCategoryFirstList"
                 :placeholder1="placeholder1"
                 :valueKey="valueKey"
                 :labelKey="labelKey"
                 :size="size"
                 :defaultLabel="defaultLabel1"
                 borderRadius="4"
                 @change-visible="_getCategoryFirst"
                 @change="_selectCategoryFirst"
    >
    </base-select>
    <base-select v-model="goodsCategorySecond"
                 :data="goodsCategorySecondList"
                 :placeholder="placeholder2"
                 :valueKey="valueKey"
                 :labelKey="labelKey"
                 :size="size"
                 :defaultLabel="defaultLabel2"
                 borderRadius="4"
                 class="level-two"
                 @change="_selectCategorySecond"
    >
    </base-select>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'

  const COMPONENT_NAME = 'CASCADE_SELECT'
  export default {
    name: COMPONENT_NAME,
    props: {
      getDataFunction: {
        type: Function,
        default: (params)=> API.Goods.getGoodsList(params)
      },
      paramsKey: {
        type: String,
        default: 'parent_id'
      },
      valueKey: {
        type: String,
        default: 'id'
      },
      labelKey: {
        type: String,
        default: 'name'
      },
      size:{
        type: String,
        default: ''
      },
      defaultLabel1:{
        type: String,
        default: ''
      },
      defaultLabel2:{
        type: String,
        default: ''
      },
      placeholder1:{
        type: String,
        default: '一级分类'
      },
      placeholder2:{
        type: String,
        default: '二级分类'
      },
    },
    data() {
      return {
        goodsCategoryFirstList: [],
        goodsCategorySecondList: [],
        goodsCategoryFirst: '',
        goodsCategorySecond: ''
      }
    },
    methods: {
      // 获取一级分类
      async _getCategoryFirst(val) {
        if(!val) return  false
        console.log(111)
        // let functionName = this.getDataFunction || API.Goods.getGoodsList
        console.log(this.getDataFunction)
        let res = await this.getDataFunction({
          data: {[this.paramsKey]: ''},
          loading: false
        })
        this.goodsCategoryFirstList = res.isFail ? [] : res.data
      },
      // 选择第一分类
      async _selectCategoryFirst() {
        let res = await this.getDataFunction({
          data: {[this.paramsKey]: this.goodsCategoryFirst},
          loading: false
        })
        if(res.isFail) return false
        this.goodsCategorySecond = ''
        this.goodsCategorySecondList = res.isFail ? [] : res.data
        this.goodsCategoryChange(this.goodsCategoryFirst)
      },
      async _selectCategorySecond() {
        this.goodsCategoryChange(this.goodsCategorySecond)
      },
      // 选择分类
      async goodsCategoryChange(val) {
        this.$emit('change',val)
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .cascade-select
    display flex
    .level-two
      margin-left: 10px

</style>
