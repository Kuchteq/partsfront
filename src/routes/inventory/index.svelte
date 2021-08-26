<script>
	import TableUniversal from '$shared/table/TableUniversal.svelte';
	import createFetchClient from '$functions/fetchClient.js';
	import inventoryLabels from '/config/labels/inventoryLabels.js';
	import AddInventoryButton from '$shared/buttons/add/AddInventoryButton.svelte';
	import SellInventoryButton from '$shared/buttons/sell/SellInventoryButton.svelte';
	import AssembleComputerButton from '$shared/buttons/assemble/AssembleComputerButton.svelte';
	import ShowFields from '$shared/showFields/ShowFields.svelte';
	import SearchField from '$shared/searchField/SearchField.svelte';
	import { openModal } from '$functions/modalManager';
	import selectedParts, { setSelection, deselectAll } from '$functions/selectionManager';
	import DeselectAllButton from '$shared/deselectAllButton/DeselectAllButton.svelte';

	const showIcons = ['id', 'segment', 'name', 'stock', 'price', 'note', 'supplier', 'date'];
	const client = createFetchClient(inventoryLabels, '/inventory');

	$: results = client.results;
	$: labels = client.labels;
	$: highlightedCell = client.highlighted;

	let onCellDoubleClick = (val) => {
		openModal('inventoryUpdate', val);
	};
	let onCellSingleClick = (val) => {
		setSelection(val);
	};
</script>

<div class="moduleMainHolder">
	<section class="upTools">
		<AddInventoryButton />
		<SellInventoryButton />
		<AssembleComputerButton />
		<div class="innerTools">
			<ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
			<SearchField />
		</div>
	</section>
	<TableUniversal
		labels={$labels}
		sortValue={client.sortValue}
		sortHandler={client.sortBy}
		results={$results}
		fetcherFunc={client.fetchInventory}
		resetFunc={client.resetResults}
		highlightedCell={$highlightedCell}
		{onCellDoubleClick}
		{onCellSingleClick}
		selectedCells={selectedParts}
	/>
	{#if $selectedParts.length != 0}
		<DeselectAllButton text="Odznacz: {$selectedParts.length} przedmiotów" onClick={deselectAll} />
	{/if}
</div>

<style lang="scss">
	.moduleMainHolder {
		//theme color customization
		--moduleThemeColor: var(--mBlue);
		--loaderColor: var(--mBlue);
		--moduleThemeLighter: #268bff;
		--moduleThemeGradient: var(--graBlue);

		//optional for table top part
		--topPartBg: #6db1ff;
		--topPartTurnedOff: var(--mLightBlue);

		//colors when user hovered over some cell or selected it
		--hoverCell: rgb(223, 237, 253);
		--selectedCellColor: rgb(130, 187, 251);
	}
</style>
