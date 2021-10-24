<script>
	import TableTopPart from './topPart/TableTopPart.svelte';
	import TableBody from './body/TableBody.svelte';
	import { refetch } from '$functions/triggerRefetch';

	export let labels;
	export let sortHandler;
	export let results;
	export let fetcherFunc;
	export let resetFunc;
	export let highlightedCell = undefined;
	export let onCellSingleClick = undefined;
	export let onCellDoubleClick = undefined;
	export let selectedCells = undefined;
	export let sQuery = '';
	export let sortQuery;
	$: {
		$sortQuery;
		$sQuery;
		refetch();
	}
</script>

<section>
	<TableTopPart {labels} {sortHandler} {sortQuery} />
	<TableBody
		{labels}
		{results}
		{fetcherFunc}
		{resetFunc}
		{highlightedCell}
		{onCellDoubleClick}
		{onCellSingleClick}
		{selectedCells}
		{sQuery}
		{sortQuery}
	/>
</section>
