<template>
<div class="my-address">
	<headerBox :flag="'back'"
	           :title="'收货地址'"></headerBox>

	<!--地址列表-->
	<div v-show="address.length>0"
	     class="address">
		<template v-for="(item,index) in address">
				<div class="address-cell">
					<span class="consignee"><span>{{item.consignee}}</span><span class="tel">{{item.tel}}</span></span>
					<span class="detail">{{item.province_zh+item.city_zh+item.district_zh+item.address}}</span>
					<div class="operate">
						<div @click="setDefault(item)" class="default-check">
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="!item.check" class="iconfont icon-xuanze"></i>
							</transition>
							<transition mode="out-in" :duration="{enter:1000,leave:0}" enter-active-class="animated bounceIn">
								<i v-show="item.check" class="iconfont icon-gou"></i>
							</transition>
							<span>默认地址</span>
						</div>
						<div @click="remove(item,index)" class="delete">
							<i class="iconfont icon-iconfontshanchu"></i>
							<span>删除</span>
						</div>
					</div>
				</div>
			</template>
		<div @click="$router.push({name:'myAddressAdd'})"
		     class="btn add-address">添加收货地址</div>
	</div>

	<!--没有地址-->
	<div v-show="address.length==0"
	     class="noAddress">
		<i class="iconfont icon-icondizhiguanlii"></i>
		<span>您还没有添加收货地址</span>
		<span @click="$router.push({name:'myAddressAdd'})"
		      class="btn">添加收货地址</span>
	</div>
</div>
</template>

<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myAddress',
	components: {
		headerBox,
	},
	data() {
		return {
			address: [] //地址列表
		}
	},
	async created() {
		let res = await this.$http({ //更新地址列表
			url: this.$store.state.domain + '/user/address',
			method: 'GET',
			params: {
				key: window.localStorage.access_token
			}
		})
		console.log(res.data)
		if (res.data.code == '200') {
			this.address = [...res.data.address]
			// 添加check
			this.address.map((a, i) => i == 0 ? a.check = true : a.check = false)
		} else {
			this.$store.dispatch('toast', {
				message: res.data.msg,
				icon: '2'
			})
		}
	},
	methods: {
		//设置默认地址
		async setDefault(item) {
			if (!item.check) {
				let res = await this.$http({
					url: this.$store.state.domain + '/user/set_default',
					method: 'GET',
					params: {
						key: window.localStorage.access_token,
						id: item.id
					}
				})
				if (res.data.code == '200') {
					this.address.forEach(a => {
						if (a.check)
							a.check = false

						if (item.id == a.id)
							a.check = true
					})
					this.address = [...this.address]
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
			}
		},
		//移除地址
		async remove(item, index) {
			if (item.check) {
				this.$store.dispatch('toast', {
					message: '默认地址不能删除',
					icon: '2'
				})
				return;
			}
			let res = await this.$http({
				url: this.$store.state.domain + '/user/remove_address',
				method: 'GET',
				params: {
					key: window.localStorage.access_token,
					id: item.id
				}
			})
			if (res.data.code == '200') {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '1'
				})
				this.address.splice(index, 1)
			} else {
				this.$store.dispatch('toast', {
					message: res.data.msg,
					icon: '2'
				})
			}
		}
	},
}
</script>

<style scoped lang="less">
.my-address {
    background: #F3F3F3;
    min-height: 100vh;
}

.noAddress {
    position: absolute;
    top: 0;
    left: 0;
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

.address {
    padding-bottom: 4.6rem;
    .address-cell {
        background: white;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;
        color: #222222;
        padding: 1rem 1rem 0;
        .consignee,
        .detail {
			line-height: 2.8rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
        }
        .detail {
			line-height: 2.4rem;
            color: #999999;
            border-bottom: 1px solid #F3F3F3;
            padding: 1rem;
        }
        .operate {
            height: 11vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .default-check {
                position: relative;
                height: 11vw;
                width: 30vw;
                & > i {
                    position: absolute;
                    left: 2vw;
                    top: 2.7vw;
                    font-size: 5vw;
                    color: #FF5555;
                }
                & > span {
                    position: absolute;
                    left: 9vw;
                    top: 3.3vw;
                    font-size: 4vw;
                }
            }
            .delete {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-right: 1rem;
                & > i {
                    font-size: 1.8rem;
                    margin-right: 1rem;
                }
            }
        }
    }
}

.add-address {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-radius: 0;
    height: 4.6rem;
}
</style>
