<script>
	export let sellData;
	export let sellFunc;
	import back from '$axios';
	import { addNotif } from '$functions/PopupClient.js';
	import PriceField from '$shared/fields/PriceField.svelte';
	import IntegerField from '$shared/fields/IntegerField.svelte';
	import accordion from '$functions/accordion';
	export let chunkId;

	const SERVER_ERROR_STRING =
		'Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych';

	let itemInfo = {};

	back
		.get(`/inventory/${sellData.part_id}`)
		.then((res) => {
			itemInfo = res.data[0];
		})
		.catch((err) => {
			console.log(err);
			addNotif('error', 'Problem z pobieraniem po stronie serwera', SERVER_ERROR_STRING);
		});
	let totalValue = 0;
	$: {
		totalValue = parseInt(sellData.sell_price) * parseInt(sellData.quantity);
	}

	let isOpen = true;
</script>

<article class="sellChunk" class:closedDetails={!isOpen}>
	<div class="topPart">
		<h1>
			{#if sellData.sell_price && sellData.quantity}
				<img src="/icons/ReadyToSell.svg" />
			{:else}
				<img src="/icons/NotYetToSell.svg" />
			{/if}
			{itemInfo.part_name}
		</h1>
		<div class="rightSideTop">
			<h2 class="totalValue" class:visible={totalValue}>
				Wartość sprzedaży {totalValue} PLN
			</h2>
			<button type="button" class:rotatedButton={isOpen} on:click={() => (isOpen = !isOpen)}>
				<img src="/icons/UnravelTriangle.svg" />
			</button>
		</div>
		<button class="topDeselectBtn" type="button" />
	</div>
	<div use:accordion={isOpen}>
		<div class="fillPartSellData">
			<PriceField
				label={'Cena netto'}
				initValue={sellData.sell_price}
				update={(id, val) => sellFunc(chunkId, val, 'sell_price')}
				required={true}
				multiplier={1.23}
				multiText={'Wartość brutto: '}
				error={sellData.error == 1 || undefined}
			/>
			<IntegerField
				label={'Ilość do sprzedania'}
				update={(id, val) => sellFunc(chunkId, val, 'quantity')}
				initValue={sellData.quantity}
				required={true}
				boundries={{ min: 1, max: 12 } || undefined}
				error={sellData.error == 2 || undefined}
			/>
		</div>

		<div class="sellnPartInfo">
			<div>
				<h3>Dane o sprzedaży</h3>
				<ul>
					<li>- Zysk na jednej części: <b>{sellData.sell_price - itemInfo.price}</b> PLN</li>
					<li>
						- Zysk na wszystkich: <b>{(sellData.sell_price - itemInfo.price) * sellData.quantity}</b
						> PLN
					</li>
				</ul>
			</div>
			<div>
				<h3>Dane o części</h3>
				<ul>
					<li>- Dostępna ilość: <span>{itemInfo.stock}</span></li>
					<li>- Cena zakupu: <b>{itemInfo.price}</b> PLN</li>
					<li>- Dostawca: <span>{itemInfo.supplier_name}</span></li>
					<li>- Data zakupu: <span>{itemInfo.part_name}</span></li>
					<li>- Segment: <span>{itemInfo.segment_name}</span></li>
					<li>- Id: <span>{itemInfo.part_id}</span></li>
				</ul>
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	.topDeselectBtn {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		top: 0;
		width: 20px;
		height: 20px;
		background-color: #f3f3f3;
	}
	.sellChunk {
		background-color: #fff;
		border-radius: 14px;
		margin-top: 25px;
		padding-bottom: 25px;
		transition: 0.1s padding;
	}
	.topPart {
		font-size: 20px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30px;
		transition: 0.1s margin;
		h1 {
			padding: 18px;
			font-size: 20px;
			display: flex;
			align-items: center;
			img {
				margin-right: 10px;
			}
		}
		h2 {
			display: flex;
		}
	}
	.closedDetails {
		.topPart {
			margin-bottom: 0;
		}
		&.sellChunk {
			padding-bottom: 0;
		}
	}

	.fillPartSellData {
		padding: 0 25px;
	}
	.sellnPartInfo {
		margin: 28px 28px 0;
		background: #f3f3f3;
		border-radius: 0px 0 10px 10px;
		padding: 15px 26px;
		display: flex;
		transition: 0.3s padding;
		h3 {
			font-size: 22px;
			font-weight: 700;
			color: #e20808;
			margin-bottom: 5px;
		}
		& > div {
			width: 47.5%;
			&:nth-child(1) {
				margin-right: 5%;
				border-right: 2px solid #e20808;
			}
		}
		li {
			span {
				color: rgb(133, 2, 2);
			}
			b {
				font-weight: 700;
			}
		}
	}
	.totalValue {
		background-color: #f3f3f3;
		padding: 18px 20px;
		border-radius: 0 0 9px 16px;
	}
	.rotatedButton {
		transform: rotate(180deg);
	}

	.rightSideTop {
		display: flex;
		button {
			width: 70px;
			transition: 0.15s all;
			transform-origin: center;
			height: 70px;
		}
	}
</style>
