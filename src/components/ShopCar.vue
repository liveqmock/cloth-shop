<template>
<div class="shopCar">
	<headerBox :flag="'search'"
	           :title="'购物车'"></headerBox>

	<!--购物车-->
	<template v-show="goods.length>0">
			<div class="car">
				<div class="brand" :key="i" v-for="(brand,i) in goods">
					<div class="brand-title">
						<div @click="check_brand(i)" class="brand-check">
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="!brand.check" class="iconfont icon-xuanze"></i>
							</transition>
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="brand.check" class="iconfont icon-gou"></i>
							</transition>
						</div>
						<img :src="$store.state.domain+brand.avatar" />
						<span>{{brand.name}}</span>
					</div>
					<div :key="index" v-for="(item,index) in brand.goods" class="car-cell">
						<!--选择框-->
						<div @click="check(i,index)" class="cell-check">
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-if="item.out_date!='1'&&item.sale_out!='1'" v-show="!item.check" class="iconfont icon-xuanze"></i>
							</transition>
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-if="item.out_date!='1'&&item.sale_out!='1'" v-show="item.check" class="iconfont icon-gou"></i>
							</transition>
						</div>
						<!--预览图-->
						<div class="img-wrap">
							<div v-if="item.out_date=='1'||item.sale_out=='1'" class="invalid">
								<span v-if="item.out_date=='1'">已失效</span>
								<span v-else>已下架</span>
							</div>
							<img class="good-img" @click="$router.push({name:'goodDetail',query:{id:item.goods_id}})" :src="$store.state.domain+item.thumb_200" />
						</div>
						<!--货物信息-->
						<div class="cell-info">
							<div @click="$router.push({name:'goodDetail',query:{id:item.goods_id}})" class="cell-title">{{item.title}}</div>
							<div class="cell-attr">
								<span v-for="i in item.goods_attr_arr" v-if="i!=null">{{i.attr_name}}：{{i.attr_value}}</span>
							</div>
							<div class="cell-count">
								<!--选择数量-->
								<div class="count-number">
									<i @click="countNumber('-',i,index)" class="iconfont icon-minus"></i>
									<input @keyup="num(i,index)" @change="num(i,index)" type="text" v-model="item.count" />
									<i @click="countNumber('+',i,index)" class="iconfont icon-jia"></i>
								</div>
								<!--total-->
								<div class="cell-total"><span>￥</span>{{item.final_price}}</div>
							</div>
						</div>
						<!--删除-->
						<div @click="showPopup(item.cart_id,i,index)" class="btn cell-btn"><i class="iconfont icon-iconfontshanchu"></i></div>
					</div>
				</div>
			</div>

			<!--popup-->
			<popup :show.sync="show_popup" :message="'确定删除吗？'" @sure="remove"></popup>

			<!--全选、总价、结算-->
			<div class="functionBar">
				<!--all check-->
				<div @click="allCheck" class="all-check">
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="!all_check" class="iconfont icon-xuanze"></i>
					</transition>
					<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
						<i v-show="all_check" class="iconfont icon-gou"></i>
					</transition>
					<span>全选</span>
				</div>
				<div class="all-total">
					<p>合计：<span class="all-total-price"><span>￥</span>{{total_a}}</span>
					</p>
					<p>全场包邮</p>
				</div>
				<div @click="submit" class="btn settlement">
					结算
				</div>
			</div>
		</template>
	<!--没有商品-->
	<div v-show="goods.length==0"
	     class="noGood">
		<i class="iconfont icon-yifu1"></i>
		<span>购物车没有商品，赶紧去挑选吧</span>
		<span @click="$router.replace({name:'home'})"
		      class="btn">挑选商品</span>
	</div>
	<tab></tab>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
import popup from './commons/popup.vue'
import tab from './commons/tab.vue'
export default {
	name: 'shopCar',
	components: {
		headerBox,
		tab,
		popup,
	},
	data() {
		return {
			goods: [], //货物列表
			all_check: false, //全选
			total_a: '0.00', //选择的总价
			show_popup: false, //删除的消息提示框
			target: {}, //删除的货物标记
			show_goods: true, //购物车有没有货物
		}
	},
	computed: {
		total() { //总价
			let total = 0
			this.goods.map(g => {
				g.goods.map(h => {
					if (h.check) {
						total += h.final_price * h.count
					}
				})

			})
			return total
		}
	},
	watch: {
		goods: function(newValue, oldValue) {
			if (newValue.length > 0) {
				let all_check = true //所有brand选择后勾选全选
				for (let n of newValue) { //所有goods选择后勾选brand
					let brand_check = true
					for (let g of n.goods) {
						if (!g.check) {
							brand_check = false
							break
						}
					}
					n.check = brand_check
					if (!n.check) {
						all_check = false
					}
				}
				this.all_check = all_check
			} else {
				this.all_check = false
			}
		},
		total: function(newValue, oldValue) { //数字的过渡处理，tween框架
			var vm = this

			function animate() {
				if (vm.$tween.update()) {
					requestAnimationFrame(animate)
				}
			}
			new vm.$tween.Tween({
					tweeningNumber: oldValue
				})
				.easing(vm.$tween.Easing.Quadratic.Out)
				.to({
					tweeningNumber: newValue
				}, 500)
				.onUpdate(function() {
					vm.total_a = this._object.tweeningNumber.toFixed(2)
				})
				.start()
			animate()
		}
	},
	async created() {
		//获取购物车信息
		this.$store.commit('tab', 'shopCar')
		let res = await this.$http({
			url: this.$store.state.domain + '/user/cart',
			method: 'GET',
			params: {
				key: window.localStorage.access_token
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			if (res.data.goods.length > 0) {
				res.data.goods.forEach((g) => g.check = false)
				this.goods = [...res.data.goods]
			} else {
				this.show_goods = false
			}
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	},
	methods: {
		//弹出消息提示框
		showPopup(id, i, index) {
			this.show_popup = true
			this.target = { id, i, index }
		},
		//提交购物车
		submit() {
			let goods = []
			for (let o of this.goods) {
				for (let g of o.goods) {
					g.check ? goods.push({
						goods_id: g.goods_id,
						number: g.count,
						product_id: g.product_id,
					}) : 0
				}
			}
			if (goods.length > 0) {
				this.$store.commit('order_from', 'cart')
				this.$store.commit('order_goods', goods)
				this.$router.push({
					path: '/order',
				})
			} else {
				this.$store.dispatch('toast', {
					message: '请选择要结算的商品',
					icon: '2'
				})
			}
		},
		//移出购物车
		async remove() {
			let id = this.target.id
			let i = this.target.i
			let index = this.target.index
			let res = await this.$http({
				url: this.$store.state.domain + '/user/remove_cart',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					id
				}
			})
			if (res.data.code == '200') {
				this.goods[i].goods.splice(index, 1)
				this.goods[i].goods.length == 0 ? this.goods.splice(i, 1) : 0
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '1'
				})
				this.show_popup = false
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		},
		//选择货物
		check(i, index) {
			this.goods[i].goods[index].check = !this.goods[i].goods[index].check
			this.goods = [...this.goods]
		},
		//选择品牌
		check_brand(i) {
			this.goods[i].check = !this.goods[i].check
			for (let g of this.goods[i].goods) {
				g.check = this.goods[i].check
			}
			this.goods = [...this.goods];
		},
		//全选
		allCheck() {
			this.all_check = !this.all_check
			for (let g of this.goods) {
				g.check = this.all_check
				for (let a of g.goods) {
					a.check = this.all_check
				}
			}
			this.goods = [...this.goods];
		},
		//数量的+、-按钮
		countNumber(flag, i, index) {
			let count = this.goods[i].goods[index].count
			if (flag == '+') {
				count < 999 ? count = parseInt(count) + 1 : 0
			} else {
				count > 1 ? count = parseInt(count) - 1 : 0
			}
			this.$set(this.goods[i].goods[index], 'count', count)
		},
		//限制数量的输入
		num(i, index) {
			let count = this.goods[i].goods[index].count
			count = count.replace(/[^\d]/g, '')
			if (count < 10) count = 10
			if (count > 999) count = 999
			this.$set(this.goods[i].goods[index], 'count', count)
		},
	}
}
</script>

<style scoped lang="less">
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

.shopCar {
    overflow-x: hidden;
    background: #f3f3f3;
    height: 100vh;
    min-height: 100vh;
}

.functionBar {
    display: flex;
    position: fixed;
    bottom: 4.4rem;
    left: 0;
    width: 100%;
    background: #FAFAFA;
    .all-check {
        height: 12vw;
        flex: 0 0 20vw;
        display: flex;
        align-items: center;
        & > i {
            position: absolute;
            left: 3vw;
            top: 4vw;
            font-size: 4vw;
            color: #979797;
        }
        & > span {
            position: absolute;
            left: 10vw;
            top: 3.9vw;
            font-size: 3.6vw;
        }
    }
    .all-total {
        height: 10vw;
        flex: 0 0 47vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        padding: 1vw 3vw 1vw 0;
        pad font-size: 1.2rem;
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
        flex: 0 0 30vw;
        border-radius: 0;
        border-radius: 0;
        height: 12vw;
        font-size: 1.6rem;
        padding: 0;
    }
}

.car {
    margin-top: 0.6rem;
    padding-bottom: 10rem;
    .brand {
        background: #fafafa;
        .brand-title {
            height: 5rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #F3F3F3;
            & > img {
                height: 4rem;
                width: 4rem;
                border-radius: 50%;
            }
            .brand-check {
                position: relative;
                height: 100%;
                flex: 0 0 10vw;
                display: flex;
                justify-content: center;
                align-items: center;
                & > i {
                    position: absolute;
                    top: 1.7rem;
                    left: 3vw;
                    font-size: 1.6rem;
                    color: #979797;
                }
            }
            & > span {
                margin-left: 1.4rem;
                font-size: 1.6rem;
            }
        }
        .car-cell {
            background: #fafafa;
            display: flex;
            // height: 32vw;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
            border-bottom: 1px solid #F3F3F3;
            .img-wrap {
                position: relative;
                .invalid {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0, 0, 0, 0.4);
                    font-size: 1.6rem;
                    font-weight: bold;
                    color: white;
                    & > span {
                        border: 1px solid white;
                        padding: 0.3rem 1.3rem;
                    }
                }
                .good-img {
                    width: 27vw;
                    height: 27vw;
                }
            }
            .cell-check {
                position: relative;
                height: 100%;
                flex: 0 0 10vw;
                display: flex;
                justify-content: center;
                align-items: center;
                & > i {
                    // position: absolute;
                    // top: 14vw;
                    // left: 3vw;
                    font-size: 4vw;
                    color: #979797;
                }
            }
            .cell-info {
                flex: 0 0 45vw;
                padding: 2.5vw 3vw;
                height: 27vw;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                .cell-title {
                    font-size: 1.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .cell-attr {
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    & > span {
                        flex: 0 0 auto;
                        font-size: 1.2rem;
                        color: #999999;
                        margin-right: 1.4rem;
                    }
                }
                .cell-count {
                    display: flex;
                    justify-content: space-between;
                    .cell-total {
                        font-size: 1.6rem;
                        color: #FF5555;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        & > span {
                            font-size: 1.2rem;
                        }
                    }
                    .count-number {
                        display: flex;
                        & > i {
                            height: 2.6rem;
                            width: 2.2rem;
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
                            width: 3rem;
                            font-size: 1.4rem;
                        }
                    }
                }
            }
            .cell-btn {
                height: 32vw;
                flex: 0 0 12vw;
                border-radius: 0;
                background: none;
                align-items: flex-end;
                box-sizing: border-box;
                & > i {
                    padding-bottom: 3vw;
                    font-size: 2rem;
                    color: #999999;
                }
            }
        }
    }
}
</style>
