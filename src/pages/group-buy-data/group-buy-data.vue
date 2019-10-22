<template>
  <div class="group-buy-data">
    <base-layout-top>
      <base-date datePlaceholder="请选择时间" textName="下单时间" :infoTime.sync="time" @changeDate="updateList"></base-date>
      <base-search v-model="filter.keyword" placeholder="卖家昵称" boxStyle="margin-left: 20px"
                   @search="updateList"
      ></base-search>
    </base-layout-top>
    <base-table-tool :iconUrl="require('./icon-meeting_list@2x.png')" title="卖家排行">
    </base-table-tool>
    <div class="table-content">
      <div class="big-list">
        <div class="list-header list-box">
          <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">{{val.name}}</div>
        </div>
        <div class="list">
          <template v-if="list.length">
            <div v-for="(item,i) in list" :key="i" class="list-content list-box">
              <div v-for="(val,key) in listHeader" :key="key" class="list-item" :style="val.style">
                <div class="item-text">
                  {{getChild(key,item)}}
                </div>
              </div>
            </div>
          </template>
          <base-blank v-else></base-blank>
        </div>
        <div class="pagination-box">
          <base-pagination :total="total" :pageSize="filter.limit" :currentPage.sync="filter.page"
                           @pageChange="pageChange"
          ></base-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // import * as Helpers from './modules/helpers'
  import API from '@api'

  const PAGE_NAME = 'GROUP_BUY_DATA'
  const TITLE = '拼团数据'

  export default {
    name: PAGE_NAME,
    page: {
      title: TITLE
    },
    beforeRouteEnter(to, from, next) {
      API.GroupBuyData.getSellersList({
        data: {
          keyword: '',
          page: 1,
          limit: 10,
          start_at: '',
          end_at: ''
        }
      }).then(res => {
        next(vw => {
          vw.setData(res)
        })
      })
    },
    data() {
      return {
        filter: {
          keyword: '',
          page: 1,
          limit: 10,
          start_at: '',
          end_at: ''
        },
        time: [],
        listHeader: {
          'seller.nickname': {name: '卖家', style: {flex: 2}},
          number: {name: '订单数', style: {flex: 2}},
          amount: {name: '销售额'},
        },
        list: [],
        total: 0
      }
    },
    watch: {
      time(value) {
        if (value.length === 0) {
          this.filter.start_at = ''
          this.filter.end_at = ''
        } else {
          this.filter.start_at = value[0]
          this.filter.end_at = value[1]
        }
      }
    },
    methods: {
      getChild(key, value) {
        if (key.includes('.')) {
          let arr = key.split('.')
          arr.forEach(key => {
            value = value[key]
          })
          return value
        }
        return value[key]
      },
      setData(res) {
        if (!res.data) return
        this.list = res.data
        res.meta && (this.total = res.meta.total)
      },
      _getList(other = {}) {
        API.GroupBuyData.getSellersList({data: this.filter, ...other}).then(res => {
          this.setData(res)
        })
      },
      pageChange() {
        this._getList({loading: false})
      },
      updateList() {
        this.page = 1
        this._getList({loading: false})
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .group-buy-data
    width: 100%
    display: flex
    flex-direction: column

</style>
