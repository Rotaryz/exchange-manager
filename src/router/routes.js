export default [
  {
    path: '/',
    redirect: '/index'
  },
  // 首页
  {
    path: '/index',
    name: 'index',
    component: () => import('@pages/index/index'),
    children: []
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
