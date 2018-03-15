export default {
	order_from(state, from) {
		state.order_from = from
		window.sessionStorage.order_from = from
	},
	order_goods(state, goods) {
		state.order_goods = goods
		window.sessionStorage.order_goods = JSON.stringify(goods)
	},
	keyword(state, keyword) {
		state.keyword = keyword
		window.sessionStorage.keyword = JSON.stringify(keyword)
	},
	tab(state, tab) {
		state.tab = tab
	},
	showToast(state, toast) {
		state.toast_icon = toast.icon
		state.toast_message = toast.message
		state.toast = true
	},
	hideToast(state) {
		state.toast = false
		state.toast_icon = ''
		state.toast_message = ''
	}
}