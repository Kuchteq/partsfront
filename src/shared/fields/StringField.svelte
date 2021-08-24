<script>
	export let id;
	export let label;
	export let update;
	export let initValue = '';
	export let error = undefined;
	export let required = true;
</script>

<div class="uniField {required && 'reqField'} {error && 'fieldFillError'}" data-field-id={id}>
	<label>{label}</label>
	<input on:input={(e) => update(id, e.target.value)} value={initValue} type="text" />
</div>

<style>
</style>
