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
	export let resetFunc = () => {};
	let currentPage = 1;

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
						fetcherFunc(currentPage)
							.then(() => console.log(`fetched new page ${currentPage}`))
							.catch((err) => {
								console.log(err);
								observer.unobserve(entry.target);
								loading = false;
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
		fetcherFunc(currentPage);
		//to add fetching new data
	});

	onDestroy(unsubscribe);
</script>

<div class="mainTable">
	{#if (results.length !== 0 || undefined) && !noLabels}
		{#each results as result}
			<TableCell {result} {labels} />
		{/each}
	{:else}
		<div class="noResultsLoadWrap absCenter">
			<h6>
				{noLabels ? 'Wybierz pola widoku aby zobaczyć dane...' : 'Pobieram dane...'}
			</h6>
			<Loader />
		</div>
	{/if}
	<div bind:this={fetchTrigger} class={`fetchTrigger ${loading ? 'visible' : ''}`}>
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
		width: 80px;
		position: relative;
		height: 80px;
		margin: auto;
		opacity: 0;
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
