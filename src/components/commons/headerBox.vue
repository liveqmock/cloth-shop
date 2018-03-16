<template>
<div @click="$emit('test')"
     class="header">
	<div v-show="flag=='search'"
	     @click="search"
	     class="search"><i class="iconfont icon-sousuo"></i></div>
	<div v-show="flag=='back'"
	     @click="back"
	     class="back"><i class="iconfont icon-fanhui"></i></div>
	<span>{{title}}</span>
	<a v-show="kefu"
	   class="kefu"
	   href="tel:667778800"><i class="iconfont icon-icon052"></i></a>
	<slot></slot>
</div>
</template>

<script>
export default {
	name: 'headerBox',
	props: {
		title: { //标题
			type: String,
			default: 'header'
		},
		flag: { //图标控制
			type: String,
			default: 'back'
		},
		kefu: { //客服
			type: Boolean,
			default: false
		}
	},
	methods: {
		//回退
		back() {
			this.$router.go(-1)
		},
		//进入搜索页
		search() {
			this.$router.push({
				name: 'search'
			})
		},
	}
}
</script>

<style scoped lang="less">
.header {
    position: relative;
    background: white;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    height: 4.4rem;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .back,
    .kefu,
    .search {
        display: flex;
        align-items: center;
        height: 4.4rem;
        width: 4.4rem;
        position: absolute;
        left: 1rem;
        line-height: 4.4rem;
        & > i {
            font-size: 2rem;
            display: flex;
        }
    }
    .kefu {
        display: flex;
        justify-content: center;
        right: 0;
        left: auto;
        width: 4rem;
    }
    .back,
    .kefu {
        & > i {
            font-size: 1.6rem;
        }
    }
    & > span {
        font-size: 1.8rem;
    }
}
</style>
