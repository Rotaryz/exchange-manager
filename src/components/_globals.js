import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireBaseComponent = require.context('.', true, /_base-[\w-]+\.vue$/)

requireBaseComponent.keys().forEach((fileName) => {
  const componentConfig = requireBaseComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/_/, '').replace(/[\w-]+\.vue$/, '')))
  Vue.component(componentName, componentConfig.default || componentConfig)
})

const requireGlobalComponent = require.context('.', true, /_global-[\w-]+\.vue$/)

requireGlobalComponent.keys().forEach((fileName) => {
  const componentConfig = requireGlobalComponent(fileName)
  const componentName = camelCase(fileName.replace(/^\.\/_global-/, '').replace(/[\w-]+\.vue$/, ''))

  let plugins = {}
  plugins[componentName] = {}

  plugins[componentName].install = function(vue) {
    const constructor = vue.extend(componentConfig.default || componentConfig)
    const instance = new constructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    vue.prototype[`$${componentName}`] = instance
  }
  Vue.use(plugins[componentName])
})

// Vue.prototype[`$${componentName}`] =  function(props){
//   const instance = new Vue({
//     render: h => { // vdom
//       console.log(h(componentConfig, {props}));
//       return h(componentConfig, {props})
//     }
//   }).$mount();
//   // 生成的dom追加至body中
//   document.body.appendChild(instance.$el);
//
//   // 添加一个销毁方法
//   const comp = instance.$children[0];
//   comp.remove = function () {
//     document.body.removeChild(instance.$el)
//     instance.$destroy();
//   }
//   return comp
// }
