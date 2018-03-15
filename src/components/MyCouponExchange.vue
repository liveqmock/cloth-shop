<template>
	<div class="myCouponExchange">
		<headerBox :title="'兑换优惠券'" :flag="'back'"></headerBox>
		<input class="code" v-model="code" placeholder="请输入兑换码" />
		<!--兑换优惠券-->
		<div @click="exchange" class="btn exchange">兑换</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'myCouponExchange',
		components: {
			headerBox
		},
		data() {
			return {
				code: ''
			}
		},
		methods: {
			exchange() {
				this.$http({
					url: this.$store.state.domain + '/user/exchange',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						cdkey: this.code
					}
				}).then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '1'
						})
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.myCouponExchange {
		min-height: 100vh;
		background: #F3F3F3;
	}
	
	.code {
		background: white;
		text-align: center;
		width: 90vw;
		margin: 5rem 5vw;
		height: 6rem;
		font-size: 2rem;
		color: #999999;
	}
	
	.exchange {
		margin: 0 5vw;
		width: 90vw;
		height: 4.4rem;
	}
</style>