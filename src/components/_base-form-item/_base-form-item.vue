<template>
  <div class="base-form-item" :class="[{inline:inline},verticalAlign]">
    <div class="label-text" :style="{width:labelWidth,'text-align':labelAlign,height:labelHeight,'line-height':labelHeight,margin:labelMargin}">
      <span v-if="required" class="required-mask">*</span>
      {{label}}
    </div>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_FORM_ITEM'

  export default {
    name: COMPONENT_NAME,
    props: {
      inline:{
        default: false,
        type: Boolean
      },
      label: {
        default: '',
        type: String
      },
      labelWidth:{
        default: '',
        type: String
      },
      labelAlign:{
        default: '',
        type: String
      },
      verticalAlign:{
        default: 'center',
        type: String
      },
      labelHeight:{
        default: '',
        type: String
      },
      labelMargin:{
        default: '',
        type: String
      },
      required: {
        default: false,
        type: Boolean
      },

    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .base-form-item
    width: 100%
    marign-bottom:24px
    &.inline
      display flex
      &.top
        align-items flex-start
      &.center
        align-items center
      &.bottom
        align-items flex-end
    .required-mask
      color: $color-error
    .label-text
      font-family: $font-family-regular
      font-size: $font-size-14
      color: $color-text-main
      line-height: 44px
      height: 44px
      margin-right:40px
</style>
