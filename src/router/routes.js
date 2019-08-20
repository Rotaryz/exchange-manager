export default [

  {
    path: '/',
    redirect: '/login'
  },
  /**
   *
   * 登录
   *
   */
  {
    path: '/login',
    name: 'login',
    component: () => import('@pages/login/login')
  },
  /**
   *
   * 平台模块
   *
   */
  {
    path: '/',
    name: 'index',
    redirect: '/mall/goods/product-list',
    component: () => import('@pages/index/index'),
    meta: {
      authRequired: true
    },
    children: [
      /**
       *
       * 商品管理
       *
       */
      {
        path: '/mall',
        name: 'mall',
        meta: {
          type: 'first_menu', // 一级标示
          title: '商品管理',
          icon: require('./icon-goods@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
          {
            path: 'goods',
            name: 'goods',
            text: '商品',
            component: {render: h => h('router-view')},
            children: [
              {
                path: '/mall/goods/product-list',
                name: 'mall-goods-product-list',
                component: () => import('@pages/product-list/product-list'),
                meta: {
                  title: '商品列表',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['商品列表']
                },
              },
              // 新建商品
              {
                path: '/mall/goods/product-list/edit-product',
                name: 'mall-goods-product-list-edit',
                component: () => import('@pages/edit-product/edit-product'),
                meta: {
                  type: '',
                  title: '编辑商品',
                  variableIndex: 1,
                  crumbs: ['商品列表', '商品']
                }
              },
              // 商品分类
              {
                path: '/mall/goods/goods-classify',
                name: 'mall-goods-goods-classify',
                component: () => import('@pages/goods-classify/goods-classify'),
                meta: {
                  title: '商品分类',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['商品分类']
                }
              },
              // 商品分组
              {
                path: '/mall/goods/goods-grouping',
                name: 'mall-goods-goods-grouping',
                component: () => import('@pages/goods-grouping/goods-grouping'),
                meta: {
                  title: '商品分组',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['商品分组']
                },
                children: [ // 商品分组详情
                  {
                    path: '/mall/goods/goods-grouping/goods-grouping-detail/:id',
                    name: 'mall-goods-goods-grouping-detail',
                    component: () => import('@pages/goods-grouping-detail/goods-grouping-detail'),
                    meta: {
                      type: 'sec-menu', // 二级标识
                      crumbs: ['商品分组', '详情']
                    }
                  }]
              }

            ]

          }
        ],
      },
      /**
       *
       *客户管理
       *
       */
      {
        path: '/client',
        name: 'client',
        meta: {
          type: 'first_menu', // 一级标示
          title: '客户管理',
          icon: require('./icon-client@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
          {
            path: 'customer',
            name: 'customer',
            text: '客户',
            component: {render: h => h('router-view')},
            children: [
              // 客户列表
              {
                path: '/client/customer/customer-list',
                name: 'customer-list',
                component: () => import('@pages/customer-list/customer-list'),
                meta: {
                  title: '客户列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['客户列表'] // 面包屑标题
                }
              },  // 交易记录
              {
                path: '/client/customer/trading-record',
                name: 'trading-record',
                component: () => import('@pages/trading-record/trading-record'),
                meta: {
                  title: '交易记录', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['交易记录'] // 面包屑标题
                }
              }
            ]
          }
        ],
      },
      /**
       *
       *订单管理
       *
       */
      {
        path: '/order-manager',
        name: 'order-manager',
        meta: {
          type: 'first_menu', // 一级标示
          title: '订单管理',
          icon: require('./icon-order@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
          {
            path: 'order',
            name: 'order',
            text: '订单',
            component: {render: h => h('router-view')},
            children: [
              // 订单列表
              {
                path: '/order-manager/order/order-list',
                name: 'order-list',
                component: () => import('@pages/order-list/order-list'),
                meta: {
                  title: '订单列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['订单列表'] // 面包屑标题
                }
              }
            ]
          }
        ],
      },
      /**
       *
       *页面管理
       *
       */
      {
        path: '/cms',
        name: 'cms',
        meta: {
          type: 'first_menu', // 一级标示
          title: '内容管理',
          icon: require('./icon-content@2x.png'),
          iconSelected: '',
        },
        component: {render: h => h('router-view')},
        children: [
          {
            path: 'b-mall',
            name: 'b-mall',
            text: '内容',
            component: {render: h => h('router-view')},
            children: [
              // 订单列表
              {
                path: '/cms/b-mall/cms-manager',
                name: 'cms-manager',
                component: () => import('@pages/cms-manager/cms-manager'),
                meta: {
                  title: '首页配置', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['首页配置'] // 面包屑标题
                }
              }
            ]
          }
        ],
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '*',
    redirect: '404'
  }
]

// // 初始化数据
// function resetParam(isReset, methed) {
//   !isReset && store.dispatch(methed)
// }
