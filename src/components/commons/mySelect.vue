<template>
	<div class="select-box">
		<div @click.stop="showOptions" class="select">
			<span>{{val.name}}</span>
			<i class="iconfont icon-xiangxia"></i>
		</div>
		<div id="test" v-show="show" class="options">
			<template v-for="(item,index) in options">
				<span :key="index" @click.stop="selectOption(item)">{{item.name}}</span>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'select',
		props: {
			val: {//当前选择的option
				type: Object,
				default: ''
			},
			options: {//可选的options
				type: Array,
				default: []
			},
			show: {//显示多选框
				type: Boolean,
				default: false
			}
		},
		methods: {
			//显示多选框
			showOptions() {
				this.$emit('update:show', !this.show)
			},
			//选择item
			selectOption(item) {
				this.$emit('update:val', item)
				this.$emit('update:show', false)
			}
		}
	}
</script>

<style scoped lang="less">
	.select-box {
		display: flex;
		flex: 1 1 auto;
		position: relative;
		.select {
			padding: 0 1.5rem;
			flex: 1 1 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 4.4rem;
			font-size: 1.4rem;
		}
		.options {
			box-sizing: border-box;
			position: absolute;
			z-index: 10;
			background: #f7f7f7;
			top: 4.4rem;
			left: 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			&>span {
				padding: 0 1.5rem;
				width: 1 1 auto;
				height: 3rem;
				font-size: 1.4rem;
			}
			border:2px solid white;
			border-top:0;
		}
	}
</style>