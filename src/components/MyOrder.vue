<template>
<div class="my-order">
	<headerBox :flag="'back'"
	           :title="'我的订单'"></headerBox>

	<!--popup-->
	<popup :show.sync="show_popup"
	       :message="message"
	       @sure="orderOperater"></popup>

	<!--tab-->
	<div class="tab">
		<span @click="tabChange('0')"
		      :class="{'active-tab':tab=='0'}">全部</span>
		<span @click="tabChange('1')"
		      :class="{'active-tab':tab=='1'}">待付款</span>
		<span @click="tabChange('2')"
		      :class="{'active-tab':tab=='2'}">待发货</span>
		<span @click="tabChange('3')"
		      :class="{'active-tab':tab=='3'}">待收货</span>
		<span @click="tabChange('4')"
		      :class="{'active-tab':tab=='4'}">待评价</span>
	</div>

	<!--scroll-box-->
	<div class="scroll"
	     id="scroll"
	     @scroll="scroll">
		<!--scroll-warp-->
		<div>
			<div class="order-list">
				<!-- 订单列表 -->
				<div v-for="(item,index) in order"
				     @click="$router.push({name:'orderDetail',query:{id:item.id}})"
				     :key="index"
				     class="order-cell">
					<div class="order-title">
						<span>{{item.add_time}}</span>
						<span>{{item.order_status_zh}}</span>
					</div>
					<div v-for="(good,i) in item.goods"
					     :key="i"
					     class="order-goods">
						<img :src="$store.state.domain+good.thumb_200" />
						<div class="goods-info">
							<p class="goods-title">{{good.goods_name}}</p>
							<p class="goods-attr">
								<span v-for="attr in good.goods_attr_arr">
											{{attr.attr_name}}：{{attr.attr_value}}
										</span>
							</p>
							<p class="goods-number">
								<span>{{good.goods_num}}件</span>
								<span>￥{{good.goods_price}}</span>
								<!-- 商品操作列表 -->
								<!-- <div v-if="item.button_status=='3'||item.button_status=='4'">
									<span @click.stop="returnGood(good)"
									      v-if="good.apply_status=='0'"
									      class="btn goods-btn">退换货</span>
									<span @click.stop=""
									      v-else
									      class="btn goods-btn">{{good.apply_button}}</span>
								</div>
								<div v-if="item.button_status=='5'">
									<span @click.stop=""
									      v-if="good.apply_status!='0'"
									      class="btn goods-btn">{{good.apply_button}}</span>
									<span @click.stop="commentGood(good)"
									      v-else-if="good.goods_status=='1'"
									      class="btn goods-btn">立即评价</span>
									<span @click.stop=""
									      class="btn goods-btn"
									      v-else>已评价</span>
								</div> -->
							</p>
						</div>
					</div>

					<!--订单操作按钮-->
					<div class="order-operation">
						<p class="order-number"><span>共{{goods_count[index]}}件</span><span>总计：￥{{item.pay_fee}}</span></p>
						<p v-if="item.button_status!='1'"
						   class="order-btn">
							<span @click.stop="show_popup=true,message='确定取消订单吗？',target=index"
							      class="btn order-btn-item"
							      v-if="item.button_status=='1'">取消订单</span>
							<span @click.stop="buyAgain(item)"
							      class="btn order-btn-item"
							      v-if="item.button_status=='5'||item.button_status=='2'">再次购买</span>
							<span @click.stop="payNow(item)"
							      class="btn order-btn-item"
							      v-if="item.button_status=='1'">立即付款</span>
							<span @click.stop="seeLogistics(item)"
							      class="btn order-btn-item"
							      v-if="item.button_status>3">查看物流</span>
							<span @click.stop="show_popup=true,message='请在收到货物之后再确认收货！',target=index"
							      class="btn order-btn-item"
							      v-if="item.button_status=='4'">确认收货</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
import popup from './commons/popup.vue'
export default {
	name: 'myOrder',
	components: {
		headerBox,
		popup
	},
	data() {
		return {
			page: 2,
			limit: 20,
			tab: '0', // 状态 0-4
			order: [], //订单列表
			show_popup: false, //消息提示框
			message: '', //消息提示信息
			target: 0 //记录点击的订单索引
		}
	},
	computed: {
		goods_count() { //记录每个订单的商品件数
			let goods_count = []
			this.order.forEach(o => {
				let count = 0
				o.goods.forEach(g => {
					count += parseInt(g.goods_num)
				})
				goods_count.push(count)
			})
			return goods_count
		}
	},
	async created() {
		let res = await this.$http({ //获取初始订单列表
			url: this.$store.state.domain + '/user/order',
			method: 'GET',
			params: {
				key: window.localStorage.access_token,
				page: 1,
				limit: this.limit,
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.order = [...res.data.order]
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	},
	methods: {
		//跳转到评论商品
		commentGood(good) {
			this.$router.push({
				path: '/order/comment',
				query: {
					id: good.order_goods_id,
					avatar: good.avatar,
					goods_name: good.goods_name,
					goods_attr_arr: good.goods_attr_arr,
				}
			})
		},
		//跳转到退换货
		returnGood(good) {
			this.$router.push({
				path: '/order/return',
				query: {
					id: good.order_goods_id
				}
			})
		},
		//再次购买订单
		buyAgain(item) {
			let goods = []
			this.order[this.target].goods.forEach(g => {
				goods.push({
					goods_id: g.goods_id,
					number: g.goods_num,
					product_id: g.product_id,
				})
			})
			this.$store.commit('order_goods', goods)
			this.$store.commit('order_from', 'cart')
			this.$router.push({
				path: '/order',
			})
		},
		//跳转到物流
		seeLogistics(item) {
			this.$router.push({
				path: '/order/logistics',
				query: {
					id: item.id,
				}
			})
		},
		//支付订单
		async payNow(item) {
			let trade_no = item.trade_no
			let res = await this.$http({ //检验订单号是否正确
				url: this.$store.state.domain + '/order/verify',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					trade_no: trade_no
				}
			})
			console.log(res.data)
			if (res.data.code == '200') {
				let total = item.pay_fee
				let number = item.goods.reduce((a, b) => a.goods_num + b.goods_num)
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
		},
		async orderOperater() {
			//取消订单
			if (this.message == '确定取消订单吗？') {
				let res = await this.$http({
					url: this.$store.state.domain + '/order/cancel',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.order[this.target].id
					}
				})
				console.log(res.data)
				if (res.data.code == '200') {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '1'
					})
					this.show_popup = false
					let arr = this.order
					arr[this.target].button_status = 2
					arr[this.target].order_status_zh = '已取消'
					this.order = arr
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
				}
			} else {
				//确认收货
				let res = await this.$http({
					url: this.$store.state.domain + '/order/confirm',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.order[this.target].id
					}
				})
				console.log(res.data)
				if (res.data.code == '200') {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '1'
					})
					this.show_popup = false
					this.order[this.target].button_status = 5
					this.order[this.target].order_status_zh = '交易成功'
					this.order = [...this.order]
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
				}
			}
		},
		async scroll() {
			// 滚动加载订单
			let scroll = document.getElementById('scroll')
			if (scroll.scrollTop + scroll.clientHeight != scroll.scrollHeight) return;
			let res = await this.$http({
				url: this.$store.state.domain + '/user/order',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					page: this.page,
					limit: this.limit,
					status: this.tab
				}
			})
			console.log(res.data)
			if (res.data.code == '200' && res.data.order.length) {
				this.order.push(...res.data.order)
				this.page += 1
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		},
		//切换tab
		async tabChange(flag) {
			this.tab = flag
			let res = await this.$http({
				url: this.$store.state.domain + '/user/order',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					page: 1,
					limit: this.limit,
					status: flag
				}
			})
			console.log(res.data)
			if (res.data.code == '200') {
				this.order = [...res.data.order]
				this.page = 2
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		}
	},
}
</script>

<style scoped lang="less">
.scroll {
    position: absolute;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    overflow: scroll;
    z-index: -1;
    & > div {
        padding-top: 8.8rem;
    }
}

.order-list {
    background: #F3F3F3;
    font-size: 1.4rem;
	padding-top: 1rem;
    .order-cell {
        background: white;
        margin-bottom: 1rem;
        padding: 0 1.5rem;
        .order-operation {
            .order-number {
                height: 4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 1.5rem;
                & > span:nth-of-type(2) {
                    color: #FF5555;
                }
            }
            .order-btn {
                display: flex;
                height: 4rem;
                justify-content: flex-end;
                align-items: center;
                .order-btn-item {
                    background: white;
                    border: 1px solid #999999;
                    margin-left: 1rem;
                    padding: 0 1rem;
                    width: auto;
                    height: 2.4rem;
                    font-size: 1.4rem;
                    border-radius: 5px;
                    color: #999999;
                }
                & > span:nth-of-type(1) {
                    margin: 0;
                }
            }
        }
        .order-title {
            height: 4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
			border-bottom: 1px solid #e2e2e2;
        }
        .order-goods {
            display: flex;
            margin-top: 1rem;
            & > img {
                flex: 0 0 10rem;
                height: 10rem;
                width: 10rem;
                margin-right: 1rem;
            }
            .goods-info {
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .goods-title {
                    font-size: 1.6rem;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
                }
                .goods-attr {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
                    color: #999999;
                    & > span {
                        margin-right: 1rem;
                    }
                }
                .goods-number {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #999999;
                    .goods-btn {
                        padding: 0.3rem 1rem;
                        width: auto;
                        height: 2rem;
                        font-size: 1.4rem;
                        border-radius: 5px;
                    }
                    .goods-change {
                        background: #CCCCCC;
                    }
                }
            }
        }
    }
}

.tab {
    background: white;
    display: flex;
    width: 100%;
    & > span {
        height: 4rem;
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid white;
        font-size: 1.4rem;
    }
    .active-tab {
        border-bottom: 1px solid #222222;
    }
}
</style>
