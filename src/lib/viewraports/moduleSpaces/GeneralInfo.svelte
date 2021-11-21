<script>
	import GraphSpace from '$lib/viewraports/GraphSpace.svelte';
	import SectionWrap from '$lib/viewraports/SectionWrap.svelte';
	export let data;
	const months = data.byMonthInfo.map((d) =>
		new Date(d['month']).toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })
	);
	const valueData = {
		x: months,
		y: data.byMonthInfo.map((d) => d['items_value'])
	};
	const profitData = {
		x: months,
		y: data.byMonthInfo.map((d) => d['profit'])
	};
	const amountData = {
		x: months,
		y: data.byMonthInfo.map((d) => d['items_amount'])
	};

	const elemColors = ['#ffba1a', '#ffc94d', '#ffa64d', '#e6ac00', '#ffcc00', '#e6b800', '#ffad33'];
	const bInfo = data.generalInfo;
</script>

<SectionWrap c="wrap1">
	<div class="basicInfo">
		<h4>Informacje ogólne</h4>
		<ul>
			<li>Zysk: <span>{bInfo.all_profit} PLN</span></li>
			<li>Wartość sprzedaży: <span>{bInfo.all_value} PLN </span></li>
			<li>Ilość wsystkich zamówień: <span>{bInfo.all_orders}</span></li>
			<li>Ilość zakupionych części: <span>{bInfo.all_parts_amount}</span></li>
			<li>Ilość sprzedanych komputerów<span /></li>
			<li>Ilość nowych klientówi: <span>{bInfo.new_clients_amount}</span></li>
		</ul>
	</div>
	<GraphSpace
		x={valueData.x}
		y={valueData.y}
		title={'Wartość sprzedaży w PLN'}
		{elemColors}
		suffix={' PLN'}
	/>
	<GraphSpace
		x={profitData.x}
		y={profitData.y}
		title={'Zysk ze sprzedaży w PLN'}
		{elemColors}
		suffix={' PLN'}
	/>
	<GraphSpace x={amountData.x} y={amountData.y} title={'Ilość sprzedaży'} {elemColors} />
</SectionWrap>

<style lang="scss">
	:global(.wrap1) {
		background-color: #fdfaf2;
		--gBg: #fff9e3;
	}
	.basicInfo {
		width: 40%;
		background-color: #fff9e3;
		padding: 3%;
		margin: 2%;
		h4 {
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 10px;
			color: var(--mGold);
		}
		span {
			font-size: 17px;
			font-weight: 700;
			color: #916b00;
		}
	}
</style>
