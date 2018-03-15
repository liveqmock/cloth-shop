<template>
	<div class="myLove">
		<headerBox :title="'我的收藏'" :flag="'back'">
			<span v-show="edit==false" @click="edit=!edit" class="edit">编辑</span>
			<span v-show="edit==true" @click="edit=!edit" class="edit">取消</span>
		</headerBox>

		<!--编辑条-->
		<transition :duration="{enter:1000,leave:1000}" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div v-show="edit" class="edit-bar">
				<div @click="all" class="all-check">
					<transition :duration="{enter:1000,leave:0}" enter-active-class="animated rubberBand">
						<i v-show="!allCheck" class="iconfont icon-xuanze"></i>
					</transition>
					<transition :duration="{enter:1000,leave:0}" enter-active-class="animated rubberBand">
						<i v-show="allCheck" class="iconfont icon-gou"></i>
					</transition>
					<span>全选</span>
				</div>
				<div @click="remove" class="btn delete">取消收藏</div>
			</div>
		</transition>

		<!--tab-->
		<div class="love-tab">
			<span @click="tabChange('0')" :class="{'tab-item':true,'tab-active':tab=='0'}">全部&nbsp;&nbsp;({{total_count}})</span>
			<span @click="tabChange('1')" :class="{'tab-item':true,'tab-active':tab=='1'}">折扣&nbsp;&nbsp;({{promotion_count}})</span>
		</div>

		<div ref="scroll" class="scroll" id="scroll" @scroll="scroll">
			<!--scroll container-->
			<div>
				<!--收藏商品-->
				<goods v-if="goods.length>0" :goods.sync="goods" :edit="edit"></goods>
			</div>
		</div>
		<!--没有收藏-->
		<div v-if="goods.length==0" class="no-love">
			<i class="iconfont icon-xinxi"></i>
			<span>暂无收藏商品</span>
			<span @click="$router.push({name:'home'})" class="btn">去首页挑选</span>
		</div>
	</div>
</template>

<script>
	import headerBox from './commons/headerBox.vue'
	import goods from './commons/goods.vue'
	export default {
		name: 'myCouponExchange',
		components: {
			headerBox,
			goods
		},
		data() {
			return {
				edit: false, //编辑状态
				limit: 20,
				page: 2,
				tab: '0', //0 or 1
				goods: [],//收藏的商品列表 
				allCheck: false,  //全选
				promotion_count: 0, //tab上的数字
				total_count: 0, //同上
				promotion: '', //全部还是折扣
				scroll_top: 0, //页面滚动距离
			}
		},
		watch: {
			//监听allCheck
			goods: function (newValue, oldValue) {
				if(newValue.length > 0) {
					let check = true
					newValue.forEach(g => {
						if(g.check == false) check = false
					})
					this.allCheck = check
				} else {
					this.allCheck = false
				}

			}
		},
		methods: {
			//取消收藏
			remove() {
				let arr = [] //取消的数组
				let arr2 = [] //剩下的数组
				this.goods.forEach(g => {
					g.check ?
						arr.push(g.goods_id) :
						arr2.push(g)
				})
				this.$http({
						url: this.$store.state.domain + '/user/remove_store',
						method: 'GET',
						params: {
							key: window.localStorage.access_token,
							data: arr
						}
					})
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							this.goods = arr2
							if(this.tab == '0') {
								this.total_count -= arr.length
								this.promotion_count -= arr.length
							} else {
								this.total_count -= arr.length
							}
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
			},
			//切换全部,折扣
			tabChange(flag) {
				this.tab = flag
				this.$http({
						url: this.$store.state.domain + '/user/store',
						method: 'GET',
						params: {
							key: window.localStorage.access_token,
							page: 1,
							limit: this.limit,
							data: {
								promotion: flag
							}
						}
					})
					.then(res => {
						console.log(res.data)
						if(res.data.code == '200') {
							this.goods = res.data.goods
							this.page = 2
						} else {
							this.$store.dispatch('toast', {
								message: res.data.msg,
								icon: '2'
							})
						}
					})
			},
			//全选
			all() {
				this.allCheck = !this.allCheck
				let arr = this.goods
				arr.forEach(g => {
					g.check = this.allCheck
				})
				this.goods = []
				this.goods = arr
			},
			//滚动加载
			scroll() {
				let scroll = document.getElementById('scroll')
				if(scroll.scrollTop + scroll.clientHeight == scroll.scrollHeight) {
					this.$http({
							url: this.$store.state.domain + '/user/store',
							method: 'GET',
							params: {
								key: window.localStorage.access_token,
								data: {
									promotion: this.tab
								},
								page: this.page,
								limit: this.limit,
							}
						})
						.then(res => {
							if(res.data.code == '200') {
								console.log(res.data)
								if(res.data.goods.length > 0) {
									this.goods = [...this.goods, ...res.data.goods]
									this.page = this.page + 1
									this.allCheck = false
								}
							} else {
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '2'
								})
							}
						})
				}
			},
		},
		mounted() {
			this.$http({
					url: this.$store.state.domain + '/user/store',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						page: 1,
						limit: this.limit,
						data: {
							promotion: '0'
						}
					}
				})
				.then(res => {
					console.log(res.data)
					if(res.data.code == '200') {
						this.goods = res.data.goods
						this.total_count = res.data.total_count
						this.promotion_count = res.data.promotion_count
					} else {
						this.$store.dispatch('toast', {
							message: res.data.msg,
							icon: '2'
						})
					}
				})
		}
	}
</script>

<style scoped lang="less">
	.scroll {
		position: absolute;
		height: 100vh;
		width: 100%;
		left: 0;
		top: 0;
		overflow: scroll;
		z-index: -1;
		& > div {
			padding: 8.4rem 0 4rem 0;
		}
	}
	
	.edit-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4rem;
		background: white;
		z-index: 1000;
		.delete {
			height: 4rem;
			border-radius: 0;
		}
		.all-check {
			position: relative;
			height: 4rem;
			width: 10rem;
			& > i {
				position: absolute;
				top: 1.2rem;
				left: 1rem;
				color: #222222;
			}
			& > span {
				position: absolute;
				top: 1rem;
				left: 3rem;
				font-size: 1.6rem;
			}
		}
	}
	
	.edit {
		position: absolute;
		top: 0.4rem;
		right: 1rem;
		height: 4rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.6rem!important;
	}
	
	.love-tab {
		background: white;
		display: flex;
		height: 4rem;
		width: 100%;
		.tab-item {
			flex: 1 1 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.6rem;
			color: #999999;
			border-bottom: 2px solid white;
		}
		.tab-active {
			border-bottom: 2px solid #666666;
			color: #666666
		}
	}
	
	.no-love {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		background: #F3F3F3;
		width: 100%;
		height: 100vh;
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