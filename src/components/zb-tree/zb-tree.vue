<template>
  <ul class="zb-tree categories-box">
    <li v-for="(item, index) in data" :key="index" class="big-box">
      <div class="big-box-main">
        <div class="big-main-left hand" @click="openBtn(index)">
          <div class="icon" :class="selects[index] ? 'open' : ''"></div>
          <div v-if="item[imageKey]" class="img">
            <img class="img-icon" :src="item[imageKey]" alt="">
          </div>
          <div class="text">{{item[labelKey]}} <span class="tip">({{item[childrenKey] && item[childrenKey].length}}个子类)</span></div>
        </div>
        <div class="big-main-right">
          <span class="list-operation" @click="editBtn(item, index)">修改</span>
          <span class="list-operation" @click="deleteBtn(item, index)">删除</span>
        </div>
      </div>
      <div v-if="selects[index]" class="open-list">
        <div v-for="(twoitem, twoindex) in item[childrenKey]" :key="twoindex" class="open-item">
          <div class="open-item-left">{{twoitem[labelKey]}}</div>
          <div class="big-main-right">
            <span class="list-operation" @click="editChildBtn(item, index, twoitem, twoindex)">修改</span>
            <span class="list-operation" @click="deleteChildBtn(item, index, twoitem, twoindex)">删除</span>
          </div>
        </div>
        <div class="add-box hand" @click="addChild(item, index)">
          <div class="add-icon"></div>
          <div class="text">添加</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'ZB_TREE'

  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        default: () => [],
        type: Array
      },
      labelKey: {
        type: String,
        default: 'name'
      },
      valueKey: {
        type: String,
        default: 'id'
      },
      imageKey: {
        type: String,
        default: 'image_url'
      },
      childrenKey: {
        type: String,
        default: 'list'
      }
    },
    data() {
      return {
        selects: []
      }
    },
    created() {},
    methods: {
      openBtn(index) {
        this.$set(this.selects, index, !this.selects[index])
      },
      addChild(item, index) {
        this.$emit('add-item', {item, index})
      },
      editBtn(item, index) {
        this.$emit('edit-item', {item, index})
      },
      deleteBtn(item, index) {
        this.$emit('delete-item', {item, index})
      },
      editChildBtn(item, index, childItem, childIndex) {
        this.$emit('edit-item', {item, index, childItem, childIndex})
      },
      deleteChildBtn(item, index, childItem, childIndex) {
        this.$emit('delete-item', {item, index, childItem, childIndex})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .img-icon
    width: 100%
    height: @width
    display: block
    object-fit: cover

  .product-top
    layout(row)
    align-items: center
    justify-content: space-between
    height: 80px

  .base-status-tab
    margin-left: 30px
    display: flex
    background: #F6F6F6
    border-radius: 100px
    height: 30px
    box-sizing: border-box
    position: relative

    .status-tab-item
      border-radius: 100px
      width: 106px
      color: $color-text-main
      line-height: 30px
      text-align: center
      transition: 0.2s all
      font-size: $font-size-14
      font-family: $font-family-regular
      background: transparent
      position: relative
      z-index: 1

  .categories-box
    border-1px($color-line, 1px)

    .big-box
      width: 100%
      border-bottom-1px($color-line)

      &:last-child
        border-none()

      .big-box-main
        height: 60px
        padding-left: 22px
        padding-right: 14px
        box-sizing: border-box
        layout(row)
        align-items: center
        justify-content: space-between

        .big-main-left
          layout(row)
          align-items: center
          min-height: 100%
          min-width: 200px

          .icon
            width: 16px
            height: 16px
            border-radius: 50%
            background-size: 16px
            bg-image('icon-retract')

            &.open
              bg-image('icon-open')

          .img
            width: 32px
            height: 32px
            border-radius: 2px
            border: 0.5px solid $color-line
            margin: 0 10px
            overflow: hidden

          .text
            font-size: $font-size-14
            line-height: 1
            color: $color-text-main
            font-family: $font-family-regular

          .tip
            color: $color-text-assist

  .add-box
    height: 60px
    border-top-1px($color-line)
    padding-left: 22px
    layout(row)
    align-items: center
    .add-icon
      margin-right: 6px
      width: 12px
      height: @width

    .text
      font-size: $font-size-14
      line-height: 1
      color: $color-main
      font-family: $font-family-regular

  .open-item
    height: 60px
    border-top-1px($color-line)
    background: #FFFFFF
    padding-left: 90px
    padding-right: 14px
    layout(row)
    align-items: center
    justify-content: space-between
    font-size: $font-size-14

    &:nth-child(2n -1)
      background: #F4F8F9

    &:hover
      background: #e8f4f9

    .open-item-left
      font-size: $font-size-14
      color: $color-text-main
      font-family: $font-family-regular

  .product-categories
    width: 100%
</style>
