<template>
<div id="goodDetail">
	<headerBox :flag="'back'"
	           :title="'商品列表'"
	           :kefu="true"></headerBox>
	<section class="main-body">
		<!--封面-->
		<img :src="$store.state.domain+detail.thumb_400" />

		<!--主要商品信息-->
		<div class="main-info">
			<p class="good-title">{{detail.title}}</p>
			<p class="good-price"><span>￥{{detail.final_price}}</span><span>￥{{detail.market_price}}</span></p>
			<p class="good-status"><span>销量：{{detail.sale_count}}</span><span>快递：免邮</span></p>
			<!--收藏标志-->
			<div @click="loveCheck"
			     class="love">
				<i class="iconfont icon-xihuan"></i>
				<span v-show="!love">收藏</span>
				<span v-show="love">已收藏</span>
			</div>
		</div>

		<!--商品保障-->
		<div class="good-icon">
			<span><i class="iconfont icon-bao10"></i>平安承保</span>
			<span><i class="iconfont icon-guanfangzhengpin"></i>正品保证</span>
			<span><i class="iconfont icon-tuikuanpeichang"></i>超时赔偿</span>
		</div>

		<!--详情、评论tab-->
		<div ref="tab"
		     class="good-tab">
			<span @click="tabChange('1')"
			      :class="{'tab-item':true,'active-tab':tab_flag=='1'}">商品详情</span>
			<span @click="tabChange('2')"
			      :class="{'tab-item':true,'active-tab':tab_flag=='2'}">用户评论</span>
		</div>

		<!--商品详情-->
		<transition :duration="{enter:1000,leave:0}"
		            mode="out-in"
		            enter-active-class="animated fadeIn">
			<div v-show="tab_flag=='1'"
			     class="good-detail">
				<div class="detail-text">
					<p class="detail-item"><span>品牌名称：</span><span>{{detail.brand_name}}</span></p>
					<p class="detail-item"
					   v-for="item in display"><span>{{item.attr_name}}：</span><span>{{item.attr_value}}</span></p>
				</div>
				<div class="detail-img">
					<div class="detail-title">商品详情<span>︱ Details</span></div>
					<div id="concent"
					     v-for="(item,index) in detail.content">
						<img :src="item"
						     width="100%" />
					</div>
				</div>
			</div>
		</transition>

		<!--商品评论-->
		<transition :duration="{enter:1000,leave:0}"
		            mode="out-in"
		            enter-active-class="animated fadeIn">
			<div class="scroll"
			     ref="scroll"
			     @scroll="scroll"
			     v-show="tab_flag=='2'">
				<comment :commentList.sync="comment"
				         @comment="tab_flag='1'"></comment>
			</div>
		</transition>
	</section>

	<!--模态框-->
	<transition mode="out-in"
	            name="fade">
		<div v-show="buy_flag"
		     class="modal"></div>
	</transition>
	<!--底部-->
	<footer class="footer">

		<!--购买信息-->
		<transition mode="out-in"
		            name="slide">
			<div v-show="buy_flag"
			     class="buy">
				<!--图片，标题，价格-->
				<div class="buy-header">
					<img :src="$store.state.domain+detail.thumb_400" />
					<div class="buy-info">
						<p>{{detail.title}}</p>
						<p><span>￥{{detail.final_price}}</span><span>请选择&nbsp;&nbsp;&nbsp;&nbsp;款式</span></p>
					</div>

					<!--关闭弹出-->
					<i @click="buy_flag=false"
					   class="iconfont icon-cuo"></i>
				</div>

				<!--可选属性-->
				<template v-for="(item,index) in attribute">
						<div class="buy-select">
							<p class="select-title">{{item.attr_name}}</p>
							<div class="item-box">
								<span v-for="i in item.attr_detail" @click="selectAttr(index,i.goods_attr_id)" :class="{'btn select-item':true, 'select-active':select[index]==i.goods_attr_id}">{{i.attr_value}}</span>
							</div>
						</div>
					</template>

				<!--count-->
				<div class="buy-select">
					<div class="select-title count">
						<div>数量</div>
						<div class="count-number">
							<i @click="countNumber('-')"
							   class="iconfont icon-minus"></i>
							<input @keyup="num"
							       @change="num"
							       type="text"
							       v-model="count" />
							<i @click="countNumber('+')"
							   class="iconfont icon-jia"></i>
						</div>
					</div>
				</div>

				<!--提示信息-->
				<div class="buy-tip">
					<span>温馨提示：</span><span>商品信息(颜色、尺码、图片等)均由官网提供，仅供参考。请您根据身高、体重、胸围、腰围等，选择尺寸。</span>
				</div>
			</div>
		</transition>
		<!--底部按钮-->
		<div class="footer-btn">
			<span @click="buy('addToCar')"
			      class="btn">加入购物车</span>
			<span @click="buy('buyNow')"
			      class="btn">立即购买</span>
		</div>
	</footer>

	<!--back-to-top-->
	<a @click="backToTop"
	   class="back-to-top">
			<i class="iconfont icon-dingbu"></i>
		</a>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
import comment from './commons/comment.vue'
export default {
	name: 'shopCar',
	components: {
		headerBox,
		comment
	},
	data() {
		return {
			tab_flag: '1', //详情，评论切换
			buy_flag: false, //底部显示控制
			count: 1, //购买数量
			id: this.$route.query.id, //记录goods ID
			comment: [], //评论列表
			detail: '', //商品详情内容
			display: '', //不可选的商品属性
			attribute: '', //可选的商品属性
			select: [], //记录选择的商品属性
			love: false, //收藏标记
			page: 2, //记录评论的当前页数
			limit: 20, //每次取20条评论
		}
	},
	watch: {
		tab_flag: async function(newValue, oldValue) {
			if (newValue == '2') {
				let res = await this.$http({
					url: this.$store.state.domain + '/goods/get_comment',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.id,
						page: 1,
						limit: this.limit
					}
				})
				console.log(res.data)
				if (res.data.code == '200') {
					this.comment = res.data.comment
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
				}
			}
		}
	},
	async created() {
		//获取商品详情
		let res = await this.$http({
			url: this.$store.state.domain + '/goods/detail',
			method: 'GET',
			params: {
				key: window.localStorage.access_token,
				id: this.$route.query.id
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.detail = res.data.goods
			this.display = res.data.display
			this.attribute = res.data.attribute
			for (let a of res.data.attribute) {
				this.select.push(a.attr_detail[0].goods_attr_id)
			}
			this.love = res.data.store == 1 ? true : false
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	},
	methods: {
		//回到顶部
		backToTop() {
			let interval = setInterval(() => {
				if (document.body.scrollTop != 0) {
					document.body.scrollTop -= 30
				} else {
					clearInterval(interval)
				}
			}, 10)
		},
		//切换详情评论
		tabChange(flag) {
			this.tab_flag = flag
			this.$nextTick(() => { //把页面滚动到tab条
				console.log(document.body.scrollTop)
				console.log(this.$refs.tab.offsetTop)
				document.body.scrollTop = this.$refs.tab.offsetTop
			})
		},
		//评论滚动加载
		async scroll() {
			let scroll = this.$refs.scroll
			if (scroll.scrollTop + scroll.clientHeight == scroll.scrollHeight) {
				let res = await this.$http({
					url: this.$store.state.domain + '/goods/get_comment',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.id,
						page: this.page,
						limit: this.limit,
					}
				})
				if (res.data.code == '200') {
					console.log(res.data)
					if (res.data.goods.length > 0) {
						this.comment.push(...res.data.comment)
						this.page = this.page + 1
					}
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
				}
			}
		},
		//数字过滤器，只能输入0-999
		num() {
			this.count = this.count.replace(/[^\d]/g, '');
			this.count < 0 ? this.count = 0 : ''
			this.count > 999 ? this.count = 999 : ''
		},
		//选择商品属性
		selectAttr(index, id) {
			let arr = this.select
			arr[index] = id
			this.select = []
			this.select = arr
		},
		//收藏
		async loveCheck() {
			if (this.love) {
				this.$store.dispatch('toast', {
					message: '你已收藏过该商品',
					icon: '0'
				})
				return;
			}
			let res = await this.$http({
				url: this.$store.state.domain + '/goods/store',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					id: this.detail.goods_id
				}
			})
			console.log(res.data)
			if (res.data.code == '200') {
				this.love = true
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '1'
				})
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		},
		//选择数量
		countNumber(flag) {
			if (flag == '+') {
				this.count < 999 ? this.count = this.count + 1 : ''
			} else {
				this.count > 1 ? this.count = this.count - 1 : ''
			}
		},
		//弹出顶部条，如果已弹出，执行加入购物车或立即购买
		async buy(flag) {
			//弹出底部
			if (!this.buy_flag) {
				this.buy_flag = true
				return;
			}
			//已弹出
			this.$store.commit('tab', 'shopCar')
			if (flag == 'addToCar') { //加入购物车
				let res = await this.$http({
					url: this.$store.state.domain + '/goods/add_to_cart',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: this.detail.goods_id,
						goods_attr_id: this.select,
						number: this.count
					}
				})
				if (res.data.code == '200') {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '1'
					})
					this.buy_flag = false
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
				}

			} else { //立即购买
				this.$store.commit('order_from', 'goods')
				this.$store.commit('order_goods', {
					goods_id: this.id,
					number: this.count,
					goods_attr: this.select
				})
				this.$router.push({
					path: '/order',
				})
			}
		}
	}
}
</script>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(100vh);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.back-to-top {
    position: fixed;
    right: 1rem;
    bottom: 6rem;
    background: rgba(255, 85, 85, 1);
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.scroll {
    min-height: 90vh;
    max-height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

#goodDetail {
    padding-bottom: 5rem;
}

.love {
    position: absolute;
    right: 1rem;
    top: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8rem;
    height: 2.2rem;
    font-size: 1.2rem;
    color: white;
    background: #ff5656;
    border-radius: 4rem;
    line-height: 1.4rem;
    & > i {
        font-size: 1.4rem;
        margin-right: 0.4rem;
    }
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
}

.buy {
    z-index: 1000;
    background: white;
    padding-bottom: 1.2rem;
    .buy-tip {
        font-size: 1.2rem;
        color: #999999;
        background: #f3f3f3;
        height: 3.4rem;
        padding: 1.4rem 2rem;
        & > span:nth-of-type(1) {
            color: #ff5656;
        }
    }
    .buy-select {
        padding: 0.8rem 2rem;
        .select-title {
            font-size: 1.4rem;
            color: #222222;
            margin-bottom: 0.8rem;
        }
        .item-box {
            display: flex;
            flex-wrap: wrap;
            .select-item {
                width: auto;
                padding: 0 1.4rem;
                margin-bottom: 0.8rem;
                height: 2.6rem;
                color: #222222;
                border: 1px solid #DDDDDD;
                background: white;
                border-radius: 0.4rem;
                font-size: 1.4rem;
                line-height: 2.6rem;
                margin-right: 1.8rem;
            }
            .select-active {
                color: white;
                background: #ff5656;
                border: 1px solid #ff5656;
            }
        }
    }
    .count {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .count-number {
            display: flex;
            & > i {
                height: 2.6rem;
                width: 3rem;
                font-size: 1rem;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f3f3f3;
            }
            & > input {
                text-align: center;
                height: 2.6rem;
                width: 4.6rem;
                font-size: 1.4rem;
            }
        }
    }
    .buy-header {
        display: flex;
        position: relative;
        padding-left: 14rem;
        justify-content: space-between;
        margin-bottom: 0.8rem;
        & > img {
            position: absolute;
            bottom: 0;
            left: 2rem;
            width: 11rem;
            height: 11rem;
            border-radius: 0.4rem;
        }
        .buy-info {
            padding: 0.6rem 0;
            height: 6.8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > p:nth-of-type(1) {
                font-size: 1.4rem;
                color: #222222;
            }
            & > p:nth-of-type(2) {
                & > span:nth-of-type(1) {
                    font-size: 1.8rem;
                    color: #222222;
                }
                & > span:nth-of-type(2) {
                    font-size: 1.2rem;
                    color: #999999;
                    margin-left: 3rem;
                }
            }
        }
        & > i {
            font-size: 2rem;
            padding: 1rem 1.4rem;
        }
    }
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .footer-btn {
        z-index: 15;
        font-size: 1.4rem;
        display: flex;
        & > span:nth-of-type(2) {
            background: #ff5555;
            color: white;
            border-radius: 0;
            width: 50%;
            height: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        & > span:nth-of-type(1) {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0;
            background: #F2F2F2;
            color: #222222;
            width: 50%;
            height: 5rem;
        }
    }
}

.main-info {
    position: relative;
    padding: 1rem 9rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .good-title {
        font-size: 1.8rem;
        color: #222222;
        margin-bottom: 1rem;
    }
    .good-price {
        margin-bottom: 1rem;
        & > span:nth-of-type(1) {
            font-size: 2rem;
            color: #FF5555;
            font-weight: bold;
        }
        & > span:nth-of-type(2) {
            font-size: 1.4rem;
            color: #999999;
            text-decoration: line-through;
            margin-left: 1rem;
        }
    }
    .good-status {
        font-size: 1.4rem;
        color: #666666;
        & > span:nth-of-type(2) {
            margin-left: 2rem;
        }
    }
}

.good-icon {
    background: #F9F9F9;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    & > span {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: #222222;
        & > i {
            color: #999999;
            font-size: 2rem;
        }
    }
}

.good-tab {
    display: flex;
    .tab-item {
        height: 5rem;
        font-size: 1.6rem;
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #AAAAAA;
        border-bottom: 2px solid #F3F3F3;
        box-sizing: border-box;
    }
    .active-tab {
        color: #222222;
        border-bottom: 2px solid #222222;
    }
}

.good-detail {
    .detail-text {
        padding: 1rem 2rem;
        font-size: 1.4rem;
        border-bottom: 1px solid #F3F3F3;
        .detail-item {
            height: 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > span:nth-of-type(1) {
                color: #999999;
            }
            & > span:nth-of-type(2) {
                color: #666666;
            }
        }
    }
    .detail-img {
        .detail-title {
            margin: 3rem 0 3rem 2rem;
            font-size: 1.2rem;
            color: #222222;
            & > span {
                color: #999999;
                margin-left: 1rem;
                padding-left: 0.2rem;
                font-family: PingFang-SC-Regular;
            }
        }
    }
}
</style>
