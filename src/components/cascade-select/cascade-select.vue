<template>
  <div class="cascade-select">
    <base-select v-model="goodsCategoryFirst"
                 :data="goodsCategoryFirstList"
                 :placeholder="placeholder1"
                 :valueKey="valueKey"
                 :labelKey="labelKey"
                 :size="size"
                 :defaultLabel="defaultLabel1"
                 :width="width"
                 :height="height"
                 :style="inputStyle"
                 radius="4"
                 @change-visible="_getCategoryFirst"
                 @change="_selectCategoryFirst"
    >
    </base-select>
    <base-select v-model="goodsCategorySecond"
                 :data="goodsCategorySecondList"
                 :placeholder="placeholder2"
                 :width="width"
                 :height="height"
                 :style="inputStyle"
                 :valueKey="valueKey"
                 :labelKey="labelKey"
                 :size="size"
                 :defaultLabel="defaultLabel2"
                 radius="4"
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
        default: () => API.Goods.getCategory
      },
      paramsKey: {
        type: String,
        default: 'pid'
      },
      value:{
        type: [String,Boolean,Number],
        default: ''
      },
      valueKey: {
        type: String,
        default: 'id'
      },
      labelKey: {
        type: String,
        default: 'name'
      },
      defaultLabel1: {
        type: String,
        default: ''
      },
      defaultLabel2: {
        type: String,
        default: ''
      },
      placeholder1: {
        type: String,
        default: '一级分类'
      },
      placeholder2: {
        type: String,
        default: '二级分类'
      },
      width: {
        default: '',
        type: [String, Number]
      },
      height: {
        default: '32',
        type: [String, Number]
      },
      inputStyle: {
        default: '',
        type: [String, Object],
      },
      size: {
        default: 'small',
        type: String
      }
    },
    data() {
      return {
        params: {
          pid: -1
        },
        goodsCategoryFirstList: [],
        goodsCategorySecondList: [],
        goodsCategoryFirst: '',
        goodsCategorySecond: ''
      }
    },
    methods: {
      // 获取一级分类
      async _getCategoryFirst(val) {
        if (!val) return false
        let res = await this.getDataFunction()({
          data: {[this.paramsKey]: -1},
          loading: false
        })
        this.goodsCategoryFirstList = res.isFail ? [] : res.data
      },
      // 选择第一分类
      async _selectCategoryFirst() {
        let res = await this.getDataFunction()({
          data: {[this.paramsKey]: this.goodsCategoryFirst},
          loading: false
        })
        if (res.isFail) return false
        this.goodsCategorySecond = ''
        this.goodsCategorySecondList = res.isFail ? [] : res.data
        this.goodsCategoryChange(this.goodsCategoryFirst)
      },
      async _selectCategorySecond() {
        this.goodsCategoryChange(this.goodsCategorySecond)
      },
      // 选择分类
      async goodsCategoryChange(value) {
        this.$emit('update:value', value)
        this.$emit('input', value)
        this.$emit('change', value)
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
