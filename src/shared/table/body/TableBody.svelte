<!-- {results, labels, onCellSingleClick, onCellDoubleClick}

            {results.map(result=>
            <TableCell result = {result} labels = {labels} onSingleClick = {onCellSingleClick} onDoubleClick = {onCellDoubleClick}/>)} -->
<script>
	import TableCell from '../cell/TableCell.svelte';
	import Loader from '$shared/loader/Loader.svelte';
	import { onMount } from 'svelte';

	export let results = [];
	export let labels = [];
	export let fetcherFunc;

	let fetchTrigger;
	let currentPage = 1;
	let loading = false;
	fetcherFunc(currentPage);
	onMount(() => {
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
	});
</script>

<div class="mainTable">
	{#if results.length !== 0 || undefined}
		{#each results as result}
			<TableCell {result} {labels} />
		{/each}
	{:else}
		<Loader />
	{/if}
	<div bind:this={fetchTrigger} class={`fetchTrigger ${loading ? 'visible' : ''}`}>
		<Loader />
	</div>
</div>

<style>
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
</style>
