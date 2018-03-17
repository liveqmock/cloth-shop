<template>
<div class="myCoupon">
	<headerBox :title="'我的优惠券'"
	           :flag="'back'"></headerBox>
	<div class="coupon-tab">
		<span @click="tab='not_use'"
		      :class="{'tab-item':true,'tab-active':tab=='not_use'}">未使用&nbsp;&nbsp;({{coupon.use.length}})</span>
		<span @click="tab='used'"
		      :class="{'tab-item':true,'tab-active':tab=='used'}">已使用&nbsp;&nbsp;({{coupon.used.length}})</span>
		<span @click="tab='out_date'"
		      :class="{'tab-item':true,'tab-active':tab=='out_date'}">已过期&nbsp;&nbsp;({{coupon.out_date.length}})</span>
	</div>
	<!--兑换优惠券-->
	<div @click="$router.push({name:'myCouponExchange'})"
	     class="btn exchange">兑换优惠券</div>
	<div class="coupon-list">
		<!--未使用-->
		<div v-show="tab=='not_use'"
		     :key="index"
		     v-for="(item,index) in coupon.use"
		     class="cell-wrap">
			<div class="coupon-cell not-use">
				<div class="cell-money">
					<span class="money-number"><span>￥</span>{{item.money}}</span>
					<span class="cell-limit">满{{item.money_limit}}可用</span>
				</div>
				<div class="cell-info">
					<div class="cell-title">{{item.coupon_name}}</div>
					<div class="cell-date">有效期：{{item.start_time_format}}至{{item.end_time_format}}</div>
				</div>
			</div>
		</div>
		<!--已使用-->
		<div :key="index"
		     v-show="tab=='used'"
		     v-for="(item,index) in coupon.used"
		     class="cell-wrap">
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
		<!--已过期-->
		<div :key="index"
		     v-show="tab=='out_date'"
		     v-for="(item,index) in coupon.out_date"
		     class="cell-wrap">
			<div class="coupon-cell">
				<div class="cell-money">
					<span class="money-number"><span>￥</span>{{item.money}}</span>
					<span class="cell-limit">满{{item.money_limit}}可用</span>
				</div>
				<div class="cell-info">
					<div class="cell-title">{{item.coupon_name}}</div>
					<div class="cell-date">有效期：{{item.start_time_format}}至{{item.end_time_format}}</div>
				</div>
				<div class="cell-tag">已过期</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myCoupon',
	components: {
		headerBox
	},
	data() {
		return {
			coupon: [],
			tab: 'not_use'
		}
	},
	async beforeCreate() {
		let res = await this.$http({
			url: this.$store.state.domain + '/user/coupon',
			method: 'GET',
			params: {
				key: window.localStorage.access_token
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.coupon = res.data.coupon
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	}
}
</script>

<style scoped lang="less">
.myCoupon {
    background: #f3f3f3;
    min-height: 95vh;
    padding-bottom: 5vh;
}

.exchange {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 5rem;
    font-size: 2rem;
    border-radius: 0;
    z-index: 5;
	background: #ff5555;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
}

.coupon-list {
    padding: 1.4rem 2rem;
    .cell-wrap {
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
                    & > span {
                        font-size: 2rem;
                    }
                }
                .cell-limit {
                    font-size: 1.2rem;
                }
            }
            .cell-info {
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
        .not-use {
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

.coupon-tab {
    background: white;
    display: flex;
    height: 4rem;
    width: 100%;
    .tab-item {
        flex: 1 1 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        color: #999999;
        border-bottom: 2px solid white;
    }
    .tab-active {
        border-bottom: 2px solid #666666;
        color: #666666;
    }
}
</style>
