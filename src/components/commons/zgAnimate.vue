<template>
	<!--动画组件-->
	<transition :mode="mode" :name="name">
		<slot></slot>
	</transition>
</template>

<script>
	export default {
		name: 'zgAnimate',
		props: {
			mode: {
				type: String,
				default: 'out-in'
			},
			name: {
				type: String,
				default: 'fade'
			}
		}
	}
</script>

<style scoped>
	/*.slideDown*/
	
	.slideDown-enter-active, .slideDown-leave-active {
		transition: all .5s ease;
	}
	
	.slideDown-enter, .slideDown-leave-to {
		transform: translateY(50vh);
	}
	/*slideLeft*/
	
	.slideLeft-enter-active, .slideLeft-leave-active {
		transition: all .8s ease;
	}
	
	.slideLeft-enter {
		transform: translateX(100vw);
	}
	
	.slideLeft-leave-to {
		transform: translateX(-100vw);
	}
	/*slideRight*/
	
	.slideRight-enter-active, .slideRight-leave-active {
		transition: all .8s ease;
	}
	
	.slideRight-enter {
		transform: translateX(-100vw);
	}
	
	.slideRight-leave-to {
		transform: translateX(100vw);
	}
	/*fade*/
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.3s ease;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>