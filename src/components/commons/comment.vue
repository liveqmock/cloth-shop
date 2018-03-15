<template>
	<!--评论-->
	<div class="comment">
		<!--评论列表-->
		<template v-if="commentList.length>0">
			<div class="comment-cell" v-for="item in commentList">
				<div class="comment-header">
					<img :src="$store.state.domain+item.avatar" />
					<div class="comment-info">
						<p class="info-user">
							<span>{{item.nickname}}</span>
							<span>{{item.ctime_format}}</span>
						</p>
						<p class="info-attr">
							<span class="attr-span" v-for="attr in item.attr_format">{{attr.attr_name+'：'+attr.attr_value}}</span>
						</p>
					</div>
				</div>
				<div class="comment-context">
					{{item.content}}
				</div>
				<div class="comment-img">
					<img @click="view(item.proof_arr)" v-for="img in item.thumb_arr" :src="$store.state.domain+img" />
				</div>
			</div>
		</template>
		<!--没有评论-->
		<div v-else class="noComment">
			<i class="iconfont icon-xinxi"></i>
			<span>暂无评论信息</span>
			<span @click="comment" class="btn">返回详情</span>
		</div>
		<!--查看原图-->
		<viewOriginalImage :imgs="imgs" :show.sync="show_view"></viewOriginalImage>
	</div>
</template>

<script>
	import viewOriginalImage from './viewOriginalImage'
	export default {
		name: 'goods',
		components: {
			viewOriginalImage
		},
		props: {
			commentList: {//评论列表
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				show_view: false,
				imgs: [],
			}
		},
		methods: {
			//查看原图
			view(imgs) {
				this.imgs = imgs
				this.show_view = true
			},
			//返回详情
			comment() {
				this.$emit('comment')
			},
		}
	}
</script>

<style scoped lang="less">
	.comment-cell {
		border: 1px solid #F2F2F2;
		display: flex;
		flex-direction: column;
		padding: 1.5rem 5%;
		.comment-img {
			display: flex;
			max-width: 100vw;
			justify-content: flex-start;
			& > img {
				flex: 0 1 5rem;
				width: 5rem;
				height: 5rem;
				margin-right: 5vw;
			}
			& > img:nth-last-of-type(1) {
				margin-right: 0;
			}
		}
		.comment-context {
			font-size: 1.6rem;
			padding: 2rem;
		}
		.comment-header {
			display: flex;
			& > img {
				border-radius: 50%;
				height: 6rem;
				width: 6rem;
				margin-right: 2rem;
			}
			.comment-info {
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				font-size: 1.4rem;
				justify-content: space-around;
				.info-attr {
					display: flex;
					flex-wrap: wrap;
					color: #999999;
					.attr-span {
						margin-right: 1rem;
						font-size: 1.4rem;
						line-height: 2rem;
					}
				}
				.info-user {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	.noComment {
		background: #F3F3F3;
		width: 100%;
		height:100%;
		min-height: 90vh;
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
</style>