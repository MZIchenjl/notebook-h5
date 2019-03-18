import Index from './Index/index.vue'

export default {
  Index,
  Home: () => import(/* webpackChunkName: "home" */ './Home/index.vue'),
  Note: () => import(/* webpackChunkName: "note" */ './Note/index.vue')
}
