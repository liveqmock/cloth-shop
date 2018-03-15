// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuex from 'vuex'
import VueViewload from 'vue-viewload' //lazyload
import tween from '@tweenjs/tween.js'
import VueTouch from 'vue-touch'
import Mock from './mock.js'
import axios from 'axios'
Vue.prototype.$http = axios
console.log(Mock)
Vue.config.productionTip = false
Vue.use(vuex)
Vue.use(VueViewload, {  //图片懒加载
	effectFadeIn: true, //淡入动画
	threshold: -200, //距离200px开始加载
})
Vue.prototype.$tween = tween
Vue.use(VueTouch, {
	name: 'touch'
})
//vue-resource拦截器
// Vue.http.interceptors.push((request, next) => { //全局请求拦截器
// 	if(request.method == 'POST') { //post请求 设置Content-Type
// 		request.headers.set('Content-Type', 'application/x-www-form-urlencoded')
// 	}
// 	next(res => { //检测token是否失效
// 		if(res.data.code == '400') {
// 			if(res.data.msg == '登录失效') { //登录失效跳转到login
// 				console.log('拦截器')
// 				store.dispatch('toast', {
// 					message: res.data.msg,
// 					icon: '2'
// 				})
// 				router.push({
// 					name: 'login'
// 				})
// 			} else if(res.data.msg == '商品已下架') {//如果进入商品详情页商品已下架则回退
// 				router.go(-1)
// 			}
// 		}
// 		return res
// 	})
// })

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
