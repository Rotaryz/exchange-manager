export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@pages/_basic-layout/_basic-layout'),
    children: [
      {
        path: 'test-page',
        name: 'test-page',
        component: () => import('@pages/test-page/test-page')
      },
      // 测试页面配置
      {
        path: '/test-page1',
        name: 'test-page1',
        component: () => import('@pages/test-page1/test-page1')
      },
      // 测试页面注释
      {
        path: '/test-page',
        name: 'test-page',
        component: () => import('@pages/test-page/test-page')
      },
      {
        path: '/sample',
        name: 'sample',
        component: () => import('@pages/sample/sample')
      },
      {
        path: '/other-pages',
        name: 'other-pages',
        component: () => import('@pages/other-pages/other-pages')
      },
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
