import Vue from 'vue'
import msgBox from './main.vue'

const defaultConfig = {
  icon: '',
  visible: false,
  type: 'default',
  center: false,
  duration: 1000,
  message: '',
  onClose: null
}

let instance, currentMsg
const msgQueue = []
const MessageBoxConstructor = Vue.extend(msgBox)

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible && msgQueue.length > 0) {
    currentMsg = msgQueue.shift()
    let options = currentMsg.options
    for (let prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop]
      }
    }
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })
  }
}

const MessageBox = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  msgQueue.push({
    options: {
      ...defaultConfig,
      ...options
    }
  })
  showNextMsg()
}

export default MessageBox
