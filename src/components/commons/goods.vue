<template>
	<!--商品列表-->
	<div>
		<transition-group v-if="goods.length>0" class="goods" tag="div" :duration="{enter:1000,leave:1000}" mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div @click="cellClick(index)" class="good-cell" :key="index" v-for="(item,index) in goods">
				<img :src="$store.state.domain+item.thumb_200" class="good-img" />
				<div class="good-info">
					<p class="good-title">{{item.title}}</p>
					<p class="good-shop">{{item.brand_name}}</p>
					<p class="good-price"><span>￥{{item.final_price}}</span><span>￥{{item.market_price}}</span></p>
					<p class="good-status"><span><span v-if="item.is_new=='1'">新上架</span></span><span>销量：{{item.sale_count}}</span></p>
				</div>

				<!--编辑勾选框-->
				<div v-if="edit" class="edit">
					<transition :duration="{enter:1000,leave:0}" enter-active-class="animated rubberBand">
						<i v-show="!item.check" class="iconfont icon-xuanze"></i>
					</transition>
					<transition :duration="{enter:1000,leave:0}" enter-active-class="animated rubberBand">
						<i v-show="item.check" class="iconfont icon-gou"></i>
					</transition>
				</div>
			</div>
		</transition-group>

		<!--没有商品-->
		<div key="-1" v-if="goods.length=='0'" class="noGood">
			<i class="iconfont icon-xinxi"></i>
			<span>暂无该类商品</span>
			<span @click="$router.replace({name:'home'})" class="btn">挑选其他商品</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'goods',
		props: {
			goods: {//货物列表
				type: Array,
				default: () => []
			},
			edit: {//编辑状态，收藏列表有用到
				type: Boolean,
				default: false
			}
		},
		methods: {
			//点击货物触发的事件
			cellClick(index) {
				if(this.edit) {
					let arr = this.goods
					arr[index].check = !arr[index].check
					this.$emit('update:goods', [])
					this.$emit('update:goods', arr)
				} else {
					this.$router.push({
						name: 'goodDetail',
						query: {
							id: this.goods[index].id
						}
					})
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.animated {
		animation-duration: .3s;
	}
	
	.edit {
		position: absolute;
		right: 1rem;
		top: 1rem;
		& > i {
			position: absolute;
			right: 0;
			top: 0;
			color: #222222;
		}
	}
	
	.noGood {
		position: absolute;
		top: 0;
		left: 0;
		background: #F3F3F3;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		& > i {
			font-size: 10rem;
			color: #D9D9D9;
			margin-bottom: 1.6rem;
		}
		& > span:nth-of-type(1) {
			font-size: 1.6rem;
			color: #222222;
			margin-bottom: 4rem;
		}
	}
	
	.goods {
		background: white;
		padding: 1rem 2%;
		display: flex;
		flex-wrap: wrap;
		.good-cell {
			position: relative;
			width: 49%;
			margin-right: 2%;
			border: 1px solid #f2f2f2;
			box-sizing: border-box;
			margin-bottom: 1rem;
			.good-img {
				width: 100%;
				height: 47vw;
			}
			.good-info {
				padding: 1rem 0.6rem;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				height: 9rem;
				.good-title {
					font-size: 1.4rem;
					color: #343434;
					height: 2rem;
					line-height: 2rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.good-shop {
					font-size: 1.2rem;
					color: #c1c1c1;
				}
				.good-price {
					font-size: 1.2rem;
					color: #c1c1c1;
					& > span:nth-of-type(1) {
						font-size: 1.6rem;
						color: #fc444c;
						margin-right: 1rem;
					}
					& > span:nth-of-type(2) {
						text-decoration: line-through;
					}
				}
				.good-status {
					display: flex;
					justify-content: space-between;
					font-size: 1.2rem;
					color: #c1c1c1;
				}
			}
		}
		.good-cell:nth-of-type(2n+2) {
			margin-right: 0;
		}
	}
</style>