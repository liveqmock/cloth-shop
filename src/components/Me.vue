<template>
	<div class="me">
		<div class="main-body">
			<!--头部-->
			<div class="me-header">
				<img :src="user_info.user.avatar==''?'../../static/Bitmap2.png':$store.state.domain+user_info.user.avatar" />
				<span class="username">{{user_info.user.nickname}}</span>
				<span class="identity">{{user_info.user.type_zh}}</span>
				<div class="balance">
					<div    @click="$router.push({name:'myPoint'})" class="balance-item">
						<span>{{user_info.points}}</span>
						<span>积分</span>
					</div>
					<div    @click="$router.push({path:'/my/balance'})" class="balance-item">
						<span class="balance-number">{{user_info.balance}}</span>
						<span>账户余额</span>
					</div>
					<!--@click="$router.push({name:'myCoupon'})"-->
					<div    class="balance-item">
						<!--<span>{{user_info.coupon}}</span>-->
						<span>0</span>
						<span>优惠券</span>
					</div>
				</div>

				<!--设置-->
				<div @click="$router.push({path:'/my/setting'})" class="setting">
					<img src="../assets/setting.png">
					<span>设置</span>
				</div>
				<!--消息-->
				<div @click="$router.push({path:'/my/message'})" class="message">
					<img src="../assets/xinxi.png">
					<span>消息</span>
				</div>
			</div>

			<!--tab-bar-list-->
			<!--分销中心-->
			<div    @click="$router.push({path:'/my/distribution'})" class="bar-item">
				<div>
					<i class="iconfont icon-huiyuan item-icon"></i>
					<span class="item-name">分销中心</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<!--我的订单-->
			<div    @click="$router.push({name:'myOrder'})" class="bar-item">
				<div>
					<i class="iconfont icon-dingdan item-icon"></i>
					<span class="item-name">我的订单</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<!--我的余额-->
			<!--<div    @click="$router.push({path:'/my/balance'})" class="bar-item">
				<div>
					<i class="iconfont icon-yue1-copy item-icon"></i>
					<span class="item-name">我的余额</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>-->
			<!--积分商城-->
			<!--<div    @click="$router.push({name:'myPoint'})" class="bar-item">
				<div>
					<i class="iconfont icon-iconfontjifenshangcheng item-icon"></i>
					<span class="item-name">积分商城</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>-->
			<!--商品收藏-->
			<div    @click="$router.push({name:'myLove'})" class="bar-item">
				<div>
					<i class="iconfont icon-shoucang item-icon"></i>
					<span class="item-name">商品收藏</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<!--收货地址管理-->
			<div    @click="$router.push({name:'myAddress'})" class="bar-item">
				<div>
					<i class="iconfont icon-dizhi item-icon"></i>
					<span class="item-name">收货地址</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<!--我的优惠券-->
			<!--<div @click="$router.push({name:'myCoupon'})" class="bar-item">
				<div>
					<i class="iconfont icon-coupon item-icon"></i>
					<span class="item-name">我的优惠券</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>-->
			<!--申请店铺入驻-->
			<div @click="$router.push({path:'/my/brand'})" class="bar-item">
				<div>
					<i class="iconfont icon-ruzhu item-icon"></i>
					<span class="item-name">申请店铺入驻</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</div>
			<!--联系我们-->
			<a href="tel:020-66887755" class="bar-item">
				<div>
					<i class="iconfont icon-icon052 item-icon"></i>
					<span class="item-name">联系我们</span>
				</div>
				<i class="iconfont icon-youbian"></i>
			</a>

		</div>
		<tab></tab>
	</div>
</template>

<script>
	import tab from './commons/tab.vue'
	export default {
		name: 'me',
		components: {
			tab
		},
		data() {
			return {
				user_info: JSON.parse(window.localStorage.user_info) //获取个人信息
			}
		},
		activated() {
			this.$store.commit('tab', 'me')
			this.user_info = JSON.parse(window.localStorage.user_info) //更新个人信息
		}
	}
</script>

<style scoped lang="less">
	.setting {
		height: 4rem;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 1.5rem;
		top: 1rem;
		font-size: 1.4rem;
		img {
			width: 1.6rem;
			height: 1.6rem;
			margin-right: 1rem;
		}
		& > span {
			font-size: 1.4rem;
			line-height: 1.6rem;
		}
	}
	
	.message {
		height: 4rem;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 1.5rem;
		top: 1rem;
		font-size: 1.4rem;
		img {
			width: 1.8rem;
			height: 1.8rem;
			margin-right: 1rem;
		}
		& > span {
			font-size: 1.4rem;
			line-height: 1.8rem;
		}
	}
	
	.me {
		height: 100vh;
		background: #F3F3F3;
	}
	
	.main-body {
		padding-bottom: 5rem;
	}
	
	.bar-item {
		background: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 5rem;
		padding: 0 1.6rem;
		font-size: 1.4rem;
		color: #222222;
		border-bottom: 1px solid #F3F3F3;
		.item-name {
			margin-left: 1rem;
		}
		.item-icon {
			font-size: 1.4rem;
		}
	}
	
	.me-header {
		position: relative;
		background: white;
		display: flex;
		flex-direction: column;
		padding-top: 4rem;
		align-items: center;
		margin-bottom: 0.6rem;
		& > img {
			border-radius: 50%;
			height: 7.3rem;
			width: 7.3rem;
			background: none;
			margin-bottom: 1.8rem;
		}
		.username {
			font-size: 1.6rem;
			color: #4A4A4A;
			margin-bottom: 0.2rem;
		}
		.identity {
			font-size: 1.4rem;
			color: #999999;
			margin-bottom: 1rem;
		}
		.balance {
			display: flex;
			width: 100%;
			height: 5rem;
			padding: 1rem 0;
			.balance-item {
				flex: 1 1 33%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-direction: column;
				& > span:nth-of-type(1) {
					color: #222222;
					font-size: 2.2rem;
				}
				& > span:nth-of-type(2) {
					font-size: 1.4rem;
					color: #999999
				}
			}
			.balance-number {
				color: #ff5555!important;
			}
		}
	}
</style>