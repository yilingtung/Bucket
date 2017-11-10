<template>
	<header id="header">
		<router-link to="/" tag="a" class="brand">
			<img src="../static/images/logo.png">
		</router-link>
		<ul :class="['nav', {'close' : !isSubNavShow}]">
			<router-link to="/about" tag="li" class="red">ABOUT</router-link>
			<router-link to="/work" tag="li" class="yellow">WORK</router-link>
			<router-link to="/contact" tag="li" class="green">CONTACT</router-link>
		</ul>
	</header>
</template>

<script>
export default {
	name: 'header',
	data () {
		return {
			isTop: true,
			isMouseCloseNav: false,
			isSubNavShow: true,
		};
	},
	mounted () {
		window.addEventListener('scroll', this.handleScroll);
		document.body.addEventListener('mousemove', this.handleMouseLocation);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
		document.body.removeEventListener('mousemove', this.handleMouseLocation);
	},
	methods: {
		handleScroll() {
			if (window.scrollY > 10) {
				if (this.isTop) {
					this.isTop = false;
				}
				if (!this.isMouseCloseNav && this.isSubNavShow) {
					this.isSubNavShow = false;
				}
				return;
			}
			if (!this.isTop) {
				this.isTop = true;
				this.isSubNavShow = true;
			}
		},
		handleMouseLocation(e) {
			if (e.clientY < 200 && e.clientX < 500) {
				if (!this.isMouseCloseNav) {
					this.isMouseCloseNav = true;
					if (!this.isTop) {
						this.isSubNavShow = true;
					}
				}
				return;
			}
			if (this.isMouseCloseNav) {
				this.isMouseCloseNav = false;
				if (!this.isTop) {
					this.isSubNavShow = false;
				}
			}
		},
	},
};
</script>

<style scoped
		lang="scss">
	header {
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		color: var(--gray);
		height: 60px;

		& .brand {
			display: flex;
			align-items: center;
			width: 50px;
			height: 100%;
			padding: 0 5px;
			background-color: #F1F1F1;

			img {
				width: 100%;
			}
		}

		& .nav {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0;
			overflow: hidden;
			transition: 0.2s;
			width: 300px;
			height: 100%;

			li {
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				margin: 0;
				height: 100%;
				cursor: pointer;
				transition: 0.5s;
				color: rgba(60, 60, 60, 0.5);

				&:hover {
					color: rgba(255, 255, 255, 0.5);
					-webkit-transform: translate(0, -10px);
					transform: translate(0, -10px);
				}

				&.active {
					color: #FFF;
				}

				&.red {
					background-color: #E07A5F;
				}

				&.yellow {
					background-color: #F2CC8F;
				}

				&.green {
					background-color: #81B29A;
				}
			}

			&.close {
				width: 0;
			}
		}
	}
</style>
