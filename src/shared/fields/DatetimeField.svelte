<script>
	let date;
	let time;
	export let id;
	export let label;
	export let update;

	$: {
		update(id, date + time);
	}
</script>

<div class={'uniField'}>
	<label>{label}</label>
	<div class="inputsWrap">
		<input class="date" bind:value={date} type="date" />
		<input class="time" bind:value={time} type="time" />
	</div>
</div>

<style lang="scss">
	.date {
		width: fit-content;
		display: flex;
		&::-webkit-calendar-picker-indicator {
		}
	}
	.time {
		width: fit-content;
	}
	.inputsWrap {
		display: flex;
		width: calc(82% + 34px);
	}
</style>
