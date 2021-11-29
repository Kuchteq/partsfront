<script context="module">
	import authWatch from '$functions/authWatch.js';

	export async function load({ session }) {
		return await authWatch({ session });
	}
</script>

<script>
	import BackFromModule from '$shared/backFromModule/backFromModule.svelte';
	import TableUniversal from '$shared/table/TableUniversal.svelte';
	import createFetchClient from '$functions/fetchClient.js';
	import orderLabels from '/config/labels/orderLabels.js';
	import UniModalOpenButton from '$shared/buttons/uni/UniModalOpenButton.svelte';
	import ShowFields from '$shared/showFields/ShowFields.svelte';
	import SearchField from '$shared/searchField/SearchField.svelte';
	import { openModal } from '$functions/modalManager';
	import { createQueryStore } from '$functions/URLSearchParamsStore';
	import CustomTableBody from '$lib/raports/customTable/CustomTableBody.svelte';
	import TableTopPart from '$shared/table/topPart/TableTopPart.svelte';

	const moduleName = 'raports';
	const showIcons = ['id', 'client_name', 'name', 'items', 'stock', 'deadline', 'price', 'date'];
	let onCellDoubleClick = (val) => {
		openModal('problemsUpdate', val);
	};
	//some boilerplate
	const [sortQuery, sQuery] = [createQueryStore('sort'), createQueryStore('s')];

	const client = createFetchClient(orderLabels);

	const nowDate = { month: parseInt(new Date().getMonth()) + 1, year: new Date().getFullYear() };
	console.log(nowDate);
	$: results = client.results;
	$: labels = client.labels;
	$: highlightedCell = client.highlighted;
	$: console.log($results);
</script>

<div class="moduleMainHolder">
	<section class="upTools">
		<UniModalOpenButton theme={moduleName} text={'Dodaj raport'} modal="createRaports" />
		<div class="innerTools">
			<ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
			<SearchField />
		</div>
	</section>
	<TableTopPart labels={$labels} {sortQuery} />
	<CustomTableBody
		labels={$labels}
		sortValue={client.sortValue}
		sortHandler={client.sortBy}
		results={$results}
		fetcherFunc={client.fetchRecords}
		resetFunc={client.resetResults}
		highlightedCell={$highlightedCell}
		{onCellDoubleClick}
		date={nowDate}
		{sQuery}
		{sortQuery}
	/>
</div>

<BackFromModule name="Raporty" />

<style lang="scss">
	.moduleMainHolder {
		//theme color customization
		--moduleThemeColor: #edb413;
		--loaderColor: var(--moduleThemeColor);
		--moduleThemeLighter: #ffdb77;
		--moduleThemeGradient: var(--graGold);
		//optional for table top part

		--topPartBg: #f3c541;
		--topPartTurnedOff: var(--mGold);
	}
	:global(.raports-open-button) {
		--buttonBg: var(--graGold);
		--buttonIcon: url('/icons/MakeRaport.svg');
	}
</style>
