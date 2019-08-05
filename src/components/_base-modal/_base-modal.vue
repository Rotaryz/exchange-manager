<template>
  <transition name="fade-modal">
    <section v-show="visible" class="default-modal__wrap">
      <transition name="scale-modal">
        <div v-show="visible" class="default-modal" :style="{height:height,top:top}">
          <div v-if="title" class="modal-title">
            <span class="text">
              <span>{{title}}</span>
              <slot name="titleTip">
                <span v-if="titleTip" class="title-tip">{{titleTip}}</span>
              </slot>
            </span>
            <span v-if="showClose" class="handle-close-icon hand" @click="hide"></span></div>
          <div v-if="$slots.default" class="modal-body">
            <slot></slot>
          </div>
          <div v-if="isShowBtns" :class="['modal-footer',{'top-line':footerTopLine}]">
            <slot name="footer">
              <base-button @click="cancel">{{cancelText}}</base-button>
              <base-button type="primary" @click="submit">{{confirmText}}</base-button>
            </slot>
          </div>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'DEFAULT_MODAL'

  export default {
    name: COMPONENT_NAME,
    props: {
      top: {
        type: String,
        default: ''
      },
      height: {
        type: String,
        default: ''
      },
      showClose: { // 可sync
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      titleTip:{
        type: String,
        default: ''
      },
      visible: { // 可sync
        type: Boolean,
        default: false
      },
      styles: {
        type: String,
        default: ''
      },
      closeBefore: {
        type: Function,
        default: function (done) {
          done()
        }
      },

      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      isShowBtns: {
        type: Boolean,
        default: true
      },
      footerTopLine: {
        type: Boolean,
        default: false
      },
      submitBefore: {
        type: Function,
        default: (done) => {
          done()
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      showModal() {
        this.$emit('update:visible', true)
        this.$emit('show', false)
      },
      hide() {
        this.closeBefore(this.hideModal)
      },
      hideModal() {
        setTimeout(() => {
          this.$emit('update:visible', false)
          this.$emit('close', false)
        }, 100)
      },
      cancel() {
        this.hideModal()
        this.$emit('cancel')
      },
      submit() {
        this.submitBefore(() => {
          console.log('submit')
          this.hideModal()
          this.$emit('submit')
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $menu-width = 200px
  @import "~@design"
  .default-modal__wrap
    position: fixed
    background: rgba(36, 41, 59, 0.5)
    top: 0
    bottom: 0
    right: 0
    left: $menu-width
    z-index: 1500
    layout()
    justify-content: center
    align-items: center

    .default-modal
      min-width: 300px
      min-height: 185px
      max-height: 100%
      box-shadow: 0 0 5px 0 $color-text-main
      border-radius: 3px
      background-color $color-white
      display flex
      flex-direction column

    .modal-title
      padding: 22px 20px
      color: $color-text-main
      font-size: $font-size-16
      flex-shrink 0
      display flex
      justify-content space-between

      .text
        flex: 1
      .title-tip
        font-size $font-size-12
        color:$color-text-assist
        letter-spacing 0.5px
        margin-left 6px
      .handle-close-icon
        width: 10px
        height: @width
        icon-image(icon-close)

    .modal-body
      flex: 1
      padding: 0 20px
      scroll-opacity(5px, 5px, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15))

    .modal-footer
      flex-shrink 0
      padding:20px
      text-align right

      & :nth-child(n)
        margin-right: 10px

      & :last-child
        margin: 0

      &.top-line
        border-top-1px()
  .default-modal
    box-shadow: 0 0 5px 0 #4E5983
    border-radius: 3px
    position: relative

  .fade-modal-enter-active
    opacity: 1
    transition: all 0.5s

  .fade-modal-enter, .fade-modal-leave-to
    opacity: 0
    transition: all 0.5s

  .scale-modal-enter-active
    transform: scale(1)

  .scale-modal-enter, .scale-modal-leave-to
    transform: scale(.5)
    transition: all 0.5s


</style>
