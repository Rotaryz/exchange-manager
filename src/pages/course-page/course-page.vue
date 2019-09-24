<template>
  <div class="course-page">
    <course-content :bannerList="bannerList" :cmsType.sync="type" :cmsList="moduleList"></course-content>
    <div class="edit-modular">
      <div class="box">
        <div class="small">
          <div v-if="type === 'banner'" class="banner">
            <div class="content-header">
              <div class="content-title">轮播图设置</div>
              <div class="content-sub">(最多添加5个banner，鼠标拖拽调整广告顺序)</div>
            </div>
            <slick-list v-model="bannerList" :distance="30" lockAxis="y">
              <slick-item v-for="(item, index) in bannerList" :key="index" :index="index">
                <div class="advertisement-msg" @click="getIndex(index)">
                  <upload
                    :data.sync="item.detail.image_url"
                    :multiple="false"
                    :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                    imgStyle="width: 100px; height: 100px"
                    :indicatorPosition="false"
                    :isShowDel="false"
                    :isChange="true"
                    firstTag="更换图片"
                    @delete="deleteGoodsMainPic()"
                    @successImage="successImage"
                  ></upload>

                  <!--@click=""-->
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)">
                      <span class="add-icon"></span>添加链接
                    </base-button>
                    <p class="goods-title">{{(item.style === 3004 || item.style === 3005) ? item.detail.url :
                      item.detail.title}}</p>
                  </div>
                  <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                </div>
              </slick-item>
            </slick-list>
          </div>
        </div>
        <!--弹窗-->
        <base-modal
          ref="goods"
          class="page-modal"
          width="1000"
          :visible.sync="showModal"
          :submitBefore="justifyForm"
          @cancel="hideModal"
          @submit="modalConfirm"
        >
          <div class="model">
            <div class="shade-header">
              <div class="shade-tab-type">
                <div v-for="(items, index) in modalTypeList" :key="index" :class="{'shade-tab-item-active': tabIndex === index}" class="shade-tab-item hand" @click="setLinkType(index, $event)">
                  {{items.title}}
                </div>
                <div class="line" :style="{left: left}"></div>
              </div>
              <span class="close hand" @click="hideModal"></span>
            </div>
            <!--课程列表-->
            <div v-if="modalType === 3006" class="goods-modal">
              <div class="shade-tab">
                <base-search
                  v-model="modalKeyword"
                  :width="244"
                  :isShowTip="false"
                  boxStyle="margin-left: 0"
                  placeholder="请输入内容文章标题"
                  @search="searchCourse"
                ></base-search>
              </div>
              <div class="goods-content article">
                <div class="goods-item goods-header">
                  <div class="goods-text"></div>
                  <div class="goods-text">文章封面</div>
                  <div class="goods-text">标题</div>
                </div>
                <div class="goods-list">
                  <div v-for="(item, index) in courseList" :key="index" class="goods-item">
                    <div class="goods-text">
                      <div class="select-icon hand" :class="{'select-icon-active': selectIndex === index}" @click="selectCourse(item, index)">
                        <span class="after"></span>
                      </div>
                    </div>
                    <div class="goods-text goods-msg">
                      <img :src="item.cover_image_url" alt="" class="goods-img">
                    </div>
                    <div class="goods-text">{{item.title}}</div>
                  </div>
                </div>
              </div>
              <div v-if="total > 0" class="page-box">
                <base-pagination ref="pages" :currentPage.sync="page" :total="total" :pageSize="6"></base-pagination>
              </div>
            </div>
            <!--小程序链接-->
            <div v-if="modalType === 3005" class="link-text">
              <textarea v-model="modalLink" class="link-text-box" placeholder="请输入小程序链接"></textarea>
            </div>
          </div>
        </base-modal>
        <base-footer :isSeize="false">
          <base-button plain @click="newCms">新建</base-button>
          <base-button type="primary" @click="saveCms">保存</base-button>
        </base-footer>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import CourseContent from './course-content/course-content'
  import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
  import Upload from '@components/zb-upload/zb-upload.vue'
  const PAGE_NAME = 'COURSE_PAGE'
  const TITLE = '页面布局'

  export default {
    name: PAGE_NAME,
    directives: {handle: HandleDirective},
    components: {
      CourseContent,
      SlickList,
      SlickItem,
      Upload
    },
    page: {
      title: TITLE
    },
    data() {
      return {
        addImage: require('./pic-add_img@2x.png'),
        bannerList: [],
        type: 'banner',
        modalType: 3006,
        moduleList: [],
        showModal: false,
        modalTypeList: [],
        tabIndex: [],
        left: 0,
        courseList: [],
        selectIndex: 0,
        page: 1,
        total: 1,
        modalLink: '',
        modalKeyword: ''
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Cms.moduleShow({data: {code: 'gift_index'}})
        .then((res) => {
          next((vx) => {
            vx.moduleList = res.data.children
            res.data.children.forEach((item, idx) => {
              if (item.code === 'banner') {
                vx.bannerList = item.children
              }
            })
          })
        })
        .catch(() => {
          next('404')
        })
    },
    methods: {
      getIndex() {},
      deleteGoodsMainPic() {},
      successImage() {},
      showModalBox() {
        this.showModal = true
      },
      showConfirm() {},
      newCms() {},
      saveCms() {},
      justifyForm() {},
      hideModal() {},
      modalConfirm() {},
      searchCourse() {},
      selectCourse() {},
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .course-page
    width: 100%
    background: #ffffff
  .edit-modular
    height: 100%
    max-height: 100%
    box-sizing: border-box
    overflow-y: hidden
    position: relative

  .box
    top: 0
    left: 0
    bottom: 60px
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
    border-bottom: 1px solid $color-line
    display: flex
    align-items: center
    position: relative
    box-sizing: border-box
    padding-bottom: 16px
    line-height: 1
    margin-bottom: 30px
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
    &.sub-header
      margin-top: 24px
      &::before
        display: none
      .content-title
        text-indent: 0

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
    user-select: none
    .img-box
      position: relative
      width:100px
      height:100px
      margin:0 20px 0 0
      background: #FFF
      .status-box
        position: absolute
        top: 15px
        left: 15px
        width:70px
        height:70px
        line-height:70px
        font-family: $font-family-regular
        color: #fff
        text-align: center
        background: rgba(0,0,0,0.5)
        border-radius: 100%
    .cate-image
      width:100px
      height:100px
      margin:0 20px 0 0
      object-fit: cover
      border: none
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
      display: flex
      align-items: center
      overflow: hidden
      .top-box
        layout(row)
        align-items: center
      .goods-title
        flex: 1
        margin-left: 18px
        line-height: 1.2
        no-wrap()
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-14
        &.margin-left-0
          margin-left: 0
      .brand-title
        width: 40px
        height: 20px
    .column
      align-items: flex-start
      flex-direction: column
      justify-content: space-between
      height: 92px
  .add-icon
    margin: 0 3px 0 0

  .use
    position: absolute
    top: 20px
    right: 20px
    white-space: nowrap
    font-size: $font-size-14
    margin-left: 21px
    line-height: 1
    user-select: none
    transition: all 0.2s
</style>
