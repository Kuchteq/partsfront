<script>
	export let id;
	export let label;
	export let update;
</script>

<div class={'uniField'}>
	<label>{label}</label>
	<input on:input={(e) => update(id, e.target.value)} type="email" />
</div>

<style>
</style>
