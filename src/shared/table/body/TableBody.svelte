<script>
  //import the components
  import TableCell from "../cell/TableCell.svelte";
  import Loader from "$shared/loader/Loader.svelte";
  import { onDestroy, onMount } from "svelte";
  import refetchStatus from "$functions/triggerRefetch";
  import { _ } from "/config/i18n.js";

  //receive the props
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

  //define the state
  let currentPage = 1;
  let initiallyLoaded = false;
  let noLabels = false;
  let loading = false;
  let fetchTrigger;
  let ready = false;
  $: {
    //check if there are any labels shown
    if (labels.findIndex((label) => label.shown == true) == -1) {
      noLabels = true;
    } else {
      noLabels = false;
    }
  }

  /* page loader function is responsible for fetching new data once 
  the user scrolls to the bottom of the table*/
  const pageLoader = () => {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loading = true;
            currentPage += 1;
            fetcherFunc(currentPage, $sortQuery, $sQuery)
              .then(() => console.log(`fetched new page ${currentPage}`))
              .catch((err) => {
                console.log(err);
                loading = false;
                initiallyLoaded = false;
		ready = true;
              });
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(fetchTrigger);
  };
  //when the component is mounted, start the page loader
  onMount(() => {
    pageLoader();
  });

  //once the refetchStatus changes, run the reset function and refetch the data
  const unsubscribe = refetchStatus.subscribe(() => {
    ready = false;
    resetFunc();
    currentPage = 1;

    fetcherFunc(currentPage, $sortQuery, $sQuery)
      .then(() => {
        initiallyLoaded = true;
	ready = true;       
      })
      .catch((e) => {
        loading = false;
        initiallyLoaded = false;
      });
  });
  /*when the component is destroyed i.e. user leaves the site where 
  this table is present, unsubscribe from the refetchStatus */
  onDestroy(unsubscribe);
</script>

<div class="mainTable">
  {#if (results.length !== 0 || undefined) && !noLabels}
    <!-- For every result create TableCell component -->
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
        {noLabels ? $_("misc.select_fields") : $_("misc.fetching_data")}
      </h6>
      <Loader />
    </div>
  {/if}
<div class = '{ready ? '' : "bufferer"}'/>
  <div
    bind:this={fetchTrigger}
    class="fetchTrigger {loading ? 'visible' : ''} {initiallyLoaded
      ? 'initiallyLoaded'
      : 'beDowner'}"
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
.bufferer
{
	height:120vh;
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
