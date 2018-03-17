<template>
<div class="my-distribution">
	<headerBox :flag="'back'"
	           :title="'我的二维码'"></headerBox>
	<div class="main-body">
		<div class="user-info">
			<img :src="user.avatar==''?'../../static/Bitmap2.png':$store.state.domain+user.avatar" />
			<div class="user-text">
				<span class="user-name">{{user.nickname}}</span>
				<span class="user-declaration">我为分销服装代言</span>
			</div>
		</div>
		<img class="qrcode"
		     :src="img" />
		<p>恭喜亲，已成为代言人</p>
		<p class="share">立即截图分享到朋友圈，赚取佣金吧！</p>
	</div>
</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myDistribution',
	components: {
		headerBox
	},
	data() {
		return {
			img: '', //二维码
			user_info: JSON.parse(window.localStorage.user_info)
		}
	},
	computed: {
		user() {
			return this.user_info.user
		}
	},
	async created() {
		//获取二维码
		let res = await this.$http({
			url: this.$store.state.domain + '/user/promotion',
			method: 'GET',
			params: {
				key: window.localStorage.access_token
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.img = res.data.image
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	},
}
</script>

<style scoped lang="less">
.my-distribution {
    min-height: 100vh;
    background: #F3F3F3;
}

.main-body {
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 1.5rem 0;
    font-size: 1.8rem;
    color: #999999;
    padding-bottom: 4rem;
    .qrcode {
        width: 16rem;
        height: 16rem;
        margin-bottom: 2rem;
    }
    .share {
        margin-top: 4rem;
        height: 4rem;
        width: 100%;
    }
    .user-info {
        display: flex;
        padding: 1.5rem 0;
        width: 100%;
        margin-bottom: 4rem;
        & > img {
            flex: 0 0 auto;
            height: 9rem;
            width: 9rem;
            margin: 0 3rem;
            border-radius: 50%;
        }
        .user-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1 1 auto;
            .user-name {
                font-size: 2rem;
                color: #1A1A1A;
            }
            .user-declaration {
                margin-top: 0.8rem;
                font-size: 1.2rem;
            }
        }
    }
	.share{
		font-size: 1.4rem;
		text-align: center;
	}
}
</style>
