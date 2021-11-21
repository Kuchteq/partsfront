<script>
	export let c = 'wrap';
	export let title = '';
</script>

<section class={c}>
	<h2>{title}</h2>
	<div class="inner">
		<slot />
	</div>
</section>

<style>
	section {
		margin-top: 43px;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 25px;
	}
	h2 {
		font-size: 1.15em;
		font-weight: bold;
		margin-bottom: 10px;
		color: var(--hColor);
	}
	.wrap {
		width: 100%;
	}
	.inner {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
</style>
