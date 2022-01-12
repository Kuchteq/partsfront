<script context="module">
  import authWatch from "$functions/authWatch.js";

  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import computerLabels from "/config/labels/computerLabels.js";
  import AssembleComputerButton from "$shared/buttons/assemble/AssembleComputerButton.svelte";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import selectedComputers, {
    setComputerSelection,
    deselectAllComputers
  } from "$functions/cSelectionManager";
  import DeselectAllButton from "$shared/deselectAllButton/DeselectAllButton.svelte";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import SellInventoryButton from "$shared/buttons/sell/SellInventoryButton.svelte";
  import { _ } from "/config/i18n.js";

  const showIcons = [
    "id",
    "name",
    "cpu",
    "motherboard",
    "gpu",
    "price",
    "note",
    "date"
  ];
  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];
  const client = createFetchClient(computerLabels, "/computers");

  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;

  let onCellDoubleClick = (val) => {
    openModal("computersUpdate", val);
  };
  let onCellSingleClick = (val) => {
    setComputerSelection(val);
  };
</script>

<div class="moduleMainHolder">
  <section class="upTools">
    <AssembleComputerButton />
    <SellInventoryButton />
    <div class="innerTools">
      <ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
      <SearchField {sQuery} />
    </div>
  </section>
  <TableUniversal
    labels={$labels}
    sortHandler={client.sortBy}
    results={$results}
    fetcherFunc={client.fetchInventory}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {sQuery}
    {sortQuery}
    {onCellDoubleClick}
    {onCellSingleClick}
    selectedCells={selectedComputers}
  />
  {#if $selectedComputers.length != 0}
    <DeselectAllButton
      text={$_("misc.deselect", {
        values: { amount: $selectedComputers.length }
      })}
      onClick={deselectAllComputers}
    />
  {/if}
</div>
<BackFromModule name={$_("modules.sets")} />

<style lang="scss">
  .moduleMainHolder {
    //theme color customization
    --moduleThemeColor: var(--mPurple);
    --loaderColor: var(--mPurple);
    --moduleThemeLighter: #b039ff;
    --moduleThemeGradient: var(--graPurple);

    //optional for table top part
    --topPartBg: rgb(194, 103, 255);
    --topPartTurnedOff: rgb(196, 111, 253);

    //colors when user hovered over some cell or selected it
    --hoverCell: rgb(240, 218, 255);
    --selectedCellColor: rgb(208, 137, 255);
  }
</style>
