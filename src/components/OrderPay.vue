<template>
	<div class="pay">
		<headerBox :flag="'back'" :title="'订单支付'"></headerBox>
		<div class="main-body">
			<!--订单信息-->
			<div class="row">
				<span>订单编号</span>
				<span>{{pay.trade_no}}</span>
			</div>
			<div class="row">
				<span>应付金额</span>
				<span>合计：￥{{pay.total}}</span>
			</div>

			<!--支付方式-->
			<div class="pay-way">
				<div class="pay-title">
					支付方式
				</div>
				<div v-if="pay.type!='earnest'" @click="way='balance'" class="way">
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="way!='balance'" class="iconfont icon-xuanze"></i>
					</transition>
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="way=='balance'" class="iconfont icon-gou"></i>
					</transition>
					<img src="../assets/balance.png" />
					<span>余额</span>
				</div>
				<div @click="way='wechatjsapi'" class="way">
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="way!='wechatjsapi'" class="iconfont icon-xuanze"></i>
					</transition>
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="way=='wechatjsapi'" class="iconfont icon-gou"></i>
					</transition>
					<img src="../assets/wx.png" />
					<span>微信</span>
				</div>
			</div>
			
			<!--如果是支付诚意金的订单-->
			<div v-if="pay.type=='earnest'" class="tip">
				<p>支付完成后，立即成为分销商</p>
				<p>并立即返还1000元</p>
			</div>
		</div>
		<!--立即支付-->
		<div class="functionBar">
			<div class="all-total">
				<p>合计：<span class="all-total-price">
					<span>￥</span>{{pay.total}}</span>
				</p>
				<p>共{{pay.number}}件商品</p>
			</div>
			<div @click="show_popup=true" class="btn settlement">
				立即支付
			</div>
		</div>

		<popup :show.sync="show_popup" :message="'确定支付吗？'" @sure="paySubmit"></popup>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import popup from './commons/popup.vue'
	export default {
		name: 'pay',
		components: {
			headerBox,
			popup
		},
		data() {
			return {
				way: 'balance',//支付方式
				show_popup: false,//消息提示框
				pay: JSON.parse(window.sessionStorage.pay)//付款信息
			}
		},
		created() {
			//如果是诚意金，只能微信支付
			if(this.pay.type == 'earnest') {
				this.way = 'wechatjsapi'
			}
			console.log(this.pay)
		},
		methods: {
			//确定付款
			paySubmit() {
				let str = this.$store.state.domain + '/payment/cashier'
				str += '?trade_no=' + this.pay.trade_no
				str += '&key=' + window.localStorage.access_token
				str += '&payway=' + this.way
				if(this.pay.type == 'earnest') {
					str += '&callback=' + '/order/pay/success?type=2'
				} else {
					str += '&callback=' + '/order/pay/success?type=1'
				}
				window.location.replace(str)
			}
		}
	}
</script>

<style lang="less" scoped>
	.tip {
		margin-top: 2rem;
		padding: 2rem;
		height: 5rem;
		display: flex;
		color: #999999;
		justify-content: center;
		align-items: center;
		line-height: 2rem;
		font-size: 1.rem;
		flex-direction: column;
	}
	
	.pay {
		background: #F3F3F3;
		min-height: 100vh;
	}
	
	.main-body {
		font-size: 1.4rem;
		color: #222222;
		.row {
			background: white;
			height: 4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 1.4rem;
			border-bottom: 1px solid #F3F3F3;
		}
		.pay-way {
			background: white;
			margin-top: 1rem;
			.pay-title {
				border-bottom: 1px solid #F3F3F3;
				height: 4rem;
				display: flex;
				align-items: center;
				padding: 0 1.4rem;
			}
			.way {
				height: 4rem;
				display: flex;
				align-items: center;
				padding: 0 4rem;
				border-bottom: 1px solid #F3F3F3;
				font-size: 1.4rem;
				position: relative;
				& > i {
					position: absolute;
					left: 2rem;
					top: 1.2rem;
					font-size: 1.6rem;
					color: #222222;
				}
				& > img {
					height: 2.8rem;
					width: 2.8rem;
					margin: 0 2rem;
				}
			}
		}
	}
	
	.functionBar {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FAFAFA;
		.all-total {
			height: 10vw;
			flex: 0 0 62vw;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 1vw 0;
			padding-left: 3vw;
			font-size: 1.2rem;
			.all-total-price {
				font-size: 1.6rem;
				color: #FF5555;
				font-weight: bold;
				& > span {
					font-size: 1.2rem;
				}
			}
		}
		.settlement {
			flex: 0 0 35vw;
			border-radius: 0;
			border-radius: 0;
			height: 12vw;
			font-size: 1.6rem;
		}
	}
</style>