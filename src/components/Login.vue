<template>
<div class="container">
	<headerBox :flag="'none'"
	           :title="header_title"></headerBox>

	<!--登录-->
	<transition :duration="{enter:1000,leave:0}"
	            mode="out-in"
	            enter-active-class="animated fadeIn">
		<div v-show="tab=='login'"
		     class="login">
			<div class="username">
				<div>+86</div>
				<input type="text"
				       v-model="phone"
				       placeholder="请输入你的电话号码" />
			</div>
			<div class="password">
				<input type="password"
				       v-model="password"
				       placeholder="请输入你的密码" />
			</div>
			<div></div>
			<div @click="login"
			     class="btn">登录</div>
			<div class="other">
				<span @click="show('register')">立即注册</span>
				<span @click="show('forget')">忘记密码?</span>
			</div>
		</div>
	</transition>

	<!--注册-->
	<transition :duration="{enter:1000,leave:0}"
	            mode="out-in"
	            enter-active-class="animated fadeIn">
		<div v-show="tab=='register'"
		     class="register">
			<div class="username">
				<div>+86</div>
				<input type="text"
				       v-model="phone"
				       placeholder="请输入你的电话号码" />
			</div>
			<div class="username">
				<div v-show="register_code_flag==1"
				     @click="get_register_code">发送</div>
				<div v-show="register_code_flag==2"
				     @click="get_register_code">发送中...</div>
				<div v-show="register_code_flag==3">已发送({{register_code_time}})</div>
				<input type="text"
				       v-model="register_code"
				       placeholder="请输入你的验证码" />
			</div>
			<div class="password">
				<input type="password"
				       v-model="register_password"
				       placeholder="请输入你的密码" />
			</div>
			<div @click="register"
			     class="btn">注册</div>
			<div class="other">
				<span @click="show('login')">账号登录</span>
			</div>
		</div>
	</transition>

	<!--忘记密码-->
	<transition :duration="{enter:1000,leave:0}"
	            mode="out-in"
	            enter-active-class="animated fadeIn">
		<div v-show="tab=='forget'"
		     class="forget">
			<div class="username">
				<div>+86</div>
				<input type="text"
				       v-model="phone"
				       placeholder="请输入你的电话号码" />
			</div>
			<div class="username">
				<div v-show="forget_code_flag==1"
				     @click="get_forget_code">发送</div>
				<div v-show="forget_code_flag==2"
				     @click="get_forget_code">发送中...</div>
				<div v-show="forget_code_flag==3">已发送({{forget_code_time}})</div>
				<input type="text"
				       v-model="forget_code"
				       placeholder="请输入你的验证码" />
			</div>
			<div class="password">
				<input type="password"
				       v-model="forget_password"
				       placeholder="请输入新密码" />
			</div>
			<div @click="forget"
			     class="btn">确定</div>
			<div class="other">
				<span @click="show('login')">账号登录</span>
			</div>
		</div>
	</transition>

	<!--微信登录-->
	<footer class="footer">
		<span>———————  其他登录方式   ———————</span>
		<i @click="wx"
		   class="iconfont icon-weixin3"></i>
	</footer>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue';
export default {
	name: 'Login',
	components: {
		headerBox,
	},
	data() {
		return {
			tab: 'login', //login or register or forget
			phone: '', //手机号码
			password: '', //登录密码
			sign: '', //分销标记
			//忘记密码
			forget_code: '', //验证码
			forget_code_time: 60, //再次获取验证码倒计时
			forget_code_flag: 1, //验证码状态 1 可以发送 2发送中 3发送倒计时
			forget_interval: '', //验证码倒计时interval对象
			forget_password: '', //忘记密码的密码
			//注册账号
			register_code: '',
			register_code_time: 60,
			register_code_flag: 1,
			register_interval: '',
			register_password: '',
		}
	},
	computed: {
		header_title() { //顶部的标题
			if (this.tab == 'login') return '登录'
			if (this.tab == 'register') return '注册'
			if (this.tab == 'forget') return '忘记密码'
		}
	},
	created() {
		if (this.$route.query.sign) { //分销下级标记,如果有，则记录
			this.sign = this.$route.query.sign
			this.tab = 'register'
		}
	},
	methods: {
		show(flag) { //切换登录,注册,忘记密码
			this.tab = flag
		},
		async getUserInfo() {
			//获取个人信息
			let res = await this.$http.get(this.$store.state.domain + '/user/index', {
				params: {
					key: window.localStorage.access_token,
				}
			})
			console.log(res.data)

			//获取失败返回并提示
			if (res.data.code != 200) {
				this.$store.dispatch({
					type: 'toast',
					message: res.data.msg,
					icon: '2'
				})
				return 0
			}

			//获取个人信息
			window.localStorage.user_info = JSON.stringify(res.data)
			setTimeout(() => {
				//有重定向地址则跳转重定向地址
				if (this.$route.query.redirect != undefined) {
					window.history.pushState({
						name: 'test'
					}, 'title:test', '/home')
					this.$router.push({
						path: this.$route.query.redirect
					})
				}

				this.$router.push({
					path: '/home'
				})

			}, 1000)
		},
		async login() {
			//登录验证 获取token
			let res = await this.$http.get(this.$store.state.domain + '/user/login', {
				params: {
					phone: this.phone,
					password: this.password,
				}
			})
			console.log(res.data);
			//登陆失败返回并提示
			if (res.data.code != 200) {
				this.$store.dispatch({
					type: 'toast',
					message: res.data.msg,
					icon: '2'
				})
				return 0
			}
			//保存token
			window.localStorage.access_token = res.data.key
			this.$store.dispatch({
				type: 'toast',
				message: res.data.msg,
				icon: '1'
			})

			this.getUserInfo();
		},
		async register() {
			let res = await this.$http({ //注册
				url: this.$store.state.domain + '/user/registor',
				method: 'GET',
				params: {
					phone: this.phone,
					password: this.register_password,
					code: this.register_code,
					sign: this.sign,
				},
			})
			console.log(res.data)
			if (res.data.code != '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
				return 0;
			}
			window.localStorage.access_token = res.data.key
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '1'
			})
			this.getUserInfo();
		},
		async forget() {
			let res = await this.$http({ //忘记密码
				url: this.$store.state.domain + '/user/forget',
				method: 'GET',
				params: {
					phone: this.phone,
					code: this.forget_code,
					password: this.forget_password
				}
			})
			console.log(res.data)

			if (res.data.code == '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '1'
				})
				setTimeout(() => {
					this.tab = 'login'
				}, this.$store.state.toast_duration)
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		},
		async get_forget_code() { //获取忘记密码验证码
			if (this.forget_code_flag == 1) {
				this.forget_code_flag = 2
				let res = await this.$http({
					url: this.$store.state.domain + '/api/send_code',
					method: 'GET',
					params: {
						phone: this.phone,
						type: 'forget'
					}
				})
				console.log(res.data)
				if (res.data.code == '200') {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '1'
					})
					this.forget_code_flag = 3
					this.forget_code_interval = setInterval(() => {
						this.forget_code_time--;
						if (this.forget_code_time < 0) {
							this.forget_code_flag = 1
							this.forget_code_time = 60
							clearInterval(this.forget_code_interval)
						}
					}, 1000)
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
					this.forget_code_flag = 1
				}
			}
		},
		async get_register_code() { //获取注册验证码
			if (this.register_code_flag == 1) {
				this.register_code_flag = 2
				let res = await this.$http({
					url: this.$store.state.domain + '/api/send_code',
					method: 'GET',
					params: {
						phone: this.phone,
						type: 'registor'
					}
				})

				console.log(res.data)
				if (res.data.code == '200') {
					this.register_code_flag = 3
					this.register_code_interval = setInterval(() => {
						this.register_code_time--;
						if (this.register_code_time < 0) {
							this.register_code_flag = 1
							this.register_code_time = 60
							clearInterval(this.register_code_interval)
						}
					}, 1000)
				} else {
					this.$store.dispatch('toast', {
						message: res.data.msg,
						icon: '2'
					})
					this.register_code_flag = 1
				}
			}
		},
		wx() { // 微信登录，跳转到后台处理页面
			console.log('wx')
			if (this.sign != '') {
				window.location.href = this.$store.state.domain + '/wechat/login?sign=' + this.sign
			} else if (this.$route.query.redirect != '') {
				window.location.href = this.$store.state.domain + '/wechat/login?redirect=' + this.$route.query.redirect
			} else {
				window.location.href = this.$store.state.domain + '/wechat/login'
			}

		}
	}
}
</script>

<style scoped lang="less">
input {
    font-size: 1.6rem;
}

.container {
    position: relative;
    min-height: 100vh;
}

.forget,
.login,
.register {
    position: absolute;
    left: 0;
    padding: 0 10vw;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.6rem;
    box-sizing: content-box;
}

.login {
    top: 8rem;
}

.register {
    top: 8rem;
}

.forget {
    top: 8rem;
}

.username {
    flex: 0 0 80vw;
    display: flex;
    height: 4rem;
    margin-bottom: 2rem;
    & > div {
        color: white;
        width: 24vw;
        background: #ff5656;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > input {
        padding-left: 8vw;
        background: #f7f4f8;
        width: 48vw;
    }
}

.password {
    flex: 1 1 100%;
    height: 4rem;
    margin-bottom: 2rem;
    display: flex;
    & > input {
        padding-left: 10%;
        background: #f7f4f8;
        flex: 1 1 80%;
    }
}

.btn {
    height: 4rem;
    margin-bottom: 2rem;
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff5656;
    color: white;
}

.other {
    display: flex;
    flex: 1 1 100%;
    justify-content: space-between;
    & > span:nth-of-type(1) {
        color: #ff5656;
    }
    & > span:nth-of-type(2) {
        color: #878787;
    }
}

.footer {
    position: absolute;
    left: 0;
    top: 40rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #CCCCCC;
    & > span {
        font-size: 1.2rem;
    }
    & > i {
        margin-top: 1.4rem;
        font-size: 4.5rem;
    }
}
</style>
