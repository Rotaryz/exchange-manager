export default [
  // 拼团数据
  {
    path: '/group-buy-data',
    name: 'group-buy-data',
    component: () => import('@pages/group-buy-data/group-buy-data')
  },

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
    component: () => import('@pages/index/index'),
    meta: {
      authRequired: true
    },
    children: [
      /**
       *
       * 商品
       *
       */
      {
        path: '/mall',
        name: 'mall',
        meta: {
          type: 'first_menu', // 一级标示
          title: '商品 ',
          icon: require('./icon-goods@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'goods',
            name: 'goods',
            text: '商品',
            component: {render: (h) => h('router-view')},
            children: [
              {
                path: '/mall/goods/goods-list', // 路径（需写全路径，面包屑中需要使用）
                name: 'mall-goods-goods-list',
                component: () => import('@pages/goods-list/goods-list'),
                meta: {
                  title: '商品列表', // 导航标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['商品列表'], // 面包屑标题
                  style:{padding:0} // 最外层路由盒子的自定义样式
                },
                children:[
                  // 新建商品
                  {
                    path: '/mall/goods/goods-list/goods-edit',
                    name: 'mall-goods-edit',
                    component: () => import('@pages/goods-edit/goods-edit'),
                    meta: {
                      type: '',
                      title: '编辑商品',
                      variableIndex: 1,
                      crumbs: ['商品列表', '商品']
                    }
                  },
                ]
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
              // 商品品牌
              {
                path: '/mall/goods/brand-list',
                name: 'goods-brand-list',
                component: () => import('@pages/brand-list/brand-list'),
                meta: {
                  title: '商品品牌',
                  type: 'sec-menu', // 二级标识
                  crumbs: ['品牌列表']
                },
                children: [
                  // 品牌详情
                  {
                    path: '/mall/goods/brand-list/brand-edit',
                    name: 'goods-brand-edit',
                    component: () => import('@pages/brand-edit/brand-edit'),
                    meta: {
                      crumbs: ['品牌列表', '创作品牌']
                    }
                  }
                ]
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
                children: [
                  // 商品分组详情
                  {
                    path: '/mall/goods/goods-grouping/goods-grouping-detail/:id',
                    name: 'mall-goods-goods-grouping-detail',
                    component: () => import('@pages/goods-grouping-detail/goods-grouping-detail'),
                    meta: {
                      crumbs: ['商品分组', '详情']
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      /**
       *
       *页面
       *
       */
      {
        path: '/cms',
        name: 'cms',
        meta: {
          type: 'first_menu', // 一级标示
          title: '内容 ',
          icon: require('./icon-content@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'b-mall',
            name: 'b-mall',
            text: '内容',
            component: {render: (h) => h('router-view')},
            children: [
              // 订单列表
              // {
              //   path: '/cms/b-mall/cms-manager',
              //   name: 'cms-manager',
              //   component: () => import('@pages/cms-manager/cms-manager'),
              //   meta: {
              //     title: '首页配置', // 页面标题
              //     type: 'sec-menu', // 二级标识
              //     crumbs: ['首页配置'] // 面包屑标题
              //   }
              // },
              // 礼品馆、品牌馆
              {
                path: '/cms/b-mall/page-manage',
                name: 'page-manage',
                component: () => import('@pages/page-manage/page-manage'),
                meta: {
                  title: '页面管理', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['页面管理'], // 面包屑标题
                  style:{padding:0}
                }
              },
              {
                path: '/cms/b-mall/content-list',
                name: 'content-list',
                component: () => import('@pages/content-list/content-list'),
                meta: {
                  title: '内容列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['内容列表'] // 面包屑标题
                },
                children: [
                  {
                    path: '/cms/b-mall/content-list/content-edit',
                    name: 'content-edit',
                    component: () => import('@pages/content-edit/content-edit'),
                    meta: {
                      title: '创建文章', // 页面标题
                      crumbs: ['内容列表', '创建文章'] // 面包屑标题
                    }
                  }
                ]
              }

            ]
          }
        ]
      },
      /**
       *
       *订单
       *
       */
      {
        path: '/order-manager',
        name: 'order-manager',
        meta: {
          type: 'first_menu', // 一级标示
          title: '订单 ',
          icon: require('./icon-order@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'order',
            name: 'order',
            text: '订单',
            component: {render: (h) => h('router-view')},
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
        ]
      },
      /**
       *
       *客户
       *
       */
      {
        path: '/client',
        name: 'client',
        meta: {type: 'first_menu', // 一级标示
          title: '客户 ',
          icon: require('./icon-client@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'customer',
            name: 'customer',
            text: '客户',
            component: {render: (h) => h('router-view')},
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
                },
                children: [
                  // 等级设置
                  {
                    path: '/client/customer/customer-list/level-setting',
                    name: 'level-setting',
                    component: () => import('@pages/level-setting/level-setting'),
                    meta: {
                      title: '等级设置', // 页面标题
                      crumbs: ['客户列表', '客户设置'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'agent',
            name: 'agent',
            text: '代理商',
            component: {render: (h) => h('router-view')},
            children: [ // 交易记录
              {
                path: '/client/agent/trading-record',
                name: 'trading-record',
                component: () => import('@pages/trading-record/trading-record'),
                meta: {
                  title: '交易记录', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['交易记录'] // 面包屑标题
                }
              },
              // 代理申请
              {
                path: '/client/agent/application-agency',
                name: 'application-agency',
                component: () => import('@pages/application-agency/application-agency'),
                meta: {
                  title: '代理申请', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['代理申请'] // 面包屑标题
                }
              },
              // 等级
              {
                path: '/client/agent/level-manager',
                name: 'level-manager',
                component: () => import('@pages/level-manager/level-manager'),
                meta: {
                  title: '等级设置', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['等级管理'] // 面包屑标题
                },
                children: [
                  // 等级
                  {
                    path: '/client/agent/level-manager/edit-level',
                    name: 'edit-level',
                    component: () => import('@pages/edit-level/edit-level'),
                    meta: {
                      title: '等级管理', // 页面标题
                      variableIndex: 1,
                      crumbs: ['等级管理', '等级'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      /**
       *
       *财务
       *
       */
      {
        path: '/finance-manager',
        name: 'finance-manager',
        meta: {
          type: 'first_menu', // 一级标示
          title: '财务 ',
          icon: require('./icon-finance@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'account',
            name: 'account',
            text: '账户',
            component: {render: (h) => h('router-view')},
            children: [
              // 交易记录
              {
                path: '/finance-manager/account/trading-list',
                name: 'trading-list',
                component: () => import('@pages/trading-list/trading-list'),
                meta: {
                  title: '交易记录', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['交易记录'] // 面包屑标题
                }
              }
            ]
          },
          {
            path: 'agent',
            name: 'agents',
            text: '代理商结算',
            component: {render: (h) => h('router-view')},
            children: [
              // 交易记录
              {
                path: '/finance-manager/agent/subsidy-list',
                name: 'subsidy-list',
                component: () => import('@pages/subsidy-list/subsidy-list'),
                meta: {
                  title: '补贴记录', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['补贴记录'] // 面包屑标题
                }
              },
              // 代理商提现
              {
                path: '/finance-manager/agent/agent-withdrawal',
                name: 'agent-withdrawal',
                component: () => import('@pages/agent-withdrawal/agent-withdrawal'),
                meta: {
                  title: '代理商提现', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['代理商提现'], // 面包屑标题
                  style: {margin: 0}
                },
                children: [
                  // 收支明细
                  {
                    path: '/finance-manager/agent/agent-withdrawal/income-expenses/:id',
                    name: 'income-expenses',
                    component: () => import('@pages/income-expenses/income-expenses'),
                    meta: {
                      title: '收支明细', // 页面标题
                      crumbs: ['代理商提现', '收支明细'] // 面包屑标题
                    }
                  },
                  // 提现详情
                  {
                    path: '/finance-manager/agent/agent-withdrawal/withdrawal-detail/:id',
                    name: 'withdrawal-detail',
                    component: () => import('@pages/withdrawal-detail/withdrawal-detail'),
                    meta: {
                      title: '收支明细', // 页面标题.
                      crumbs: ['代理商提现', '收支明细'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: '/meeting-manager',
        name: 'meeting-manager',
        meta: {
          type: 'first_menu', // 一级标示
          title: '新营销',
          icon: require('./icon-course@2x.png'),
          iconSelected: ''
        },
        component: {render: (h) => h('router-view')},
        children: [
          {
            path: 'meeting',
            name: 'meeting',
            text: '会议',
            component: {render: (h) => h('router-view')},
            children: [
              // 会议列表
              {
                path: '/meeting-manager/meeting/meeting-list',
                name: 'meeting-list',
                component: () => import('@pages/meeting-list/meeting-list'),
                meta: {
                  title: '会议列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['会议列表'] // 面包屑标题
                },
                children: [
                  {
                    path: '/meeting-manager/meeting/meeting-list/meeting-edit',
                    name: 'meeting-edit',
                    component: () => import('@pages/meeting-edit/meeting-edit'),
                    meta: {
                      title: '新建会议', // 页面标题
                      type: 'sec-menu', // 二级标识
                      variableIndex: 1,
                      crumbs: ['会议列表', '会议'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'content',
            name: 'content',
            text: '内容',
            component: {render: (h) => h('router-view')},
            children: [
              // 课程列表
              {
                path: '/meeting-manager/content/course-list',
                name: 'course-list',
                component: () => import('@pages/course-list/course-list'),
                meta: {
                  title: '课程列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['课程列表'] // 面包屑标题
                },
                children: [
                  {
                    path: '/meeting-manager/content/course-list/course-edit',
                    name: 'meeting-edit',
                    component: () => import('@pages/course-edit/course-edit'),
                    meta: {
                      title: '新建课程', // 页面标题
                      type: 'sec-menu', // 二级标识
                      variableIndex: 1,
                      crumbs: ['课程列表', '课程'] // 面包屑标题
                    }
                  }
                ]
              },
              // 页面布局
              {
                path: '/meeting-manager/content/meeting-page',
                name: 'meeting-page',
                component: () => import('@pages/meeting-page/meeting-page'),
                meta: {
                  title: '页面布局', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['页面布局'] // 面包屑标题
                }
              }
            ]
          },
          // 订单
          {
            path: 'order',
            name: 'order',
            text: '订单',
            component: {render: (h) => h('router-view')},
            children: [
              // 订单列表
              {
                path: '/meeting-manager/order/economy-order',
                name: 'economy-order',
                component: () => import('@pages/economy-order/economy-order'),
                meta: {
                  title: '订单列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['订单列表'], // 面包屑标题
                  style:{padding:0}
                }
              }
            ]
          },
          {
            path: 'marketing',
            name: 'marketing',
            text: '营销',
            component: {render: (h) => h('router-view')},
            children: [
              // 分销员
              {
                path: '/meeting-manager/marketing/salesman-list',
                name: 'salesman-list',
                component: () => import('@pages/salesman-list/salesman-list'),
                meta: {
                  title: '分销员', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['分销员列表'] // 面包屑标题
                },
                children: [
                  {
                    path: '/meeting-manager/marketing/salesman-list/salesman-edit',
                    name: 'salesman-edit',
                    component: () => import('@pages/salesman-edit/salesman-edit'),
                    meta: {
                      title: '新建分销员', // 页面标题
                      type: 'sec-menu', // 二级标识
                      variableIndex: 1,
                      crumbs: ['分销员列表', '分销员'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'customer',
            name: 'customers',
            text: '客户',
            component: {render: (h) => h('router-view')},
            children: [
              // 客户列表
              {
                path: '/meeting-manager/customer/meeting-customer-list',
                name: 'meeting-customer-list',
                component: () => import('@pages/meeting-customer-list/meeting-customer-list'),
                meta: {
                  title: '客户列表', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['客户列表'] // 面包屑标题
                }
              }
            ]
          },
          {
            path: 'setting',
            name: 'setting',
            text: '设置',
            component: {render: (h) => h('router-view')},
            children: [
              // 账号权限
              {
                path: '/meeting-manager/setting/account-privileges',
                name: 'account-privileges',
                component: () => import('@pages/account-privileges/account-privileges'),
                meta: {
                  title: '账号权限', // 页面标题
                  type: 'sec-menu', // 二级标识
                  crumbs: ['账号权限'], // 面包屑标题
                  style:{padding:0} // 最外层路由盒子的自定义样式
                },
                children: [
                  {
                    path: '/meeting-manager/setting/account-privileges/account-edit',
                    name: 'account-edit',
                    component: () => import('@pages/account-edit/account-edit'),
                    meta: {
                      title: '账号', // 页面标题
                      type: 'sec-menu', // 二级标识
                      variableIndex: 1,
                      crumbs: ['账号权限', '账号'] // 面包屑标题
                    }
                  }
                ]
              }
            ]
          }
        ]
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
