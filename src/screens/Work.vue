<template>
	<div class="work">
		Work page
	</div>
</template>

<script>
export default {
	name: 'work',
	data () {
		return {

		};
	},
};
</script>

<style scoped
		lang="scss">
	.work {
		text-align: center;
		color: var(--gray);
		min-height: 100vh;
		padding: 60px;

		.sort-btn {
			position: absolute;
			width: 100%;

			.btn {
				padding: 5px 12px;
				border-radius: 6px;
				border: solid 2px #FFF;
				color: #FFF;
				background-color: transparent;
				font-size: 16px;

				&.active {
					color: #8EF8FF;
					background-color: #FFF;
				}
			}
		}
	}
</style>
