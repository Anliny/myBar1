import Vue from 'vue'
import App from './App'
import Bounce from 'vue-bounce'
Vue.use(Bounce)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
