<script>
	export let text = '';
	export let href = '';
	export let icon = '';
	export let color = '';
	export let state;
</script>

<a
	class={color}
	{href}
	on:click={() => {
		state.set(true);
	}}
	>{text}
	<img src={icon} />
</a>

<style lang="scss">
	a {
		color: #fff;
		padding: 10px 30px;
		border-radius: 30px;
		display: flex;
		align-items: center;
		width: fit-content;
		font-weight: 600;
		margin: 20px auto 5px;
	}
	a img {
		margin-left: 10px;
	}
	.blueScheme {
		background: var(--mBlue);
	}
	.purpleScheme {
		background: var(--mPurple);
		img {
			width: 24px;
		}
	}
</style>
