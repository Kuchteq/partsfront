<script>
	import TableTopPart from './topPart/TableTopPart.svelte';
	import TableBody from './body/TableBody.svelte';

	export let labels;
	export let sortHandler;
	export let sortValue;
	export let results;
	export let fetcherFunc;
	export let resetFunc;
	export let highlightedCell = undefined;
	export let onCellSingleClick = undefined;
	export let onCellDoubleClick = undefined;
	export let selectedCells = undefined;
</script>

<section>
	<TableTopPart {labels} {sortHandler} {sortValue} />
	<TableBody
		{labels}
		{results}
		{fetcherFunc}
		{resetFunc}
		{highlightedCell}
		{onCellDoubleClick}
		{onCellSingleClick}
		{selectedCells}
	/>
</section>
