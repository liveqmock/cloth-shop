<template>
	<div class="logistics">
		<headerBox :flag="'back'" :title="'物流详情'"></headerBox>
		<!--订单信息-->
		<div class="order-info">
			<div class="order-img">
				<img :src="goods.length>0?$store.state.domain+goods[0].avatar:''" />
				<span class="order-total">共{{this.count}}件商品</span>
			</div>
			<div class="order-context">
				<p class="order-name"><span>商品名：{{goods.length>0?goods[0].title:''}}</span></p>
				<p class="order-distributor"><span>配送商：{{order!=''?order.delivery_name:''}}</span></p>
				<p class="order-waybill"><span>运单编号：{{order!=''?order.shipping_no:''}}</span></p>
			</div>
		</div>
		
		<!--物流信息-->
		<div class="order-status">
			<div class="status-header">
				<span>订单状态追踪</span>
			</div>
			<div class="status-painting">
				<!--线、圆-->
				<div class="status-canvas">
					<canvas ref="line"></canvas>
				</div>
				<div class="status-list">
					<div v-for="(item,index) in delivery" ref="item" class="status-item">
						<span>{{item.time}}</span>
						<span>{{item.context}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'orderLogistics',
		components: {
			headerBox
		},
		data() {
			return {
				delivery: [],//物流信息
				goods: [],//货物信息
				count: 0,//商品件数
				order: ''//订单信息
			}
		},
		created() {
			//获取物流信息
			this.$http({
					url: this.$store.state.domain + '/order/delivery',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.$route.query.id
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.goods = res.data.goods
						this.delivery = res.data.delivery
						this.count = res.data.count
						this.order = res.data.order
						//物流信息条数>0
						if(res.data.delivery.length > 0) {
							//dom更新时执行
							this.$nextTick(() => {
								//画线和圆
								let canvas = this.$refs.line
								let item = this.$refs.item
								//canvas 不拉伸
								canvas.width = canvas.offsetWidth
								canvas.height = canvas.offsetHeight
								let ctx = canvas.getContext('2d')

								//线条
								ctx.beginPath()
								ctx.lineWidth = 1
								ctx.moveTo(canvas.offsetWidth / 2, 0)
								ctx.lineTo(canvas.offsetWidth / 2, canvas.offsetHeight - item[item.length - 1].offsetHeight)
								ctx.strokeStyle = '#F3F3F3'
								ctx.stroke()
								for(let i = 0; i < item.length - 1; i++) {
									//画圆
									ctx.beginPath()
									ctx.arc(canvas.offsetWidth / 2, item[i + 1].offsetTop - item[0].offsetTop, 4, 0, Math.PI * 2, true)
									ctx.fillStyle = '#D8D8D8'
									ctx.fill()
								}
								// 创建渐变
								let grd = ctx.createRadialGradient(canvas.offsetWidth / 2, 8, 3, canvas.offsetWidth / 2, 8, 8);
								grd.addColorStop(0, '#FF5656');
								grd.addColorStop(1, "white");
								// 填充渐变
								ctx.fillStyle = grd;
								ctx.fillRect(canvas.offsetWidth / 2 - 8, 0, 16, 16);
							})
						}
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
	.order-info {
		display: flex;
		padding: 2rem;
		.order-img {
			position: relative;
			& > img {
				width: 8.6rem;
				height: 8.6rem;
			}
			& > span {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				text-align: center;
				background: rgba(0, 0, 0, 0.5);
				color: white;
			}
		}
		.order-context {
			max-width: 22rem;
			display: flex;
			flex-direction: column;
			padding: 0 2rem;
			justify-content: space-between;
			color: #999999;
			font-size: 1.3rem;
			.order-title {
				font-size: 1.6rem;
				color: #222222;
			}
			& > p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	
	.order-status {
		display: flex;
		flex-direction: column;
		padding-bottom: 50px;
		.status-header {
			height: 4rem;
			display: flex;
			align-items: center;
			margin-left: 2rem;
			flex: 1 1 auto;
			font-size: 1.2rem;
		}
		.status-painting {
			display: flex;
			.status-canvas {
				flex: 0 0 20%;
				& > canvas {
					height: 100%;
					width: 100%;
				}
			}
			.status-list {
				flex: 0 0 80%;
				flex-direction: column;
				display: flex;
				.status-item {
					margin-right: 2rem;
					background: #F3F3F3;
					padding: 2rem;
					margin-bottom: 50px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					& > span {
						font-size: 1.4rem;
						line-height: 2rem;
						color: #999999;
					}
				}
				.status-item:nth-of-type(1) {
					span {
						color: #222222;
					}
				}
				.status-item:nth-last-of-type(1) {
					margin-bottom: 0;
				}
			}
		}
	}
</style>