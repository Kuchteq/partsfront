<script>
	import GraphSpace from '$lib/viewraports/GraphSpace.svelte';
	import SectionWrap from '$lib/viewraports/SectionWrap.svelte';
	export let data;
	let elemColors = ['#0489ae', '#05c5fa', '#37d0fb', '#1ec3fa', '#0497c8', '#05e1e1'];
	let elemColorsBuy = ['#0099ff', '#33adff', '#00ace6', '#33ccff', '#00bfff', '#4dd2ff'];
	const clientsName = data.map((sales) => sales.name);
	const yItemsAmount = data.map((sales) => sales.items_amount);
	const yItemsValue = data.map((sales) => sales.items_value);
	const yProfitPercentage = data.map((sales) => sales.profit_percentage);
	const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title="Informacje o kupowanych przez klientów części od dostawcóch" c="wrap4">
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
<SectionWrap title="Informacje o kupionych przez Ciebię części od dostawcach" c="wrap5">
	<GraphSpace
		title={'Ilość kupionych części przez Ciebię'}
		x={clientsName}
		y={yItemsAmount}
		elemColors={elemColorsBuy}
	/>
	<GraphSpace
		title={'Wartość kupionych części przez Ciebię w PLN'}
		x={clientsName}
		y={yItemsValue}
		{elemColors}
		suffix={' PLN'}
	/>
</SectionWrap>

<style>
	:global(.wrap4) {
		background-color: #f2fafc;
		--hColor: #0083a7;
	}
	:global(.wrap5) {
		background-color: #f2fafc;
		--hColor: #003c4d;
		margin-top: 0 !important;
	}
</style>
