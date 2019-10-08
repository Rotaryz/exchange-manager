<template>
  <div class="account-edit child-router">
    <base-table-tool :iconUrl="require('./icon-new_commodity@2x.png')" :title="(id ?'编辑':'新建')+'账号'"></base-table-tool>
    <title-line title="基本信息" class="top-title"></title-line>
    <div class="container base-info-cont">
      <base-form-item label="姓名" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <base-input v-model="userInfo.name" :limit="20"></base-input>
      </base-form-item>
      <base-form-item label="手机号" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <div v-if="id" class="money">{{userInfo.mobile}}</div>
        <base-input v-else v-model="userInfo.mobile" type="number"></base-input>
      </base-form-item>
      <base-form-item label="角色类型" labelMarginRight="40" labelWidth="82px" labelAlign="right">
        <div v-if="id" class="money">{{userInfo.role_type_text}}</div>
        <radio v-else v-model="userInfo.role_type" :list="roleTypeList" @change="roleTypeChange"></radio>
      </base-form-item>
    </div>
    <base-footer>
      <base-button @click="cancelBtn">取消</base-button>
      <base-button type="primary" @click="submitChecker">保存</base-button>
    </base-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'
  import TitleLine from "../../components/title-line/title-line"
  import Radio from "../../components/zb-radio/zb-radio"
  const PAGE_NAME = 'ACCOUNT_EDIT'
  const TITLE = '账号'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      Radio,
      TitleLine
    },
    data() {
      return {
        id: this.$route.query.id||'',
        userInfo: {mobile: '', name: '', role_type: ''},
        roleTypeList: [{label: '分销员', id: 1}, {label: '客服人员', id: 2}]
      }
    },
    mounted() {
      if(this.id) this.getUserInfo()
    },
    methods: {
      // 新建/编辑账号
      getUserInfo() {
        API.Business.getAccountInfo({data: {id: this.id}})
          .then(res => {
            if(!res.data) return
            this.userInfo = res.data
          })
      },
      // 切换价格定价方式   自定义 系统计算
      roleTypeChange() {
        // this.edit.goods_specs.purchase.forEach(item => {
        //   item.level_price_type = this.levelPriceType
        //   if (!this.levelPriceType) {
        //     let standardPrice = Number(item.price) * this.priceLevelRatioList.standard_ratio
        //     let versatilePrice = Number(item.price) * this.priceLevelRatioList.versatile_ratio
        //     let partnerPrice = Number(item.price) * this.priceLevelRatioList.partner_ratio
        //     item.standard_price = standardPrice < 1 ? 1 : Math.round(standardPrice)
        //     item.versatile_price = versatilePrice < 1 ? 1 : Math.round(versatilePrice)
        //     item.partner_price = partnerPrice < 1 ? 1 : Math.round(partnerPrice)
        //   }
        // })
      },
      // 确认修改姓名之前的检查
      submitChecker() {
        if (!this.userInfo.name) {
          this.$toast.show('请填写姓名')
          return
        }
        if (!this.userInfo.mobile) {
          this.$toast.show('请填写手机号')
          return
        }
        if (!this.userInfo.role_type) {
          this.$toast.show('请选择角色类型')
          return
        }
        this.editSubmit()
      },
      // 新建/编辑账号
      editSubmit() {
        let apiName = 'createAccount'
        if (this.id) {
          apiName = 'editAccount'
        }
        API.Business[apiName]({data: this.userInfo})
          .then(res => {
            this.$toast.show('保存成功！')
            setTimeout(()=>{
              this.$emit('update')
              this.$router.go(-1)
            })
          })
      },
      // 取消 返回列表
      cancelBtn() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .account-edit
    width: 100%
    background: #FFF
    .container
      padding: 24px 20px 8px 30px
      background-color: $color-white
</style>
