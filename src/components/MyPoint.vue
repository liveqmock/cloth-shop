<template>
<div class="my-point">
	<headerBox :flag="'back'"
	           :title="'积分商城'"></headerBox>

	<!--积分信息，签到-->
	<div class="info">
		<div class="info-l">
			<span class="username">{{userInfo.user.nickname}}</span>
			<span class="status">您已签到{{userInfo.sign}}天</span>
			<div class="point">
				<img src="../assets/jifen.png" />
				<span>{{userInfo.points}}</span>
			</div>
		</div>
		<div class="info-r">
			<span v-if="!sign"
			      class="btn sign"
			      @click="signToday">签到</span>
			<span v-else
			      class="btn signed">已签到</span>
		</div>
	</div>
	<!--导航-->
	<div class="tab">
		<div class="tab-item">
			<i class="iconfont icon-mingxi"></i>
			<span>积分明细</span>
		</div>
		<div class="tab-item">
			<i class="iconfont icon-duihuandingdan"></i>
			<span>兑换记录</span>
		</div>
	</div>

	<div class="hot">
		<div class="hot-title">
			<i class="iconfont icon-remen"></i>
			<span>热门兑换</span>
		</div>
		<div class="hot-list">
			<div class="hot-item"
			     v-for="(item,index) in goodsList">
				<img :src="item.thumb_200" />
				<div class="item-info">
					<p class="item-title">{{item.title}}</p>
					<div class="item-content">
						<div class="item-price">
							<span>{{item.final_price}}积分</span>
							<span>￥{{item.market_price}}</span>
						</div>
						<span class="btn exchange">立即兑换</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--热门兑换商品-->
</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myPoint',
	components: {
		headerBox
	},
	data() {
		return {
			userInfo: JSON.parse(window.localStorage.user_info),
			goodsList: [],
			sign: false,
		}
	},
	async activated() {
		let res = await this.$http.get('/goods/point');
		if (res.data.code != 200) return;
		this.goodsList = [...res.data.goods];
	},
	methods: {
		async signToday() {
			let res = await this.$http.get('/user/sign')
			if (res.data.code != '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
				return;
			}
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '1'
			})
			this.sign = true;
			this.userInfo.sign += 1;
		}
	}
}
</script>

<style scoped lang="less">
.hot {
    background: white;
    padding: 1rem 2rem;
    .hot-title {
        display: flex;
        align-items: center;
        & > i {
            font-size: 2.4rem;
            color: #FF5555;
            margin-right: 1rem;
        }
        & > span {
            font-size: 1.4rem;
            line-height: 2.4rem;
        }
    }
    .hot-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .hot-item {
            flex: 0 0 47%;
            max-width: 47%;
            margin-bottom: 1rem;
            .item-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 4.4rem;
                .item-price {
                    font-size: 1.4rem;
                    display: flex;
                    flex-direction: column;
                    min-width: 45%;
                    & > span:nth-of-type(2) {
                        font-size: 1.2rem;
                        color: #999999;
                        text-decoration: line-through;
                    }
                }
                .exchange {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    font-size: 1.4rem;
                    height: 3rem;
                    width: 10rem;
                    color: #ff5555;
                }
            }
            .item-title {
                font-size: 1.4rem;
                line-height: 1.6rem;
                height: 3.2rem;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}

.my-point {
    background: #F3F3F3;
    min-height: 100vh;
}

.tab {
    display: flex;
    height: 4.4rem;
    background: white;
    margin-bottom: 1rem;
    .tab-item {
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        line-height: 2rem;
        & > i {
            font-size: 2.0rem;
            margin-right: 1rem;
        }
    }
}

.info {
    background: url("../assets/ditu.jpg") no-repeat;
    background-size: cover;
    display: flex;
    padding: 2rem 1.5rem;
    justify-content: space-between;
    font-size: 1.4rem;
    .info-l {
        display: flex;
        color: white;
        flex-direction: column;
        .username {
            font-size: 1.6rem;
            font-weight: bold;
            line-height: 2rem;
        }
        .status {
            color: #C2CCD1;
            line-height: 2rem;
            margin-top: 0.4rem;
        }
        .point {
            display: flex;
            align-items: center;
            margin-top: 1.4rem;
            & > img {
                height: 3rem;
                width: 3rem;
                margin-right: 1.4rem;
            }
            & > span {
                margin-bottom: -0.4rem;
                font-size: 1.6rem;
            }
        }
    }
    .info-r {
        display: flex;
        align-items: center;
        justify-content: center;
        .sign {
            height: 4.4rem;
            font-size: 1.8rem;
            color: white;
            border-radius: 2.2rem;
            background: orange;
            width: auto;
            padding: 0 4.8rem;
            line-height: 4.4rem;
        }
        .signed {
            height: 4.4rem;
            font-size: 1.8rem;
            color: white;
            border-radius: 2.2rem;
            background: #ff5555;
            width: auto;
            padding: 0 4.8rem;
            line-height: 4.4rem;
        }
    }
}
</style>
