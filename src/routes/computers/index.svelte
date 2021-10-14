<script>
	import TableUniversal from '$shared/table/TableUniversal.svelte';
	import createFetchClient from '$functions/fetchClient.js';
	import computerLabels from '/config/labels/computerLabels.js';
	import AssembleComputerButton from '$shared/buttons/assemble/AssembleComputerButton.svelte';
	import ShowFields from '$shared/showFields/ShowFields.svelte';
	import SearchField from '$shared/searchField/SearchField.svelte';
	import { openModal } from '$functions/modalManager';
	import selectedComputers, {
		setComputerSelection,
		deselectAllComputers
	} from '$functions/cSelectionManager';
	import DeselectAllButton from '$shared/deselectAllButton/DeselectAllButton.svelte';

	const showIcons = ['id', 'name', 'cpu', 'motherboard', 'gpu', 'price', 'note', 'date'];
	const client = createFetchClient(computerLabels, '/computers');

	$: results = client.results;
	$: labels = client.labels;
	$: highlightedCell = client.highlighted;

	let onCellDoubleClick = (val) => {
		openModal('computersUpdate', val);
	};
	let onCellSingleClick = (val) => {
		setComputerSelection(val);
	};
</script>

<div class="moduleMainHolder">
	<section class="upTools">
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
		selectedCells={selectedComputers}
	/>
	{#if $selectedComputers.length != 0}
		<DeselectAllButton
			text="Odznacz: {$selectedComputers.length} przedmiotów"
			onClick={deselectAllComputers}
		/>
	{/if}
</div>

<style lang="scss">
	.moduleMainHolder {
		//theme color customization
		--moduleThemeColor: var(--mPurple);
		--loaderColor: var(--mPurple);
		--moduleThemeLighter: #b039ff;
		--moduleThemeGradient: var(--graPurple);

		//optional for table top part
		--topPartBg: rgb(194, 103, 255);
		--topPartTurnedOff: rgb(196, 111, 253);

		//colors when user hovered over some cell or selected it
		--hoverCell: rgb(240, 218, 255);
		--selectedCellColor: rgb(208, 137, 255);
	}
</style>
