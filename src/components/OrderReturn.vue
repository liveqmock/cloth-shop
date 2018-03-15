<template>
	<div @click="hideSelect" class="order-return">
		<headerBox :flag="'back'" :title="'申请退换'"></headerBox>
		<form ref="form" id="form">
			<div class="select-item">
				<label>申请退款</label>
				<!--影子元素-->
				<mySelect :show.sync="show_type" :val.sync="type" :options="options"></mySelect>
				<input v-show="false" type="text" v-model="type.val" name="type" />
			</div>
			<div class="select-item">
				<label for="phone">联系电话</label>
				<!--影子元素-->
				<input type="text" placeholder="请输入联系电话" v-model="phone" name="phone" />
			</div>
			<div class="introduce">
				<label for="introduce">退款说明</label>
				<textarea name="remark" v-model="introduce" id="introduce" placeholder="最多200字" maxlength="200"></textarea>
			</div>
			<div class="img-box">
				<!--上传图片-->
				<input multiple ref="img" @change="preview" v-show="false" type="file" accept="image/*" />
				<!--影子元素-->
				<div @click="upload" class="upload">
					<i class="iconfont icon-jia"></i>
					<span>上传凭证</span>
					<span>(最多3张)</span>
				</div>
				<template v-for="(item,index) in imgs">
					<img @click="showDelete(index)" :src="item" />
				</template>
			</div>
		</form>
		<!--退换按钮-->
		<span @click="submit" class="btn apply-return">申请退换</span>
		<!--删除图片吗?-->
		<popup :show.sync="show_delete" :message="'确定删除图片吗？'" @sure="deleteImg"></popup>
	</div>
</template>
<script>
	import headerBox from './commons/headerBox.vue'
	import mySelect from './commons/mySelect.vue'
	import popup from './commons/popup.vue'
	export default {
		name: 'orderReturn',
		components: {
			headerBox,
			mySelect,
			popup
		},
		data() {
			return {
				type: { //当前选择的退换方式
					name: '请选择',
					val: '0'
				},
				phone: '',//联系电话
				show_type: false,
				show_view: false,
				show_delete: false,
				target: '',//选择的图片
				introduce: '',//说明
				imgs: [],//图片地址列表
				files: [],//图片文件列表
				options: [{ //选择退换方式
					name: '退货退款',
					val: '1'
				}, {
					name: '仅退款',
					val: '2'
				}, {
					name: '仅换货',
					val: '3'
				}]
			}
		},
		methods: {
			//弹出删除图片提示
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
			//隐藏多选框
			hideSelect() {
				this.show_type = false
				this.show_status = false
			},
			//触发图片点击事件
			upload() {
				this.$refs.img.click()
			},
			//预览图片
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
			//提交申请
			submit() {
				let formData = new FormData(this.$refs.form);
				formData.append('id', this.$route.query.id)
				this.files.forEach((f, i) => {
					formData.append(`file${i}`, f)
				})
				let url = `${this.$store.state.domain}/order/apply?key=${window.localStorage.access_token}`
				this.$http.post(url, formData)
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '1'
							})
							setTimeout(() => {
								this.$router.go(-1)
							}, 1500)
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			}
		},
	}
</script>

<style scoped lang="less">
	.apply-return {
		width: 90%;
		margin-left: 5%;
		height: 4rem;
	}
	
	.order-return {
		min-height: 100vh;
	}
	
	form {
		padding: 2rem;
	}
	
	.select-item {
		display: flex;
		background: #f7f7f7;
		align-items: center;
		height: 4.4rem;
		font-size: 1.6rem;
		margin-bottom: 1.6rem;
		padding-left: 1.4rem;
		& > label {
			margin-right: 2rem;
		}
		& > input {
			flex: 1 1 auto;
			font-size: 1.6rem;
			background: none;
			border: none;
			padding: 0 1.5rem;
		}
	}
	
	.introduce {
		display: flex;
		background: #f7f7f7;
		align-items: flex-start;
		height: 10.6rem;
		font-size: 1.6rem;
		margin-bottom: 1.6rem;
		padding: 1rem 1.4rem;
		& > label {
			margin-right: 3.4rem;
			height: 100%;
		}
		& > textarea {
			flex: 1 1 auto;
			resize: none;
			background: none;
			border: none;
			font-size: 1.6rem;
			height: 100%;
		}
	}
	
	.img-box {
		display: flex;
		flex-wrap: wrap;
		& > img {
			width: 22%;
			flex: 0 1 22%;
			margin-right: 4%;
			max-height: 21vw;
			margin-bottom: 1rem;
		}
		& > img:nth-of-type(3n-1) {
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
			max-height: 21vw;
			margin-bottom: 1rem;
			& > span {
				width: 100%;
				text-align: center;
			}
			& > i {
				width: 100%;
				font-size: 2.4rem;
				text-align: center;
			}
		}
	}
</style>