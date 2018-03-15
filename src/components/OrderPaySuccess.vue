<template>
	<div class="success">
		<headerBox :flag="'none'" :title="'支付成功'"></headerBox>
		<div v-if="$route.query.type=='1'" class="noGood">
			<i class="iconfont icon-chenggong1"></i>
			<p>支付完成，请在收到商品之后</p>
			<p>再确认收货哦!</p>
			<span @click="$router.replace({name:'myOrder'})" class="btn">查看订单</span>
			<span @click="$router.replace({name:'home'})" class="btn">返回首页</span>
		</div>
		<div v-if="$route.query.type=='2'" class="noGood">
			<i class="iconfont icon-chenggong1"></i>
			<p>申请成功</p>
			<span @click="$router.replace({name:'myDistribution'})" class="btn">前往分销中心</span>
			<span @click="$router.replace({name:'home'})" class="btn">返回首页</span>
		</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'orderPaySuccess',
		components: {
			headerBox,
		},
	}
</script>

<style scoped lang="less">
	.noGood {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80vh;
		padding-top: 20vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		& > i {
			font-size: 10rem;
			color: #FF5555;
			margin-bottom: 1.6rem;
		}
		& > p {
			font-size: 1.6rem;
			color: #222222;
		}
		.btn:nth-of-type(1) {
			margin-top: 4rem;
		}
		.btn:nth-of-type(2) {
			margin-top: 2rem;
		}
	}
</style>