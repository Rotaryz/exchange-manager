<template>
  <div class="course-page">
    <course-content :bannerList="moduleObj.banner.children" :cmsType.sync="type" :cmsList="moduleList"></course-content>
    <div class="edit-modular">
      <div class="box">
        <div class="small">
          <!--banner-->
          <div v-if="type === 'banner'" class="banner">
            <div class="content-header">
              <div class="content-title">轮播图设置</div>
              <div class="content-sub">(最多添加5个banner，鼠标拖拽调整广告顺序)</div>
            </div>
            <slick-list v-model="moduleObj[type].children" :distance="30" lockAxis="y">
              <slick-item v-for="(item, index) in curModuleChildren" :key="index" :index="index">
                <div class="advertisement-msg" @click="setCurItem(item)">
                  <upload
                    :data.sync="item.detail.image_url"
                    :multiple="false"
                    :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                    imgStyle="width: 100px; height: 100px"
                    :indicatorPosition="false"
                    :isShowDel="false"
                    :isChange="true"
                    firstTag="更换图片"
                    @successImage="uploadSuccess"
                  ></upload>

                  <!--@click=""-->
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px" @click="showModalBox(item)">
                      <span class="add-icon"></span>添加链接
                    </base-button>
                    <p class="goods-title">{{(item.style === 3004 || item.style === 3005) ? item.detail.url :
                      item.detail.title}}</p>
                  </div>
                  <p class="use list-operation" @click="deleteItem(item.id, index)">删除</p>
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
          @cancel="hideModalBox"
          @submit="modalConfirm"
        >
          <div class="model">
            <div class="shade-header">
              <div class="shade-tab-type">
                <div v-for="(items, index) in modalTypeList" :key="index" :class="{'shade-tab-item-active': tabIndex === index}" class="shade-tab-item hand" @click="setModalType(index, $event)">
                  {{items.title}}
                </div>
                <div class="line" :style="{left: lineStyle.left, width: lineStyle.width}"></div>
              </div>
              <span class="close hand" @click="hideModalBox"></span>
            </div>
            <!--会议列表-->
            <div v-if="modalType === 3013 || modalType === 3014" class="goods-modal">
              <div class="shade-tab">
                <base-search
                  v-model="modalParams.keyword"
                  :width="244"
                  :isShowTip="false"
                  boxStyle="margin-left: 0"
                  :placeholder="'请输入'+modalTypeList[tabIndex].name"
                  @search="modalSearch"
                ></base-search>
              </div>
              <div class="goods-content article">
                <div class="goods-item goods-header">
                  <div class="goods-text"></div>
                  <div class="goods-text">{{modalTypeList[tabIndex].name}}</div>
                </div>
                <div class="goods-list">
                  <div v-for="(item, index) in courseList" :key="index" class="goods-item hand" @click="modalSelect(item, index)">
                    <div class="goods-text">
                      <div class="select-icon hand" :class="{'select-icon-active': selectIndex === index}">
                        <span class="after"></span>
                      </div>
                    </div>
                    <div class="goods-text goods-msg">
                      <img :src="item.cover_image" alt="" class="goods-img">
                      {{item.name}}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="modalParams.total > 0" class="page-box">
                <base-pagination ref="pages" :currentPage.sync="modalParams.page" :total="modalParams.total" :pageSize="6" @pageChange="_getCourseList"></base-pagination>
              </div>
            </div>
            <!--小程序链接-->
            <div v-if="modalType === 3005" class="link-text">
              <textarea v-model="modalParams.link" class="link-text-box" placeholder="请输入自定义链接"></textarea>
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
        type: 'banner',
        modalType: 3013,
        moduleList: [],
        moduleObj: {
          banner: {children: []}
        },
        curItem: {},
        showModal: false,
        modalTypeList: [{title: '选择会议', name: '会议名称', status: 3013}, {title: '选择课程', name: '课程名称', status: 3014}, {title: '小程序链接', status: 3005}],
        tabIndex: 0,
        lineStyle: {
          left: 0,
          width: '64px'
        },
        courseList: [],
        selectIndex: -1,
        selectItem: {},
        modalParams: {
          page: 1,
          total: 0,
          link: '',
          keyword: ''
        }
      }
    },
    computed: {
      curModuleChildren() {
        // 当前模块的children
        return this.moduleObj[this.type].children
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Cms.moduleShow({data: {code: 'market_index'}})
        .then((res) => {
          next((vx) => {
            vx.moduleList = res.data.children
            res.data.children.forEach((item, idx) => {
              vx.moduleObj[item.code] = item
            })
          })
        })
        .catch(() => {
          next('404')
        })
    },
    methods: {
      // 获取模块信息
      getModule() {
        API.Cms.moduleShow({data: {code: 'market_index'}})
          .then((res) => {
            this.moduleList = res.data.children
            res.data.children.forEach((item, idx) => {
              this.moduleObj[item.code] = item
            })
          })
      },
      // 设置当前操作的内容
      setCurItem(item) {
        this.curItem = item
        this.modalParams.link = item.detail.url||''
      },
      // 上传图片成功
      uploadSuccess(res) {
        this.$set(this.curItem.detail, 'image_url', res.data.url)
        this.$set(this.curItem.detail, 'image_id', res.data.id)
        this.$forceUpdate()
      },
      // 获取会议/课程列表
      _getCourseList() {
        let apiArr = ['getMeetingList','getCourseList']
        API.Meeting[apiArr[this.tabIndex]]({data: {page: this.modalParams.page, limit: 6, keyword: this.modalParams.keyword, status: 1}}).then((res) => {
          this.courseList = res.data
          this.modalParams.total = res.meta.total
        })
      },
      // 弹窗显示
      showModalBox() {
        // 重置弹窗的参数
        this.modalParams = {page: 1, total: 0, link: '', keyword: ''}
        this._getCourseList()
        this.showModal = true
      },
      hideModalBox() {
        this.showModal = false
        this.modalParams.link = ''
        this.setModalType(0)
      },
      // 弹窗切换tab
      setModalType(index, e = {target: {offsetLeft: 0, offsetWidth: '64'}}) {
        // 重置弹窗的参数
        this.modalParams = {page: 1, total: 0, link: '', keyword: ''}
        this.courseList = []
        this.selectItem = {}
        this.selectIndex = -1

        this.tabIndex = index
        this.lineStyle = {left: e.target.offsetLeft + 'px', width: e.target.offsetWidth + 'px'}
        this.modalType = this.modalTypeList[index].status
        this._getCourseList()
      },
      // 弹窗的搜索
      modalSearch() {
        this.modalParams.page = 1
        this._getCourseList()
      },
      // 弹窗的单选框
      modalSelect(item, index) {
        this.selectItem = item
        this.selectIndex = index
      },
      // 弹窗点击确认按钮前检查
      justifyForm(done) {
        if (this.modalType === 3005 && !this.modalParams.link) {
          this.$toast.show('小程序链接不能为空')
          return
        }
        done()
      },
      // 弹窗的确认按钮
      modalConfirm() {
        switch (this.modalType) {
        case 3005:
          if (!this.modalParams.link) {
            this.$toast.show('小程序链接不能为空')
            return
          }
          this.curItem.detail.url = this.modalParams.link
          break
        case 3013:
        case 3014:
          this.curItem.detail.title = this.selectItem.name
          this.curItem.detail.object_id = this.selectItem.id
          this.curItem.detail.image_url = this.selectItem.cover_image
          this.curItem.detail.image_id = this.selectItem.cover_image_id
          break
        }
        this.curItem.style = this.modalType
        this.hideModalBox()
      },
      // 新建按钮
      newCms() {
        if (this.type === 'banner' && this.curModuleChildren.length >= 5) {
          this.$toast.show('最多添加5个轮播图')
          return
        }
        this.curModuleChildren.push({detail: {object_id: '', url: '', title: '', image_id: '',}, style: ''})
        let ele = document.querySelector('.box')
        setTimeout(() => {
          ele.scrollTop = ele.scrollHeight
        }, 100)
      },
      // 保存按钮
      saveCms() {
        let curModule = this.moduleObj[this.type]
        for (let i = 0; i < this.curModuleChildren.length; i++) {
          let item = this.curModuleChildren[i]
          if(!item.detail.image_url) {
            this.$toast.show(`第${i + 1}个banner图片不能为空`, 1500)
            return
          }
          if(!item.detail.title && !item.detail.url) {
            this.$toast.show(`第${i + 1}个banner不能为空`, 1500)
            return
          }
          item.parent_id = curModule.id
          item.sort = i
        }
        API.Cms.saveModule({data: {data: [curModule]}}).then((res) => {
          this.$toast.show('保存成功')
          this.getModule()
        })
      },
      // 删除
      deleteItem(id, index) {
        if (!id) {
          this.curModuleChildren.splice(index, 1)
          return
        }
        this.$confirm
          .confirm()
          .then(() => {
            API.Cms.delDestroy({data: {id}}).then((res) => {
              this.curModuleChildren.splice(index, 1)
            })
          })
          .catch(() => {
          })
      }
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

  /*弹窗*/
  .model
    width: 52.08vw
    height: 592px
    .shade-header
      display: flex
      justify-content: space-between
      height: 52px
      box-sizing: border-box
      padding: 23px 0 0 0
      .shade-tab-type
        height: 100%
        display: flex
        position: relative
      .shade-tab-item
        position: relative
        line-height: 1
        display: flex
        transition: all 0.3s
        color: $color-text-main
        font-family: $font-family-regular
        margin-right: 40px
      .shade-tab-item-active
        font-family: $font-family-medium
      .line
        transition: all 0.3s
        position: absolute
        left: 0
        bottom: 0
        width: 64px
        height: 3px
        &:after
          content: ""
          position: absolute
          left: 0
          right: 0
          margin: auto
          width: 32px
          height: 3px
          background: $color-main
          border-radius: 3px
      .shade-title
        color: $color-text-main
        font-family: $font-family-medium
        font-size: $font-size-16
      .close
        icon-image('icon-close')
        width: 12px
        height: @width
        transition: all 0.3s
    .shade-tab
      height: 68px
      align-items: center
      box-sizing: border-box
      display: flex
    .goods-content
      border-radius: 4px
      height: 405px
      .goods-list
        flex-wrap: wrap
        display: flex
      .goods-item
        box-sizing: border-box
        padding: 0 20px 0 20px
        width: 100%
        height: 60px
        display: flex
        align-items: center
        position: relative
        &:last-child
          border-bottom-1px($color-line)
        &:before
          content: ""
          pointer-events: none // 解决iphone上的点击无效Bug
          display: block
          position: absolute
          left: 0
          top: 0
          transform-origin: 0 0
          border-right: 1px solid #E9ECEE
          border-left: 1px solid #E9ECEE
          border-top: 1px solid #E9ECEE
          box-sizing border-box
          width: 200%
          height: 100%
          transform: scaleX(.5) translateZ(0)
          @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
            width: 100%
            height: 300%
            transform: scaleX(1 / 3) translateZ(0)
        &:nth-child(2n)
          background: #F4F8F9
        .goods-img
          margin-right: 10px
          width: 75px
          height: 42px
          min-height: @height
          min-width: @width
          object-fit: cover
          overflow: hidden
          background-repeat: no-repeat
          background-size: cover
          background-position: center
          background-color: $color-background
        .goods-name
          no-wrap()
        .goods-name, .goods-money
          line-height: 1
          font-size: $font-size-14
        .add-btn
          border-radius: 2px
          margin-left: 88px
          padding: 7px 0
          width: 56px
          text-align: center
        .add-btn-disable
          border-radius: 2px
          margin-left: 88px
          padding: 7px 0
          width: 56px
          box-sizing: border-box
          text-align: center
          font-size: $font-size-14
          line-height: 1
          cursor: not-allowed
          background: $color-line
          color: $color-text-assist
      .goods-header
        height: 45px
        background: #F4F8F9
        display: flex
      .goods-text
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-text-main
        &:nth-child(1)
          min-width: 38px
          max-width: 38px
        &:nth-child(2)
          flex: 2
        &:nth-child(3)
          flex: 1
        &:nth-child(4)
          max-width: 80px
          flex: 0.5
      .goods-msg
        align-items: center
        display: flex
    .page-box
      box-sizing: border-box
      height: 76px
      align-items: center
      display: flex
    .link-text-box
      width: 100%
      height: 220px
      margin: 20px auto 0
      border: 0.5px solid $color-line
      border-radius: 2px
      outline: none
      display: block
      resize: none
      padding: 20px 14px
      box-sizing: border-box
      position: relative
      background: #F9F9F9
      font-family: $font-family-regular
      font-size: 16px
      color: $color-text-main
      &:focus
        background: $color-white

  //  单选框
  .select-icon
    width: 18px
    height: 18px
    border-radius: 50%
    background: $color-white
    border: 1px solid $color-line
    transition: all, 0.3s
    position: relative
    transform-origin: 50%
    margin-right: 20px
    .after
      all-center()
      transform-origin: 50%
      transition: all, 0.3s
      width: 0
      height: 0
      border-radius: 50%
  .select-icon-active
    border: 5px solid $color-main
</style>
