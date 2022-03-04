<script context="module">
  import authWatch from "$functions/authWatch.js";

  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import historyLabels from "/config/labels/historyLabels.js";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import { _ } from "/config/i18n.js";

  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];

  const showIcons = ["id", "segment", "note", "date"];
  const client = createFetchClient(historyLabels, "/history");

  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;
</script>

<div class="moduleMainHolder">
  <section class="upTools">
    <div class="innerTools">
      <ShowFields icons={showIcons} {labels} handleHide={client.handleHide} />
      <SearchField {sQuery} />
    </div>
  </section>
  <TableUniversal
    labels={$labels}
    sortValue={client.sortValue}
    sortHandler={client.sortBy}
    results={$results}
    fetcherFunc={client.fetchPage}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {sQuery}
    {sortQuery}
  />
</div>
<BackFromModule name={$_("modules.history")} />

<style lang="scss">
  .moduleMainHolder {
    //theme color customization
    --moduleThemeColor: var(--mGray);
    --loaderColor: var(--moduleThemeColor);
    --moduleThemeLighter: rgb(180, 180, 180);
    --moduleThemeGradient: var(--graHistory);
    //optional for table top part

    --topPartBg: rgb(170, 170, 170);
    --topPartTurnedOff: rgb(189, 189, 189);
  }
  :global(.clients-open-button) {
    --buttonBg: linear-gradient(231deg, #00bb88 0%, #00b259 100%);
    --buttonIcon: url("/icons/AddClient.svg");
  }
  .innerTools {
    gap: 10px;
  }
</style>
