<template>
  <div class="content-edit child-router">
    <div class="wrap-container">
      <mobile-content :isShowEmpty="isShowEmpty" :data="addData" :type="currentType"></mobile-content>
      <div class="edit-right-box">
        <!--标题-->
        <div class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            {{name}}标题
          </div>
          <div class="edit-input-box">
            <input v-if="currentType === 'video'"
                   v-model="addData.title"
                   :placeholder="'在此输入'+name+'标题，最多30个字'"
                   :disabled="isDisabled"
                   class="edit-input title-input"
                   type="text"
                   max-length="30"
            >
            <input v-else
                   v-model="addData.title"
                   :placeholder="'在此输入'+name+'标题，最少5个最多50个字'"
                   :disabled="isDisabled"
                   class="edit-input title-input"
                   type="text"
                   max-length="50"
            >

          </div>
        </div>
        <!-- 封面-->
        <div class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            {{name}}封面
          </div>
          <div class="edit-input-box flex-box">
            <zb-upload :data.sync="addData.coverImage.url"
                       :addStyle="`margin-right: 20px`"
                       :disabled="isDisabled"
                       @successImage="getCoverImage"
                       @delete="delCoverImage"
            ></zb-upload>
            <div v-if="!isDisabled" class="tip">
              <template v-if="currentType === 'video'">
                请添加不大于10M的清晰图片
              </template>
              <template v-else>
                <!--请添加不大于10M的清晰图片或视频(格式:mp4、3gp、m3u8、webm)-->
                请添加不大于10M的清晰图片,
                <!--<br>-->
                {{name}}封面是{{name}}首图
              </template>
            </div>
          </div>
        </div>
        <!--作者信息-->
        <div class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            作者信息
          </div>
          <div class="edit-input-box flex-box author-info-box">
            <zb-upload :data.sync="addData.authPhoto.url"
                       :addStyle="`margin-right: 20px`"
                       :disabled="isDisabled"
                       @successImage="getAuthorPic"
                       @delete="delAuthorPic"
            ></zb-upload>
            <div class="auto-input">
              <input v-model="addData.authName"
                     :disabled="isDisabled"
                     type="text"
                     placeholder="请输入作者名称10个字以内"
                     class="edit-input"
                     maxlength="10"
              >
              <input v-model="addData.authSignature"
                     :disabled="isDisabled"
                     type="text"
                     placeholder="请输入30个字的个性签名"
                     class="edit-input edit-signature"
                     maxlength="30"
              >
            </div>
          </div>
        </div>
        <!-- 视频  视频内容-->
        <div v-if="currentType === 'video'" class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            视频内容
          </div>
          <!-- todo-->
          <div class="edit-input-box flex-box">
            <template v-if="addData.videoContent.url">
              <div class="video-wrap">
                <video :src="addData.videoContent.url" class="video-wrap">
                </video>
                <div v-if="!isDisabled" class="delete-icon" @click="deleteVideoContent"></div>
              </div>
              <div class="tip">
                <template v-if="!isDisabled">
                  视频上传成功，处理完成
                </template>
                <div>视频名称-{{addData.videoContent.name}}</div>
              </div>
            </template>
            <template v-else>
              <div class="video-content-wrap">
                <div class="video-tip"></div>
                <div class="upload-video-wrap">
                  <zb-upload :videoUrl="addData.videoContent.url"
                             :picNum="1"
                             :size="100"
                             :disabled="isDisabled"
                             fileType="video-custom"
                             @failFile="failFile"
                             @successVideo="getVideoContent"
                  >
                    <button class="upload-video btn-main  hand">
                      点击上传视频
                    </button>
                  </zb-upload>
                </div>
              </div>
              <div class="tip">
                请添加小于100M,格式为mp4、3gp、m3u8、webm的视频
              </div>
            </template>

          </div>
        </div>
        <!--视频  视频简介-->
        <div v-if="currentType === 'video'" class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            视频简介
          </div>
          <div class="edit-input-box  flex-box flex-1">
            <textarea v-model="addData.videoIntroduce" :disabled="isDisabled" class="edit-textarea edit-input" placeholder="" maxlength="60"></textarea>
            <span class="num">{{addData.videoIntroduce && addData.videoIntroduce.length || 0}}/60</span>
          </div>
        </div>
        <!--菜谱  食材清单-->
        <div v-if="currentType === 'cookbook'" class="edit-item">
          <div class="edit-title">
            <span class="start">*</span>
            食材清单
          </div>
          <div class="edit-input-box  flex-box flex-1">
            <textarea id="test"
                      v-model="addData.foodList"
                      :disabled="isDisabled"
                      class="edit-textarea edit-input"
                      placeholder="例子：大蒜，酱油，猪肉，食材之间用逗号隔开，最多输入50个字符"
                      maxlength="100"
            ></textarea>
            <span class="num">{{addData.foodList && addData.foodList.length || 0}}/100</span>
          </div>
        </div>
        <!--视频/菜谱 添加商品-->
        <div v-if="currentType !== 'common'" class="edit-item add-goods-wrap">
          <div class="edit-title">
            添加商品
          </div>
          <div class="edit-input-box">
            <div v-if="!isDisabled" class="activity-tab  flex-box">
              <div class="add-goods-btn  btn-main hand" @click="showGoods">
                添加商品<span class="add-icon"></span>
              </div>
              <div class="tip">最多添加5个商品</div>
            </div>
            <div v-if="addData.goodsList && addData.goodsList.length" :class="['goods-list-box',{disable:isDisabled}]">
              <div class="list-header list-box">
                <div v-for="(item, index) in selectedGoodsCommodities" :key="index" class="list-item">{{item}}</div>
              </div>
              <div class="list">
                <div v-for="(item, index) in addData.goodsList" :key="index" class="list-content list-box">
                  <div class="list-item">{{item.name}}</div>
                  <div class="list-item">{{item.sale_unit || item.goods_units}}</div>
                  <div class="list-item">¥{{item.trade_price || 0}}</div>
                  <div class="list-item">
                    <span class="list-operation" @click="_showDelGoods(item, index)">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--文章/菜谱 内容详情-->
        <div v-if="currentType!=='video'" class="edit-item">
          <div class="edit-title cont-detail-tilte">
            <span class="start">*</span>
            内容详情
          </div>
          <div class=" edit-input-box flex-1">
            <draggable v-if="currentType!=='video' && addData.details.length" ref="detailsContent" v-model="addData.details" :options="{disabled:isDisabled}" class="content-details">
              <!--<transition-group>-->
              <div v-for="(item, idx) in addData.details" :key="idx" class="content-item">
                <div v-if="!isDisabled" class="close-icon hand" @click="deleteContentItem(idx,item)"></div>
                <img v-if="item.type==='image'" :src="item.value" class="content-image">
                <template v-else-if="item.type==='video'">
                  <video :src="item.value" class="content-video"></video>
                  <img src="./mobile-content/icon-play_big@2x.png" alt="" class="play-icon">
                </template>
                <div v-else-if="item.type==='goods'" class="good-item">
                  <img v-if="item.value.status === 0" src="./pic-off_shelf@2x.png" class="goods-photo">
                  <img v-else-if="item.value.saleable === 0" src="./pic-out_stock@2x.png" class="goods-photo">
                  <img v-else :src="item.value.goods_cover_image" class="goods-photo">
                  <div class="info">
                    <div class="name">{{item.value.name}}</div>
                    <div class="details">{{item.value.describe}}</div>
                    <div class="operate">
                      <span class="price-now">{{formatM(item.value.discount_price).int}}<span class="small">{{formatM(item.value.discount_price).dec}}<span class="unit">元</span></span></span>
                      <span class="price">{{item.value.price}}元</span>
                    </div>
                  </div>
                </div>
                <div v-else class="text-item hand" @click.stop="showTextDialog(idx, item.value)">{{item.value}}</div>
              </div>
              <!--</transition-group>-->
            </draggable>
            <div v-if="!isDisabled" class="add-cont-type-box">
              <div class="add-cont-type-item  hand" @click="showTextDialog(false)">
                <div class="icon icon-text"></div>
                <div>文本</div>
              </div>
              <div class="add-cont-type-item  hand">
                <zb-upload :data.sync="imageArr"
                           type="image-custom"
                           multiple
                           @successImage="addImageItem"
                           @failFile="failFile"
                >
                  <div class="add-cont-type-item">
                    <div class="icon icon-img"></div>
                    <div>图片</div>
                  </div>
                </zb-upload>
              </div>
              <div class="add-cont-type-item hand">
                <zb-upload type="video-custom"
                           @successImage="addVideoItem"
                           @failFile="failFile"
                >
                  <div class="add-cont-type-item  hand">
                    <div class="icon icon-video"></div>
                    <div>视频</div>
                  </div>
                </zb-upload>
              </div>
              <!---文章-->
              <div v-if="currentType==='common'" class="add-cont-type-item  hand" @click="showGoods">
                <div class="icon icon-goods"></div>
                <div>商品</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 其他设置 -->
        <div class="edit-item other-edit-item">
          <div class="edit-title">
            其他设置
          </div>
          <div class="edit-input-box">
            <div class="edit-input-item">
              <div class="edit-title">
                初始点赞人数
              </div>
              <input v-model="addData.goodCount"
                     :disabled="isDisabled"
                     type="number"
                     placeholder=""
                     class="edit-input"
              >
            </div>
            <div class="edit-input-item" style="margin-top: 20px">
              <div class="edit-title">
                初始浏览人数
              </div>
              <input v-model="addData.lookCount"
                     :disabled="isDisabled"
                     type="number"
                     placeholder=""
                     class="edit-input"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--选择商品弹窗-->
    <goods-list-dialog
      v-if="goodsVisible"
      :otherParams="{use_type: 2}"
      :selects="selects"
      :visible.sync="goodsVisible"
      :limit="5"
      :valueKey="false"
      @submit="_addGoods"
    ></goods-list-dialog>
    <!--<add-goods ref="selectGoods" :goodsType="goodsType" :maxLimit="5" @batchAddition="batchAddition"></add-goods>-->

    <!--添加文字-->
    <base-modal :visible.sync="addTextVisible" title="增加详情文本" :submitBefore="justifyAddText" @submit="addTextItem">
      <base-input v-model="addText" placeholder="输入文字" type="textarea" width="600" height="300"></base-input>
    </base-modal>

    <base-footer :isSeize="false">
      <template v-if="!id">
        <base-button plain @click="_submitBtn('addDraft',0)">存为草稿</base-button>
        <base-button type="primary" @click="_submitBtn('addArticle',1)">上线</base-button>
      </template>
      <template v-else-if="isDisabled">
        <base-button plain @click="goBack">返回</base-button>
      </template>
      <template v-else>
        <base-button plain @click="_submitBtn('editDraft',0)">存为草稿</base-button>
        <base-button type="primary" @click="_submitBtn('editArticle',1)">上线</base-button>
      </template>
    </base-footer>


  </div>
</template>

<script type="text/ecmascript-6">
  import MobileContent from './mobile-content/mobile-content'
  import ZbUpload from '@components/zb-upload/zb-upload.vue'
  // import AddGoods from '@components/add-goods/add-goods'
  import GoodsListDialog from '../../components/goods-list-dialog/goods-list-dialog'
  import API from '@api'
  import Draggable from 'vuedraggable'
  import {formatCouponMoney, objDeepCopy} from '@utils/common'

  const PAGE_NAME = 'CONTET_EDIT'
  const TITLE = '创作文章'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      // AddGoods,
      GoodsListDialog,
      ZbUpload,
      Draggable,
      MobileContent
    },
    beforeRouteEnter(routeTo, routeFrom, next) {
      let id = routeTo.query.id
      // 详情数据
      if (id) {
        API.Content.getArticleDetail({data: {id}})
          .then((res) => {
            next(vm => {
              vm.changeDetailData(res.data)
            })
          })
          .catch(() => {
            next({name: '404'})
          })
      } else {
        next()
      }
    },
    data() {
      return {
        id: "",
        isDisabled: false,
        currentType: 'common', // 现在创作类型
        typeList: {
          common: {name: '文章'},
          video: {name: '视频'},
          cookbook: {name: '菜谱'}
        }, // 三种创作
        addText: '',
        addData: {
          likes: [],
          title: '',
          coverImage: {
            url: '',
            id: ''
          },
          coverVideo: {
            url: '',
            id: '',
            file_id: ''
          },
          authPhoto: {
            url: '',
            id: ''
          },
          authName: '',
          authSignature: '',
          goodCount: 30,
          lookCount: 50,
          // 不同情况的字段
          videoContent: {
            url: '',
            id: '',
            name: ''
          },
          videoIntroduce: "",
          foodList: '',
          goodsList: [],
          // 内容详情
          details: []
        },
        // 已经选择的商品头部
        selectedGoodsCommodities: ['商品名称', '单位', '售价', '操作'],
        // 选择商品弹框删选条件
        goodsCategoryFristList: [],
        goodsCategorySecondList: [],
        goodsCategoryFrist: '',
        goodsCategorySecond: '',
        chooseGoods: [], // 弹框商品列表
        goodsPage: {
          total: 1,
          per_page:
            10,
          total_page:
            1
        },
        selectGoods: [], // 单次选择的商品,
        detailIndex: null, // 当前编辑item
        goodsType: '',
        addTextVisible: false,
        imageArr: [],
        goodsVisible: false,
        selects: [],
        msg: ''
      }
    },
    computed: {
      isShowEmpty() {
        return !(this.addData.title || this.addData.coverImage.id
          || this.addData.authPhoto.id || this.addData.authName
          || ((this.addData.videoContent.id || this.addData.videoIntroduce) && this.currentType === 'video')
          || (this.addData.goodsList.length)
          || (this.currentType === 'cookbook' && this.addData.foodList)
          || (this.currentType !== 'video' && this.addData.details.length))
      },
      name() {
        return this.typeList[this.currentType] && this.typeList[this.currentType].name || '文章'
      },
      editName() {
        return this.id ? (this.isDisabled ? '查看' : '编辑') : '创作'
      }
    },
    created() {
      let query = this.$route.query
      this.currentType = query.type || 'common'
      this.id = query.id || ''
      this.isDisabled = Boolean(query.isSee) || false
      if (this.id) {
        // this.changeDetailData(this.msg)
      } else {
        this._getAuth()
      }
      this._getLikes()
    },
    methods: {
      updatePage() {

      },
      setMsg(data) {
        this.msg = data
      },
      formatM(m) {
        return formatCouponMoney(m)
      },
      _getLikes() {
        let limit = this.addData.goodCount < 10 ? this.addData.goodCount : 10
        let params = {article_id: this.articleId || 0, preview: 1, limit, page: 1}
        API.Content.getLikes({data: params}).then(res => {
          this.addData.likes = res.data
        })
      },
      showTextDialog(index, text = '') {
        if (this.isDisabled) return
        this.detailIndex = index
        this.addText = text
        this.addTextVisible = true
      },
      // 新增创建时获取最后一次作者信息
      _getAuth() {
        API.Content.getAuth().then(res => {
          this.addData.authPhoto.url = res.data.head_image_url || ''
          this.addData.authPhoto.id = res.data.head_image_id || ''
          this.addData.authName = res.data.nickname || ''
          this.addData.authSignature = res.data.sign || ''
        }).finally(() => {
          this.$loading.hide()
        })
      },
      // 转换详情数据
      changeDetailData(obj) {
        this.currentType = obj.type || 'common'
        this.addData.title = obj.title
        this.addData.coverImage.url = obj.cover_image.url
        this.addData.coverImage.id = obj.cover_image.id
        this.addData.authPhoto.url = obj.author.head_image_url
        this.addData.authPhoto.id = obj.author.head_image_id
        this.addData.authName = obj.author.nickname
        this.addData.authSignature = obj.author.sign
        this.addData.goodCount = obj.init_fabulous_num || 0
        this.addData.lookCount = obj.init_browse_num || 0
        obj.assembly.forEach(item => {
          if (item.type === 'combination' && item.style_type === 'content') {
            let details = []
            item.content.map(cont => {
              if (!(cont.content && cont.content.length)) return false
              let contItem = cont.content[0]
              /* eslint-disable */
              switch (cont.type) {
                case "image":
                  details.push({
                    type: 'image',
                    value: contItem.image.url,
                    id: contItem.image.id
                  })
                  break
                case "video":
                  details.push({
                    type: 'video',
                    value: contItem.video.url,
                    id: contItem.video.id
                  })
                  break
                case "text":
                  details.push({
                    type: 'text',
                    value: contItem.text,
                  })
                  break
                case "goods":
                  if (contItem.goods.id) {
                    details.push({
                      type: 'goods',
                      value: {id: contItem.goods.id, ...contItem.goods},
                    })
                    this.addData.goodsList.push({id: contItem.goods.id, ...contItem.goods})
                  }
                  break
              }
            })
            this.addData.details = details
          }
          if (item.type === 'text' && item.style_type === 'content_cookbook_food_list') {
            this.addData.foodList = item.content[0].text
          }
          if (item.type === 'video' && item.style_type === 'content_video') {
            this.addData.videoContent.url = item.content[0].video.full_url
            this.addData.videoContent.name = item.content[0].video.name
            this.addData.videoContent.id = item.content[0].video.id
            this.addData.videoIntroduce = item.content[0].introduction
          }
          if (item.type === 'goods' && item.style_type === 'content_goods_list') {
            let goodsList = []
            item.content.forEach(item => {
              if (item.goods.goods_id) {
                goodsList.push({id: item.goods.goods_id, ...item.goods})
              }
            })
            this.addData.goodsList = goodsList
          }
        })
      },
      getCoverImage(res) {
        this.addData.coverImage.url = res.data.url
        this.addData.coverImage.id = res.data.id
      },
      delCoverImage() {
        this.addData.coverImage = {
          url: '',
          id: ''
        }
      },
      failFile(msg) {
        this.$toast.show(msg)
      },
      // 作者头像
      getAuthorPic(res) {
        this.addData.authPhoto.url = res.data.url
        this.addData.authPhoto.id = res.data.id
      },
      delAuthorPic() {
        this.addData.authPhoto.url = ''
        this.addData.authPhoto.id = ''
      },
      // 视频内容
      getVideoContent(video) {
        this.addData.videoContent.url = video.full_url
        this.addData.videoContent.id = video.id
        this.addData.videoContent.name = video.name
      },
      deleteVideoContent() {
        this.addData.videoContent = {
          url: '',
          id: '',
          name: ''
        }
      },
      // 内容详情增加
      addDetailContentItem(item) {
        this.addData.details.push(item)
        this.$nextTick(function () {
          let el = this.$refs.detailsContent.$el
          el.scrollTop = el.scrollHeight
        })
      },
      justifyAddText(done) {
        if (!this.addText.trim()) {
          this.$toast.show('请输入内容')
        } else {
          done()
        }
      },
      addTextItem() {
        let obj = {
          type: 'text',
          value: this.addText
        }
        if(this.detailIndex === false){
          this.addDetailContentItem({
            type: 'text',
            value: this.addText
          })
        }else{
          this.$set(this.addData.details,this.detailIndex, obj)
        }
      },
      addImageItem(res) {
        res.length && res.forEach(item => {
          this.addDetailContentItem({
            type: 'image',
            value: item.data.url,
            id: item.data.id
          })
        })

      },
      addVideoItem(res) {
        this.addDetailContentItem({
          type: 'video',
          value: res.data.url,
          video: res.data.id,
          file_id: res.data.id
        })
      },
      deleteContentItem(idx, item) {
        this.addData.details.splice(idx, 1)
        if (item.type === 'goods') {
          let index = this.addData.goodsList.findIndex(goods => goods.id === item.value.id)
          if (index !== -1) this.addData.goodsList.splice(index, 1)
        }
      },
      // 展示商品弹窗
      async showGoods() {
        if (this.disable) return
        this.goodsVisible = true
        // this.$refs.selectGoods && this.$refs.selectGoods.showModal(this.addData.goodsList)
      },
      // 删除商品
      _showDelGoods(item, index) {
        this.addData.goodsList.splice(index, 1)
      },
      // 批量添加商品
      _addGoods(list) {
        this.selects = JSON.parse(JSON.stringify(list))
        let newArr = list.map((item) => {
          let obj = objDeepCopy(item)
          let isExist = false
          this.addData.goodsList.forEach((goods) => {
            if (item.id * 1 === goods.id * 1) {
              isExist = true
            }
          })
          if (!isExist) {
            let obj = objDeepCopy(item)
            if (this.currentType === 'common') {
              this.addDetailContentItem({type: 'goods', value: obj})
            }
          }
          return obj
        })
        this.addData.goodsList = newArr
        this.$forceUpdate()
      },
      justifyConent(status) {
        let message = ''
        // if (!this.addData.category) message = '请选择内容分类'
        if (!this.addData.title) message = '请输入文章标题'
        else if (this.addData.title && (this.addData.title.length < 5 || this.addData.title.length > 50)) message = '请输入文章标题最少5个最多50个字符'
        //  !this.addData.coverVideo.id &&
        else if (!this.addData.coverImage.id) message = '请上传封面'
        else if (!this.addData.authPhoto.id) message = '请上传作者头像'
        else if (!this.addData.authName) message = '请填写作者名字'
        else if (!this.addData.authSignature) message = '请填写作者签名'
        else if (this.currentType === 'video') {
          if (!this.addData.videoContent.id) message = '请上传视频内容'
          else if (!this.addData.videoIntroduce) message = '请填写视频简介'
        } else if (this.currentType === 'cookbook' && !this.addData.foodList) message = '请填写食材清单'
        else if (this.currentType !== 'video' && !this.addData.details.length) message = '请编辑内容详情'
        else if (!(/^[+]{0,1}(\d+)$/.test(this.addData.goodCount))) message = '请输入正确的初始化点赞数'
        else if (!(/^[+]{0,1}(\d+)$/.test(this.addData.lookCount))) message = '请输入正确的初始化浏览数'
        else if (this.addData.goodCount > this.addData.lookCount) message = '初始化点赞数不能大于初始化浏览数'
        if (message) {
          this.$toast.show(message)
          return false
        } else {
          return true
        }
      },
      justifyDraft() {
        let message = ''
        if (!this.addData.title) message = '请输入文章标题'
        if (message) {
          this.$toast.show(message)
          return false
        } else {
          return true
        }
      },
      // 上线
      async _submitBtn(name, status) {
        let res = status ? this.justifyConent() : this.justifyDraft()
        if (res) {
          let data = this.getSubmitData(status)
          let res = await API.Content[name]({data, loading: true})
          this.$toast.show(res.message)
          this.$loading.hide()
          this.$router.go(-1)
          this.$emit('update')
        }
      },
      // 上线
      getSubmitData(status) {
        let params = {
          // type: this.currentType,
          title: this.addData.title.trim(),
          author_image_id: this.addData.authPhoto.id,
          author_nickname: this.addData.authName.trim(),
          author_sign: this.addData.authSignature.trim(),
          image_cover_id: this.addData.coverImage.id,
          video_cover_id: this.addData.coverVideo.id,
          init_fabulous_num: this.addData.goodCount,
          init_browse_num: this.addData.lookCount,
          assembly: []
        }
        if (this.currentType === 'video' || this.currentType === 'cookbook') {
          this.addData.goodsList.length && params.assembly.push({
            type: "goods",
            style_type: "content_goods_list",
            content: this.addData.goodsList.map(item => {
              return {
                "goods_id": item.id,
                "goods_spec_id": item.goods_spec_id
              }
            })
          })
          if (this.currentType === 'video') {
            params.assembly.push({
              type: "video",
              style_type: "content_video",
              content: [{
                video_id: this.addData.videoContent.id,
                title: this.addData.videoContent.name,
                introduction: this.addData.videoIntroduce
              }]
            })
          } else if (this.currentType === 'cookbook') {
            params.assembly.push({
              type: "text",
              style_type: "content_cookbook_food_list",
              content: [{
                text: this.addData.foodList
              }]
            })
          }
        }
        if (this.currentType !== 'video') {
          let contents = this.addData.details.map(item => {
            let newItem = {
              type: item.type,
              style_type: 'content_' + item.type
            }
            /* eslint-disable */
            switch (item.type) {
              case 'goods':
                newItem.content = [{
                  goods_id: item.value.id,
                  goods_spec_id: item.value.goods_spec_id
                }]
                break;
              case 'image':
                newItem.content = [{
                  image_id: item.id
                }]
                break;
              case 'video':
                newItem.content = [{
                  video_id: item.file_id,
                  title: '',
                  introduction: ''
                }]
                break;
              default:
                newItem.content = [{
                  text: item.value
                }]
            }
            return newItem
          })
          params.assembly.push({
            type: "combination",
            style_type: "content",
            content: contents
          })
        }
        if (this.id) {
          params.id = this.id
          params.status = 1
        }
        return params
      },

      goBack() {
        this.$router.go(-1)
      },
      submitBtn() {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .content-edit
    overflow: hidden
    border: 0.5px solid $color-line
    border-radius: 4px
    background: $color-white
    width: 100%
    max-height: 100%
    box-sizing: border-box
    .flex-1
      flex: 1
    .wrap-container
      height: 100%
      display: flex
      font-family: $font-family-regular

      .edit-right-box
        height: 100%
        flex: 1
        padding: 60px 20px 100px 0
        overflow: auto

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
      .tip
        font-size: $font-size-14
        font-family: $font-family-regular
        color: $color-text-assist
      .edit-item
        display: flex
        color: #2A2A2A
        min-height: 40px
        margin-top: 30px
        .edit-title
          margin-top: 7.5px
          font-size: $font-size-14
          line-height: 1.5
          font-family: $font-family-regular
          white-space: nowrap
          text-align: left
          min-width: 64px
        .start
          display: inline-block
          margin-right: -2px
          color: #F52424
        .edit-input-box
          margin: 0 0 0 40px
        .edit-input-box.author-info-box
          flex: 1
          background: #F5F7FA
          padding: 20px
        .auto-input
          margin-left: 0
        .flex-box
          display: flex
          align-items: center
        .edit-input
          font-size: $font-size-14
          padding: 0 14px
          border-radius: 2px
          width: 240px
          height: 40px
          display: flex
          align-items: center
          justify-content: space-between
          border: 0.5px solid $color-line
          transition: all 0.3s
          &:hover
            border-color: #ACACAC
          &:focus
            border-color: $color-main
        .edit-input-item
          display: flex
          .edit-title
            text-align: left
            min-width: 105px
            color: #666
        .edit-signature
          margin-top: 10px
        .edit-input.title-input
          width: 400px
        .edit-time
          color: $color-text-assist
          font-family: $font-family-regular
          font-size: $font-size-12
        .edit-input-right
          margin-left: 14px
        .tip
          line-height: 44px
          font-size: $font-size-12
          font-family: $font-family-regular
          color: #C0C4D1
        .tip-text
          margin-left: 2px
          line-height: 44px
          font-size: $font-size-12
          font-family: $font-family-regular
          color: $color-text-assist


      /*添加商品样式*/

      .activity-tab
        display: flex
        align-items: center
        box-sizing: border-box
        margin-bottom: 20px

        .add-goods-btn
          box-sizing: border-box
          height: 28px
          line-height: 28px
          width: 108px
          font-size: $font-size-14
          font-family: $font-family-regular
          transition: all 0.3s
          text-align: center
          border-radius: 2px
          display: flex
          align-items: center
          justify-content: center


        .icon-add
          width: 10px
          height: 10px
          margin-right: 5px
          object-fit: cover

      /*商品列表*/

      .add-goods-wrap
        width: 100%

        .edit-title
          margin-top 0px
          line-height 28px
          height: 28px

        .goods-list-box
          background: $color-white
          overflow: visible
          display: flex
          flex-direction: column
          flex: 1

          &.disable
            .list-header .list-item:last-child
            .list .list-item:last-child
              display none

        .list-box .list-item
          &:child-nth(1)
            flex: 2

          &:last-child
            max-width: 50px

      /* 内容详情*/

      .add-cont-type-box
        display flex
        flex: 1
        border-1px(#e9ecee, 0 0 2px 2px)
        background-color #fdfdfd

        .add-cont-type-item
          height 46px
          border-right-1px()
          width: 92px
          display flex
          align-items center
          justify-content center

          .icon
            width: 20px
            height: 18px
            margin-right: 5px

          .icon-text
            icon-image(icon-text_normal)

          .icon-img
            icon-image(icon-picture_normal)

          .icon-video
            icon-image(icon-vedio_normal)

          .icon-goods
            icon-image(icon-commodity_normal)

          &:hover
            color: $color-main

            .icon-text
              icon-image(icon-text_hover)

            .icon-img
              icon-image(icon-picture_hover)

            .icon-video
              icon-image(icon-vedio_hover)

            .icon-goods
              icon-image(icon-commodity_hover)


      .content-details
        background: #F5F7FA
        border-radius: 2px
        padding: 20px
        scroll-opacity(5px, 100px)

        .content-item
          border-1px(#D3D8DC)
          border-radius: 2px
          background: #fff
          position relative
          margin-bottom: 20px
          color:$color-text-main
          font-size:$font-size-14
          position:relative
          .play-icon
            position absolute
            top: 50%
            left:74px
            width:40px
            height:@width
            transform translate(-50%,-50%)
          .good-item
            min-height: 112px
            display flex
            padding: 14px

            .goods-photo
              width: 112px
              height: @width
              flex-shrink 0
              object-fit cover

            .info
              margin-left: 14px
              width: 0
              flex: 1
              display flex
              flex-direction column
              justify-content space-around

            .name
              font-family $font-family-medium
              font-size: $font-size-16
              color: #111111
              overflow hidden
              text-overflow ellipsis
              white-space: nowrap

            .details
              font-family $font-family-regular
              font-size: $font-size-14
              color: #808080
              margin: 0px 0px 5px
              overflow hidden
              text-overflow ellipsis
              white-space: nowrap
              word-break: break-all

            .price-now
              color: #FA7500
              font-size: 32px
              font-family $font-family-medium

              .small
                font-size: $font-size-20

                .unit
                  font-family $font-family-regular

            .price
              color: #B7B7B7
              font-size: $font-size-30
              font-family $font-family-regular
              text-decoration-line line-through
              margin-left 6px

          .content-video
          .content-image
            width: 112px
            height @width
            border-radius 2px
            object-fit: cover
            margin: 14px
            background-color $color-np-content
            object-fit: cover

          .text-item
            padding:14px
            white-space: pre-wrap
            word-wrap: break-word
          &:last-child
            margin-bottom: 0px

          .close-icon
            width: 12px
            height: @width
            icon-image(icon-close_content)
            position absolute
            right: 10px
            top: 16px

    .shade-box
      box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.60)
      border-radius: 2px
      background: $color-white
      height: 675px
      max-width: 1000px
      width: 1000px
      position: relative
      overflow-x: hidden
      overflow-y: auto
      flex-wrap: wrap
      padding: 0 20px
      box-sizing: border-box

      &.add-category-box
        width: 380px
        height: 213px
        .add-category-input
          width: 340px
          margin-top: 7px
      .title-box
        display: flex
        box-sizing: border-box
        padding: 23px 0
        align-items: center
        justify-content: space-between

        .title
          font-size: $font-size-16
          font-family: $font-family-medium
          line-height: 1
          color: $color-text-main

      .back
        border-top-1px($color-line)
        position: absolute
        left: 0
        right: 0
        bottom: 0
        background: $color-white
        justify-content: flex-end
        height: 70px
        border-none()
  .close
    width: 12px
    height: @width
    icon-image('icon-close')

    .add-text-dialog
      height:300px
      width:600px
      display flex
      flex-direction column
      .title-box
      .back
        flex-shrink 0
        position: static
      .dialog-body
        flex:1
      .edit-textarea
        padding: 14px
        width: 100%
        height:100%
        resize none
    .add-text-textarea
      padding: 14px
      width: 100%
      height:100%
      resize none
</style>
