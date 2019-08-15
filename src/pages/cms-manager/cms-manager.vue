<template>
  <div class="cms-manager">
    <mobile-content :bannerList="bannerList" :cmsList="cmsList" :hotList="hotList" :cmsType.sync="type"></mobile-content>
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
                <div class="advertisement-msg" @click="getIndex(index)">
                  <upload
                    :data.sync="item.detail.image_url"
                    :multiple="false"
                    :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                    :indicatorPosition="false"
                    :isShowDel="false"
                    :isChange="true"
                    firstTag="更换图片"
                    @delete="deleteGoodsMainPic()"
                    @successImage="successImage"
                  ></upload>

                  <!--@click=""-->
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>添加链接</base-button>
                    <p class="goods-title">{{item.style === '3004' || item.style === '3005' ? item.detail.url : item.detail.title}}</p>
                  </div>
                  <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                </div>
              </slick-item>
            </slick-list>
          </div>
          <div v-if="type === 'hot'" class="hot">
            <div class="content-header">
              <div class="content-title">热门商品</div>
              <div class="content-sub">(最多添加5个热门商品，鼠标拖拽调整广告顺序)</div>
            </div>
            <slick-list v-model="hotList" :distance="30" lockAxis="y">
              <slick-item v-for="(item, index) in hotList" :key="index" :index="index">
                <div class="advertisement-msg" @click="getIndex(index)">
                  <upload
                    :data.sync="item.detail.image_url"
                    :addStyle="`margin:0 20px 0 0;;width:100px;height:100px;background-image: url('${addImage}')`"
                    :isShowDel="false"
                    :isChange="true"
                    firstTag="更换图片"
                    @delete="deleteGoodsMainPic()"
                    @successImage="successImage"
                  ></upload>
                  <div class="advertisement-link">
                    <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>添加链接</base-button>
                    <p class="goods-title">{{item.style === '3004' || item.style === '3005' ? item.detail.url : item.detail.title}}</p>
                  </div>
                  <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                </div>
              </slick-item>
            </slick-list>
          </div>

        </div>
      </div>
    </div>
    <base-modal ref="goods" :width="1000" :visible.sync="showModal" :submitBefore="justifyForm" @submit="miniGoods">
      <div class="model">
        <div class="shade-header">
          <div class="shade-tab-type">
            <div v-for="(items, index) in typeList" :key="index" :class="{'shade-tab-item-active': tabIndex === index}" class="shade-tab-item hand" @click="setLinkType(index, $event)">{{items.title}}</div>
            <div class="line" :style="{left: left + 'px'}"></div>
          </div>
          <!--<div class="shade-title">选择商品</div>-->
          <span class="close hand" @click="hideGoods"></span>
        </div>
        <div v-if="tabIndex === 0" class="good-modal">
          <div class="shade-tab">
            <base-select
              placeholder="请选择分类"
              :data="classList"
              :width="218"
              valueKey="id"
              labelKey="name"
              :value.sync="parentId"
            ></base-select>
            <base-search :width="244" placeholder="请输入商品名称" @search="searchGoods"></base-search>
          </div>
          <div class="goods-content">
            <div class="goods-item goods-header">
              <div class="goods-text"></div>
              <div class="goods-text">商品名称</div>
              <div class="goods-text">零售价</div>
              <div class="goods-text">库存</div>
            </div>
            <div class="goods-list">
              <div v-for="(item, index) in choiceGoods" :key="index" class="goods-item">
                <div class="goods-text">
                  <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === index}" @click="selectGoods(item, index)">
                    <span class="after"></span>
                  </div>
                </div>
                <div class="goods-text goods-msg">
                  <img :src="item.goods_cover_image" alt="" class="goods-img">
                  <div class="goods-name">{{item.name}}</div>
                </div>
                <div class="goods-text">{{item.price}}</div>
                <div class="goods-text">{{item.saleable}}</div>
              </div>
              <!--select-icon-active-->
            </div>
          </div>
          <div class="page-box">
            <base-pagination ref="pages" :currentPage.sync="goodsPage" :total="total" :pageSize="6"></base-pagination>
          </div>
        </div>
        <!--商品分类-->
        <div v-if="tabIndex === 1" class="goods-cate">
          <div v-for="(goods, goodsIdx) in goodsCate" :key="goodsIdx" class="goods_cate-item">
            <div class="select-icon hand" :class="{'select-icon-active': showCateIndex === goodsIdx}" @click="selectCate(goods, goodsIdx)">
              <span class="after"></span>
            </div>
            <div class="shade-goods-msg">
              <div class="shade-goods-name">{{goods.name}}</div>
              <div class="shade-goods-num">{{goods.goods_count}}个商品</div>
            </div>
          </div>
        </div>
        <div v-if="tabIndex === 2" class="link-text">
          <textarea v-model="miniLink" class="link-text-box" placeholder="请输入小程序链接"></textarea>
        </div>
        <div v-if="tabIndex === 3" class="link-text">
          <textarea v-model="outHtml" class="link-text-box" placeholder="请输入H5链接"></textarea>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import MobileContent from './mobile-content/mobile-content'
  import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
  import Upload from '@components/zb-upload/zb-upload.vue'

  const PAGE_NAME = 'CMS_MANAGER'
  const TITLE = '页面管理'
  const ADD_IMAGE = require('./pic-add_img@2x.png')
  const TYPE_LIST = [
    {title: '商品详情', status: '3002'},
    {title: '商品分类', status: '3003'},
    {title: '小程序链接', status: '3005'},
    {title: 'H5链接', status: '3004'}
  ]
  const HOST_TYPE = [
    {title: '商品详情', status: '3002'}
  ]
  const TEMPLATE_OBJ = {
    detail: {
      object_id: '',
      url: '',
      title: '',
      image_url: '',
      image_id: '',
      add_icon: ADD_IMAGE
    },
    style: ''
  } // 模板对象
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
        left: 0,
        addImage: ADD_IMAGE,
        bannerList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))],
        hotList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))],
        type: 'banner',
        cmsIndex: 0,
        showModal: false,
        tabIndex: 0,
        typeList: TYPE_LIST,
        choiceGoods: [],
        showSelectIndex: -1,
        goodsPage: 1,
        total: 0,
        miniLink: '',
        outHtml: '',
        goodsCate: [],
        showCateIndex: -1,
        bannerIndex: 0,
        choicePage: 1,
        keyword: '',
        parentId: '',
        outLink: '3002',
        delId: '',
        delIndex: -1,
        classList: [],
        cmsList: [],
        confirm: false
      }
    },
    computed: {
      dataName() {
        let name = `${this.type}List`
        return name
      }
    },
    watch: {
      goodsPage() {
        this._getGoodsList()
      },
      parentId() {
        this._getGoodsList()
      },
      type(news) {
        switch (news) {
        case 'banner':
          this.typeList = TYPE_LIST
          break
        case 'hot':
          this.typeList = HOST_TYPE
          break
        default:
          break
        }
      },
      showModal(news) {
        this.tabIndex = 0
        this.left = 0
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Cms.moduleShow({data: {code: 'shop_index'}})
        .then((res) => {
          next(vx => {
            vx.cmsList = res.data.children
            res.data.children.forEach((item) => {
              // item.children.detail = JSON.parse(item.children.detail)
              switch (item.code) {
              case 'banner':
                vx.bannerList = item.children
                break
              case 'hot_goods':
                vx.hotList = item.children
                break
              }
            })
          })
        })
        .catch(() => {
          next('404')
        })
    },
    async created() {
      this.getCateList()
      await this._getGoodsList()
    },
    methods: {
      searchGoods(keyword) {
        this.keyword = keyword
        this._getGoodsList()
      },
      // 获取页面详情
      moduleShow() {
        API.Cms.moduleShow({data: {code: 'shop_index'}})
          .then((res) => {
            this.cmsList = res.data.children
            res.data.children.forEach((item) => {
              // item.children.detail = JSON.parse(item.children.detail)
              switch (item.code) {
              case 'banner':
                this.bannerList = item.children
                break
              case 'hot_goods':
                this.hotList = item.children
                break
              }
            })
            // console.log(this.bannerList)
          })
      },
      // 判断
      justifyForm(done) {
        let msg = ''
        switch (this.outLink) {
        case '3004':
          if (!this.outHtml) {
            msg = 'H5链接不能为空'
            this.$toast.show('')
          }
          break
        case '3005':
          if (!this.miniLink) {
            msg = '小程序链接不能为空'
          }
          break
        default:
          break
        }
        if (msg) {
          this.$toast.show(msg)
          return
        }
        done()
      },
      // 弹窗确定选择链接
      miniGoods() {
        let index = this.bannerIndex
        this[this.dataName][index].style = this.outLink
        switch (this.outLink) {
        case '3004':
          this[this.dataName][index].detail.url = this.outHtml
          this[this.dataName][index].detail.title = ''
          break
        case '3005':
          this[this.dataName][index].detail.url = this.miniLink
          this[this.dataName][index].detail.title = ''
          break
        case '3002':
          this[this.dataName][index].detail.object_id = this.choiceGoods[this.showSelectIndex].id
          this[this.dataName][index].detail.url = ''
          this[this.dataName][index].detail.title = this.choiceGoods[this.showSelectIndex].name
          break
        case '3003':
          this[this.dataName][index].detail.object_id = this.goodsCate[this.showCateIndex].id
          this[this.dataName][index].detail.url = ''
          this[this.dataName][index].detail.title = this.goodsCate[this.showCateIndex].name
          break
        }
      },
      // 获取分类
      getCateList() {
        let data = {pid: 0, goods_id: '', get_goods_count: 1, limit: 0}
        API.Cms.categoryList({data})
          .then((res) => {
            this.goodsCate = JSON.parse(JSON.stringify(res.data))
            let arr = JSON.parse(JSON.stringify(res.data))
            arr.unshift({name: '全部', id: ''})
            this.classList = arr
          })
      },
      // 获取商品列表
      async _getGoodsList() {
        let data = {
          status: 1,
          keyword: this.keyword,
          category_id: this.parentId,
          limit: 6,
          page: this.goodsPage
        }
        let res = await API.Cms.goodsList({data})
        this.total = res.meta.total
        this.choiceGoods = res.data
        this.showSelectIndex = this.choiceGoods.findIndex((item) => item.id === this.goodsId)
      },
      showModalBox(index, id) {
        this.showModal = true
        this.bannerIndex = index
        this.goodsId = id
        this.showSelectIndex = this.outLink === '3005' ? this.choiceGoods.findIndex((item) => item.id === this.goodsId) : -1
        this.showCateIndex = this.outLink === '3004' ? this.goodsCate.findIndex((item) => item.id === this.goodsId) : -1
      },
      selectCate(item, index) {
        this.showCateIndex = index
        // console.log(this.showCateIndex)
      },
      selectGoods(item, index) {
        this.showSelectIndex = index
      },
      setLinkType(index, e) {
        this.tabIndex = index
        this.left = e.target.offsetLeft + (e.target.offsetWidth - 64) / 2
        this.outLink = this.typeList[index].status
      },
      hideGoods() {
        this.showModal = false
        this.showSelectIndex = -1
        this.outHtml = ''
        this.miniLink = ''
        this.showCateIndex = -1
      },
      getIndex(index) {
        this.cmsIndex = index
      },
      // 添加图片
      successImage(res) {
        this[this.dataName][this.cmsIndex].detail.image_url = res.data.url
        this[this.dataName][this.cmsIndex].detail.image_id = res.data.id
      },
      newCms() {
        switch (this.type) {
        case 'banner':
        case 'hot':
          if (this[this.dataName].length >= 5) {
            this.$toast.show('最多添加5个')
            return
          }
          break
        default:
          break

        }
        let obj = {
          detail: {
            object_id: '',
            url: '',
            title: '',
            image_url: '',
            image_id: '',
            add_icon: ADD_IMAGE
          },
          style: ''
        }
        this[this.dataName].push(obj)
      },
      submitBtn() {
        let type = this.type === 'banner' ? '轮播图广告' : '热门商品'
        if (!this[this.dataName].length) {
          this.$toast.show(`${type}不能为空`, 1500)
          return
        } else {
          for (let i = 0; i < this[this.dataName].length; i++) {
            if (!this[this.dataName][i].detail.image_id) {
              this.$toast.show(`第${i + 1}${type}图片不能为空`, 1500)
              return
            } else if (!this[this.dataName][i].detail.title && !this[this.dataName][i].detail.url) {
              this.$toast.show(`第${i + 1}${type}不能为空`, 1500)
              return
            }
          }
        }
        this.infoData()
        API.Cms.saveModuleData({data: {data: this[this.dataName]}})
          .then((res) => {
            this.moduleShow()
          })
      },
      infoData() {
        this.cmsList.findIndex((item, index) => {
          if (item.code.includes(this.type)) {
            this[this.dataName] = this[this.dataName].map((cms, cmsIndex) => {
              cms.parent_id = item.id
              cms.sort = cmsIndex
              return cms
            })
          }
        })
      },
      //
      showConfirm(id, index) {
        this.delId = id
        this.delIndex = index
        if (!id) {
          this[this.dataName].splice(index, 1)
          return
        }
        this.$confirm.confirm()
          .then(() => {
            API.Cms.delDestroy({data: {id: this.delId}})
              .then((res) => {
                this[this.dataName].splice(index, 1)
              })
          })
          .catch(() => {
          })
      },
      deleteGoodsMainPic() {
        this[this.dataName][this.cmsIndex].detail.image_url = ''
        this[this.dataName][this.cmsIndex].detail.image_id = ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .cms-manager
    overflow: hidden
    border: 0.5px solid $color-line
    border-radius: 4px
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
      display: flex
      align-items: center
      .goods-title
        margin-left: 18px
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-14

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

  .shade-header
    display: flex
    justify-content: space-between
    height: 52px
    box-sizing: border-box
    padding: 23px 20px 0 0
    .shade-tab-type
      height: 100%
      display: flex
      position: relative
      .shade-tab-item
        line-height: 1
        display: flex
        transition: all 0.3s
        color: $color-text-main
        font-family: $font-family-regular
      .shade-tab-item-active
        font-family: $font-family-medium
      .line
        transition: all 0.3s
        left: 40px
        position: absolute
        bottom: 0px
        height: 3px
        width: 64px
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
          left: 40px
          position: absolute
          bottom: 0px
          height: 3px
          width: 64px
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
        width: 40px
        height: @width
        min-height: @width
        min-width: @width
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

  .goods-list
    .goods-text
      color: #333 !important

  .goods-cate
    flex: 1
    width: 100%
    height: 520px
    margin: 20px auto 0
    border-radius: 2px
    overflow-x: hidden
    &::-webkit-scrollbar
      width: 4px
      height: 4px
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .06)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .15)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
      border-radius: 10px
    .goods_cate-item
      display: flex
      align-items: center
      padding: 0 20px
      height: 60px
      position: relative
      box-sizing: border-box
      &:nth-child(2n - 1)
        background: #f5f7fa
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
      .shade-goods-msg
        flex: 1
        justify-content: space-between
        display: flex
      .shade-goods-name
        width: 500px
        no-wrap()
      .shade-goods-name, .shade-goods-num
        font-size: $font-size-14
        color: $color-text-main

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
    border: 5px solid #0AD4A1
</style>
