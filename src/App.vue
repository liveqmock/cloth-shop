<template>
	<div id="app">
		<toast></toast>
		<!-- 过渡效果 -->
		<zgAnimate :name="'fade'"> 
			<!-- 缓存 -->
			<keep-alive :include="$store.state.include">
				<router-view></router-view>
			</keep-alive>
		</zgAnimate>
	</div>
</template>

<script>
	import zgAnimate from './components/commons/zgAnimate.vue'
	import toast from './components/commons/toast.vue'
	export default {
		name: 'app',
		components: {
			toast,
			zgAnimate
		},
	}
</script>

<style scoped lang="less">
	@import './style/common.css'; //重置样式表
	@import './style/animate.min.css';//动画库
	@import './style/iconfont.css';//图标库
	#app {
		position: relative;
	}
</style>