import Vue from 'vue'
import Message from './main.vue'

Message.installMessage = function(options) {
  if (options === undefined || options === null) {
    options = {
      message: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      message: options
    }
  }
  var message = Vue.extend(Message)

  var component = new message({
    data: options
  }).$mount()
  document.querySelector('body').appendChild(component.$el)
}

export default Message