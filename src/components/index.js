import KikoMessage from './Message/index'

const install = function(Vue) {
  Vue.component(KikoMessage.name, KikoMessage)

  Vue.prototype.$message = KikoMessage.installMessage
}
export default install