<script>
	import { addNotif } from '$functions/PopupClient.js';
	import PriceField from '$shared/fields/PriceField.svelte';
	import IntegerField from '$shared/fields/IntegerField.svelte';
	import accordion from '$functions/accordion';
	import back from '$axios';
	import { setPartSelection } from '$functions/selectionManager';
	import { onDestroy, onMount } from 'svelte';

	export let part;
	export let sellFunc;
	export let chunkId;

	let totalValue = 0;
	$: {
		console.log(part.info);
		totalValue = parseInt(part.sell_price) * parseInt(part.quantity);
	}
	const loadingString = 'Pobieram Dane';
	let isOpen = true;
</script>

<article class="sellChunk" class:closedDetails={!isOpen}>
	<button
		type="button"
		class="generalGarbageButton removeFromOrder"
		on:click={() => setPartSelection(part.info.part_id)}
	/>
	<div class="topPart">
		<h1>
			{#if part.sell_price && part.quantity}
				<img src="/icons/ReadyToSell.svg" />
			{:else}
				<img src="/icons/NotYetToSell.svg" />
			{/if}
			{part.info ? part.info.part_name : loadingString}
		</h1>
		<div class="rightSideTop">
			<h2 class="totalValue" class:visible={totalValue}>
				Wartość sprzedaży {totalValue} PLN
			</h2>
			<button type="button" class:rotatedButton={isOpen} on:click={() => (isOpen = !isOpen)}>
				<img src="/icons/UnravelTriangle.svg" />
			</button>
		</div>
	</div>
	<div use:accordion={isOpen}>
		<div class="fillPartSellData">
			<PriceField
				label={'Cena netto'}
				initValue={part.sell_price}
				update={(id, val) => sellFunc(chunkId, val, 'sell_price')}
				required={true}
				multiplier={1.23}
				multiText={'Wartość brutto: '}
				error={part.error == 1 || undefined}
			/>
			<IntegerField
				label={'Ilość do sprzedania'}
				update={(id, val) => sellFunc(chunkId, val, 'quantity')}
				initValue={part.quantity}
				required={true}
				boundries={{ min: 1, max: 12 } || undefined}
				error={part.error == 2 || undefined}
			/>
		</div>

		<div class="sellnPartInfo">
			<div>
				<h3>Dane o sprzedaży</h3>
				<ul>
					<li>
						- Zysk na jednej części: <b
							>{part.info ? part.sell_price - part.info.price : loadingString}</b
						> PLN
					</li>
					<li>
						- Zysk na wszystkich: <b
							>{part.info ? (part.sell_price - part.info.price) * part.quantity : loadingString}</b
						> PLN
					</li>
				</ul>
			</div>
			<div>
				<h3>Dane o części</h3>
				{#if part.info}
					<ul>
						<li>- Dostępna ilość: <span>{part.info.stock}</span></li>
						<li>- Cena zakupu: <b>{part.info.price}</b> PLN</li>
						<li>- Dostawca: <span>{part.info.supplier_obj.label}</span></li>
						<li>- Data zakupu: <span>{part.info.part_name}</span></li>
						<li>- Segment: <span>{part.info.segment_obj.label}</span></li>
						<li>- Id: <span>{part.info.part_id}</span></li>
					</ul>
				{/if}
			</div>
		</div>
	</div>
</article>

<style lang="scss">
	.sellChunk {
		background-color: #fff;
		border-radius: 14px;
		margin-top: 25px;
		padding-bottom: 25px;
		transition: 0.1s padding;
		position: relative;
		box-shadow: 0px 0px 7px rgb(0 0 0 / 10%);
		&:hover {
			.removeFromOrder {
				opacity: 1;
			}
		}
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
	.removeFromOrder {
		top: 0%;
		left: 50%;
		transform: translate(0, -50%);
		opacity: 0;
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
			color: var(--mBlue);
			margin-bottom: 5px;
		}
		& > div {
			width: 47.5%;
			&:nth-child(1) {
				margin-right: 5%;
				border-right: 2px solid var(--mBlue);
			}
		}
		li {
			span {
				color: #0054b6;
			}
			b {
				font-weight: 700;
			}
		}
	}
	.totalValue {
		background-color: #f5f5f5;
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
			transition: var(--sTrans);
			img {
				width: 19px;
			}
			&:hover {
				filter: brightness(1.8);
			}
		}
	}
</style>