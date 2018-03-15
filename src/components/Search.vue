<template>
	<div class="search">
		<headerBox :flag="'back'" :title="'搜索'"></headerBox>
		<section class="main-body">
			<!--搜索框-->
			<div class="search-box">
				<div @click="search(null)" class="search-icon"><i class="iconfont icon-sousuo"></i></div>
				<input class="search-input" type="text" v-model="search_text" placeholder="请输入搜索内容" />
				<div @click="search_text=''" class="clear"><i class="iconfont icon-shanchu"></i></div>
			</div>
			<!--热门标签-->
			<div class="hot">
				<div class="title">热门搜索</div>
				<div class="hot-box"><span @click="search(item)" class="hot-item" v-for="item in keyword">{{item}}</span></div>
			</div>
		</section>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import popup from './commons/popup.vue'
	export default {
		name: 'search',
		components: {
			headerBox,
			popup
		},
		data() {
			return {
				search_text: ''//搜索的关键字
			}
		},
		computed: {
			keyword() {//关键字列表
				if(this.$store.state.keyword == '' && window.sessionStorage.keyword) {
					this.$store.commit('keyword', JSON.parse(window.sessionStorage.keyword))
				}
				return this.$store.state.keyword
			}
		},
		methods: {
			//开始搜索
			search(flag) {
				let value = ''
				if(flag != null) {
					value = flag
				} else if(this.search_text == '') {
					this.$store.dispatch('toast', {
						icon: '2',
						message: '请输入搜索关键字'
					})
					return
				} else if(this.search_text.length > 14) {
					this.$store.dispatch('toast', {
						icon: '2',
						message: '搜索关键字长度不能超过14个字符'
					})
					return
				} else {
					value = this.search_text
				}

				this.$router.push({
					name: 'sort',
					query: {
						key: 'title',
						value: value,
						title: value
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.main-body {
		padding: 2rem;
	}
	
	.hot {
		padding: 2rem 0;
		font-size: 1.4rem;
		.hot-box {
			margin-top: 2rem;
			display: flex;
			flex-wrap: wrap;
			.hot-item {
				height: 2.6rem;
				margin-right: 1rem;
				display: inline-flex;
				border-radius: 3.6rem;
				font-size: 1.4rem;
				color: #999999;
				border: 1px solid #f1f1f1;
				justify-content: center;
				align-items: center;
				margin-bottom: 1rem;
				padding: 0 1.4rem;
			}
		}
	}
	
	.search-box {
		display: flex;
		background: #F2F2F2;
		height: 4.6rem;
		justify-content: space-between;
		align-items: center;
		.search-input {
			flex: 1 1 auto;
			background: #F2F2F2;
		}
		.search-icon {
			display: flex;
			width: 4rem;
			justify-content: center;
			align-items: center;
			color: #999999;
			& > i {
				font-size: 2.2rem;
			}
		}
		.clear {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 4rem;
			color: #999999;
		}
	}
</style>