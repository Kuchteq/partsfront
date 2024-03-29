<script context="module">
  import authWatch from "$functions/authWatch.js";

  export const prerender = false;
  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import inventoryLabels from "/config/labels/inventoryLabels.js";
  import AddInventoryButton from "$shared/buttons/add/AddInventoryButton.svelte";
  import SellInventoryButton from "$shared/buttons/sell/SellInventoryButton.svelte";
  import AssembleComputerButton from "$shared/buttons/assemble/AssembleComputerButton.svelte";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import selectedParts, {
    setPartSelection,
    deselectAllParts
  } from "$functions/selectionManager";
  import DeselectAllButton from "$shared/deselectAllButton/DeselectAllButton.svelte";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import { _ } from "/config/i18n.js";

  const showIcons = [
    "id",
    "segment",
    "name",
    "stock",
    "price",
    "note",
    "supplier",
    "suggested_price",
    "date"
  ];
  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];
  const client = new createFetchClient(inventoryLabels, "/inventory");
  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;
  $: past = client.past;

  let onCellDoubleClick = (val) => {
    openModal("inventoryUpdate", val);
  };
  let onCellSingleClick = (val) => {
    if (val.stock > 0) setPartSelection(val.part_id);
  };
</script>

<svelte:head>
  <title>{$_("modules.inventory")}</title>
</svelte:head>
<div class="moduleMainHolder">
  <section class="upTools">
    <AddInventoryButton />
    <SellInventoryButton />
    <AssembleComputerButton />
    <div class="innerTools">
      <ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
      <SearchField {sQuery} />
    </div>
    <div class="smallTools">
      <button
        class="pastToggler {$past ? 'visibToggled' : ''}"
        on:click={() => client.togglePast()}
      />
    </div>
  </section>
  <TableUniversal
    labels={$labels}
    sortHandler={client.sortBy}
    results={$results}
    fetcherFunc={client.fetchPage}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {sQuery}
    {sortQuery}
    {onCellDoubleClick}
    {onCellSingleClick}
    past={client.past}
    selectedCells={selectedParts}
  />
  {#if $selectedParts.length != 0}
    <DeselectAllButton
      text={$_("misc.deselect", {
        values: { amount: $selectedParts.length }
      })}
      onClick={deselectAllParts}
    />
  {/if}
</div>
<BackFromModule name={$_("modules.inventory")} />

<style lang="scss">
  .moduleMainHolder {
    //theme color customization
    --moduleThemeColor: var(--mBlue);
    --loaderColor: var(--mBlue);
    --moduleThemeLighter: #268bff;
    --moduleThemeGradient: var(--graBlue);

    //optional for table top part
    --topPartBg: #6db1ff;
    --topPartTurnedOff: var(--mLightBlue);

    //colors when user hovered over some cell or selected it
    --hoverCell: rgb(223, 237, 253);
    --selectedCellColor: rgb(130, 187, 251);
  }
</style>
