<template>
  <div class="login">
    <div class="logo"></div>
    <div class="login-wrapper">
      <header class="title">让天下没有难开的店</header>
      <div class="input-wrapper">
        <input v-model="username" type="text" :placeholder="placeHolders.username" @keyup.enter="tryToLogIn">
      </div>
      <div class="input-wrapper">
        <input v-model="password" type="password" :placeholder="placeHolders.password" @keyup.enter="tryToLogIn">
      </div>
      <button class="login-btn hand" @click="tryToLogIn">登录</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {authMethods, authComputed} from '@state/helpers'
  import storage from 'storage-controller'

  const PAGE_NAME = 'LOGIN'
  const TITLE = '登录'
  const INFO_PATH = '/mall/goods/goods-list'
  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    data() {
      return {
        username: '',
        password: '',
        tryingToLogIn: false
      }
    },
    computed: {
      ...authComputed,
      placeHolders() {
        return {
          username: '请输入账号',
          password: '请输入密码'
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      if (storage.get('auth.token', '')) {
        return next({path: INFO_PATH})
      }
      return next()
    },
    methods: {
      ...authMethods,
      tryToLogIn() {
        if (this.tryingToLogIn) {
          return
        }
        this.tryingToLogIn = true
        this.logIn({
          username: this.username,
          password: this.password
        })
          .then((user) => {
            if (!user) {
              return
            }
            this.$router.push(this.$route.query.redirectFrom || INFO_PATH)
          })
          .catch(() => {
            // console.error(error.message)
          })
          .finally(() => {
            this.tryingToLogIn = false
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .login
    position: absolute
    width: 100%
    height: 100%
    text-align: center
    background: url("./bg-login.png") no-repeat
    background-size: cover
    background-position: center center
    .logo
      position: absolute
      left: 109px
      top: 42px
      width: 156px
      height: 26px
      icon-image('pic-dhsc')
    .login-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -60%)
      .title
        display: inline-block
        text-align: center
        font-family: $font-family-light
        margin-bottom: 30px
        font-size: $font-size-20
        position: relative
        color: #F9F9F9
        &:after
          right: -43.5px
          content: ''
          col-center()
          height: 1px
          width: 37px
          background: #F9F9F9
        &:before
          left: -43.5px
          content: ''
          col-center()
          height: 1px
          width: 37px
          background: #F9F9F9

      .input-wrapper
        width: 360px
        height: 45px
        box-sizing: border-box
        margin-bottom: 22px
        border-radius: 4px
        overflow: hidden
        background: $color-white

        input
          box-shadow: 0 0 10px 0 rgba(12, 6, 14, 0.10)
          padding: 0 12px
          width: 100%
          box-sizing: border-box
          height: 100%
          color: $color-text-main
          font-size: $font-size-14

      button.login-btn
        width: 360px
        height: 43px
        margin-top: 18px
        border-radius: 4px
        line-height: 43px
        font-size: $font-size-14
        color: $color-white
        background: $color-main

  input::-webkit-input-placeholder
    color: $color-text-sub

  textarea::-webkit-input-placeholder
    color: $color-text-sub
</style>
