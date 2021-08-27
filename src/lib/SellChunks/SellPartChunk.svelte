<script>
	export let sellData;
	export let sellFunc;
	import back from '$axios';
	import { addNotif } from '$functions/PopupClient.js';
	import PriceField from '$shared/fields/PriceField.svelte';
	import IntegerField from '$shared/fields/IntegerField.svelte';
	export let chunkId;

	const SERVER_ERROR_STRING =
		'Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych';

	let itemInfo = {};

	back
		.get(`/inventory/${sellData.part_id}`)
		.then((res) => {
			itemInfo = res.data[0];
			console.log();
		})
		.catch((err) => {
			console.log(err);
			addNotif('error', 'Problem z pobieraniem po stronie serwera', SERVER_ERROR_STRING);
		});
	let totalValue = sellData.sell_price * sellData.quantity;
</script>

<article>
	<div class="topPart">
		<h1>
			<div>
				{#if sellData.sell_price && sellData.quantity}
					<img src="success" />
				{:else}
					<img src="no_success" />
				{/if}
			</div>
			{itemInfo.part_name}
		</h1>
		<h2 class:visible={totalValue}>{totalValue}</h2>
	</div>
	<div class="fillPartSellData">
		<PriceField
			label={'Cena netto'}
			initValue={sellData.sell_price}
			update={(id, val) => sellFunc(chunkId, val, 'sell_price')}
			required={true}
			multiplier={sellData.quantity}
			multiText={'Wartość brutto: '}
		/>
		<IntegerField
			label={'Ilość do sprzedania'}
			update={(id, val) => sellFunc(chunkId, val, 'quantity')}
			initValue={sellData.quantity}
			required={true}
			boundries={{ min: 1, max: 12 } || undefined}
		/>
	</div>
	<div class="sellnPartInfo">
		<div>
			<h3>Dane o sprzedaży</h3>
			<ul>
				- Zysk na jednej części: <span>{itemInfo.part_name}</span>
				- Zysk na wszystkich: <span>{itemInfo.part_name}</span>
			</ul>
		</div>
		<div>
			<h3>Dane o części</h3>
			<ul>
				- Dostępna ilość: <span>{itemInfo.stock}</span>
				- Cena zakupu: <span>{itemInfo.price} PLN</span>
				- Dostawca: <span>{itemInfo.supplier_name}</span>
				- Data zakupu: <span>{itemInfo.part_name}</span>
				- Segment: <span>{itemInfo.segments_name}</span>
				- Id: <span>{itemInfo.part_id}</span>
			</ul>
		</div>
	</div>
</article>

<style>
</style>
