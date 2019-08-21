<template>
  <div class="edit-level child-router normal-box">
    <base-table-tool :isBorder="false" :iconUrl="require('./icon-new_commodity@2x.png')" :title="id ? '编辑等级' : '新建等级'"></base-table-tool>
    <div class="block">
      <title-line title="基本信息" class="top-title"></title-line>
      <div class="edit">
        <base-form-item label="账号等级名称" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-select
            placeholder="请选择账号等级名称"
            :width="400"
            :height="40"
          ></base-select>
        </base-form-item>
        <base-form-item label="等级" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <div class="level">2</div>
        </base-form-item>
        <base-form-item label="代理金额" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-input placeholder="请输入代理金额"></base-input>
          <span class="after-word">元</span>
        </base-form-item>
      </div>
    </div>
    <div class="block">
      <title-line title="基础权益" class="top-title"></title-line>
      <div class="edit">
        <base-form-item label="使用时间" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-select
            placeholder="请选择使用时间"
            :width="400"
            :height="40"
          ></base-select>
          <span class="after-word">年</span>
        </base-form-item>
        <base-form-item label="采购折扣" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-input placeholder="请输入采购折扣"></base-input>
          <span class="after-word">%</span>
        </base-form-item>
        <base-form-item label="是否赠送账号" verticalAlign="top" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <div class="give-account">
            <div class="give-item">
              <div class="ratio-item" @click="changeValue(item)">
                <span class="radio__input" :class="{'is-check': false}">
                  <span class="radio__inner"></span>
                </span>
                <label class="radio__label">不赠送</label>
              </div>
            </div>
            <div class="give-item">
              <div class="ratio-item" @click="changeValue(item)">
                <span class="radio__input" :class="{'is-check': true}">
                  <span class="radio__inner"></span>
                </span>
                <label class="radio__label">赠送账号</label>
              </div>
              <base-input placeholder="请输入采购折扣" :width="300" :height="40"></base-input>
              <span class="after-word">全能版</span>
            </div>
          </div>
        </base-form-item>
      </div>
    </div>
    <title-line title="销售权益" class="top-title"></title-line>
    <div class="block">
      <div class="edit">
        <base-form-item label="销售权限" labelMarginRight="30.9" labelWidth="92px" labelAlign="right">
          <radio :list="jurisdiction" @change="changeType"></radio>
        </base-form-item>
        <div v-if="jurisdictionValue === 1">
          <base-form-item marginBottom="40px" verticalAlign="top" label="业务提成" labelMarginRight="30.9" labelWidth="92px"
                          labelAlign="right"
          >
            <div>
              <div class="more-item-wrap">
                <base-form-item marginBottom="0" :required="false" labelColor="#868DAA" label="标准版" labelMarginRight="20"
                                labelWidth="42px" labelAlign="right"
                >
                  <base-select
                    defaultLabel="提成方式"
                    :width="164"
                    :height="40"
                  ></base-select>
                  <div class="input-box">
                    <base-input :width="164" :height="40" placeholder="请输入价格"></base-input>
                  </div>
                  <span class="after-word">元</span>
                </base-form-item>
              </div>

              <div class="more-item-wrap">
                <base-form-item verticalAlign="top" marginBottom="0" labelHeight="40px" :required="false" labelColor="#868DAA"
                                label="全能版" labelWidth="42px" labelAlign="right" labelMarginRight="20"
                >
                  <div>
                    <base-select
                      defaultLabel="阶梯价"
                      :width="164"
                      :height="40"
                    ></base-select>
                    <div class="input-content">
                      <base-form-item marginBottom="20px" :required="false" label="销售" labelWidth="28px" labelAlign="right"
                                      labelMarginRight="12"
                      >
                        <base-input :width="100" :height="40"></base-input>
                        <div class="after-word">个</div>
                        <base-input :width="164" :height="40"></base-input>
                        <div class="after-word">元</div>
                      </base-form-item>
                    </div>
                    <div class="list-operation level-use">添加阶梯补贴</div>
                  </div>
                </base-form-item>
              </div>

              <div class="more-item-wrap">
                <base-form-item marginBottom="0" :required="false" labelColor="#868DAA" label="合伙版" labelMarginRight="20"
                                labelWidth="42px" labelAlign="right"
                >
                  <base-select
                    defaultLabel="固定金额"
                    :width="164"
                    :height="40"
                  ></base-select>
                  <div class="input-box">
                    <base-input :width="164" :height="40" placeholder="请输入价格"></base-input>
                  </div>
                  <span class="after-word">元</span>
                </base-form-item>
              </div>

            </div>
          </base-form-item>
          <base-form-item label="商品提成比例（销售版本用户采购时产生的补贴）" labelMarginRight="40" labelWidth="308px" labelAlign="right">
          </base-form-item>
          <div class="more-item-wrap more-item-block">
            <base-form-item marginBottom="0" :required="false" labelColor="#868DAA" label="标准版" labelMarginRight="50"
                            labelWidth="42px" labelAlign="right"
            >
              <span class="after-word">商品差价</span>
              <base-input :width="164" :height="40" placeholder="请输入商品差价"></base-input>
              <span class="after-word">%</span>
            </base-form-item>
          </div>
          <div class="more-item-wrap more-item-block">
            <base-form-item marginBottom="0" :required="false" labelColor="#868DAA" label="全能版" labelMarginRight="50"
                            labelWidth="42px" labelAlign="right"
            >
              <span class="after-word">商品差价</span>
              <base-input :width="164" :height="40" placeholder="请输入商品差价"></base-input>
              <span class="after-word">%</span>
            </base-form-item>
          </div>
          <div class="more-item-wrap more-item-block">
            <base-form-item marginBottom="0" :required="false" labelColor="#868DAA" label="合伙版" labelMarginRight="50"
                            labelWidth="42px" labelAlign="right"
            >
              <span class="after-word">商品差价</span>
              <base-input :width="164" :height="40" placeholder="请输入商品差价"></base-input>
              <span class="after-word">%</span>
            </base-form-item>
          </div>
        </div>
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
// import API from '@api'
  import TitleLine from '@components/title-line/title-line'
  import Radio from '@components/zb-radio/zb-radio'

  const PAGE_NAME = 'EDIT_LEVEL'
  const TITLE = '等级'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    components: {
      TitleLine,
      Radio
    },
    data() {
      return {
        jurisdiction: [{label: '无', id: ''}, {label: '标准版/全能版/合伙版', id: 1}],
        id: this.$route.query.id,
        jurisdictionValue: 1
      }
    },
    methods: {
      cancelBtn() {},
      submitBtn() {},
      // 选择是否赠送账号
      changeValue() {},
      // 切换权限
      changeType() {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .more-item-block
    width: 700px
    margin-left: 124px

  .level-use
    text-decoration: underline
    margin-top: 10px

  .more-item-wrap
    min-width: 700px
    max-width: 100%
    background-color #F4F8F9
    margin-bottom: 10px
    padding: 20px 20px
    &:last-child
      margin-bottom: 0

  .input-content
    margin-top: 20px

  .give-item
    align-items: center
    display: flex
    margin-bottom: 20px

  .edit-level
    background: $color-white
    height: 100%

  .input-box
    margin-left: 10px

  .edit
    margin-top: 24px
    padding: 0 20px
    box-sizing: border-box
    .after-word
      font-size: $font-size-14
      margin: 0 10px

  .block
    background: $color-white
    padding-bottom: 30px

  .level
    font-family: $font-family-regular
    color: $color-text-main
    line-height: 40px
    font-size: $font-size-14

  .ratio-item
    cursor: pointer
    display: inline-block
    white-space: nowrap
    outline: none
    font-size: 14px
    margin-right: 30px

    .radio__input
      white-space: nowrap
      cursor: pointer
      outline: none
      display: inline-block
      line-height: 1
      position: relative
      vertical-align: middle
      margin-right: 10px

      .radio__inner
        border: 1px solid #CDD0D4
        border-radius: 100%
        width: 18px
        height: 18px
        background-color: #F6F5FA
        cursor: pointer
        display: inline-block

      &.is-check .radio__inner
        display: inline-block
        height: 18px
        width: 18px
        border: 5px solid #409eff
        background: #fff
        position: relative

      .radio-input__original
        opacity: 0
        outline: none
        position: absolute
        z-index: -1
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: 0

  .base-form-item
    align-items: flex-start

</style>
