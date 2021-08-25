<script>
	import TableUniversal from '$shared/table/TableUniversal.svelte';
	import createFetchClient from '$functions/fetchClient.js';
	import clientsLabels from '/config/labels/clientsLabels.js';
	import UniModalOpenButton from '$shared/buttons/uni/UniModalOpenButton.svelte';
	import ShowFields from '$shared/showFields/ShowFields.svelte';
	import SearchField from '$shared/searchField/SearchField.svelte';

	const moduleName = 'clients';
	const showIcons = [
		'id',
		'name',
		'join_date',
		'email',
		'phone',
		'address',
		'nip',
		'note',
		'purchase',
		'last_purchase'
	];
	const client = createFetchClient(clientsLabels, '/clients');

	$: results = client.results;
	$: labels = client.labels;
</script>

<div class="moduleMainHolder">
	<section class="upTools">
		<UniModalOpenButton theme={moduleName} text={'Dodaj klienta'} modal="clients" />
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
	/>
</div>

<style lang="scss">
	.moduleMainHolder {
		//theme color customization
		--moduleThemeColor: var(--mClients);
		--loaderColor: var(--moduleThemeColor);
		--moduleThemeLighter: #00d2bd;
		--moduleThemeGradient: var(--graClients);
		//optional for table top part

		--topPartBg: #00ebd3;
		--topPartTurnedOff: #00d2bd;
	}
	:global(.clients-open-button) {
		--buttonBg: linear-gradient(231deg, #00bb88 0%, #00b259 100%);
		--buttonIcon: url('static/icons/AddClient.svg');
	}
</style>
