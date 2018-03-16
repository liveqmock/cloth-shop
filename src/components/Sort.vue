<template>
<div>
	<headerBox :flag="'back'"
	           :title="title"></headerBox>
	<!--筛选-->
	<ul class="filter">
		<li @click="sort('recommend')"
		    :class="{'filter-item':true,'active-item':flag=='recommend'}">推荐</li>
		<li @click="sort('new')"
		    :class="{'filter-item':true,'active-item':flag=='new'}">新品</li>
		<li @click="sort('order')"
		    :class="{'filter-item':true,'active-item':flag=='order'}"><span>价格</span><i class="iconfont icon-shangxia"></i></li>
		<li @click="sort('promotion')"
		    :class="{'filter-item':true,'active-item':flag=='promotion'}">折扣</li>
	</ul>
	<!--滚动加载元素-->
	<div ref="scroll"
	     id="scroll"
	     class="scroll"
	     @scroll='scroll()'>
		<div>
			<!--商品列表-->
			<goods :goods="goods"></goods>
		</div>
	</div>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
import goods from './commons/goods.vue'
export default {
	name: 'sort',
	components: {
		headerBox,
		goods
	},
	data() {
		return {
			title: '', //headerBox标题
			goods: [], //商品列表
			limit: 20,
			page: 2,
			flag: '', //filter flag
			order: 1, //order flag
			initial: {}, //最开始的搜索条件
			data: {}, //最近的一次加载条件
			query_url: '', //url
		}
	},
	async activated() {
		//如果这次搜索的条件和上一次的不同，初始化数据，如果一样则使用上一次的数组
		if (this.query_url != window.location.href) {
			this.flag = ''
			this.order = 1
			this.query_url = window.location.href
			let data = {}
			console.log('key:' + this.$route.query.key)
			this.$route.query.key != undefined ?
				data[this.$route.query.key] = this.$route.query.value : 0
			this.title = this.$route.query.title
			this.initial = data
			this.data = data
			this.getGoods();
		}
	},
	methods: {
		async getGoods() {
			let res = await this.$http({
				url: this.$store.state.domain + '/goods/search',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					data: this.data,
					page: 1,
					limit: 20
				}
			})
			if (res.data.code != '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
				return 0
			}
			this.goods = [...res.data.goods]
			this.page = 2
		},
		//滚动加载
		async scroll() {
			let scroll = document.getElementById('scroll')
			if (scroll.scrollTop + scroll.clientHeight != scroll.scrollHeight) return 0
			let res = await this.$http({
				url: this.$store.state.domain + '/goods/search',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					page: this.page,
					limit: this.limit,
					data: this.data
				}
			})
			if (res.data.code != '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
				return 0
			}
			if (res.data.goods.length > 0) {
				this.goods.push(...res.data.goods)
				this.page += 1
			}
		},
		sort(flag) {
			let data = {}
			if (flag == 'order') {
				data = { ...this.data }
				this.order = this.order == '1' ? '2' : '1'
				data.order = this.order
			} else {
				data = { ...this.initial }
				data[flag] = '1'
			}
			this.flag = flag
			this.data = data
			this.getGoods();
		}
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
        padding: 8.8rem 0 1rem;
    }
}

.filter {
    background: white;
    display: flex;
    height: 4.4rem;
    font-size: 1.4rem;
    color: #999999;
    border-bottom: 1px solid #f2f2f2;
    align-items: center;
    width: 100%;
    .filter-item {
        display: flex;
        flex: 1 1 25%;
        justify-content: center;
        align-items: center;
        & > i {
            font-size: 1.2rem;
            display: inline-flex;
            margin-bottom: -0.4rem;
        }
    }
    .active-item {
        background: #FF5555;
        color: white;
        height: 100%;
    }
}
</style>
