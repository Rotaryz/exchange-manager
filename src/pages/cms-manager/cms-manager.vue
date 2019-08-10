<template>
  <div class="cms-manager">
    <mobile-content :cmsType.sync="type"></mobile-content>
    <base-footer :isSeize="false">
      <base-button plain @click="newCms">新建</base-button>
      <base-button type="primary" @click="submitBtn">保存</base-button>
    </base-footer>
    <div class="edit-modular">
      <div class="box">
        <div class="small">
          <div v-if="type === 'banner'" class="banner">
            <div class="content-header">
              <div class="content-title">轮播图设置</div>
              <div class="content-sub">(最多添加5个广告，鼠标拖拽调整广告顺序)</div>
            </div>
            <slick-list v-model="bannerList" :distance="30" lockAxis="y">
              <slick-item v-for="(item, index) in bannerList" :key="index" :index="index">
                <div class="advertisement-msg">
                  <upload :data.sync="item.image_url" :isShowDel="false" :addStyle="`margin:0;width:100px;height:100px;background-image: url('${addImage}')`" firstTag="更换图片" @delete="deleteGoodsMainPic()"></upload>

                  <!--@click=""-->
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px"><span class="add-icon"></span>添加链接</base-button>
                    <p class="goods-title">{{item.type === 'out_html' || item.type === 'mini_link' ? item.url : item.name}}</p>
                  </div>
                  <p class="use list-operation" @click="showConfirm(item.id, idx)">删除</p>
                </div>
              </slick-item>
            </slick-list>
          </div>
          <div v-if="type === 'hot'" class="hot">
            <div class="content-header">
              <div class="content-title">热门商品</div>
              <div class="content-sub">(最多添加5个热门商品，鼠标拖拽调整广告顺序)</div>
            </div>
            <slick-list v-model="bannerList" :distance="30" lockAxis="y">
              <slick-item v-for="(item, index) in bannerList" :key="index" :index="index">
                <div class="advertisement-msg">
                  <upload :data.sync="item.image_url" :isShowDel="false" :addStyle="`margin:0;width:100px;height:100px;background-image: url('${addImage}')`" firstTag="更换图片" @delete="deleteGoodsMainPic()"></upload>

                  <!--@click=""-->
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px"><span class="add-icon"></span>添加链接</base-button>
                    <p class="goods-title">{{item.type === 'out_html' || item.type === 'mini_link' ? item.url : item.name}}</p>
                  </div>
                  <p class="use list-operation" @click="showConfirm(item.id, idx)">删除</p>
                </div>
              </slick-item>
            </slick-list>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
  import MobileContent from './mobile-content/mobile-content'
  import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
  import Upload from '@components/zb-upload/zb-upload.vue'

  const PAGE_NAME = 'CMS_MANAGER'
  const TITLE = '页面管理'
  const ADD_IMAGE = require('./pic-add_img@2x.png')
  export default {
    name: PAGE_NAME,
    directives: {handle: HandleDirective},
    components: {
      MobileContent,
      SlickList,
      SlickItem,
      Upload
    },
    page: {
      title: TITLE
    },
    data() {
      return {
        addImage: ADD_IMAGE,
        bannerList: [{image_url: 'https://youxian-img.jkweixin.com/1/2019/08/04/156491308026374.png'}, {}],
        type: 'hot'
      }
    },
    methods: {
      newCms() {
      },
      submitBtn() {
      },
      showConfirm() {

      },
      deleteGoodsMainPic() {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .cms-manager
    overflow: hidden
    background: $color-white
    width: 100%
    max-height: 100%
    box-sizing: border-box

  .edit-modular
    height: 100%
    max-height: 100%
    box-sizing: border-box
    overflow-y: hidden
    position: relative

  .box
    top: 0
    left: 0
    bottom: 0px
    width: 100%
    overflow-x: hidden
    position: absolute
    padding: 81px 20px 60px 0
    box-sizing: border-box
    &::-webkit-scrollbar
      width: 4px
      height: 4px
      opacity: 0
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .05)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .1)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .05)
      border-radius: 10px

  /*基本信息类头部盒子样式*/
  .content-header
    border-bottom-1px($color-line)
    display: flex
    align-items: center
    position: relative
    box-sizing: border-box
    padding-bottom: 16px
    line-height: 1
    .excel
      margin-left: 20px
      &:hover
        color: $color-white
    &:before
      content: ''
      position: absolute
      width: 3px
      height: 16px
      background: $color-main
      border-radius: 2px
      top: 0
      left: 0
    .content-title
      text-indent: 13.5px
      color: $color-text-main
      font-family: $font-family-regular
      font-size: $font-size-16
    .content-sub
      margin-left: 10px
      color: #868DAA
      font-family: $font-family-regular
      font-size: $font-size-12

  .advertisement-msg
    height: 140px
    padding: 0 20px
    box-sizing: border-box
    width: 100%
    background: #F4F8F9
    display: flex
    align-items: center
    position: relative
    margin-top: 24px
    border: 0.5px dashed #D9D9D9
    &:first-child
      margin-top: 30px
    .add-advertisement
      position: relative
      margin-left: 20px
      display: flex
      align-items: center
      .add-title
        line-height: 1
        text-decoration: underline
        color: $color-sub
        margin-left: 4px
        font-family: $font-family-regular
        font-size: $font-size-14
        white-space: nowrap
      .select-type
        top: 24px
        background: $color-white
        box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.20)
        border-radius: 2px
        position: absolute
        &.fade-enter, &.fade-leave-to
          opacity: 0
        &.fade-enter-to, &.fade-leave-to
          transition: opacity .3s ease-in-out
        .select-item
          width: 140px
          line-height: 42px
          height: 42px
          border-bottom: 0.5px solid $color-line
          box-sizing: border-box
          text-indent: 11px
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-text-main
          transition: all 0.3s
          &:last-child
            border: none
        .select-item-active
          color: $color-sub
    .advertisement-link
      margin-left: 20px

  .add-icon
    margin: 0 3px 0 0

  .use
    position: absolute
    top: 20px
    right: 20px
    white-space: nowrap
    font-size: $font-size-14
    color: #3E77C3
    margin-left: 21px
    line-height: 1
    user-select: none
    transition: all 0.2s
    &:hover
      color: #06397E
</style>
