<template>
	<div class="comment">
		<headerBox :flag="'back'" :title="'评论'"></headerBox>
		<!--评论表单-->
		<form ref="form">
			<div class="order-info">
				<img :src="$store.state.domain+$route.query.avatar" />
				<div class="order-context">
					<span class="order-title">{{$route.query.goods_name}}</span>
					<div class="order-attr">
						<span class="attr-item" v-for="item in $route.query.goods_attr_arr">{{item.attr_name+'：'+item.attr_value}}</span>
					</div>
				</div>
			</div>
			<textarea name="content" v-model="comment" class="say-something" placeholder="说点什么..."></textarea>
			<div class="img-box">
				<!--上传图片-->
				<input multiple ref="img" @change="preview" v-show="false" type="file" accept="image/*" />
				<!--影子元素-->
				<div @click="choseImg" class="upload">
					<i class="iconfont icon-jia"></i>
					<span>上传照片</span>
					<span>(最多3张)</span>
				</div>
				<template v-for="(item,index) in imgs">
					<img @click="showDelete(index)" :src="item" />
				</template>
			</div>
		</form>
		<!--评论按钮-->
		<span @click="submit" class="btn comment-btn">评论</span>
		<!--删除图片吗?-->
		<popup :show.sync="show_delete" :message="'确定删除图片吗？'" @sure="deleteImg"></popup>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import popup from './commons/popup.vue'
	export default {
		name: 'orderComment',
		components: {
			headerBox,
			popup
		},
		data() {
			return {
				comment: '',//评论
				imgs: [],//评论图片	
				files: [],//图片文件
				show_delete: false,//删除消息提示框
				target: '',//选择的准备要删除的图片
			}
		},
		methods: {
			//弹出消息对话框
			showDelete(index) {
				this.target = index
				this.show_delete = true
			},
			//删除图片
			deleteImg() {
				this.imgs.splice(this.target, 1)
				this.files.splice(this.target, 1)
				this.show_delete = false
			},
			//提交评论
			submit() {
				let formData = new FormData(this.$refs.form);
				formData.append('id', this.$route.query.id)
				this.files.forEach((f, i) => {
					formData.append(`file${i}`, f)
				})
				let url = `${this.$store.state.domain}/order/comment?key=${window.localStorage.access_token}`
				this.$http.post(url, formData)
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '1'
							})
							setTimeout(() => this.$router.go(-1), 1500)
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			},
			//触发input点击事件
			choseImg() {
				this.$refs.img.click()
			},
			//图片预览
			preview(e) {
				if(e.srcElement.files.length > 3 || this.imgs.length == 3) {
					this.$store.dispatch('toast', {
						message: '最多上传3张图片',
						icon: '2'
					})
				} else {
					let files = this.files
					let arr = Array.from(e.srcElement.files)
					let imgs = this.imgs
					arr.forEach((f, i) => {
						if(i < 3) {
							let img = window.URL.createObjectURL(f)
							imgs.push(img)
							files.push(f)
						}
					})
					this.imgs = imgs
					this.files = files
				}
			},
		},
	}
</script>

<style scoped lang="less">
	form {
		display: flex;
		flex-direction: column;
	}
	
	.comment {
		display: flex;
		flex-direction: column;
	}
	
	.comment-btn {
		width: 94%;
		margin-left: 3%;
		height: 4rem;
		margin-top: 2rem;
	}
	
	.img-box {
		display: flex;
		flex-wrap: wrap;
		padding: 0 1rem;
		margin-top: 1rem;
		& > img {
			width: 22%;
			flex: 0 1 22%;
			margin-right: 4%;
			max-height: 22vw;
			margin-bottom: 1rem;
		}
		& > img:nth-of-type(4n-1) {
			margin-right: 0;
		}
		.upload {
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			flex-direction: column;
			border: 2px dashed #C0C0C0;
			margin-right: 4%;
			flex: 0 1 22%;
			font-size: 1.4rem;
			color: #C0C0C0;
			padding: 1rem 0;
			max-height: 22vw;
			margin-bottom: 1rem;
			& > span {
				width: 100%;
				text-align: center;
			}
			& > i {
				width: 100%;
				font-size: 2.6rem;
				text-align: center;
			}
		}
	}
	
	.say-something {
		flex: 1 1 auto;
		margin: 1rem;
		background: #F3F3F3;
		color: #999999;
		padding: 1rem 2rem;
		border: none;
		resize: none;
		min-height: 12rem;
		font-size: 1.4rem;
	}
	
	.order-info {
		padding: 2rem 1rem;
		border-bottom: 1px solid #F3F3F3;
		display: flex;
		& > img {
			height: 8.6rem;
			width: 8.6rem;
		}
		.order-context {
			display: flex;
			padding: 0 2rem;
			flex-direction: column;
			max-width: 22rem;
			justify-content: space-between;
			.order-title {
				font-size: 1.6rem;
			}
			.order-attr {
				color: #999999;
				font-size: 1.4rem;
				display: flex;
				flex-wrap: wrap;
				line-height: 1.8rem;
				& > span {
					margin-right: 1rem;
				}
			}
		}
	}
</style>