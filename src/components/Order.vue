<template>
	<div class="order">
		<headerBox :flag="'back'" :title="'填写订单'"></headerBox>
		<!--地址-->
		<div v-if="address_s!={}" @click="show_address=true" class="address">
			<div class="add-icon"><i class="iconfont icon-weizhi"></i></div>
			<div class="add-info">
				<div class="info-title">
					<span>收货人：{{address_s.consignee}}</span>
					<span>{{address_s.tel}}</span>
				</div>
				<div class="detail">地址：{{address_s.province_zh+address_s.city_zh+address_s.district_zh+address_s.address}}</div>
			</div>
			<div class="address-select">
				<i class="iconfont icon-youbian"></i>
			</div>
		</div>

		<!--没有地址时显示-->
		<div v-else class="noAddress" @click="show_address=true">
			<span>添加收货地址</span>
			<i class="iconfont icon-youbian"></i>
		</div>

		<orderAddress :show.sync="show_address" :address_s.sync="address_s" :address.sync="address" @change="changeAdd"></orderAddress>

		<!--按品牌分-->
		<template v-for="(item,index) in order">
			<div :key="index" class="brand">
				<div class="brand-title">
					<img :src="$store.state.domain+item.avatar" />
					<span>{{item.brand}}</span>
				</div>
				<template v-for="(good,i) in item.goods">
					<div :key="i" class="good-cell">
						<img :src="$store.state.domain+good.avatar" />
						<div class="good-info">
							<p class="good-title">{{good.title}}</p>
							<p class="good-attr">
								<template v-for="attr in good.goods_attr_arr">
									<span>{{attr.attr_name+'：'+attr.attr_value}}</span>
								</template>
							</p>
							<p class="good-number"><span>数量：{{good.number}}</span><span>￥{{good.final_price}}</span></p>
						</div>
					</div>
				</template>
				<div class="remark">
					<input v-model="item.remark" placeholder="选填：给商家留言(50字以内)" maxlength="50" />
				</div>
			</div>
		</template>

		<!--选择优惠-->
		<!--<div @click="show_coupon=true" class="optional">
			<div class="op-item">
				<span>优惠券</span>
				<span v-if="coupon.money==undefined">选择<i class="iconfont icon-youbian"></i></span>
				<span class="coupon-select" v-else>{{coupon.coupon_name}}<i class="iconfont icon-youbian"></i></span>
			</div>
		</div>-->
		<!--选择优惠券-->
		<!--<coupon :show.sync='show_coupon' :coupon.sync="coupon" :available.sync="available" :unavailable="unavailable"></coupon>-->

		<!--计算价格-->
		<div class="calculate">
			<div class="cal-item">
				<span>商品总价</span>
				<span>￥{{goods_total}}</span>
			</div>
			<!--<div class="cal-item">
				<span>优惠券</span>
				<span>-{{parseFloat(coupon_price)>goods_total?goods_total:parseFloat(coupon_price).toFixed(2)}}</span>
			</div>-->
		</div>

		<!--总价、结算-->
		<div class="functionBar">
			<div class="all-total">
				<p>合计：<span class="all-total-price">
					<span>￥</span>{{parseFloat(goods_total)}}
					</span>
				</p>
				<p>共{{number_total}}件商品</p>
			</div>
			<div @click="submit" class="btn settlement">
				提交订单
			</div>
		</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import coupon from './commons/coupon.vue'
	import orderAddress from './commons/orderAddress.vue'
	export default {
		name: 'order',
		components: {
			headerBox,
			coupon,
			orderAddress
		},
		data() {
			return {
				order: [], //购买的商品
				address: [], //地址列表
				address_s: {}, //选择地址
				remark: '', //备注
				coupon: {}, //选择的coupon
				show_coupon: false, //显示coupon选择
				show_address: false, //显示address选择
				available: [], //可用的coupon
				unavailable: [], // 不可用的coupon
			}
		},
		computed: {
			goods() {//从vuex或storage中获取下单的货物
				if(this.$store.state.order_goods == '' && window.sessionStorage.order_goods) {
					this.$store.commit('order_goods', JSON.parse(window.sessionStorage.order_goods))
				}
				return this.$store.state.order_goods
			},
			from() {//下单方式
				if(this.$store.state.order_from == '' && window.sessionStorage.order_from) {
					this.$store.commit('order_from', window.sessionStorage.order_from)
				}
				return this.$store.state.order_from
			},
			coupon_price() {
				return this.coupon.money != undefined ? this.coupon.money : 0.00
			},
			goods_total() { //货物的总价格
				if(this.order.length > 0) {
					let total = 0
					this.order.forEach(b => {
						b.goods.forEach(g => {
							total += g.number * g.final_price
						})
					})
					return total.toFixed(2)
				} else {
					return 0.00
				}
			},
			number_total() {//货物的件数
				if(this.order.length > 0) {
					let number = 0
					this.order.forEach(b => {
						b.goods.forEach(g => {
							number += parseInt(g.number)
						})
					})
					return number
				} else {
					return 0
				}
			},
		},
		methods: {
			//改变选择地址
			changeAdd(index) {
				this.address_s = this.address[index]
			},
			//提交订单
			submit() {
				let brand = []
				this.order.forEach(o => {
					let obj = {
						goods: [],
						remark: o.remark
					}
					o.goods.forEach(g => {
						let good = {
							goods_id: g.goods_id,
							product_id: g.product_id,
							number: g.number,
						}
						obj.goods.push(good)
					})
					brand.push(obj)
				})
				this.$http({
						url: this.$store.state.domain + '/order/submit',
						method: 'GET',
						params: {
							key: window.localStorage.access_token,
							data: {
								delivery: this.address_s.id,
								//coupon: this.coupon.id,
								brand: brand
							}
						}
					})
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '1'
							})
							setTimeout(() => {
								window.sessionStorage.pay = JSON.stringify({
									trade_no: res.data.trade_no,
									total: parseFloat(this.goods_total),
									number: this.number_total
								})
								this.$router.replace({
									name: 'orderPay'
								})
							}, 1500)
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			}
		},
		created() {
			this.$http({//获取下单信息
					url: this.$store.state.domain + '/order/preview',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						data: {
							goods: this.goods,
							from: this.from
						}
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						//order
						let order = res.data.order
						order.forEach(o => {
							o.remark = ''
						})
						this.order = order
						//address
						let address = res.data.address
						address.forEach(a => {
							a.check = false
						})
						address[0].check = true
						this.address = address
						this.address_s = address[0]

						//coupon
						//					let arr1 = []
						//					let arr2 = []
						//					res.data.coupon.map(c => {
						//						if(parseFloat(this.goods_total) >= parseFloat(c.money_limit)) {
						//							c.check = false
						//							arr1.push(c)
						//						} else {
						//							arr2.push(c)
						//						}
						//					})
						//					console.log(arr1)
						//					console.log(arr2)
						//					this.available = arr1
						//					this.unavailable = arr2

					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		}
	}
</script>

<style scoped lang="less">
	.noAddress {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.6rem;
		color: #FF5555;
		border-bottom: 1px solid #F3F3F3;
		height: 6rem;
		background: white;
		& > i {
			font-size: 1.6rem;
		}
		& > span {
			margin-right: 1rem;
			line-height: 1.8rem;
		}
	}
	
	.coupon-select {
		color: #FF5555;
	}
	
	.order {
		background: #F3F3F3;
		min-height: 88vh;
		padding-bottom: 12vw;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.remark {
		margin-bottom: 0.8rem;
		background: white;
		& > input {
			height: 3rem;
			padding: 0.6rem 1.4rem;
			font-size: 1.4rem;
			width: 100%;
		}
	}
	
	.optional {
		background: white;
		.op-item {
			font-size: 1.4rem;
			padding: 0 1.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 4rem;
			border-bottom: 1px solid #F3F3F3;
			& i {
				margin-left: 0.6rem;
				font-size: 1.4rem;
			}
		}
	}
	
	.calculate {
		background: white;
		.cal-item {
			padding: 0 1.4rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 4rem;
			border-bottom: 1px solid #F3F3F3;
			font-size: 1.4rem;
			& > span:nth-of-type(2) {
				color: #ff5555;
			}
		}
	}
	
	.brand {
		background: white;
		.brand-title {
			padding: 0 1.4rem;
			height: 4rem;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #F3F3F3;
			font-size: 1.4rem;
			color: #222222;
			font-weight: bold;
			& > img {
				width: 2.6rem;
				height: 2.6rem;
				border-radius: 50%;
				margin-right: 2rem;
			}
		}
		.freight {
			padding: 0 1.4rem;
			height: 3.6rem;
			font-size: 1.4rem;
			color: #222222;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.8rem;
			& > span:nth-of-type(2) {
				font-size: 1.6rem;
			}
		}
		.good-cell {
			height: 10rem;
			padding: 1.2rem 1.4rem;
			display: flex;
			font-size: 1.6rem;
			border-bottom: 1px solid #F3F3F3;
			& > img {
				height: 10rem;
				width: 10rem;
				margin-right: 1rem;
			}
			.good-info {
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.good-number {
					display: flex;
					justify-content: space-between;
					& > span:nth-of-type(1) {
						font-size: 1.4rem;
						color: #999999;
					}
				}
				.good-attr {
					& > span {
						font-size: 1.2rem;
						margin-right: 1rem;
						color: #999999;
					}
				}
			}
		}
	}
	
	.address {
		background: white;
		height: 5rem;
		padding: 1rem 0;
		display: flex;
		border-bottom: 1px solid #F3F3F3;
		.add-icon {
			display: flex;
			width: 14vw;
			font-size: 1.6rem;
			justify-content: center;
			align-items: center;
		}
		.add-info {
			width: 75vw;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 5rem;
			font-size: 1.4rem;
			color: #222222;
			.detail {
				color: #999999;
			}
			.info-title {
				display: flex;
				justify-content: space-between;
			}
		}
		.address-select {
			flex: 0 0 11vw;
			display: flex;
			justify-content: center;
			align-items: center;
			& > i {
				font-size: 2rem;
			}
		}
	}
	
	.functionBar {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FAFAFA;
		.all-total {
			height: 10vw;
			flex: 0 0 62vw;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 1vw 0;
			padding-left: 3vw;
			font-size: 1.2rem;
			.all-total-price {
				font-size: 1.6rem;
				color: #FF5555;
				font-weight: bold;
				& > span {
					font-size: 1.2rem;
				}
			}
		}
		.settlement {
			flex: 0 0 35vw;
			border-radius: 0;
			border-radius: 0;
			height: 12vw;
			font-size: 1.6rem;
		}
	}
</style>