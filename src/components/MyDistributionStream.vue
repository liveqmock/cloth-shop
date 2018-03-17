<template>
<div class="my-stream">
	<headerBox :flag="'back'"
	           :title="'佣金明细'"></headerBox>
	<div class="stream-list">
		<div class="stream-item">
			<p class="row1">
				<span>任务一</span>
				<span>+10086.00</span>
			</p>
			<p class="row2">
				<span>2017-08-12 12:00</span>
				<span>余额：10000.00</span>
			</p>
		</div>
	</div>
</div>
</template>
<script>
import headerBox from './commons/headerBox.vue'
export default {
	name: 'myDistributionStream',
	components: {
		headerBox
	}
}
</script>

<style scoped lang="less">
.stream-list {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #F3F3F3;
    .stream-item {
        flex: 1 1 auto;
        padding: 1rem 1.5rem;
        & > p {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .row1 {
            margin-bottom: 0.4rem;
            & > span:nth-of-type(1) {
                font-size: 1.6rem;
                color: #222222;
            }
            & > span:nth-of-type(2) {
                font-size: 1.8rem;
                color: #26E89B;
            }
        }
        .row2 {
            & > span {
                color: #999999;
                font-size: 1.4rem;
            }
        }
    }
}
</style>
