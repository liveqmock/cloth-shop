<template>
	<div class="home">
		<headerBox @test :flag="'search'" :title="'首页'"></headerBox>
		<!--轮播图-->
		<banner :imgs="advertise"></banner>
		<!--服装分类-->
		<section class="sort">
			<div @click="search('1','sex','男装')" class="sort-cell">
				<img src="../assets/男装.png" />
				<span>男装</span>
			</div>
			<div @click="search('2','sex','女装')" class="sort-cell">
				<img src="../assets/女装.png" />
				<span>女装</span>
			</div>
			<div @click="search('3','sex','童装')" class="sort-cell">
				<img src="../assets/童装.png" />
				<span>童装</span>
			</div>
			<div @click="search('4','sex','裙装')" class="sort-cell">
				<img src="../assets/裙装.png" />
				<span>裙装</span>
			</div>
		</section>

		<!--品牌街-->
		<section class="brand">
			<header @click="$router.push({name:'brandStreet'})" class="brand-header">品牌街<i class="iconfont icon-youbian"></i></header>
			<div @click="search(item.id,'brand',item.name)" class="brand-cell" v-for="item in brand">
				<img :src="$store.state.domain+item.thumb" />
			</div>
		</section>

		<!--商品列表-->
		<goods :goods="goods"></goods>

		<!--底部tab-->
		<tab></tab>
	</div>

</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import tab from './commons/tab.vue'
	import goods from './commons/goods.vue'
	import banner from './commons/banner.vue'
	export default {
		name: 'home',
		components: {
			headerBox,
			tab,
			goods,
			banner,
		},
		activated() {
			if(this.goods.length == 0) {//如果没有商品信息，向远程服务器请求数据
				this.$http({
						url: this.$store.state.domain + '/index/index',
						method: 'GET',
						params: {
							key: window.localStorage.access_token
						}
					})
					.then(res => {
						console.log(res.data)
						this.advertise = res.data.advertise
						this.brand = res.data.brand
						this.goods = res.data.goods
						this.$store.commit('keyword', res.data.keyword)
					})
			}
			this.$store.commit('tab', 'home')
		},
		data() {
			return {
				goods: [],//推荐商品列表
				brand: [],//品牌列表
				advertise: [],//banner图
			}
		},
		methods: {
			//跳转到搜索品牌商品
			search(id, flag, title) {
				this.$router.push({
					name: 'sort',
					query: {
						key: flag,
						value: id,
						title: title
					}
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.home {
		background: #f2f2f2;
		padding-bottom: 5rem;
	}
	
	.sort {
		background: white;
		display: flex;
		height: 10rem;
		width: 100%;
		margin-bottom: 1rem;
		.sort-cell {
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			& > img {
				width: auto;
				height: 3rem;
				margin-bottom: 1rem;
			}
			& > span {
				font-size: 1.6rem;
				color: #343434;
			}
		}
	}
	
	.brand {
		background: white;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 1rem;
		.brand-header {
			flex: 1 1 100%;
			justify-content: center;
			height: 4rem;
			font-size: 1.6rem;
			display: flex;
			align-items: center;
			position: relative;
			& > i {
				height: 4rem;
				display: flex;
				position: absolute;
				right: 1rem;
				top: 0;
				justify-content: center;
				align-items: center;
				font-size: 2.2rem;
			}
		}
		.brand-cell {
			width: 19%;
			padding: 1rem 3%;
			display: flex;
			justify-content: center;
			align-items: center;
			& > img {
				width: 19vw;
				height: 19vw;
			}
		}
	}
</style>