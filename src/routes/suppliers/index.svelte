<script context="module">
  import authWatch from "$functions/authWatch.js";

  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import suppliersLabels from "/config/labels/suppliersLabels.js";
  import UniModalOpenButton from "$shared/buttons/uni/UniModalOpenButton.svelte";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import { _ } from "/config/i18n.js";

  const moduleName = "suppliers";
  const showIcons = [
    "id",
    "name",
    "join_date",
    "website",
    "phone",
    "email",
    "address",
    "nip",
    "note",
    "purchase",
    "last_purchase"
  ];
  let onCellDoubleClick = (val) => {
    openModal("suppliersUpdate", val);
  };
  //some boilerplate
  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];

  const client = createFetchClient(suppliersLabels, "/suppliers");
  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;
</script>

<div class="moduleMainHolder">
  <section class="upTools">
    <UniModalOpenButton
      theme={moduleName}
      text={$_("modals_btns.add_supplier")}
      modal="suppliers"
    />
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
    {onCellDoubleClick}
    {sQuery}
    {sortQuery}
  />
</div>
<BackFromModule name={$_("modules.suppliers")} />

<style lang="scss">
  .moduleMainHolder {
    //theme color customization
    --moduleThemeColor: var(--mSuppliers);
    --loaderColor: var(--moduleThemeColor);
    --moduleThemeLighter: #00d2bd;
    --moduleThemeGradient: var(--graSuppliers);
    //optional for table top part

    --topPartBg: #32cfff;
    --topPartTurnedOff: #53d7ff;
  }
  :global(.suppliers-open-button) {
    --buttonBg: var(--graSuppliers);
    --buttonIcon: url("/icons/AddClient.svg");
  }
</style>
