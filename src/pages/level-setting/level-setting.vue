<template>
  <div class="level-setting child-router normal-box">
    <base-table-tool :isBorder="false" :iconUrl="require('./icon-new_commodity@2x.png')" title="客户设置"></base-table-tool>
    <div class="edit">
      <div class="edit-content">
        <base-form-item label="客户账号" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
          <!--<base-input v-model="msg.truename" placeholder="请输入客户账户"></base-input>-->
          <div class="money">{{msg.truename || '-----'}}</div>
        </base-form-item>
        <base-form-item label="账号等级" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
          <base-select
            v-model="msgData.level_id"
            :data="selectList"
            placeholder="请选择等级"
            :width="400"
            :height="40"
            labelKey="name"
            @change="getSelectData"
          ></base-select>
        </base-form-item>
        <base-form-item label="角色金额" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
          <div class="money">{{msgData.amount || '-----'}}</div>
        </base-form-item>
        <base-form-item label="操作人" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
          <base-input v-model="msgData.operator" placeholder="请输入操作人"></base-input>
        </base-form-item>
        <base-form-item label="收款凭证" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
          <upload :multiple="false"
                  :addStyle="`margin:0 20px 0 0;width:90px;height:90px`"
                  :data.sync="msgData.image_url"
                  inline
                  size="2"
                  @delete="categoryImageDelete"
                  @successImage="successImage"
                  @failFile="failFile"
          >
            <!--<div slot="icon" class="upload-add-icon"></div>-->
          </upload>
        </base-form-item>
      </div>
    </div>

    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="submitBtn">保存</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as Helpers from './modules/helpers'
  import API from '@api'
  import Upload from '../../components/zb-upload/zb-upload.vue'

  const PAGE_NAME = 'LEVEL_SETTING'
  const TITLE = '等级设置'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      Upload
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.id) {
        API.Customer.getSettingDetail({
          data: {id: to.query.id},
        }).then(res => {
          next(vw => {
            vw.setData(res)
          })
        })
      } else {
        next()
      }
    },
    data() {
      return {
        id: this.$route.query.id,
        msg: {},
        selectList: [],
        msgData: {
          operator: '',
          amount: '',
          level_id: '',
          image_url: '',
          image_id: ''
        },
        isSubmit: false
      }
    },
    async created() {
      this._getLevelList()
    },
    methods: {
      // 获取等级列表
      _getLevelList(loading = false) {
        API.Level.getLevelList({
          data: {page: this.page},
          loading,
          toast: true,
          doctor() {
          }
        })
          .then((res) => {
            this.selectList = res.data
          })
      },
      successImage(res) {
        this.msgData.image_url = res.data.url
        this.msgData.image_id = res.data.url
      },
      categoryImageDelete() {
        this.msgData.image_url = ''
        this.msgData.image_id = ''
      },
      failFile() {},
      cancelBtn() {
        this.$router.go(-1)
      },
      submitBtn() {
        if (this.msgData.level_id.length === 0) {
          this.$toast.show('请选择升级等级')
          return false
        } else if (this.msgData.operator.length === 0) {
          this.$toast.show('请输入操作人名称')
          return false
        } else if (this.msgData.image_id.length === 0 || this.msgData.image_id <= 0) {
          this.$toast.show('请上传收款凭证')
          return false
        }
        this.msgData.shop_id = this.id
        if (this.isSubmit) return false
        this.isSubmit = true
        API.Customer.editSettingDetail({
          data: this.msgData,
          loading: true,
          toast: true
        }).then((res) => {
          this.$emit('update')
          this.$router.go(-1)
        }).catch(() => {
          this.isSubmit = false
        })
      },
      setData(res) {
        this.msg = res.data
      },
      getSelectData(item, value) {
        this.msgData.level_id = item
        this.msgData.amount = value.agent_amount
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .level-setting
    border: 0.5px solid $color-line
    border-radius: 4px
    background: $color-white

  .edit
    border-top-1px($color-line)
    padding-top: 24px
    margin: 0 20px
    box-sizing: border-box
    .edit-content
      box-sizing: border-box
      padding-left: 37.5px

  .money
    font-family: $font-family-regular
    color: $color-text-main
    line-height: 40px
    font-size: $font-size-14

</style>
