<template>
</template>

<script>
	export default {
		name: 'key',
		beforeCreate() {
			console.log('key:' + this.$route.query.key)
			window.localStorage.access_token = this.$route.query.key //获取后台返回的token
			this.$http({//拿token请求个人信息
					url: this.$store.state.domain + '/user/index',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						window.localStorage.user_info = JSON.stringify(res.data)//保存个人信息到storage
						setTimeout(() => {
							if(this.$route.query.redirect != undefined) {//如果有重定向地址，跳转到重定向地址，否则跳转到主页
								window.history.pushState({
									name: 'test'
								}, 'title:test', '/home')
								this.$router.replace({
									path: this.$route.query.redirect
								})
							} else {
								this.$router.replace({
									path: '/home'
								})
							}
						}, 1000)
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		},
	}
</script>

<style>

</style>