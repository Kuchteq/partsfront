<!-- {results, labels, onCellSingleClick, onCellDoubleClick}

            {results.map(result=>
            <TableCell result = {result} labels = {labels} onSingleClick = {onCellSingleClick} onDoubleClick = {onCellDoubleClick}/>)} -->
<script>
	import TableCell from '$shared/table/cell/TableCell.svelte';
	import Loader from '$shared/loader/Loader.svelte';
	import { onDestroy, onMount } from 'svelte';
	import refetchStatus from '$functions/triggerRefetch';
	import { toQueryDate, monthBack, formatDate } from '$functions/dateHandler';
	export let results = [];
	export let labels = [];
	export let fetcherFunc;
	export let highlightedCell;
	export let onCellDoubleClick;
	export let selectedCells;
	export let sQuery;
	export let sortQuery;
	export let date;
	export let resetFunc = () => {};
	let initiallyLoaded = false;
	let noLabels = false;
	let currentDate = date;
	let dateStack = [];
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
						currentDate = monthBack(currentDate);
						dateStack.push(formatDate(currentDate));
						fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery)
							.then(() => console.log(`fetched new month ${currentDate}`))
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
		currentDate = date;
		dateStack.push(formatDate(currentDate));
		fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery)
			.then(() => {
				currentDate = monthBack(currentDate);
				dateStack.push(formatDate(currentDate));
				fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery).then(() => {
					currentDate = monthBack(currentDate);
					dateStack.push(formatDate(currentDate));
					fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery).then(() => {
						initiallyLoaded = true;
					});
				});
			})
			.catch((e) => {
				console.log(e);
				loading = false;
				initiallyLoaded = false;
			});

		//to add fetching new data
	});

	onDestroy(unsubscribe);
</script>

<div class="mainTable">
	{#if (results.length !== 0 || undefined) && !noLabels}
		{#each results as monthResult, d}
			<div class="singleMonth">
				<h1 class="monthHeader">
					{dateStack[d]}
					{#if monthResult.length > 0}
						<button type="button" class="localReportButton" />
					{/if}
				</h1>
				{#if monthResult.length > 0}
					{#each monthResult as result}
						<TableCell
							{result}
							{labels}
							highlighted={highlightedCell}
							onDoubleClick={onCellDoubleClick}
							{selectedCells}
						/>
					{/each}
				{:else}
					<div class="noMoreInMonth">
						<img src="/icons/NoMoreItems.svg" />
						<h3>Brak sprzedaży w tym miesiącu</h3>
					</div>
				{/if}
			</div>
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
	.singleMonth {
		min-height: 35vh;
		margin-bottom: 5vh;
		background-color: #fffce9;
		box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.14);
		position: relative;
		:global(ul) {
			width: 98.5%;
			margin-left: auto;
			margin-right: auto;
		}
		.localReportButton {
			width: 28px;
			height: 28px;
			border-radius: 20px;
			display: block;
			margin-left: 10px;
			background-color: #fffce9;
			background-image: url('/icons/MakeRaportBlack.svg');
			background-size: 70%;
			background-repeat: no-repeat;
			background-position: center;
			box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
			transition: var(--sTrans);
			&:hover {
				box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
			}
		}
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
	.noMoreInMonth {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 8vh;
		img {
			width: 60px;
		}
		h3 {
			font-size: 20px;
		}
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
	.monthHeader {
		font-size: 22px;
		font-weight: 600;
		margin-left: 8px;
		padding-top: 8px;
		display: flex;
	}
</style>
