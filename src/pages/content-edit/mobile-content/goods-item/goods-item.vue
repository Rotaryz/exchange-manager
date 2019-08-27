<template>
  <div class="good-item">
    <div class="goods-photo-wrap">
      <img v-if="goodsData.status === 0" src="../pic-off_shelf@2x.png" class="goods-photo fix-photo">
      <img v-else-if="goodsData.saleable === 0" src="../pic-out_stock@2x.png" class="goods-photo fix-photo">
      <img :src="goodsData.goods_cover_image" class="goods-photo">
    </div>
    <div class="info">
      <div v-if="goodsData && goodsData.name" class="name">{{goodsData.name}}</div>
      <div class="details">{{goodsData.describe}}</div>
      <div class="operate">
        <span class="price-now">
          <span class="big">¥{{goodsData.discount_price}}</span>
          <span class="unit">元</span>
        </span>
        <span class="price">¥{{goodsData.price}}元</span>
      </div>
    </div>
    <div class="operate-btn">
      <img src="./icon-right_goods@2x.png" class="add-img" @click="addBtn">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const PAGE_NAME = 'GOODS_ITEM'
  export default {
    name: PAGE_NAME,
    components: {},
    props: {
      addDisabled: {
        type: Boolean,
        default: false
      },
      goodsData: {
        require: true,
        type: Object,
        default: function () {
          return {
            name: '',
            details: '',
            price: '',
            photo: ''
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      addBtn() {
        if (this.addDisabled) return false
        this.$emit('add-click', this.goodsData)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .good-item
    display flex
    align-items center
    background: #FFFFFF
    border: 1px solid #EFEFEF
    box-shadow: 0 4px 6px 0 rgba(17, 17, 17, 0.02)
    margin-bottom 15px
    height: 66px
    padding: 3px 0px

    .goods-photo-wrap
      width: 66px
      height: 66px
      position relative

    .goods-photo
      width: 66px
      height: 66px
      flex-shrink: 0
      object-fit cover
      flex-shrink 0

    .fix-photo
      width: 40px
      height:40px
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      position absolute

    .info
      height: 66px
      padding: 5px 5px 5px 10px
      overflow: hidden
      flex: 1
      display flex
      flex-direction column
      justify-content space-between
      .name
        font-family $font-family-medium
        font-size: $font-size-13
        color: #111111
        overflow hidden
        text-overflow ellipsis
        white-space: nowrap

      .details
        font-family $font-family-regular
        font-size: 10px
        color: #B3B7BB
        margin-bottom 7px
        overflow hidden
        text-overflow ellipsis
        white-space: nowrap

      .operate
        display flex
        justify-content space-between
        align-items center
        flex-wrap nowrap
        overflow hidden

      .price-now
        color: #D83F35
        font-family:$font-family-medium

        .big
          font-size: $font-size-14

        .unit
          font-family $font-family-regular

      .price
        color: #B7B7B7
        font-size: $font-size-12
        font-family $font-family-regular
        white-space: nowrap
        text-decoration-line: line-through
        margin-left 6px

    .operate-btn
      padding: 5px

    .add-img
      width: 20px
      height: 20px


</style>
