<template>
  <div class="edit-level child-router normal-box">
    <base-table-tool :isBorder="false" :iconUrl="require('./icon-new_commodity@2x.png')" :title="id ? '编辑等级' : '新建等级'"></base-table-tool>
    <div class="block">
      <title-line title="基本信息" class="top-title"></title-line>
      <div class="edit">
        <base-form-item label="账号等级名称" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <!--<base-select-->
          <!--placeholder="请选择账号等级名称"-->
          <!--:width="400"-->
          <!--:height="40"-->
          <!--&gt;</base-select>-->
          <div class="level">{{msg.name}}</div>
        </base-form-item>
        <base-form-item label="等级" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <div class="level">{{msg.level_no}}</div>
        </base-form-item>
        <base-form-item label="代理金额" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-input v-model="msg.agent_amount" :type="numberType" placeholder="请输入代理金额"></base-input>
          <span class="after-word">元</span>
        </base-form-item>
      </div>
    </div>
    <div class="block">
      <title-line title="基础权益" class="top-title"></title-line>
      <div class="edit">
        <base-form-item label="使用时间" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-select
            v-model="msg.simple_rights.limit_years"
            :data="selectYears"
            placeholder="请选择使用时间"
            :width="400"
            :height="40"
          ></base-select>
          <span class="after-word">年</span>
        </base-form-item>
        <base-form-item label="采购折扣" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <base-input v-model="msg.simple_rights.discount" :type="numberType" placeholder="请输入采购折扣"></base-input>
          <span class="after-word">%</span>
        </base-form-item>
        <base-form-item label="是否赠送账号" verticalAlign="top" labelMarginRight="40" labelWidth="92px" labelAlign="right">
          <div class="give-account">
            <div class="give-item">
              <div class="ratio-item" @click="changeValue(0)">
                <span class="radio__input" :class="{'is-check': msg.simple_rights.is_give * 1 === 0}">
                  <span class="radio__inner"></span>
                </span>
                <label class="radio__label">不赠送</label>
              </div>
            </div>
            <div class="give-item">
              <div class="ratio-item" @click="changeValue(1)">
                <span class="radio__input" :class="{'is-check': msg.simple_rights.is_give * 1 === 1}">
                  <span class="radio__inner"></span>
                </span>
                <label class="radio__label">赠送账号</label>
              </div>
              <base-input
                v-model="msg.simple_rights.give_accounts.number"
                :disabled="msg.simple_rights.is_give * 1 === 0"
                :type="numberType"
                placeholder="请输入数量"
                :width="300"
                :height="40"
              >
              </base-input>
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
          <radio :value="msg.sale_rights.is_has" :list="jurisdiction" @change="changeType"></radio>
        </base-form-item>
        <div v-if="msg.sale_rights.is_has === 1">
          <base-form-item marginBottom="40px" verticalAlign="top" label="业务提成" labelMarginRight="30.9" labelWidth="92px"
                          labelAlign="right"
          >
            <div>
              <div v-for="(item, idx) in business_commissions" :key="idx" class="more-item-wrap">
                <base-form-item
                  verticalAlign="top"
                  marginBottom="0"
                  labelHeight="40px"
                  :required="false"
                  labelColor="#868DAA"
                  :label="item.level_id === 1 ? '标准版' : item.level_id === 2 ? '全能版' : '合伙版'"
                  labelWidth="42px"
                  labelAlign="right"
                  labelMarginRight="20"
                >
                  <div>
                    <div class="base-box-row">
                      <base-select
                        v-model="item.way"
                        :data="selectWay"
                        :width="164"
                        :height="40"
                        defaultLabel="提成方式"
                      ></base-select>
                      <div v-if="item.way === 'money'" class="input-box">
                        <base-input v-model="item.money_value" :type="numberType" :width="164" :height="40" placeholder="请输入价格"></base-input>
                      </div>
                      <div v-if="item.way === 'rate'" class="input-box">
                        <base-input v-model="item.rate_value" :type="numberType" :width="164" :height="40" placeholder="请输入价格"></base-input>
                      </div>
                      <span v-if="item.way !== 'ladder'" class="after-word">{{item.way === 'money' ? '元' : '%'}}</span>
                    </div>
                    <div v-if="item.way === 'ladder'" class="input-content">
                      <base-form-item marginBottom="20px" :required="false" label="" labelWidth="28px" labelAlign="right"
                                      labelMarginRight="12"
                      >
                        <div class="base-text">默认金额</div>
                        <div class="after-word" style="opacity: 0">个</div>
                        <base-input v-model="item.ladder_default_value" :type="numberType" :width="164" :height="40"></base-input>
                        <div class="after-word">元</div>
                      </base-form-item>
                      <base-form-item
                        v-for="(ladderItem, ladderIdx) in item.ladder"
                        :key="ladderIdx"
                        marginBottom="20px"
                        :required="false"
                        label="销售"
                        labelWidth="28px"
                        labelAlign="right"
                        labelMarginRight="12"
                      >
                        <base-input v-model="ladderItem.num" :type="numberType" :width="100" :height="40"></base-input>
                        <div class="after-word">个</div>
                        <base-input v-model="ladderItem.amount" :type="numberType" :width="164" :height="40"></base-input>
                        <div class="after-word">元</div>
                      </base-form-item>
                    </div>
                    <div v-if="item.way === 'ladder'" class="list-operation level-use" @click="addLadder(item, idx)">添加阶梯补贴</div>
                    <div v-if="item.way === 'ladder'" class="list-operation level-use" @click="delLadder(item, idx)">删除阶梯补贴</div>
                  </div>
                </base-form-item>
              </div>
            </div>
          </base-form-item>
          <base-form-item label="商品提成比例（销售版本用户采购时产生的补贴）" labelMarginRight="40" labelWidth="308px" labelAlign="right">
          </base-form-item>
          <div v-for="(item, index) in msg.goods_commissions" :key="index" class="more-item-wrap more-item-block">
            <base-form-item
              marginBottom="0"
              :required="false"
              labelColor="#868DAA"
              :label="item.level_id === 1 ? '标准版' : item.level_id === 2 ? '全能版' : '合伙版'"
              labelMarginRight="50"
              labelWidth="42px"
              labelAlign="right"
            >
              <span class="after-word">商品差价</span>
              <base-input v-model="item.rate_value" :type="numberType" :width="164" :height="40" placeholder="请输入商品差价"></base-input>
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
  import API from '@api'
  import TitleLine from '@components/title-line/title-line'
  import Radio from '@components/zb-radio/zb-radio'

  const PAGE_NAME = 'EDIT_LEVEL'
  const TITLE = '等级'
  const SELECTYEARS = [{label: 1, id: 1}, {label: 2, id: 2}, {label: 3, id: 3}, {label: 4, id: 4}, {label: 5, id: 5}, {label: 6, id: 6}, {label: 7, id: 7}, {label: 8, id: 8}, {label: 9, id: 9}, {label: 10, id: 10}]
  const SELECTWAY = [{label: '固定金额', id: 'money'}, {label: '比例', id: 'rate'}, {label: '阶梯', id: 'ladder'}]
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
        jurisdiction: [{label: '无', id: 0}, {label: '标准版/全能版/合伙版', id: 1}],
        id: this.$route.query.id,
        jurisdictionValue: 1,
        msg: {
          simple_rights: {limit_years: '', discount: '', is_give: 0, give_accounts: {level_id: '', number: 1}},
          sale_rights: {is_has: 1},
          goods_commissions: []
        },
        numberType: 'number',
        selectYears: SELECTYEARS,
        selectWay: SELECTWAY,
        business_commissions: [
          {
            way: 'ladder',
            level_id: 1,
            money_value: '',
            rate_value: '',
            ladder_default_value: '',
            ladder: [
              {num: '', amount: ''},
              {num: '', amount: ''}
            ]
          },
          {
            way: 'money',
            level_id: 2,
            money_value: '',
            rate_value: '',
            ladder_default_value: '',
            ladder: [
              {num: '', amount: ''},
              {num: '', amount: ''}
            ]
          },
          {
            way: 'money',
            level_id: 3,
            money_value: '',
            rate_value: '',
            ladder_default_value: '',
            ladder: [
              {num: '', amount: ''},
              {num: '', amount: ''}
            ]
          }
        ],
        isSubmit: false
      }
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.id) {
        API.Level.levelEdit({
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
    methods: {
      cancelBtn() {
        this.$router.go(-1)
      },
      // 保存提交
      submitBtn() {
        if (this.msg.simple_rights.give_accounts) {
          this.msg.simple_rights.give_accounts.number += ''
        }
        if (this.msg.agent_amount.length === 0 || this.msg.agent_amount <= 0) {
          this.$toast.show('请输入代理金额且大于0元')
          return false
        } else if (this.msg.simple_rights.limit_years <= 0 || this.msg.simple_rights.limit_years > 11) {
          this.$toast.show('请选择使用时间')
          return false
        } else if (this.msg.simple_rights.discount < 0 || this.msg.simple_rights.discount > 100 || this.msg.simple_rights.discount.length === 0) {
          this.$toast.show('请输入采购折扣且范围为0-100')
          return false
        } else if (this.msg.simple_rights.is_give * 1 === 1 && (this.msg.simple_rights.give_accounts.number > 10 ||this.msg.simple_rights.give_accounts.number < 1 || this.msg.simple_rights.give_accounts.number.length === 0)) {
          this.$toast.show('请输入赠送账号数量且范围为1-10')
          return false
        } else if (this.msg.simple_rights.is_give * 1 === 1 && this.msg.simple_rights.give_accounts.number.includes('.')) {
          this.$toast.show('请输入赠送账号数量')
          return false
        }
        if (this.msg.sale_rights.is_has * 1 === 1) {
          let over = this.verifyMethods()
          if(over) return
          let isOver = this.verifyShopMethods()
          if(isOver) return
        }
        this.msg.id = this.id
        this.msg.business_commissions = this.business_commissions
        if (this.isSubmit) return false
        this.isSubmit = true
        API.Level.levelPostEdit({
          data: this.msg,
          loading: true,
          toast: true,
          doctor() {
          }
        }).then((res) => {
          this.$emit('update')
          this.$router.go(-1)
        }).catch(() => {
          this.isSubmit = false
        })
      },
      // 业务提成检验
      verifyMethods() {
        let over = false
        let arr = this.business_commissions
        let that = this
        for (let i = 0; i < arr.length; i++) {
          let name = arr[i].level_id * 1 === 1 ? '标准版' : arr[i].level_id * 1 === 2 ? '全能版' : '合伙版'
          switch (arr[i].way) {
          case 'money':
            if (arr[i].money_value.length === 0 || arr[i].money_value <= 0) {
              that.$toast.show(`请输入${name}固定金额且大于0元`)
              over = true
            }
            break
          case 'rate':
            if (arr[i].rate_value.length === 0 || arr[i].rate_value < 0 || arr[i].rate_value > 100) {
              that.$toast.show(`请输入${name}比例且范围为0-100`)
              over = true
            }
            break
          case 'ladder':
            if (arr[i].ladder_default_value.length === 0 || arr[i].ladder_default_value <= 0) {
              that.$toast.show(`请输入${name}阶梯价默认金额且大于0元`)
              over = true
              break
            }
            for (let j = 0; j < arr[i].ladder.length; j++) {
              if (arr[i].ladder[j].num.length === 0 || arr[i].ladder[j].num <= 0) {
                that.$toast.show(`请输入${name}阶梯价第${j + 1}行销售且大于0`)
                over = true
                break
              } else if (arr[i].ladder[j].amount.length === 0 || arr[i].ladder[j].amount <= 0) {
                that.$toast.show(`请输入${name}阶梯价第${j + 1}行价格且大于0元`)
                over = true
                break
              }
            }
            break
          }
          if (over) break
        }
        return over
      },
      // 商品提成检验
      verifyShopMethods() {
        let over = false
        let arr = this.msg.goods_commissions
        let that = this
        for (let i = 0; i < arr.length; i++) {
          let name = arr[i].level_id * 1 === 1 ? '标准版' : arr[i].level_id * 1 === 2 ? '全能版' : '合伙版'
          if (arr[i].rate_value.length === 0 || arr[i].rate_value > 100 || arr[i].rate_value < 0) {
            that.$toast.show(`请输入${name}商品差价且大于0元`)
            over = true
            break
          }
          if (over) break
        }
        return over
      },
      // 选择是否赠送账号
      changeValue(index) {
        if (index === 0) {
          this.msg.simple_rights.give_accounts.number = ''
        }
        this.msg.simple_rights.is_give = index
      },
      // 切换权限
      changeType(item) {
        this.msg.sale_rights.is_has = item
      },
      // 设置详情
      setData(res) {
        this.msg = res.data
        let that = this
        this.msg.business_commissions.forEach((item, index) => {
          Object.assign(that.business_commissions[index], item)
        })
      },
      // 添加阶梯
      addLadder(item, idx) {
        if (this.business_commissions[idx].ladder.length >= 10) {
          this.$toast.show(`最多只可设置10个阶梯价`)
          return
        }
        this.$set(this.business_commissions[idx].ladder, this.business_commissions[idx].ladder.length, {num: '', amount: ''})
      },
      // 删除阶梯
      delLadder(item, idx) {
        if (this.business_commissions[idx].ladder.length <= 2) {
          this.$toast.show(`最少需设置2个阶梯价`)
          return
        }
        this.business_commissions[idx].ladder.splice(this.business_commissions[idx].ladder.length - 1, 1)
      }
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
    .radio__label
      cursor: pointer
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
  .base-text
    font-size: $font-size-14
    width: 100px
    text-align: center
  .base-box-row
    layout(row)
    align-items: center
  .base-form-item
    align-items: flex-start

</style>
