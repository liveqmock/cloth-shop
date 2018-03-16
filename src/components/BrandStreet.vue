<template>
<div class="brandStreet">
	<headerBox :flag="'back'"
	           :title="'品牌街'"></headerBox>
	<!--品牌街-->
	<!-- 滚动加载 -->
	<div id="scroll"
	     class="scroll"
	     @scroll="scroll">
		<!--scroll-container-->
		<div>
			<div class="brand">
				<div @click="search(item.id,item.name)"
				     class="brand-cell"
				     v-for="item in brand">
					<div class="img-box">
						<img :src="$store.state.domain+item.thumb" />
					</div>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'brandStreet',
	components: {
		headerBox
	},
	data() {
		return {
			brand: [], //brand数组
			limit: 48, //每次获取的brand数
			page: 2, //记录当前页数
		}
	},
	async created() {
		let res = await this.$http({ //获取brand列表
			url: this.$store.state.domain + '/index/brand',
			method: 'GET',
			params: {
				key: window.localStorage.access_token,
				page: 1,
				limit: 48
			}
		})
		console.log(res.data)
		if (res.data.code != '200') {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
			return 0
		}
		this.brand = [...res.data.brand]
	},
	methods: {
		/*
			name:search
			input:id  brand的ID
				  title  搜索结果页面的顶部标题
			function:跳转到sort页面
		 */
		search(id, title) {
			this.$router.push({
				name: 'sort',
				query: {
					key: 'brand',
					value: id,
					title: title
				}
			})
		},
		/*
			name:search
			function:滚动加载brand数据
		 */
		async scroll() {
			let scroll = document.getElementById('scroll')
			if (scroll.scrollTop + scroll.clientHeight != scroll.scrollHeight) return;
			let res = await this.$http({
				url: this.$store.state.domain + '/index/brand',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					page: this.page,
					limit: this.limit,
				}
			})
			if (res.data.code != '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
				return;
			}
			if (res.data.brand.length > 0) {
				this.brand.push(...res.data.brand)
				this.page += 1;
			}
		},
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
        padding: 4.4rem 0 1rem;
    }
}

.brand {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    .brand-cell {
        background: white;
        width: 19%;
        padding: 1rem 3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        .img-box {
			flex:1 1 auto;
			display: flex;
			align-items: center;
            & > img {
                width: 100%;
            }
        }
        & > span {
            margin-top: 0.6rem;
            font-size: 1.4rem;
            color: #999999;
        }
    }
}
</style>
