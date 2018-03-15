<template>
	<div class="my-distribution">
		<headerBox :flag="'back'" :title="'分销中心'"></headerBox>
		<!--没有加入团队-->
		<div v-if="agency_info.type=='普通会员'" class="no-join">
			<i class="iconfont icon-huiyuan"></i>
			<span>你还没有申请成为分销商</span>
			<span @click="join" class="btn distribution-btn">支付诚意金，立即分销</span>
		</div>

		<template v-else-if="agency_info!=''">
			<div class="panel">
				<div class="panel-item">
					<span>可提现佣金(元)</span>
					<span>{{agency_info.money}}</span>
				</div>
				<div class="panel-item">
					<span>团队佣金(元)</span>
					<span>{{agency_info.order.total==undefined?'0.00':agency_info.order.total}}</span>
				</div>
				<div class="panel-item">
					<span>用户级别</span>
					<span>{{agency_info.type}}</span>
				</div>
				<div class="panel-item">
					<span>团队订单(单)</span>
					<span>{{agency_info.order.count}}</span>
				</div>
			</div>

			<div @click="$router.push({path:'/my/distribution/withdraw'})" class="list-item">
				<span>佣金提现</span>
				<i class="iconfont icon-youbian"></i>
			</div>
			<div @click="$router.push({path:'/my/distribution/stream'})" class="list-item">
				<span>佣金明细</span>
				<i class="iconfont icon-youbian"></i>
			</div>
			<div @click="$router.push({path:'/my/distribution/team'})" class="list-item">
				<span>我的团队</span>
				<i class="iconfont icon-youbian"></i>
			</div>
			<div @click="$router.push({path:'/my/distribution/qrcode'})" class="list-item">
				<span>我的二维码</span>
				<i class="iconfont icon-youbian"></i>
			</div>
		</template>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'myDistribution',
		components: {
			headerBox
		},
		data() {
			return {
				agency_info: ''
			}
		},
		methods: {
			join() {
				this.$http({
						url: this.$store.state.domain + '/agency/apply',
						method: 'GET',
						params: {
							key: window.localStorage.access_token,
						}
					})
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							window.sessionStorage.pay = JSON.stringify({
								trade_no: res.data.trade_no,
								total: 1000,
								number: 1,
								type: 'earnest1'
							})
							this.$router.push({
								path: '/order/pay'
							})
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			}
		},
		activated() {
			this.$http({
					url: this.$store.state.domain + '/agency/index',
					method: 'GET',
					params: {
						key: window.localStorage.access_token
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.agency_info = res.data
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

<style scoped lang="less">
	.no-join {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background: #F3F3F3;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		& > i {
			font-size: 10rem;
			color: #D9D9D9;
			margin-bottom: 1.6rem;
		}
		& > span:nth-of-type(1) {
			font-size: 1.6rem;
			color: #222222;
			margin-bottom: 4rem;
		}
		.distribution-btn {
			width: auto;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}
	
	.my-distribution {
		min-height: 100vh;
		background: #F3F3F3;
	}
	
	.list-item {
		background: white;
		border-bottom: 1px solid #F3F3F3;
		height: 5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem 0 2rem;
		& > span:nth-of-type(1) {
			font-size: 1.6rem;
			color: #1A1A1A;
		}
		& > i {
			color: #999999;
			margin-left: 1rem;
			font-size: 1.4rem;
		}
	}
	
	.list-item:nth-of-type(2n+1) {
		margin-top: 1rem;
	}
	
	.panel {
		background: white;
		padding: 1rem 3%;
		display: flex;
		flex-wrap: wrap;
		.panel-item {
			display: flex;
			flex: 1 1 45%;
			margin-right: 4%;
			height: 8rem;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: white;
			border-radius: 5px;
			margin-bottom: 0.6rem;
			& > span:nth-of-type(1) {
				font-size: 1.2rem;
				margin-bottom: 0.6rem;
			}
			& > span:nth-of-type(2) {
				font-size: 1.8rem;
			}
		}
		.panel-item:nth-of-type(1) {
			background: #ff7873;
		}
		.panel-item:nth-of-type(2) {
			background: #2BD9D9;
		}
		.panel-item:nth-of-type(3) {
			background: #3AAAFF;
		}
		.panel-item:nth-of-type(4) {
			background: #28D45A;
		}
		.panel-item:nth-of-type(2n) {
			margin-right: 0;
		}
	}
</style>