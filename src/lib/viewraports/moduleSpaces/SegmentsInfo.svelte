<script>
	import GraphSpace from '$lib/viewraports/GraphSpace.svelte';
	import SectionWrap from '$lib/viewraports/SectionWrap.svelte';
	export let data;
	export let elemColors = ['#005fcc', '#0077ff', '#3392ff', '#3366ff', '#0080ff', '#0059b3'];
	console.log(data);
	const segmentsName = data.map((sales) => sales.segment_name);
	const yItemsAmount = data.map((sales) => sales.items_amount);
	const yItemsValue = data.map((sales) => sales.items_value);
	const yProfitPercentage = data.map((sales) => sales.profit_percentage);
	const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title="Informacje o sprzedaży części po kategoriach" c="wrap2">
	<GraphSpace title={'Ilość kupionych części'} x={segmentsName} y={yItemsAmount} {elemColors} />
	<GraphSpace
		title={'Wartość kupionych części w PLN'}
		x={segmentsName}
		y={yItemsValue}
		{elemColors}
		suffix={' PLN'}
	/>
	<GraphSpace
		title={'Uśredniony procent z marzy od sprzedaży'}
		x={segmentsName}
		y={yProfitPercentage}
		{elemColors}
		suffix={'%'}
	/>
	<GraphSpace
		title={'Największy zysk w PLN'}
		x={segmentsName}
		y={yProfit}
		{elemColors}
		suffix={' PLN'}
	/>
</SectionWrap>

<style>
	:global(.wrap2) {
		background-color: #ebf4ff;
		--gBg: #d9ebff;
		--hColor: var(--mBlue);
	}
</style>
