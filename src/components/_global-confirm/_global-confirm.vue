<template>
  <base-modal class="global-confirm" :title="modal.title" :visible.sync="visible" height="185px" @close="cancel">
    <div class="text">{{modal.text}}</div>
    <template slot="footer">
      <base-button @click="cancel">{{modal.cancelText}}</base-button>
      <base-button type="primary" @click="submit">{{modal.confirmText}}</base-button>
    </template>
  </base-modal>
</template>

<script type="text/ecmascript-6">

  const COMPONENT_NAME = 'DEFAULT_CONFIRM'

  export default {
    name: COMPONENT_NAME,
    props: {
      options: {
        // 取消文字
        type: Object,
        default: () => {
          return {
            cancelText: '',
            confirmText: '',
            title: '',
            text: ''
          }
        }
      }
    },
    data() {
      return {
        modal:{
          cancelText: '取消',
          confirmText: '确认',
          title: '温馨提示',
          text: '确定要删除吗'
        },
        visible: false,
        resolve: '',
        reject: '',
        promise: '', // 保存promise对象
      }
    },
    methods: {
      submit() {
        this.visible = false
        this.resolve('submit');
      },
      // 取消,将promise断定为reject状态
      cancel() {
        this.visible = false
        this.reject('cancel')
      },
      // 显示confirm弹出,并创建promise对象，给父组件调用
      confirm(options={}) {
        this.visible = true
        this.$set(this,'modal',{...this.modal,...options})
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        return this.promise; // 返回promise对象,给父级组件调用
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
    .text
      font-size: $font-size-16
      font-family: $font-family-regular
      color: $color-text-assist
      text-align: left
      word-break: break-all
      line-height: 1.4
</style>
