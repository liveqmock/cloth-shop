<template>
<div class="my-brand">
	<headerBox :flag="'back'"
	           :title="'申请品牌入驻'"></headerBox>
	<div class="main-body">
		<div class="list-item">
			<label for="name">商户名称</label>
			<input id="name"
			       v-model="brand_name"
			       type="text"
			       placeholder="请输入您的品牌名称" />
		</div>
		<div class="list-item">
			<label for="type">主营项目</label>
			<input id="type"
			       v-model="brand_type"
			       type="text"
			       placeholder="比如女装、童装等" />
		</div>
		<div class="list-item introduce">
			<label for="introduce">简单介绍</label>
			<textarea id="introduce"
			          v-model="brand_introduce"
			          placeholder="简单介绍下您的品牌"></textarea>
		</div>
		<div class="list-item">
			<label for="people">联系人</label>
			<input id="people"
			       v-model="brand_people"
			       type="text"
			       placeholder="联系人的姓名" />
		</div>
		<div class="list-item">
			<label for="phone">电话</label>
			<input id="phone"
			       v-model="brand_phone"
			       type="text"
			       placeholder="联系人的手机号码" />
		</div>
		<p class="tip">请仔细填写联系方式，保证我们能尽快联系到您</p>
		<span @click="submit"
		      class="btn apply">立即申请入驻</span>
	</div>
</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myBrand',
	components: {
		headerBox
	},
	data() {
		return {
			//申请资料
			brand_name: '',
			brand_type: '',
			brand_introduce: '',
			brand_people: '',
			brand_phone: '',
		}
	},
	methods: {
		async submit() {
			let res = await this.$http({ //申请入驻
				url: this.$store.state.domain + '/user/enter',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					brand: this.brand_name,
					item: this.brand_type,
					desc: this.brand_introduce,
					name: this.brand_people,
					phone: this.brand_phone,
				}
			})
			console.log(res.data)
			if (res.data.code == '200') {
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
		}
	}
}
</script>

<style scoped lang="less">
.my-brand {
    background: #F3F3F3;
    min-height: 100vh;
}

.tip {
    display: flex;
    height: 4rem;
    font-size: 1.4rem;
    color: #999999;
    align-items: center;
    justify-content: center;
}

.apply {
    margin-top: 5rem;
    margin-left: 5%;
    width: 90%;
    height: 4rem;
}

.list-item {
    margin: 0 1.5rem;
    height: 4.8rem;
    font-size: 1.4rem;
    background: white;
    margin-top: 1.4rem;
    padding: 0 1.8rem;
    display: flex;
    align-items: center;
    border-radius: 5px;
    & > label {
        font-weight: bold;
        flex: 0 0 8rem;
    }
    & > input {
        font-size: 1.4rem;
    }
}

.introduce {
    padding: 1.7rem 1.8rem;
    align-items: flex-start;
    height: 8.8rem;
    & > label {
        height: 100%;
    }
    & > textarea {
        resize: none;
        flex: 1 1 auto;
        height: 100%;
        border: 0;
    }
}
</style>
