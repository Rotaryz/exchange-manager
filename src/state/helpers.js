import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export const someComputed = {
  ...mapState('some', {
    currentUser: (state) => state.currentUser
  }),
  ...mapGetters('some', ['constants'])
}

export const someMethods = mapActions('some', ['action1', 'action2'])

export const globalComputed = {
  ...mapState('global', {
    currentTitles: (state) => state.currentTitles,
    marginBottom: (state) => state.marginBottom
  })
}
export const globalMethods = {
  ...mapMutations('global', ['SET_CURRENT_TITLES'])
}
// 用户
export const authMethods = mapActions('auth', ['logIn', 'logOut'])
export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser
  }),
  ...mapGetters('auth', ['loggedIn'])
}
