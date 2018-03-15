<template>
	<div class="order">
		<headerBox :flag="'back'" :title="'订单信息'"></headerBox>

		<!--绿色状态栏-->
		<div class="status-bar">
			<span>{{order.order_status_zh}}</span>
			<span>{{order.update_time}}</span>
		</div>

		<!--地址-->
		<div v-if="order!=''" class="address">
			<div class="add-icon"><i class="iconfont icon-weizhi"></i></div>
			<div class="add-info">
				<div class="info-title">
					<span>收货人：{{order.consignee}}</span>
					<span>{{order.phone}}</span>
				</div>
				<div class="detail">地址：{{order.detail}}</div>
			</div>
		</div>

		<!--按品牌分-->
		<div v-if="order!=''" class="brand">
			<div @click="$router.push({name:'sort',query:{key:'brand',value:order.brand,title:order.name}})" class="brand-title">
				<div>
					<img :src="$store.state.domain+order.avatar" />
					<span>{{order.name}}</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<template v-for="(item,index) in goods">
				<div @click="$router.push({name:'goodDetail',query:{id:item.goods_id}})" :key="index" class="good-cell">
					<img :src="$store.state.domain+item.avatar" />
					<div class="good-info">
						<p class="good-title">{{item.title}}</p>
						<p class="good-attr">
							<template v-for="attr in item.attr_format">
								<span>{{attr.attr_name+'：'+attr.attr_value}}</span>
							</template>
						</p>
						<p class="good-number"><span>数量：{{item.goods_num}}</span><span>￥{{item.final_price}}</span></p>
					</div>
				</div>
			</template>
			<div class="remark">
				<span>{{order.remark==''?'没有备注信息':order.remark}}</span>
			</div>
		</div>

		<!--计算价格-->
		<div class="calculate">
			<div class="cal-item">
				<span>商品总价</span>
				<span>￥{{order.pay_fee}}</span>
			</div>
			<div class="cal-item">
				<span>订单编号</span>
				<span>{{order.order_no}}</span>
			</div>
			<div class="cal-item">
				<span>下单时间</span>
				<span>{{order.add_time}}</span>
			</div>
			<a :href="'tel:'+phone" class="cal-item">
				<span>您对订单信息有疑问吗？</span>
				<span>联系客服</span>
			</a>
		</div>

		<!--总价、结算-->
		<div class="functionBar">
			<div class="all-total">
				<p>合计：<span class="all-total-price">
					<span>￥</span>{{order.pay_fee}}
					</span>
				</p>
				<p>共{{count}}件商品</p>
			</div>
			<div @click="payNow" v-if="order.button_status=='1'" class="btn settlement">
				立即付款
			</div>
			<div v-else-if="order.button_status=='4'" @click="seeLogistics" class="btn settlement">
				查看物流
			</div>
			<div v-else @click="submit" class="btn settlement">
				再次购买
			</div>
		</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'orderDetail',
		components: {
			headerBox,
		},
		data() {
			return {
				order: '', //购买的商品
				goods: [],//订单数据
				address: [], //地址列表
				address_s: '', //选择地址
				remark: '', //备注
				count: 0,//商品总数
				phone: ''//客服电话
			}
		},
		methods: {
			//查看物流
			seeLogistics() {
				this.$router.push({
					path: '/order/logistics',
					query: {
						id: this.order.id,
					}
				})
			},
			//支付订单
			payNow(item) {
				let trade_no = this.order.trade_no
				this.$http({
						url: this.$store.state.domain + '/order/verify',
						method: 'GET',
						params: {
							key: window.localStorage.access_token,
							trade_no: trade_no
						}
					})
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							let total = this.order.pay_fee
							let number = 0
							this.goods.forEach(g => {
								number += g.goods_num
							})
							window.sessionStorage.pay = JSON.stringify({
								trade_no: res.data.trade_no,
								total: total,
								number: number,
								type: ''
							})
							this.$router.push({
								path: '/order/pay'
							})
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			},
			//再次购买
			submit() {
				let goods = []
				this.goods.forEach(g => {
					goods.push({
						goods_id: g.goods_id,
						number: g.goods_num,
						product_id: g.product_id,
					})
				})
				this.$store.commit('order_from', 'cart')
				this.$store.commit('order_goods', goods)
				this.$router.push({
					name: 'order'
				})
			}
		},
		//获取订单信息
		created() {
			this.$http({
					url: this.$store.state.domain + '/order/detail',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.$route.query.id
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						[this.order, this.goods, this.phone] = [res.data.order, res.data.goods, res.data.service_tel]
						res.data.goods.forEach(g => {
							this.count += parseInt(g.goods_num)
						})
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		},
	}
</script>

<style scoped lang="less">
	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.6rem;
		line-height: 2rem;
		color: white;
		background: #25D08E;
		height: 4.4rem;
		padding: 0 2rem;
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
		& > span {
			display: flex;
			align-items: center;
			height: 2.6rem;
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
				color: #222222;
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
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
			font-size: 1.4rem;
			color: #222222;
			font-weight: bold;
			& > div {
				display: flex;
				align-items: center;
				& > img {
					width: 2.6rem;
					height: 2.6rem;
					border-radius: 50%;
					margin-right: 2rem;
				}
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