<template>
	<div class="my-message">
		<headerBox :flag="'back'" :title="'系统消息'"></headerBox>
		<!--消息列表-->
		<div v-if="notify.length>0" class="message-list">
			<template v-for="item in notify">
				<div @click="redirect(item.redirect)" class="message">
					<div class="message-header">
						<div>
							<span class="message-tag">{{item.tag}}</span>
							<span class="message-title">{{item.title}}</span>
						</div>
						<span class="message-time">{{item.ctime_format}}</span>
					</div>
					<p class="message-context">这是一条消息</p>
					<img :src="$store.state.domain+item.avatar" />
				</div>
			</template>
		</div>

		<!--暂无系统消息-->
		<div v-else class="no-join">
			<i class="iconfont icon-xiaoxi"></i>
			<span>暂无系统消息</span>
			<span @click="$router.go(-1)" class="btn distribution-btn">返回个人中心</span>
		</div>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	export default {
		name: 'myMessage',
		components: {
			headerBox
		},
		data() {
			return {
				notify: []//消息列表
			}
		},
		methods: {
			//消息跳转
			redirect(url) {
				window.location.href = url
			}
		},
		activated() {//获取消息列表
			this.$http({
					url: this.$store.state.domain + '/user/notify',
					method: 'GET',
					params: {
						key: window.localStorage.access_token
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.notify = res.data.notify
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
	.no-join {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
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
		.distribution-btn {
			width: auto;
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}
	
	.my-message {
		background: #F3F3F3;
		min-height: 100vh;
	}
	
	.message-list {
		margin-top: 1rem;
	}
	
	.message {
		background: white;
		display: flex;
		flex-direction: column;
		color: #222222;
		align-items: center;
		font-size: 1.4rem;
		padding: 0 1rem;
		margin: 0 1rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		.message-header {
			width: 100%;
			height: 4rem;
			justify-content: space-between;
			align-items: center;
			display: flex;
			border-bottom: 1px solid #F3F3F3;
			.message-tag {
				background: #FF5555;
				color: white;
				padding: 0.2rem 1rem;
				margin-right: 1rem;
			}
		}
		.message-context {
			width: 100%;
			line-height: 1.6rem;
			padding: 0.8rem 0;
			color: #999999;
		}
	}
</style>