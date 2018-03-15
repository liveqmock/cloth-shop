<template>
	<div class="withdraw">
		<headerBox :flag="'back'" :title="'佣金提现'"></headerBox>
		<div class="withdraw-header">
			<span>我要提现</span>
			<div class="withdraw-amount"><span>￥</span><input v-model="money" type="text" @change="num" @keyup="num" /></div>
			<div class="header-info">
				<div class="info-item">
					<span>￥678.00</span>
					<span>●</span>
					<span>可提现佣金</span>
				</div>
				<div class="info-item">
					<span>￥678.00</span>
					<span>●</span>
					<span>已提现佣金</span>
				</div>
			</div>
		</div>
		<div class="main-body">
			<div class="body-item">
				<span>累计佣金</span>
				<span>￥2415.00</span>
			</div>
			<div class="body-item">
				<span>已申请提现</span>
				<span>￥2415.00</span>
			</div>
			<div class="body-item">
				<span>待打款佣金</span>
				<span>￥2415.00</span>
			</div>
			<div class="body-tip">
				<p>订单办理完成后，立即获得分销佣金。</p>
				<p>注意：默认提现到微信，可提现佣金满100元才能提现。</p>
			</div>
		</div>
		<span class="btn withdraw-btn">申请提现</span>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'myDistributionWithDraw',
		components: {
			headerBox
		},
		data() {
			return {
				money: '',
			}
		},
		methods: {
			num() {//数字验证
				this.money = this.money.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
				this.money = this.money.replace(/^\./g, ""); //验证第一个字符是数字
				this.money = this.money.replace(/^0{2,}/, "0"); //验证不以多个0开头
				this.money = this.money.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
				this.money = this.money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
				if(parseFloat(this.money) < 0) {
					this.money = '0'
				}
				if(parseFloat(this.money) > 10000000) {
					this.money = '10000000.00'
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.withdraw-btn {
		margin-top: 4rem;
		margin-left: 5%;
		width: 90%;
		height: 4rem;
	}
	
	.main-body {
		background: white;
		.body-item {
			padding: 0 2rem;
			height: 5rem;
			font-size: 1.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F3F3F3;
		}
		.body-tip {
			padding: 1.5rem 2rem;
			line-height: 2rem;
			font-size: 1.2rem;
		}
	}
	
	.withdraw {
		background: #F3F3F3;
		min-height: 100vh;
	}
	
	.withdraw-header {
		color: white;
		font-size: 1.4rem;
		background: #FF5555;
		padding: 1.5rem 2rem;
		display: flex;
		flex-direction: column;
		.withdraw-amount {
			display: flex;
			border-bottom: 1px solid white;
			align-items: baseline;
			font-size: 1.6rem;
			margin: 3.5rem 0;
			&>input {
				max-width: 70vw;
				display: flex;
				flex: 1 1 auto;
				background: none;
				color: white;
				font-size: 3rem;
				vertical-align: bottom;
			}
		}
		.header-info {
			display: flex;
			justify-content: space-between;
			.info-item {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}
</style>