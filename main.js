import Vue from 'vue'
import App from './App'
// 全局注册底部组件
import Footer from 'components/song-footer/song-footer.vue'

Vue.component('Footer', Footer)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
