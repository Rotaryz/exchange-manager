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
                 @change-visible="changeVisible"
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
      otherParams: {
        type: String,
        default: () => {
        }
      },
      value: {
        type: [String, Boolean, Number],
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
        type: [String, Object]
      },
      size: {
        default: 'small',
        type: String
      },
      isAddAll: {
        default: false,
        type: Boolean
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
      clearValues() {
        this.goodsCategoryFirst = ''
        this.goodsCategorySecond = ''
      },
      changeVisible(val) {
        if (!val) return
        this._getCategoryFirst()
      },
      getTwoVlaue() {
        return [this.goodsCategoryFirst, this.goodsCategorySecond]
      },
      setValue(otherParams) {
        this._getCategoryFirst(otherParams).then((res) => {
          let item = res.data.find((item) => item.is_selected)
          if (!item) return false
          this.goodsCategoryFirst = item.id
          this._selectCategoryFirst(otherParams).then((res2) => {
            let item2 = res2.data.find((item) => item.is_selected)
            if (!item2) return false
            this.goodsCategorySecond = item2 && item2.id
            this._selectCategorySecond()
          })
        })
      },
      // 获取一级分类
      async _getCategoryFirst(otherParams = {}) {
        return this.getDataFunction()({
          data: {[this.paramsKey]: -1, ...otherParams},
          loading: false
        }).then((res) => {
          if (this.isAddAll) res.data = [{id: '', name: '全部'}, ...res.data]
          this.goodsCategoryFirstList = res.data || []
          return res
        })
      },
      // 选择第一分类
      async _selectCategoryFirst(otherParams = {}) {
        this.goodsCategorySecond = ''
        this.goodsCategorySecondList = []
        let res = null
        // 选择全部时
        if (this.goodsCategoryFirst) {
          // 选择有内容选项
          res = await this.getDataFunction()({
            doctor() {
            },
            data: {[this.paramsKey]: this.goodsCategoryFirst, ...otherParams},
            loading: false
          })
          this.goodsCategorySecondList = res.data || []
        }
        this.goodsCategoryChange(this.goodsCategoryFirst)
        return res
      },
      async _selectCategorySecond() {
        this.goodsCategoryChange(this.goodsCategorySecond)
      },
      // 选择分类
      async goodsCategoryChange(value) {
        this.$emit('update:value', value)
        this.$emit('input', value)
        this.$emit('change', value)
      }
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
