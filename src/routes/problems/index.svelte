<script context="module">
  import authWatch from "$functions/authWatch.js";

  export async function load({ session }) {
    return await authWatch({ session });
  }
</script>

<script>
  import TableUniversal from "$shared/table/TableUniversal.svelte";
  import createFetchClient from "$functions/fetchClient.js";
  import problemsLabels from "/config/labels/problemsLabels.js";
  import UniModalOpenButton from "$shared/buttons/uni/UniModalOpenButton.svelte";
  import ShowFields from "$shared/showFields/ShowFields.svelte";
  import SearchField from "$shared/searchField/SearchField.svelte";
  import { openModal } from "$functions/modalManager";
  import { createQueryStore } from "$functions/URLSearchParamsStore";
  import BackFromModule from "$shared/backFromModule/backFromModule.svelte";
  import { _ } from "/config/i18n.js";

  const moduleName = "problems";
  const showIcons = [
    "id",
    "name",
    "computer_id",
    "note",
    "date",
    "deadline",
    "client_name"
  ];
  let onCellDoubleClick = (val) => {
    openModal("problemsUpdate", val);
  };
  //some boilerplate
  const [sortQuery, sQuery] = [createQueryStore("sort"), createQueryStore("s")];

  const client = createFetchClient(problemsLabels, "/problems");
  $: results = client.results;
  $: labels = client.labels;
  $: highlightedCell = client.highlighted;
</script>

<div class="moduleMainHolder">
  <section class="upTools">
    <UniModalOpenButton
      theme={moduleName}
      text={$_("modals_btns.add_problem")}
      modal="problems"
    />
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
    fetcherFunc={client.fetchInventory}
    resetFunc={client.resetResults}
    highlightedCell={$highlightedCell}
    {onCellDoubleClick}
    {sQuery}
    {sortQuery}
  />
</div>
<BackFromModule name={$_("modules.problems")} />

<style lang="scss">
  .moduleMainHolder {
    //theme color customization
    --moduleThemeColor: var(--mOrange);
    --loaderColor: var(--moduleThemeColor);
    --moduleThemeLighter: #ff742c;
    --moduleThemeGradient: var(--graOrange);
    //optional for table top part

    --topPartBg: rgb(251, 143, 90);
    --topPartTurnedOff: rgb(255, 165, 120);
  }
  :global(.problems-open-button) {
    --buttonBg: var(--graOrange);
    --buttonIcon: url("/icons/AddProblem.svg");
  }
</style>
