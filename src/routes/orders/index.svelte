<script context="module">
  import authWatch from "$functions/authWatch.js";

  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import SellInventoryButton from "$shared/buttons/sell/SellInventoryButton.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import orderLabels from "/config/labels/orderLabels.js";
  import UniModalOpenButton from "$shared/buttons/uni/UniModalOpenButton.svelte";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import CustomTableBody from "$lib/orders/customTable/CustomTableBody.svelte";
  import TableTopPart from "$shared/table/topPart/TableTopPart.svelte";
  import { refetch } from "$functions/triggerRefetch";
  import { _ } from "/config/i18n.js";
  const moduleName = "orders";
  const showIcons = [
    "id",
    "client_name",
    "name",
    "items",
    "stock",
    "deadline",
    "price",
    "date"
  ];
  let onCellDoubleClick = (val) => {
    openModal("orderUpdate", val);
  };
  //some boilerplate
  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];

  const client = createFetchClient(orderLabels);

  const nowDate = {
    month: parseInt(new Date().getMonth()) + 1,
    year: new Date().getFullYear()
  };
  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;
  $: {
    $sortQuery;
    $sQuery;
    refetch();
  }
  let y;
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
  <title>{$_("modules.orders")}</title>
</svelte:head>
<div class="moduleMainHolder">
  <section class="upTools">
    <UniModalOpenButton
      theme={moduleName}
      text={$_("modals_btns.make_report")}
      modal="createReports"
    />
    <SellInventoryButton />
    <div class="innerTools ">
      <ShowFields
        classOptio={y > 150 ? "rightFx" : ""}
        icons={showIcons}
        {labels}
        handleHide={client.handleHide}
      />
      <SearchField {sQuery} />
    </div>
  </section>
  <TableTopPart labels={$labels} {sortQuery} sortHandler={client.sortBy} />
  <CustomTableBody
    labels={$labels}
    sortValue={client.sortValue}
    sortHandler={client.sortBy}
    results={$results}
    fetcherFunc={client.fetchRecords}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {onCellDoubleClick}
    date={nowDate}
    {sQuery}
    {sortQuery}
  />
</div>

<BackFromModule name={$_("modules.orders")} />

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
  :global(.orders-open-button) {
    --buttonBg: var(--graGold);
    --buttonIcon: url("/icons/MakeReport.svg");
  }
</style>
