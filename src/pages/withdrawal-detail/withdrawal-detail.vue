<template>
  <div class="withdrawal-detail">
    <!--:iconUrl="require('./icon-order_list@2x.png')" -->
    <base-table-tool :title="title"></base-table-tool>
    <title-line title="基本信息"></title-line>
    <div class="base-info-wrap info-wrap">
      <base-form-item label="提现单号:" :required="false" class="info-item">{{info.withdraw_sn}}</base-form-item>
      <base-form-item label="申请时间:" :required="false" class="info-item">{{info.created_at}}</base-form-item>
      <base-form-item label="客户名称:" :required="false" class="info-item">{{info.shop_name}}</base-form-item>
      <base-form-item label="状态:" :required="false" class="info-item">{{info.status_text}} <span v-if="info.status===2" class="explain">({{info.note}})</span></base-form-item>
    </div>
    <title-line title="提现信息"></title-line>
    <div class="withdrawal-info-wrap info-wrap">
      <base-form-item label="提现金额:" :required="false" class="info-item">{{info.total}}</base-form-item>
      <base-form-item label="手续费:" :required="false" class="info-item">{{info.poundage}}</base-form-item>
      <base-form-item label="预计到账金额:" :required="false" class="info-item">{{info.arrival_total}}</base-form-item>
    </div>
    <title-line title="收款信息"></title-line>
    <div class="give-money-info-wrap info-wrap">
      <base-form-item label="收款人:" :required="false" class="info-item">{{info.withdrawal_name}}</base-form-item>
      <base-form-item label="收款银行:" :required="false" class="info-item">{{info.withdrawal_bank}}</base-form-item>
      <base-form-item label="收款账号:" :required="false" class="info-item">{{info.withdrawal_bank_card}}</base-form-item>
    </div>
    <title-line title="打款凭证"></title-line>
    <div class="certificate-wrap info-wrap">
      <base-form-item label="凭证流水:" :required="false" verticalAlign="top" class="info-item">
        <div v-if="info.status===0" class="empty-line">-</div>
        <img v-else-if="info.image_url" :src="info.image_url" class="item-img">
        <upload v-else-if="!info.image_url"></upload>
      </base-form-item>
    </div>
    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="checkBtn">审核</base-button>
      <base-button type="primary" @click="sureRemitBtn">确认打款</base-button>
    </base-footer>
    <base-modal :visible="checkVisible" width="534px" height="234px" title="审核" @close="checkVisible=false"
                @submit="checkSubmit"
    >
      <base-form-item label="选择审核结果" labelWidth="106px">
        <radio v-model="edit.result" :list="radioList"></radio>
      </base-form-item>
      <base-form-item v-if="!edit.result" label="不通过原因" labelWidth="106px">
        <base-input v-model="edit.reason" width="388"></base-input>
      </base-form-item>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as Helpers from './modules/helpers'
  import API from '@api'
  import TitleLine from '@components/title-line/title-line'
  import Radio from '../../components/zb-radio/zb-radio'
  import Upload from '../../components/zb-upload/zb-upload.vue'

  const PAGE_NAME = 'WITHDRAWAL_DETAIL'
  const TITLE = '提现详情'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TitleLine,
      Upload,
      Radio
    },
    data() {
      return {
        recordId: '',
        info: '',
        checkVisible: false,
        detail: {
          status: ''
        },
        radioList: [{label: '审核不通过', id: 0}, {label: '审核通过', id: 1}],
        edit: {
          result: 0,
          reason: ''
        },
        uploadImg: ''
      }
    },
    computed: {
      title() {
        return `${this.$route.query.name}-提现详情`
      }
    },
    beforeRouteEnter(to, from, next) {
      const id = to.params.id
      API.Finance.getWithdrawalDetail({data: {id: id}}).then((res) => {
        next((vx) => {
          res.data = {
            "id": 1,
            "withdraw_id": 1,
            "withdraw_sn": "W1908251748135306",
            "shop_name": "杂货铺子",
            "created_at": "2019-08-25 17:48",
            "status": 2,
            "status_text": "已拒绝",
            "total": "1元",
            "poundage": "1元",
            "arrival_total": 0,
            "withdrawal_name": "黄锦冰111",
            "withdrawal_bank": "工商银行",
            "withdrawal_bank_card": "6464983134646463",
            "image_url": "https://exchange-platform-img.jkweixin.com/prod%2F2019%2F08%2F19%2F1566216192640-183799",
            "note": "不给"
          }
          vx.recordId = id
          vx.info = res.data
        })
      })
    },
    methods: {
      // 取消
      cancelBtn() {
        this.$router.go(-1)
      },
      // 审核，显示审核弹窗
      checkBtn() {
        this.checkVisible = true
      },
      // 审核
      checkSubmit() {
        if (!this.edit.result && !this.edit.reason) {
          this.$toast.show('请输入拒绝原因')
          return
        }
        API.Finance.withdrawCheckWithdraw({
          data: {note: this.edit.reason, is_agree: this.edit.result, id: this.recordId},
          loading: false
        }).then((res) => {
          this.$toast.show('审核成功')
          this.checkVisible = false
        })
      },
      // 确认打款
      sureRemitBtn() {
        // 上传图片还没做
        API.Finance.withdrawConfirmPay({
          data: {image_id: this.uploadImg, id: this.recordId},
          loading: false
        }).then((res) => {
          this.$toast.show('打款成功')
        }).catch(() => {
          this.$toast.show('打款失败')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .withdrawal-detail
    position absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background $color-white
    z-index: 10

    .empty-line
      height: 14px
      line-height: 14px

    .info-wrap
      padding: 30px 20px 26px
      display flex
      flex-wrap wrap

      .info-item
        flex-shrink 0
        min-width: 280px
        padding-right: 60px
        font-size $font-size-14
        color: $color-text-main
        .explain
          color:$color-text-assist
          opacity: 0.8
          margin-left 10px
        .item-img
          width: 90px
          height: 90px
          border-radius: 2px
</style>
