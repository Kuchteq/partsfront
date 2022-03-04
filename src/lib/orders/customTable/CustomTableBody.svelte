<!-- {results, labels, onCellSingleClick, onCellDoubleClick}

            {results.map(result=>
            <TableCell result = {result} labels = {labels} onSingleClick = {onCellSingleClick} onDoubleClick = {onCellDoubleClick}/>)} -->
<script>
  import TableCell from "$shared/table/cell/TableCell.svelte";
  import Loader from "$shared/loader/Loader.svelte";
  import { onDestroy, onMount } from "svelte";
  import refetchStatus, { refetch } from "$functions/triggerRefetch";
  import { toQueryDate, monthBack, formatDate } from "$functions/dateHandler";
  import { openModal } from "$functions/modalManager";
  import clone from "just-clone";
  import { _ } from "/config/i18n.js";
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
  let currentDate = clone(date);
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
  let ready = false;
  const pageLoader = () => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loading = true;
            currentDate = monthBack(currentDate);
            dateStack.push(currentDate);
            fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery)
              .then(() => console.log(`fetched new month ${currentDate}`))
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
  onMount(() => {
    pageLoader();
  });

  const unsubscribe = refetchStatus.subscribe(() => {
    ready = false;
    dateStack = [];
    currentDate = clone(date);
    dateStack.push(currentDate);
    resetFunc();
    fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery)
      .then(() => {
        currentDate = monthBack(currentDate);
        console.log(currentDate);
        dateStack.push(currentDate);
        fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery).then(() => {
          currentDate = monthBack(currentDate);
          console.log(currentDate);
          dateStack.push(currentDate);
          fetcherFunc(toQueryDate(currentDate), $sortQuery, $sQuery).then(
            () => {
              console.log(dateStack);
              ready = true;
              initiallyLoaded = true;
            }
          );
        });
      })
      .catch((e) => {
        loading = false;
        initiallyLoaded = false;
      });

    //to add fetching new data
  });

  onDestroy(unsubscribe);

  const handleMonthReport = (d) => {
    console.log(d);
    const year = date.year - parseInt(d / 12);
    let month =
      date.month - (d % 12) < 0
        ? date.month - (d % 12) + 12
        : date.month - (d % 12);
    month = month < 10 ? "0" + month : month;
    console.log(date.month);
    let dateFrom = `${year}-${month}-01`;
    const lastMonthDay = new Date(year, month, 0).getDate();
    let dateTo = `${year}-${month}-${lastMonthDay}`;
    openModal("createReports", { from: dateFrom, to: dateTo });
  };
</script>

<div class="mainTable">
  {#if (results.length !== 0 || undefined) && !noLabels}
    {#each results as monthResult, d}
      <div class="singleMonth">
        <h1 class="monthHeader">
          {formatDate(dateStack[d], $_)}
          {#if monthResult.length > 0}
            <button
              type="button"
              class="localReportButton"
              on:click={() => handleMonthReport(d)}
            />
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
            <h3>{$_("misc.no_sales")}</h3>
          </div>
        {/if}
      </div>
    {/each}
  {:else}
    <div class="noResultsLoadWrap absCenter">
      <h6>
        {noLabels ? $_("misc.select_fields") : $_("misc.fetching_data")}
      </h6>
      <Loader />
    </div>
  {/if}
  <div class={!ready ? "bufferer" : ""} />
  <div
    bind:this={fetchTrigger}
    class="fetchTrigger {loading ? 'visible' : ''} {initiallyLoaded
      ? 'initiallyLoaded'
      : ''}"
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
      background-image: url("/icons/MakeReportBlack.svg");
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
  .bufferer {
    height: 150vh;
  }
</style>
