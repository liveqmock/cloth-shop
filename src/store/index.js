import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)
const state = {
	domain: '', //请求服务器域名
	tab: 'home', //tab_flag
	toast: false, //toast相关参数 显示
	toast_icon: '',//图标
	toast_message: '',//消息
	toast_duration: 1500,//消失时间
	keyword: [], //热门关键字,
	order_from: '', //下单来源
	order_goods: '', //下单货物
	include: ['home', 'single', 'me', 'myBalance', 'myDistribution', 'myDistributionQrcode', 'myDistributionStream',
		'myDistributionTeam', 'myLove', 'myMessage', 'myAddress', 'myAddressAdd', 'myPoint', 'mySetting', 'sort',
		'search', 'brandStreet'
	] //缓存路由表
}
export default new Vuex.Store({
	state,
	mutations,
	actions
})
