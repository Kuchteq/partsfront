<script>
	export let id;
	export let label;
	export let update;
	export let initValue = 0;
	export let error = undefined;
	export let boundries = {
		min: 1,
		max: Number.MAX_SAFE_INTEGER
	};
	export let required = true;
	const blockRange = (e) => {
		if (e.target.value >= boundries.max) {
			e.target.value = boundries.max;
		}
		if (e.target.value <= boundries.min) {
			e.target.value = '';
		}
		update(id, e.target.value);
	};
</script>

<div class="uniField {required && 'reqField'} {error && 'fieldFillError'}" data-field-id={id}>
	<label>{label}</label>
	<input on:input={(e) => blockRange(e)} type="number" value={initValue != 0 && initValue} />
</div>

<style>
</style>
