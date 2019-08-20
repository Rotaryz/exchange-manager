<template>
  <div class="level-setting child-router normal-box">
    <base-table-tool :isBorder="false" :iconUrl="require('./icon-new_commodity@2x.png')" title="客户设置"></base-table-tool>
    <div class="edit">
      <base-form-item label="客户账号" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
        <base-input placeholder="请输入客户账户"></base-input>
      </base-form-item>
      <base-form-item label="账号等级" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
        <base-select
          placeholder="请选择等级"
          :width="416"
          :height="44"
        ></base-select>
      </base-form-item>
      <base-form-item label="角色金额" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
        <div class="money">54565</div>
      </base-form-item>
      <base-form-item label="操作人" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
        <base-input placeholder="请输入操作人"></base-input>
      </base-form-item>
      <base-form-item label="收款凭证" labelMarginRight="40.9" labelWidth="68px" labelAlign="right">
        <upload :multiple="false"
                :addStyle="`margin:0 20px 0 0;width:90px;height:90px`"
                :data.sync="edit.image_url"
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
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  // import API from '@api'
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
    beforeRouteEnter(to, form, next) {
      next()
    },
    data() {
      return {
        id: this.$route.query.id,
        edit: {
          image_url: '',
          image_id: ''
        }
      }
    },
    methods: {
      successImage(res) {
        this.edit.image_url = res.data.url
        this.edit.image_id = res.data.url
      },
      categoryImageDelete() {
        this.edit.image_url = ''
        this.edit.image_id = ''
      },
      failFile() {
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
    padding: 24px 20px 0 57.5px
    box-sizing: border-box

  .money
    font-family: $font-family-regular
    color: $color-text-main
    line-height: 44px
    font-size: $font-size-14

</style>
