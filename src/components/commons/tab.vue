<template>
<div class="tab">
	<div @click="tab_change('home')"
	     :class="{'tab-item':true,'active-item':$store.state.tab=='home'}">
		<i class="iconfont icon-home"></i>
		<span>首页</span>
	</div>
	<div @click="tab_change('single')"
	     :class="{'tab-item':true,'active-item':$store.state.tab=='single'}">
		<i class="iconfont icon-yifu1"></i>
		<span>单品</span>
	</div>
	<div @click="tab_change('shopCar')"
	     :class="{'tab-item':true,'active-item':$store.state.tab=='shopCar'}">
		<i class="iconfont icon-gouwuche-copy-copy"></i>
		<span style="padding-left: 0.4rem;">购物车</span>
	</div>
	<div @click="tab_change('me')"
	     :class="{'tab-item':true,'active-item':$store.state.tab=='me'}">
		<i class="iconfont icon-usercenter"></i>
		<span>我的</span>
	</div>
</div>
</template>

<script>
export default {
	name: 'tab',
	methods: {
		tab_change(flag) {
			this.$router.replace({
				name: flag
			})
		}
	}
}
</script>

<style scoped lang="less">
.tab {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4.4rem;
    display: flex;
    background: white;
    border-top: 1px solid #f2f2f2;
    .tab-item {
        flex: 1 1 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #c1c1c1;
        & > i {
            font-size: 2.2rem;
            margin-bottom: 0.1rem;
        }
        & > span {
            font-size: 1rem;
            text-align: center;
        }
    }
    .active-item {
        color: #FC444C;
    }
}
</style>
