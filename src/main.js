import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faPlus, faCheck, faTrash, faChevronLeft, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './lib/remFlex'

import MsgBox from './components/MessageBox'
import Confirm from './components/Confirm'

library.add(faTimesCircle, faPlus, faCheck, faTrash, faChevronLeft, faSpinner, faExclamationTriangle)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$msg = MsgBox
Vue.prototype.$confirm = Confirm

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
