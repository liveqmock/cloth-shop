<template>
	<div v-if="show" class="view">
		<!--header 关闭-->
		<div class="header">
			<i @click="$emit('update:show',false)" class="iconfont icon-fanhui"></i>
			<span>图片预览</span>
			<i></i>
		</div>
		<touch @swipeleft="swipe('left')" @swiperight="swipe('right')">
			<template v-for="(item,index) in imgs">
				<transition :duration="{enter:1000,leave:1000}" :enter-active-class="enter" :leave-active-class="leave">
					<div v-show="show_img==index" class="img-wrap animated">
						<img :ref="'img'+index" :src="$store.state.domain+item" />
					</div>
				</transition>
			</template>
		</touch>
		<!--指示器-->
		<div class="pointer">
			{{show_img+1+'/'+imgs.length}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'viewOriginalImage',
		props: {
			imgs: { //views
				type: Array,
				default: () => []
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show_img: 0, //显示索引
				enter: 'slideInRight',
				leave: 'slideOutLeft',
			}
		},
		watch: {
			//让图标宽高等于原图尺寸
			show: function (newValue, oldValue) {
				if(newValue) {
					this.$nextTick(() => {
						this.imgs.forEach((n, i) => {
							this.$refs[`img${i}`][0].width = this.$refs[`img${i}`][0].naturalWidth
						})
					})
				}
			}
		},
		methods: {
			swipe(direction) { //左右滑动
				if(direction == 'right') {
					this.enter = 'slideInLeft'
					this.leave = 'slideOutRight'
					setTimeout(() => {
						this.show_img = this.show_img == 0 ? this.imgs.length - 1 : this.show_img - 1
					}, 1)
				} else {
					this.enter = 'slideInRight'
					this.leave = 'slideOutLeft'
					setTimeout(() => {
						this.show_img = this.show_img == this.imgs.length - 1 ? 0 : this.show_img + 1
					}, 1)
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.view {
		z-index: 1000;
		position: fixed;
		overflow: hidden;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 8%;
			background: rgba(0, 0, 0, 1);
			font-size: 1.6rem;
			padding: 0 1rem;
			color: white;
			& > i {
				font-size: 1.6rem;
				color: white;
				font-weight: bold;
				display: flex;
				align-items: center;
				height: 100%;
				width: 6rem;
			}
			& > span {
				margin-left: -2rem;
			}
		}
		.pointer {
			position: absolute;
			top: 92%;
			left: 0;
			width: 100%;
			height: 8%;
			background: rgba(0, 0, 0, 1);
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
		}
		.img-wrap {
			position: absolute;
			top: 7%;
			left: 0;
			width: 100%;
			height: 86%;
			align-items: center;
			justify-content: center;
			display: flex;
			background: rgba(0, 0, 0, 1);
			img {
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
</style>