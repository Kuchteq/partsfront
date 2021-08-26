<script>
	export let onClick;
	export let text;
</script>

<button on:click={onClick}>
	{text}
</button>

<style lang="scss">
	button {
		position: fixed;
		right: 6%;
		bottom: 40px;
		box-shadow: var(--btnShadow);
		background: var(--moduleThemeGradient);
		color: #fff;
		opacity: 0.8;
		padding: 20px;
		transition: 0.15s all;
		border-radius: 10px;
		animation: fadeIn 0.2s;
		&:hover {
			opacity: 1;
		}
	}
</style>
