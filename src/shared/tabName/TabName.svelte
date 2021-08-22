<script>
	export let text;
	export let clickHandler = undefined;
</script>

<div>
	{#if clickHandler}
		<button on:click={clickHandler} />
	{/if}
	<span>{text}</span>
</div>

<style>
	div {
		font-size: 18px;
		position: absolute;
		top: 0;
		left: 0;
		height: 44px;
		border: 1px solid #d5d5d5;
		border-radius: var(--modalRounding) 0px 20px 0px;
		display: flex;
	}
	button {
		background: var(--crossBg);
		width: 44px;
		height: 100%;
		border-radius: 23px 0 0 0;
	}
	span {
		height: fit-content;
		margin: auto;
		padding: 0 15px 0 18px;
	}
</style>
