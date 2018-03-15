<template>
	<transition mode="out-in" :duration="{enter:1000,leave:1000}" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
		<div v-show="show" class="orderAddress">
			<headerBox :flag="'none'" :title="'选择地址'">
				<div class="back">
					<i @click="$emit('update:show',false)" class="iconfont icon-fanhui"></i>
				</div>
			</headerBox>
			<!--有地址-->
			<div v-show="address.length>0" class="address">
				<template v-for="(item,index) in address">
					<div @click="selectAdd(index)" class="address-cell">
						<div class="check">
							<i v-show="!item.check" class="iconfont icon-xuanze"></i>
							<i v-show="item.check" class="iconfont icon-gou"></i>
						</div>
						<div class="info">
							<p class="consignee">
								<span>{{item.consignee}}<span v-if="index==0" class="default">默认地址</span></span>
								<span>{{item.tel}}</span>
							</p>
							<p class="detail">{{item.province_zh+item.city_zh+item.district_zh+item.address}}</p>
						</div>
					</div>
				</template>
				<div @click="show_add=true" class="btn add-address">添加收货地址</div>
			</div>

			<!--没有地址-->
			<div v-show="address.length==0" class="noAddress">
				<i class="iconfont icon-icondizhiguanlii"></i>
				<span>您还没有添加收货地址</span>
				<span @click="show_add=true" class="btn">添加收货地址</span>
			</div>

			<!--添加收货地址-->
			<orderAddressAdd :show.sync="show_add" @submit="addAddress"></orderAddressAdd>

		</div>
	</transition>
</template>

<script>
	import headerBox from './headerBox.vue'
	import orderAddressAdd from './orderAddressAdd.vue'
	export default {
		name: 'orderAddress',
		components: {
			headerBox,
			orderAddressAdd
		},
		props: {
			show: {//显示控制
				type: Boolean,
				default: false
			},
			address: {//地址列表
				type: Array,
				default: () => []
			},
			address_s: {//选择的地址
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				show_add: false
			}
		},
		methods: {
			//添加收货地址
			addAddress(address) {
				let arr = this.address
				arr.push(address)
				this.$emit('update:address', arr)
				this.$emit('update:address_s', arr[0])
			},
			//选择一个收货地址
			selectAdd(index) {
				let arr = this.address
				arr.forEach(a => a.check ? a.check = false : 0)
				arr[index].check = true
				this.$emit('update:address', arr)
				this.$emit('change', index)
				this.$emit('update:show', false)
			}
		}
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
		& > i {
			font-size: 2rem;
			display: flex;
		}
	}
	
	.orderAddress {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: white;
		z-index: 1000;
	}
	
	.noAddress {
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
	
	.address {
		overflow: scroll;
		height: calc(100vh-13.8rem);
		.address-cell {
			background: white;
			margin-bottom: 1rem;
			display: flex;
			font-size: 1.6rem;
			color: #222222;
			margin: 1rem 1rem;
			border: 1px solid #F3F3F3;
			.check {
				flex: 0 0 5rem;
				display: flex;
				justify-content: center;
				align-items: center;
				& > i {
					color: #FF5555;
				}
			}
			.info {
				display: flex;
				padding: 0 1rem 0 0;
				flex: 1 1 auto;
				flex-direction: column;
				.consignee, .detail {
					height: 3.6rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
				.detail {
					color: #999999;
				}
				.default {
					color: #FF5555;
					border: 1px solid #FF5555;
					padding: 0.4rem 0.8rem 0.3rem 0.8rem;
					font-size: 1.4rem;
					margin-left: 1rem;
				}
			}
		}
	}
	
	.add-address {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		border-radius: 0;
		height: 4.6rem;
	}
</style>