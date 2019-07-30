<template>
  <div class="zb-radio">
    <div v-for="item in list" :key="item[valueKey]" class="ratio-item" @click="changeValue(item)">
      <span class="radio__input" :class="{'is-check':item[valueKey] == value}">
        <span class="radio__inner"></span>
      </span>
      <label :for="'item'+item[valueKey]" class="radio__label">{{item[labelKey]}}</label>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'ZB_RADIO'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      list: {
        type: Array,
        default: () => []
      },
      labelKey: {
        type: String,
        default: 'label'
      },
      valueKey: {
        type: String,
        default: 'id'
      }
    },
    methods: {
      changeValue(item) {
        if(item[this.valueKey] === this.value) return false
        this.$emit('input', item[this.valueKey])
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .zb-radio
    .ratio-item
      cursor: pointer;
      display: inline-block
      white-space: nowrap;
      outline: none;
      font-size: 14px
      margin-right: 60px

      .radio__input
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle
        margin-right: 10px

        .radio__inner
          border: 1px solid #CDD0D4
          border-radius: 100%
          width: 18px
          height: 18px
          background-color: #F6F5FA
          cursor: pointer
          display: inline-block

        &.is-check .radio__inner
          display: inline-block
          height: 18px
          width: 18px
          border: 5px solid #409eff
          background: #fff
          position: relative

        .radio-input__original
          opacity: 0;
          outline: none;
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;

</style>
