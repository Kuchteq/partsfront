<script>
	import { onMount } from 'svelte';

	let date = '';
	let time = '';
	export let id;
	export let label;
	export let update;
	export let required = true;
	export let error = undefined;
	export let initValue = '';
	$: {
		if (date && time) {
			update(id, `${date} ${time}`);
		}
	}
	onMount(() => {
		if (initValue) {
			date = initValue.split(' ')[0];
			time = initValue.split(' ')[1];
		}
	});
</script>

<div class="uniField {required && 'reqField'} {error ? 'fieldFillError' : ''}" data-field-id={id}>
	<label>{label}</label>
	<div class="inputsWrap">
		<input class="date" bind:value={date} type="date" />
		<input class="time" bind:value={time} type="time" />
	</div>
</div>

<style lang="scss">
	.time,
	.date {
		width: fit-content;
		cursor: text;
		&::-webkit-calendar-picker-indicator {
			border: 1px solid #000;
			background-color: rgb(243, 243, 243);
			cursor: pointer;
		}
	}
	.inputsWrap {
		display: flex;
		width: calc(82% + 34px);
	}
</style>
