export default {
	toast(context, toast) {
		context.commit('showToast', toast)
		setTimeout(() => {
			context.commit('hideToast')
		}, context.state.toast_duration)
	},
}