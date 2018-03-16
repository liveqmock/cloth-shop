<template>
	<div class="banner">
		<!--banner-->
		<touch @swipeleft="swipe('left')" @swiperight="swipe('right')">
			<template v-for="(item,index) in imgs">
				<transition mode="out-in" :enter-active-class="enter" :leave-active-class="leave">
					<img class="animated" v-if="show==index" :src="$store.state.domain+item.thumb" />
				</transition>
			</template>
		</touch>
		<!--指示器-->
		<div v-if="pointer" class="pointer">
			<span v-for="n in imgs.length" :class="{'active-item':n==(show+1)}"></span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'banner',
		props: {
			imgs: { //banners
				type: Array,
				default: () => []
			},
			duration: { //定时器间隔
				type: Number,
				default: 2500,
			},
			pointer: { //指示器
				type: Boolean,
				default: true
			}
		},
		watch: {
			imgs: function () {//第一次加载图片的时候，添加定时器
				clearInterval(this.interval)
				this.interval = setInterval(() => {
					this.show = this.show == this.imgs.length - 1 ? 0 : this.show + 1
				}, this.duration)
			},
		},
		data() {
			return {
				enter:'slideInLeft', //进出的过渡效果
				leave:'slideOutRight',//离开的过渡效果
				show: 0, //显示索引
				interval: '', //定时器
			}
		},
		methods: {
			swipe(direction) { //左右滑动
				clearInterval(this.interval)
				if(direction == 'right') {
					[this.enter,this.leave]=['slideInRight','slideOutLeft']
					setTimeout(() => {
						this.show = this.show == 0 ? this.imgs.length - 1 : this.show - 1
						this.interval = setInterval(() => {
							this.show = this.show == 0 ? this.imgs.length - 1 : this.show - 1
						}, this.duration)
					}, 1)
				} else {
					[this.enter,this.leave]=['slideInLeft','slideOutRight']
					setTimeout(() => {
						this.show = this.show == this.imgs.length - 1 ? 0 : this.show + 1
						this.interval = setInterval(() => {
							this.show = this.show == this.imgs.length - 1 ? 0 : this.show + 1
						}, this.duration)
					}, 1)
				}
			}
		},
	}
</script>

<style scoped lang="less">
     .animated{
     	animation-duration: .5s;
     }
	.pointer {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translate(-50%, 0);
		& > span {
			display: inline-flex;
			z-index: 10000;
			background: white;
			border-radius: 50%;
			height: 1rem;
			width: 1rem;
			margin-right: 1rem;
		}
		& > span:nth-last-of-type(1) {
			margin-right: 0;
		}
		.active-item {
			background: #FF5555;
		}
	}

	.banner {
		position: relative;
		width: 100%;
		overflow-x: hidden;
		height: 48.8vw;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
