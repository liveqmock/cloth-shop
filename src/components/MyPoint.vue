<template>
	<div class="my-point">
		<headerBox :flag="'back'" :title="'积分商城'"></headerBox>

		<!--积分信息，签到-->
		<div class="info">
			<div class="info-l">
				<span class="username">李四</span>
				<span class="status">您已签到2天</span>
				<div class="point">
					<img src="../assets/jifen.png" />
					<span>998</span>
				</div>
			</div>
			<div class="info-r">
				<span class="btn sign">签到</span>
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
				<div class="hot-item" v-for="n in 3">
					<img src="../assets/Bitmap2.png" />
					<div class="item-info">
						<p class="item-title">This is a titleThis is a titleThis is a titleThis is a titleThis is a titleThis is a title</p>
						<div class="item-content">
							<div class="item-price">
								<span>400积分</span>
								<span>￥998.00</span>
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
			margin-bottom: 1rem;
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
					.exchange{
						height: 3rem;
						width: 10rem;
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
		background: url('../assets/ditu.jpg') no-repeat;
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
			}
		}
	}
</style>