<script>
	import TableUniversal from '$shared/table/TableUniversal.svelte';
	import createFetchClient from '$functions/fetchClient.js';
	import inventoryLabels from '/config/labels/inventoryLabels.js';
	import { onDestroy } from 'svelte';
	import AddInventoryButton from '$shared/buttons/add/AddInventoryButton.svelte';
	import SellInventoryButton from '$shared/buttons/sell/SellInventoryButton.svelte';
	import AssembleComputerButton from '$shared/buttons/assemble/AssembleComputerButton.svelte';
	import ShowFields from '$shared/showFields/ShowFields.svelte';
	import SearchField from '$shared/searchField/SearchField.svelte';

	const client = createFetchClient(inventoryLabels, '/inventory');

	$: results = client.results;
	$: labels = client.labels;

	onDestroy(() => {
		client.resetResults();
	});
</script>

<div class="mainHolder">
	<section class="upTools">
		<AddInventoryButton />
		<SellInventoryButton />
		<AssembleComputerButton />
		<div class="innerTools">
			<SearchField />
		</div>
	</section>
	<TableUniversal
		labels={$labels}
		sortValue={client.sortValue}
		sortHandler={client.sortBy}
		results={$results}
		fetcherFunc={client.fetchInventory}
	/>
</div>

<style lang="scss">
	.mainHolder {
		width: 88%;
		margin: 40px auto;
		--loaderColor: var(--mBlue);
	}
	.upTools {
		display: flex;
		margin-bottom: 25px;
		:global(.uniModalOpenButton) {
			margin-right: 25px;
		}
	}
	.innerTools {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
