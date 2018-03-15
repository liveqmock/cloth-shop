<template>
	<div>
		<!--模态框-->
		<transition mode="out-in" :duration="{enter:1000,leave:1000}" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div v-if="show" @click="showChange" class="modal"></div>
		</transition>
		<!--地址选择-->
		<transition mode="out-in" :duration="{enter:1000,leave:1000}" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div v-if="show" class="address-select">
				<div class="select-title">
					<i></i>
					<span>所在地区</span>
					<i @click="showChange" class="iconfont icon-cuo"></i>
				</div>
				<div class="select-info">
					<span :class="{'select-active':status=='sheng'}">{{sheng}}</span>
					<span :class="{'select-active':status=='shi'}">{{shi}}</span>
					<span :class="{'select-active':status=='qu'}">{{qu}}</span>
				</div>
				<div class="scroll">
					<div @click="select(item)" v-for="(item,index) in area" class="select-item">
						{{item.region_name}}
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'addressSelect',
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				pid: '',
				area: [],
				status: 'sheng',
				sheng: '请选择',
				shi: '',
				qu: '',
				region: {}
			}
		},
		methods: {
			showChange() {
				this.$emit('update:show', false)
			},
			select(item) {
				//选择省
				if(item.region_type == '1') {
					this.$http({
							url: this.$store.state.domain + '/api/get_area',
							method: 'GET',
							params: {
								key: window.sessionStorage.access_token,
								pid: item.region_id
							}
						})
						.then(res => {
							console.log(res.data)
							if(res.data.code == '200') {
								this.area = res.data.area
								this.sheng = item.region_name
								this.shi = '请选择'
								this.region.sheng = {
									name: item.region_name,
									id: item.region_id
								}
								this.status = 'shi'
							} else {
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '2'
								})
							}
						})
					//选择市
				} else if(item.region_type == '2') {
					this.$http({
							url: this.$store.state.domain + '/api/get_area',
							method: 'GET',
							params: {
								key: window.sessionStorage.access_token,
								pid: item.region_id
							}
						})
						.then(res => {
							console.log(res.data)
							if(res.data.code == '200') {
								this.area = res.data.area
								this.qu = '请选择'
								this.shi = item.region_name
								this.region.shi = {
									name: item.region_name,
									id: item.region_id
								}
								this.status = 'qu'
							} else {
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '2'
								})
							}
						})
					//选择区
				} else if(this.qu == '请选择') {
					this.qu = item.region_name
					this.region.qu = {
						name: item.region_name,
						id: item.region_id
					}
					this.$nextTick(() => {
						this.$emit('submit', this.region)
						this.$emit('update:show', false)
					})
				}
			}
		},
		watch: {
			show: function (newVal, oldVal) {
				if(newVal == true) {
					this.$http({
							url: this.$store.state.domain + '/api/get_area',
							method: 'GET',
							params: {
								key: window.sessionStorage.access_token,
							}
						})
						.then(res => {
							console.log(res.data)
							this.status = 'sheng'
							this.sheng = '请选择'
							this.shi = ''
							this.qu = ''
							if(res.data.code == '200') {
								this.area = res.data.area
							} else {
								this.$store.dispatch('toast', {
									message: res.data.msg,
									icon: '2'
								})
							}
						})
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.modal {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.7);
	}
	
	.address-select {
		z-index: 20;
		background: white;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 56vh;
		.select-title {
			height: 6vh;
			font-weight: bold;
			font-size: 1.6rem;
			display: flex;
			padding: 0 1rem;
			justify-content: space-between;
			border-bottom: 1px solid #F3F3F3;
			align-items: center;
			& > i {
				width: 5rem;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #999999;
			}
		}
		.select-info {
			height: 6vh;
			font-size: 1.4rem;
			display: flex;
			padding: 0 1rem;
			border-bottom: 1px solid #F3F3F3;
			align-items: center;
			& > span {
				height: 100%;
				padding: 0 0.4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 2px solid white;
				box-sizing: border-box;
				margin-right: 1rem;
			}
			.select-active {
				border-bottom-color: #ff5555;
			}
		}
		.scroll {
			height: 44vh;
			overflow: scroll;
			padding: 0 1.4rem;
			.select-item {
				display: flex;
				height: 6vh;
				font-size: 1.4rem;
				align-items: center;
			}
		}
	}
</style>