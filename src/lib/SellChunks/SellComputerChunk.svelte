<script>
	export let sellData;
	export let sellFunc;
	import back from '$axios';
	import { addNotif } from '$functions/PopupClient.js';
	import PriceField from '$shared/fields/PriceField.svelte';
	import IntegerField from '$shared/fields/IntegerField.svelte';
	import accordion from '$functions/accordion';
	import { onMount } from 'svelte';
	export let chunkId;

	const SERVER_ERROR_STRING =
		'Serwer nie mógł przetworzyć tej operacji, możliwy błąd w uzupełnionych danych';

	let computerInfo = {};
	let parts = [];
	let isOpen = true;

	back
		.get(`/computers/${sellData.computer_id}`)
		.then((res) => {
			computerInfo = res.data;
			parts = res.data.parts;
		})
		.catch((err) => {
			console.log(err);
			addNotif('error', 'Problem z pobieraniem po stronie serwera', SERVER_ERROR_STRING);
		});

	let totalValue = 0;
	$: {
		totalValue = parseInt(sellData.sell_price) * parseInt(sellData.quantity);
	}
</script>

<article class="sellChunk" class:closedDetails={!isOpen}>
	<div class="topPart">
		<h1>
			{#if sellData.sell_price && sellData.quantity}
				<img src="/static/icons/ReadyToSell.svg" />
			{:else}
				<img src="/static/icons/NotYetToSell.svg" />
			{/if}
			{computerInfo.computer_name}
		</h1>
		<div class="rightSideTop">
			<h2 class="totalValue" class:visible={totalValue}>
				Wartość sprzedaży {totalValue} PLN
			</h2>
			<button type="button" class:rotatedButton={isOpen} on:click={() => (isOpen = !isOpen)}>
				<img src="/static/icons/UnravelTriangle.svg" />
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
		</div>

		<div class="sellnPartInfo">
			<div>
				<h3>Dane o sprzedaży</h3>
				<ul>
					<li>- Łączna wartość komputera: <b>{computerInfo.computer_value}</b> PLN</li>
					<li>
						- Zysk ze sprzedaży: <b>{sellData.sell_price - computerInfo.computer_value}</b> PLN
					</li>
				</ul>
			</div>
			<div>
				<h3>Dane o komputerze</h3>
				<ul>
					{#each parts as part}
						<li>- {part.segment_name}: <span>{part.part_name}</span> / <b>{part.price}</b> PLN</li>
					{/each}
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
		margin-bottom: 28px;
	}
	.sellnPartInfo {
		margin: 0 28px;
		background: #f3f3f3;
		border-radius: 0px 0 10px 10px;
		padding: 15px 26px;
		display: flex;
		transition: 0.3s padding;
		h3 {
			font-size: 22px;
			font-weight: 700;
			color: #c625ff;
			margin-bottom: 5px;
		}
		& > div {
			width: 47.5%;
			&:nth-child(1) {
				margin-right: 5%;
				border-right: 2px solid #c625ff;
			}
		}
		li {
			span {
				color: #7b00a6;
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
