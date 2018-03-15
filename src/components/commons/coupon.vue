<template>
	<transition mode="out-in" :duration="{enter:1000,leave:1000}" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
		<div v-show="show" class="coupon">

			<headerBox :flag="'none'" :title="'选择优惠券'">
				<div class="back">
					<i @click="$emit('update:show',false)" class="iconfont icon-fanhui"></i>
				</div>
			</headerBox>
			
			<!-- 确认按钮-->
			<div @click="sure" class="btn sure">确定</div>

			<!--tab-->
			<div class="love-tab">
				<span @click="tabChange('0')" :class="{'tab-item':true,'tab-active':tab=='0'}">可用&nbsp;&nbsp;({{available.length}})</span>
				<span @click="tabChange('1')" :class="{'tab-item':true,'tab-active':tab=='1'}">不可用&nbsp;&nbsp;({{unavailable.length}})</span>
			</div>
			
			<!--优惠券-->
			<div class="scroll">
				<div @click="check(item,index)" v-show="tab=='0'" :key="index" v-for="(item,index) in available" class="cell-wrap">
					<div class="coupon-cell available">
						<div class="cell-money">
							<span class="money-number"><span>￥</span>{{item.money}}</span>
							<span class="cell-limit">满{{item.money_limit}}可用</span>
						</div>
						<div class="cell-info">
							<div class="cell-title">{{item.coupon_name}}</div>
							<div class="cell-date">有效期：{{item.start_time_format}}至{{item.end_time_format}}</div>
						</div>
						<div class="check">
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="!item.check" class="iconfont icon-xuanze"></i>
							</transition>
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="item.check" class="iconfont icon-gou"></i>
							</transition>
						</div>
					</div>
				</div>
				<div v-show="tab=='1'" :key="index" v-for="(item,index) in unavailable" class="cell-wrap">
					<div class="coupon-cell">
						<div class="cell-money">
							<span class="money-number"><span>￥</span>{{item.money}}</span>
							<span class="cell-limit">满{{item.money_limit}}可用</span>
						</div>
						<div class="cell-info">
							<div class="cell-title">{{item.coupon_name}}</div>
							<div class="cell-date">有效期：{{item.start_time_format}}至{{item.end_time_format}}</div>
						</div>
						<div class="cell-tag">不可用</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import headerBox from './headerBox.vue'
	export default {
		name: 'coupon',
		components: {
			headerBox
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			coupon: {
				type: Object,
				default: {},
			},
			available: {
				type: Array,
				default: () => []
			},
			unavailable: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {

				tab: '0',
				mycoupon: {}, //选中的优惠券 
			}
		},
		methods: {
			tabChange(flag) {
				this.tab = flag
			},
			sure() {
				this.$emit('update:show', false)
				this.$emit('update:coupon', this.mycoupon)
			},
			check(item, index) {
				let arr = this.available
				if(item.check) {
					arr[index].check = false
					this.mycoupon = {}
				} else {
					arr.map(a => {
						if(a.check) {
							a.check = false
						}
					})
					arr[index].check = true
					this.mycoupon = item
				}

				this.$emit('update:available', arr)
			}
		},
	}
</script>

<style scoped lang="less">
	.back {
		display: flex;
		align-items: center;
		height: 4rem;
		position: absolute;
		padding-top: 0.4rem;
		width: 4rem;
		top: 0;
		left: 1rem;
		&>i {
			font-size: 2rem;
			display: flex;
		}
	}
	
	.coupon {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: white;
		z-index: 1000;
	}
	
	.sure {
		z-index: 1001;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 4rem;
		border-radius: 0;
		width: 100%;
	}
	
	.love-tab {
		background: white;
		display: flex;
		height: 4rem;
		width: 100%;
		.tab-item {
			flex: 1 1 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
			color: #999999;
			border-bottom: 2px solid white;
		}
		.tab-active {
			border-bottom: 2px solid #666666;
			color: #666666
		}
	}
	
	.scroll {
		padding: 1.4rem 2rem;
		overflow: scroll;
		height: calc(100vh-20rem);
		.cell-wrap {
			border: 1px solid #F3F3F3;
			position: relative;
			overflow: hidden;
			margin-bottom: 1.8rem;
			.cell-tag {
				position: absolute;
				right: -6rem;
				top: 1rem;
				height: 2rem;
				width: 16rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				background: #999999;
				transform: rotate(45deg);
			}
			.coupon-cell {
				background: white;
				width: 100%;
				height: 7rem;
				color: #999999;
				display: flex;
				.check {
					position: relative;
					height: 100%;
					flex: 0 0 10vw;
					&>i {
						position: absolute;
						left: 3vw;
						top: 3rem;
						font-size: 4vw;
						color: #FF5555;
					}
				}
				.cell-money {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 2.8rem;
					flex: 0 0 10rem;
					border-right: 1px dotted #F3F3F3;
					flex-direction: column;
					.money-number {
						margin-left: -1rem;
						&>span {
							font-size: 2rem;
						}
					}
					.cell-limit {
						font-size: 1.2rem;
					}
				}
				.cell-info {
					flex: 1 1 auto;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 1rem;
					.cell-title {
						font-size: 1.6rem;
					}
					.cell-date {
						font-size: 1rem;
					}
				}
			}
			.available {
				.cell-money {
					background: #ff5555;
					color: white;
				}
				.cell-title {
					color: #222222;
				}
			}
		}
	}
</style>