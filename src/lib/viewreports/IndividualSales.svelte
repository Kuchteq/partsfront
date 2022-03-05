<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import selectedParts, { setPartSelection } from "$functions/selectionManager";
  import orderLabels from "/config/labels/orderLabels.js";
  import { writable } from "svelte/store";
  export let source;

  const showIcons = [
    "id",
    "segment",
    "name",
    "stock",
    "price",
    "note",
    "supplier",
    "date"
  ];
  let sortQuery = writable({ by: undefined, dir: undefined });
  let sQuery = writable("");

  const client = new createFetchClient(orderLabels, source);

  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;

  let onCellDoubleClick = (val) => {
    openModal("orderUpdate", val);
  };
  let onCellSingleClick = (val) => {
    setPartSelection(val);
  };
</script>

<div class="moduleMainHolder">
  <div class="innerTools">
    <ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
    <SearchField {sQuery} />
  </div>
  <TableUniversal
    labels={$labels}
    sortHandler={client.sortByLocal}
    results={$results}
    fetcherFunc={client.fetchPage}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {sQuery}
    {sortQuery}
    {onCellDoubleClick}
    {onCellSingleClick}
    selectedCells={selectedParts}
  />
</div>

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
  :global(.reports-open-button) {
    --buttonBg: var(--graGold);
    --buttonIcon: url("/icons/MakeReport.svg");
  }
  .innerTools {
    margin-bottom: 25px;
    width: fit-content;
    gap: 6px;
  }
</style>
