<template>
	<!--popup-->
	<transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
		<div class="amimated modal" v-show="show">
			<div class="popup">
				<p class="title"><span>{{title}}</span><i @click="$emit('update:show',false)" class="iconfont icon-cuo"></i></p>
				<p v-if="message_show" class="message">{{message}}</p>
				<slot></slot>
				<div class="btn-group">
					<span @click="$emit('update:show',false)" class="cancel">取消</span>
					<span @click="$emit('sure')" class="sure">确定</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'popup',
		props: {
			show: {//显示控制
				type: Boolean,
				default: false
			},
			message: {//提示消息
				type: String,
				default: ''
			},
			message_show: {//控制提示消息的显示，自定义提示框body的时候用到
				type: Boolean,
				default: true
			},
			title: {//提示框标题
				type: String,
				default: '消息'
			}
		},
	}
</script>

<style scoped lang="less">
	.modal {
		animation-duration: .4s;
		animation-timing-function: ease;
		top: 0;
		left: 0;
		z-index: 1000;
		position: fixed;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.popup {
		display: flex;
		flex-direction: column;
		background: white;
		padding: 0 1.5rem;
		min-width: 60vw;
		.title {
			font-size: 1.6rem;
			height: 10vw;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			font-weight: bold;
			& > i {
				font-size: 2rem;
				color: #cccccc;
			}
		}
		.message {
			padding: 1rem 0 2rem 0;
			font-size: 1.8rem;
		}
		.btn-group {
			font-size: 1.5rem;
			display: flex;
			width: 100%;
			margin-bottom: 1rem;
			justify-content: flex-end;
			& > span {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.3rem 1.5rem;
				color: white;
				background: #FF5555;
				border-radius: 4px;
			}
			.cancel {
				margin-right: 1rem;
				color: #FF5555;
				background: white;
				border: 1px solid #ff5555;
			}
		}
	}
</style>