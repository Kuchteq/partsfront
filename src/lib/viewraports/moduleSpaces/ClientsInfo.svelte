<script>
	import GraphSpace from '$lib/viewraports/GraphSpace.svelte';
	import SectionWrap from '$lib/viewraports/SectionWrap.svelte';
	export let data;
	export let elemColors = ['#00cc99', '#00ffbf', '#4dffd2', '#33ff99', '#80ffbf', '#00cc66'];
	const clientsName = data.map((sales) => sales.name);
	const yItemsAmount = data.map((sales) => sales.items_amount);
	const yItemsValue = data.map((sales) => sales.items_value);
	const yProfitPercentage = data.map((sales) => sales.profit_percentage);
	const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title="Informacje o sprzedaży części po klientach" c="wrap3">
	<GraphSpace title={'Ilość sprzedanych części'} x={clientsName} y={yItemsAmount} {elemColors} />
	<GraphSpace
		title={'Wartość sprzedanych części w PLN'}
		x={clientsName}
		y={yItemsValue}
		{elemColors}
		suffix={' PLN'}
	/>
	<GraphSpace
		title={'Uśredniony procent z marzy od sprzedaży'}
		x={clientsName}
		y={yProfitPercentage}
		{elemColors}
		suffix={'%'}
	/>
	<GraphSpace
		title={'Największy zysk w PLN'}
		x={clientsName}
		y={yProfit}
		{elemColors}
		suffix={' PLN'}
	/>
</SectionWrap>

<style>
	:global(.wrap3) {
		background-color: #f2fcfb;
		--hColor: #009889;
	}
</style>
