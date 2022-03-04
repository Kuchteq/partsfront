<script>
	import Chart from 'chart.js/auto/auto.js';
	import { getContext, onMount } from 'svelte';
	export let y;
	import clone from 'just-clone';
	export let x;
	export let title = '';
	export let elemColors = [];
	export let suffix = '';
	const plotData = {
		labels: x,
		datasets: [
			{
				title: 'dupa',
				label: '',
				backgroundColor: elemColors,
				data: y
			}
		]
	};

	let type = 'bar';
	let config = {
		type: type,
		data: plotData,
		options: {
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: function (context) {
							if (suffix) return context.formattedValue + suffix;
							else return context.formattedValue;
						}
					}
				}
			}
		}
	};
	let canvas;
	let mainChart;
	let typeModalOpened = false;
	onMount(() => {
		mainChart = new Chart(canvas, clone(config));
	});
	$: {
		if (mainChart && mainChart.config.type !== type) {
			mainChart.clear();
			mainChart.destroy();
			config.type = type;
			if (type != 'bar') {
				config.options.plugins.legend.display = true;
			} else {
				config.options.plugins.legend.display = false;
			}
			mainChart = new Chart(canvas, clone(config));
			typeModalOpened = false;
		}
	}
</script>

<div class="gSpace">
	<h3>{title}</h3>
	<canvas id="mainChart" bind:this={canvas} />
	<button type="button" on:click={() => (typeModalOpened = !typeModalOpened)} />
	{#if typeModalOpened}
		<div class="chartTypeModal">
			<label for="bar">
				<input bind:group={type} type="radio" id="bar" value="bar" checked />Bar chart
			</label>
			<label for="pie">
				<input bind:group={type} type="radio" id="pie" value="pie" />Pie chart</label
			>
			<label for="polar">
				<input bind:group={type} type="radio" id="polar" value="polarArea" />Polar Area Chart</label
			>
		</div>
	{/if}
</div>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}
	.gSpace {
		width: 40%;
		background-color: #fff;
		padding: 3%;
		margin: 2%;
		position: relative;
	}
	h3 {
		margin-bottom: 15px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
	}
	button {
		position: absolute;
		top: 1em;
		right: 1em;
		background: url('/icons/ChartStyleIcon.svg');
		background-repeat: no-repeat;
		background-size: 25px;
		background-position: center;
		border-radius: 30px;
		background-color: #fff;
		box-shadow: 0px 0px 12px rgb(0 0 0 / 20%);
		color: var(--gText);
		border: none;
		padding: 15px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: var(--sTrans);
		&:hover {
			background-color: #f3f3f3;
		}
	}
	.chartTypeModal {
		position: absolute;
		top: 3.5em;
		right: 1em;
		background: #fff;
		padding: 1em;
		border-radius: 10px;
		box-shadow: var(--nShadow);
		animation: fadeIn 0.15s;
		label {
			display: block;
			cursor: pointer;
		}
	}
</style>
