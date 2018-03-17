<template>
<div class="team">
	<headerBox :flag="'back'"
	           :title="'我的团队'"></headerBox>

	<div class="thead">
		<span>成员信息</span>
		<span>TA的佣金</span>
	</div>

	<div class="member">
		<template v-for="(item,index) in member">
				<div class="member-item">
					<img :src="item.avatar==''?'../../static/Bitmap2.png':$store.state.domain+item.avatar" />
					<div class="member-info">
						<span><span class="member-name">{{item.nickname}}</span><span class="member-phone">{{item.phone}}</span></span>
						<span class="member-count">{{item.count}}个成员</span>
					</div>
					<div class="money">
						<span>{{parseFloat(item.commission).toFixed(2)}}</span>
					</div>
				</div>
			</template>
	</div>

</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myTeam',
	components: {
		headerBox
	},
	data() {
		return {
			member: [] //成员列表
		}
	},
	//获取成员列表
	async created() {
		let res = await this.$http({
			url: this.$store.state.domain + '/agency/team',
			method: 'GET',
			params: {
				key: window.localStorage.access_token,
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.member = [...res.data.team]
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	}
}
</script>

<style scoped lang="less">
.thead {
    height: 4rem;
    padding: 0 2rem;
    color: #999999;
    font-size: 1.4rem;
    border-bottom: 1px solid #F3F3F3;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.member-item {
    display: flex;
    border-bottom: 1px solid #F3F3F3;
    padding: 0 2rem;
    height: 8rem;
    align-items: center;
    & > img {
        flex: 0 0 5rem;
        height: 5rem;
        width: 5rem;
        border-radius: 50%;
        margin-right: 2rem;
    }
    .member-info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .member-name {
            font-size: 1.4rem;
            margin-right: 2rem;
        }
        .member-phone {
            font-size: 1.4rem;
        }
        .member-count {
            margin-top: 0.6rem;
            color: #999999;
            font-size: 1.2rem;
        }
    }
    .money {
        flex: 0 0 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
    }
}
</style>
