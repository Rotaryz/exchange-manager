export default {
  methods: {},
  beforeDestroy() {
    this.$loading.hide()
    this.$confirm.clear()
  }
}
