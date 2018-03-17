<template>
<div class="my-setting">
	<headerBox :flag="'back'"
	           :title="'设置'"></headerBox>
	<!--设置头像-->
	<div @click="upload"
	     class="list-item">
		<span>我的头像</span>
		<div>
			<img :src="img" />
			<form id="form">
				<input id="img"
				       name="avatar"
				       v-show="false"
				       type="file"
				       accept="image/*;capture=camera"
				       @change="preview">
			</form>
			<i class="iconfont icon-youbian"></i>
		</div>
	</div>

	<!--设置昵称-->
	<div @click="show_nickname=true"
	     class="list-item">
		<span>我的昵称</span>
		<div>
			<span>{{user.nickname}}</span>
			<i class="iconfont icon-youbian"></i>
		</div>
	</div>

	<!--绑定手机-->
	<div @click="user.phone==''?show_phone=true:''"
	     class="list-item">
		<span>绑定手机</span>
		<div>
			<span v-if="user.phone!=''">{{user.phone}}</span>
			<span v-else>立即绑定</span>
			<i class="iconfont icon-youbian"></i>
		</div>
	</div>

	<!--变性-->
	<div @click="show_sex=true"
	     class="list-item">
		<span>性别</span>
		<div>
			<span>{{user.sex_zh}}</span>
			<i class="iconfont icon-youbian"></i>
		</div>
	</div>

	<!--消息提示-->
	<popup @sure="changeNickName"
	       :show.sync="show_nickname"
	       :title="'修改昵称'"
	       :message_show="false">
		<input class="nickname"
		       type="text"
		       v-model="nickname"
		       placeholder="请输入要修改的昵称" />
	</popup>

	<popup @sure="changeSex"
	       :show.sync="show_sex"
	       :title="'修改性别'"
	       :message_show="false">
		<p class="btn-group">
			<span @click="sex='1'"
			      :class="{'btn-active':sex=='1'}">男</span>
			<span @click="sex='2'"
			      :class="{'btn-active':sex=='2'}">女</span>
		</p>
	</popup>

	<popup @sure="changePhone"
	       :show.sync="show_phone"
	       :title="'绑定手机'"
	       :message_show="false">
		<div class="bind">
			<div class="username">
				<div>+86</div>
				<input type="text"
				       v-model="phone"
				       placeholder="请输入你的电话号码" />
			</div>
			<div class="username">
				<div v-show="code_flag"
				     @click="get_code">验证码</div>
				<div v-show="!code_flag">已发送({{code_time}})</div>
				<input type="text"
				       v-model="code"
				       placeholder="请输入你的验证码" />
			</div>
		</div>
	</popup>

</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
import popup from './commons/popup.vue'
export default {
	name: 'mySetting',
	components: {
		headerBox,
		popup
	},
	data() {
		return {
			user_info: JSON.parse(window.localStorage.user_info),
			img: '', //头像
			nickname: '', //昵称
			show_nickname: false, //popup显示
			show_sex: false,
			show_phone: false,
			sex: '1', //1是男，2是女
			phone: '', //手机
			code: '', //验证码
			code_time: 60, //验证码倒计时
			code_flag: true, //切换验证码状态
			interval: '', //验证码定时器
		}
	},
	computed: {
		user() {
			return this.user_info.user
		}
	},
	methods: {
		//获取验证码
		get_code() {
			this.$http({
					url: this.$store.state.domain + '/api/send_code',
					method: 'GET',
					params: {
						phone: this.phone,
						type: 'bind'
					}
				})
				.then(res => {
					console.log(res.data)
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '1'
					})
					if (res.data.code == '200') {
						this.code_flag = false
						this.code_interval = setInterval(() => {
							this.code_time--;
							if (this.code_time < 0) {
								this.code_flag = true
								this.code_time = 60
								clearInterval(this.code_interval)
							}
						}, 1000)
					}
				})
		},
		//触发input点击事件
		upload() {
			document.querySelector('#img')
				.click()
		},
		//绑定手机
		changePhone() {
			this.$http({
					url: this.$store.state.domain + '/user/bind',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						phone: this.phone,
						code: this.code
					}
				})
				.then(res => {
					console.log(res.data)
					if (res.data.code == '200') {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '1'
						})
						this.show_phone = false
						let user_info = JSON.parse(window.localStorage.user_info)
						user_info.user.phone = this.phone
						this.user_info = user_info
						window.localStorage.user_info = JSON.stringify(user_info)
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		},
		//变性
		async changeSex() {
			let res = await this.$http({
				url: this.$store.state.domain + '/user/update',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					data: this.sex,
					type: 'sex'
				}
			})

			console.log(res.data);

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
			this.show_sex = false
			let user_info = JSON.parse(window.localStorage.user_info)
			user_info.user.sex_zh = this.sex == 1 ? '男' : '女'
			this.user_info = user_info
			window.localStorage.user_info = JSON.stringify(user_info)
		},
		//改名
		changeNickName() {
			this.$http({
					url: this.$store.state.domain + '/user/update',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						data: this.nickname,
						type: 'nickname'
					}
				})
				.then(res => {
					console.log(res.data)
					if (res.data.code == '200') {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '1'
						})
						this.show_nickname = false
						let user_info = JSON.parse(window.localStorage.user_info)
						user_info.user.nickname = this.nickname
						this.user_info = user_info
						window.localStorage.user_info = JSON.stringify(user_info)
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		},
		//头像预览,更换头像
		preview(e) {
			let obj = e
			if (e.srcElement.files && e.srcElement.files[0]) {
				var reader = new FileReader()
				reader.onload = r => {
					this.img = r.target.result
					let formData = new FormData(document.querySelector('#form'))
					let url = this.$store.state.domain + '/user/avatar?key=' + window.localStorage.access_token
					this.$http.post(url, formData)
						.then(res => {
							console.log(res.data)
							if (res.data.code == '200') {
								let user_info = JSON.parse(window.localStorage.user_info)
								user_info.user.avatar = res.data.avatar
								window.localStorage.user_info = JSON.stringify(user_info)
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '1'
								})
							} else {
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '2'
								})
							}
						})
				}
				reader.readAsDataURL(e.srcElement.files[0]);
			}
		}
	},
	created() {
		if (this.user.avatar == '') {
			this.img = '../../static/Bitmap2.png'
		} else {
			this.img = this.$store.state.domain + this.user.avatar
		}
		this.sex = this.user.sex
	}
}
</script>

<style scoped lang="less">
.username {
    padding: 0 1rem;
    flex: 0 0 70vw;
    display: flex;
    height: 4rem;
    & > div {
        color: white;
        width: 24vw;
        background: #ff5656;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #F3F3F3;
    }
    & > input {
        padding-left: 8vw;
        background: white;
        width: 48vw;
        border-bottom: 1px solid #F3F3F3;
    }
}

.btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2rem 0;
    & > span {
        border: 1px solid #e2e2e2!important;
        display: flex;
        justify-content: center;
        align-content: center;
        flex: 0 0 auto!important;
        padding: 0.4rem 3rem;
        border-radius: 0.5rem;
        color: #999999;
        font-size: 14px;
    }
    .btn-active {
        border: 1px solid #FF5555!important;
        color: white;
        background: #FF5555;
    }
}

.nickname {
    border: 1px solid #e2e2e2;
    text-align: center;
    font-size: 1.6rem;
    padding: 1rem 0;
    margin: 2rem 0;
}

.my-setting {
    background: #F3F3F3;
    min-height: 100vh;
}

.list-item {
    background: white;
    border-bottom: 1px solid #F3F3F3;
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    & > span:nth-of-type(1) {
        font-size: 1.6rem;
        color: #1A1A1A;
    }
    & > div {
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 1.2rem;
        & > img {
            height: 4rem;
            width: 4rem;
            border-radius: 50%;
        }
        & > i {
            margin-bottom: -0.2rem;
            color: #999999;
            margin-left: 1rem;
            font-size: 1.2rem;
        }
    }
}
</style>
