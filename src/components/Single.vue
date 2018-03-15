<template>
	<div class="single">
		<headerBox :flag="'search'" :title="'分类'"></headerBox>
		<div class="main-body">
			<div class="content-box">
				<!--一级标题-->
				<div class="first">
					<!--滚动元素ul-->
					<ul ref="scroll" class="ul">
						<li @click="flag=index" :key="index" :class="{'first-cell':true,'active-cell':flag==index}" v-for="(item,index) in category">
							{{item.cat_name}}
						</li>
					</ul>
				</div>
				<!--二级标题-->
				<div class="second">
					<div @click="search(category[flag].cat_id,category[flag].cat_name)" class="second-header">
						<span v-if="category.length>0">{{category[flag].cat_name}}</span>
						<span class="more">MORE<i class="iconfont icon-youbian"></i></span>
					</div>
					<ul v-if="category.length>0" class="ul">
						<li @click="search(item.cat_id,item.cat_name)" v-for="item in category[flag].child" class="second-cell">
							<span>{{item.cat_name}}</span>
							<span class="count">{{item.count}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<tab></tab>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import tab from './commons/tab.vue'
	export default {
		name: 'single',
		components: {
			headerBox,
			tab
		},
		created() {
			//获取分类信息
			this.$http({
					url: this.$store.state.domain + '/index/category',
					method: 'GET',
					params: {
						key: window.localStorage.access_token
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.category = res.data.category
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		},
		//还原滚动距离
		activated() {
			this.$store.commit('tab', 'single')
			this.$refs.scroll.scrollTop = this.scroll_top
		},
		//记录滚动距离
		deactivated() {
			this.scroll_top = this.$refs.scroll.scrollTop
		},
		data() {
			return {
				category: [],//分类类目列表
				flag: 0,//要显示的二级分类的索引
				scroll_top: 0,//当前的滚动距离
			}
		},
		methods: {
			//进入sort页面
			search(cat_id, cat_name) {
				this.$router.push({
					name: 'sort',
					query: {
						key: 'cat_id',
						value: cat_id,
						title: cat_name
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.main-body {
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: -1;
		width: 100%;
		background: white;
		overflow: hidden;
		.content-box {
			padding: 4.4rem 0 5rem 0;
			display: flex;
		}
	}
	
	.first {
		flex: 0 0 32vw;
		margin-right: 2vw;
		background: #f0f0f0;
		display: flex;
		flex-direction: column;
		.ul {
			height: calc(100vh-15rem);
			padding-bottom: 10rem;
			overflow: scroll;
			.first-cell {
				height: 4.8rem;
				padding: 0 2rem;
				flex: 0 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.6rem;
				color: #666666;
			}
			.active-cell {
				background: white;
			}
		}
	}
	
	.second {
		flex: 0 0 66vw;
		background: #F5F7F6;
		.second-header {
			background: white;
			color: #CCCCCC;
			font-size: 1.4rem;
			height: 4.8rem;
			padding: 0 1rem;
			flex: 0 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.more {
				margin-bottom: -0.4rem;
				font-size: 1.2rem;
				display: flex;
				justify-content: center;
				align-items: flex-end;
				& > i {
					font-size: 1.2rem;
				}
			}
		}
		.ul {
			height: calc(100vh-15rem);
			padding-bottom: 10rem;
			overflow: scroll;
			.second-cell {
				border-bottom: 1px solid #f0f0f0;
				font-size: 1.4rem;
				height: 4.8rem;
				padding: 0 1rem;
				flex: 1 1 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #666666;
				.count {
					color: white;
					background: #e5e5e5;
					font-size: 1.4rem;
					padding: 0.1rem 1.4rem;
					border-radius: 4rem;
				}
			}
		}
	}
</style>