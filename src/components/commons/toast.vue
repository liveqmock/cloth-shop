<template>
	<!--toast-->
	<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
		<div v-if="toast" class="toast">
			<i v-if="icon=='1'" class="iconfont icon-zhengque"></i>
			<i v-if="icon=='2'" class="iconfont icon-shanchu"></i>
			<i v-if="icon=='3'" class="iconfont icon-sousuo"></i>
			<span>{{messgae}}</span>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'toast',
		computed: {
			toast() {//显示
				return this.$store.state.toast
			},
			icon() {//图标
				return this.$store.state.toast_icon
			},
			messgae() {//信息
				return this.$store.state.toast_message
			},
		}
	}
</script>

<style scoped lang="less">
	.toast {
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0, 0, 0);
		animation-duration: 0.5s;
		z-index: 100000;
		margin: auto;
		position: fixed;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.7);
		border-radius: 5px;
		color: white;
		& > i {
			font-size: 35px;
			margin-bottom: 1rem;
		}
		& > span {
			font-size: 15px;
			display: flex;
			justify-content: center;
			text-align: center;
		}
	}
</style>