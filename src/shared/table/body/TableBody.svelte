<!-- {results, labels, onCellSingleClick, onCellDoubleClick}

            {results.map(result=>
            <TableCell result = {result} labels = {labels} onSingleClick = {onCellSingleClick} onDoubleClick = {onCellDoubleClick}/>)} -->
<script>
	import TableCell from '../cell/TableCell.svelte';
	import Loader from '$shared/loader/Loader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import refetchStatus from '$functions/triggerRefetch';

	export let results = [];
	export let labels = [];
	export let fetcherFunc;
	export let highlightedCell;
	export let onCellSingleClick;
	export let onCellDoubleClick;
	export let selectedCells;
	export let sQuery;
	export let sortQuery;

	export let resetFunc = () => {};
	let currentPage = 1;
	let initiallyLoaded = false;
	let noLabels = false;

	$: {
		//check if there are any labels shown
		if (labels.findIndex((label) => label.shown == true) == -1) {
			noLabels = true;
		} else {
			noLabels = false;
		}
	}
	let fetchTrigger;

	let loading = false;
	const pageLoader = () => {
		let observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						loading = true;
						currentPage += 1;
						console.log(currentPage);
						fetcherFunc(currentPage, $sortQuery, $sQuery)
							.then(() => console.log(`fetched new page ${currentPage}`))
							.catch((err) => {
								console.log(err);
								loading = false;
								initiallyLoaded = false;
							});
					}
				});
			},
			{ threshold: 0 }
		);
		observer.observe(fetchTrigger);
	};
	onMount(() => {
		pageLoader();
	});

	const unsubscribe = refetchStatus.subscribe(() => {
		resetFunc();
		currentPage = 1;

		fetcherFunc(currentPage, $sortQuery, $sQuery)
			.then(() => {
				initiallyLoaded = true;
			})
			.catch((e) => {
				loading = false;
				initiallyLoaded = false;
			});

		//to add fetching new data
	});

	onDestroy(unsubscribe);
</script>

<div class="mainTable">
	{#if (results.length !== 0 || undefined) && !noLabels}
		{#each results as result}
			<TableCell
				{result}
				{labels}
				highlighted={highlightedCell}
				onDoubleClick={onCellDoubleClick}
				onSingleClick={onCellSingleClick}
				{selectedCells}
			/>
		{/each}
	{:else}
		<div class="noResultsLoadWrap absCenter">
			<h6>
				{noLabels ? 'Wybierz pola widoku aby zobaczyć dane...' : 'Pobieram dane...'}
			</h6>
			<Loader />
		</div>
	{/if}
	<div
		bind:this={fetchTrigger}
		class="fetchTrigger {loading ? 'visible' : ''} {initiallyLoaded ? 'initiallyLoaded' : ''}"
	>
		<Loader />
	</div>
</div>

<style lang="scss">
	.mainTable {
		display: block;
		position: relative;
		min-height: 80vh;
	}
	.fetchTrigger {
		display: none;
		width: 80px;
		position: relative;
		height: 80px;
		margin: auto;
		opacity: 1;
	}
	.initiallyLoaded {
		display: block;
	}
	.visible {
		opacity: 1;
	}
	.noResultsLoadWrap {
		h6 {
			font-size: 18px;
			margin-bottom: 25px;
		}
		:global(.uLoader) {
			position: relative;
		}
	}
</style>
