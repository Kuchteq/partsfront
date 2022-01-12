<script>
	export let name;
</script>

<div class="backFromModule" href="/">
	<a href="/">
		<img src="icons/BackToModule.svg" />
	</a>
	<h5>
		{name}
	</h5>
</div>

<style lang="scss">
	.backFromModule {
		border-radius: 0 20px 20px 0;
		position: fixed;
		bottom: 20%;
		border: 2px solid #d5d5d5;
		overflow: hidden;
		background: #fff;
	}
	h5 {
		writing-mode: vertical-rl;
		font-size: 16px;
		font-weight: 500;
		padding: 17px 6px;
	}
	a {
		display: block;
		width: 50%;
		padding: 10px 30% 5px 20%;
		background-color: #d5d5d5;
		img {
			width: 100%;
			transition: var(--sTrans);
		}
		&:hover {
			img {
				transform: translate(-4px, 0);
			}
		}
	}
</style>
