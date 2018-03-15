<template>
	<div class="success">
		<headerBox :flag="'none'" :title="'支付失败'"></headerBox>
		<div class="noGood">
			<i class="iconfont icon-cuowu"></i>
			<p>支付失败</p>
			<span @click="$router.replace({name:'balance'})" class="btn">去充值</span>
			<span @click="$router.replace({name:'home'})" class="btn">返回首页</span>
		</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'orderPayFail',
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
		background: #F3F3F3;
		&>i {
			font-size: 10rem;
			color: #999999;
			margin-bottom: 1.6rem;
		}
		&>p {
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