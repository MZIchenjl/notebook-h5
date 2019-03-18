import Vue from 'vue'
import confirmVue from './main.vue'

const defaultConfig = {
  visible: false,
  title: '',
  message: '',
  cancelText: '取消',
  confirmText: '确定',
  onClose: null
}

let instance

const ConfirmConstructor = Vue.extend(confirmVue)

const initInstance = () => {
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  })
}

const showConfirm = options => {
  if (!instance) {
    initInstance()
  }

  if (!instance.visible) {
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

const Confirm = function (options) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return new Promise((resolve, reject) => {
    options.resolve = (ok) => {
      resolve && resolve(ok)
      instance.visible = false
    }
    options.reject = (err) => {
      reject && reject(err)
      instance.visible = false
    }
    showConfirm({
      ...defaultConfig,
      ...options
    })
  })
}

export default Confirm
