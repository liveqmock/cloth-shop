<template>
	<div class="my-balance">
		<headerBox :flag="'back'" :title="'我的余额'"></headerBox>
		<div class="balance-number">
			<div class="balance-title">我的余额(元)</div>
			<span>{{user_info.balance}}</span>
		</div>
		<!--充值金额-->
		<div class="recharge-amount">
			<div class="amount-title">充值金额</div>
			<div class="amount">
				<span v-touch-ripple @click="select=item" v-for="item in amount" :class="{'amount-item':true,'active-item':select==item}">{{item}}</span>
			</div>
			<input type="text" placeholder="自定义" @keyup="num" @change="num" v-model="money" />
		</div>
		<!--支付方式-->
		<div class="recharge-way">
			<div class="way-title">
				<span>充值方式</span>
				<div class="way-item">
					<img src="../assets/wx.png" />
					<span>微信支付</span>
				</div>
			</div>
		</div>
		<!--提交充值-->
		<div v-touch-ripple class="btn recharge-btn">充值</div>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'orderDetail',
		components: {
			headerBox
		},
		data() {
			return {
				user_info: JSON.parse(window.localStorage.user_info),
				amount: [20, 50, 100, 200, 300, 500, 1000, 2000, 5000],//充值金额列表
				money: '',//自定义充值金额
				select: 20,//选择的充值金额
			}
		},
		methods: {
			num() { //输入验证
				this.money = this.money.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				this.money = this.money.replace(/^\./g, ""); //验证第一个字符是数字
				this.money = this.money.replace(/^0{2,}/, "0"); //验证不以多个0开头
				this.money = this.money.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
				this.money = this.money.replace(".", "$#$")
					.replace(/\./g, "")
					.replace("$#$", ".");
				this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				if(parseFloat(this.money) < 0) {
					this.money = '0'
				}
				if(parseFloat(this.money) > 10000000) {
					this.money = '10000000.00'
				}
			},
		},
	}
</script>

<style scoped lang="less">
	.recharge-btn {
		margin-top: 4rem;
		margin-left: 5%;
		width: 90%;
		height: 4rem;
		font-size: 1.6rem;
	}
	
	.recharge-way {
		border-bottom: 1px solid #F3F3F3;
		.way-title {
			height: 4rem;
			margin: 0 2rem;
			font-size: 1.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.way-item {
				height: 4rem;
				display: flex;
				align-items: center;
				margin: 0 2rem;
				& > img {
					height: 2.4rem;
					width: 2.4rem;
					margin-right: 1rem;
				}
				& > span {
					font-size: 1.4rem;
				}
			}
		}
	}
	
	.balance-number {
		border-bottom: 1px solid #F3F3F3;
		.balance-title {
			color: #999999;
			height: 4rem;
			line-height: 4rem;
			margin-left: 2rem;
			font-size: 1.4rem;
		}
		& > span {
			width: 100%;
			height: 11rem;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 4.4rem;
		}
	}
	
	.recharge-amount {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 1rem;
		& > input {
			display: flex;
			height: 5rem;
			font-size: 1.8rem;
			background: #F3F3F3;
			margin: 0 2rem;
			text-align: center;
			flex: 1 1 auto;
		}
		.amount-title {
			height: 4rem;
			line-height: 4rem;
			margin-left: 2rem;
			font-size: 1.4rem;
		}
		.amount {
			padding: 0 2rem;
			display: flex;
			flex-wrap: wrap;
			.amount-item {
				margin-bottom: 1.5rem;
				flex: 1 1 30%;
				margin-right: 5%;
				justify-content: center;
				align-items: center;
				display: flex;
				height: 4rem;
				background: #F3F3F3;
				font-size: 1.6rem;
			}
			.amount-item:nth-of-type(3n) {
				margin-right: 0;
			}
			.active-item {
				background: #FF5555;
				color: white;
			}
		}
	}
</style>