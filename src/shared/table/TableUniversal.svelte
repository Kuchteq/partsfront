<script>
  //import the components
  import TableTopPart from "./topPart/TableTopPart.svelte";
  import TableBody from "./body/TableBody.svelte";
  import { refetch } from "$functions/triggerRefetch";

  /*receive the props, this is the data that is passed to the component
	  if the data is not passed, it will be undefined, these are the optional props */
  export let labels;
  export let sortHandler;
  export let results;
  export let fetcherFunc;
  export let resetFunc;
  export let highlightedCell = undefined;
  export let onCellSingleClick = undefined;
  export let onCellDoubleClick = undefined;
  export let selectedCells = undefined;
  export let sQuery = "";
  export let sortQuery;

  /*the dollar sign is a special character in svelte that runs a specified function when some
state gets change - for instance if the sortQuery or sQuery - searchQuery is changed, refetch the data,*/
  $: {
    $sortQuery;
    $sQuery;
    refetch();
  }
</script>

<section>
  <!-- Pass the props to the child components -->
  <TableTopPart {labels} {sortHandler} {sortQuery} />
  <TableBody
    {labels}
    {results}
    {fetcherFunc}
    {resetFunc}
    {highlightedCell}
    {onCellDoubleClick}
    {onCellSingleClick}
    {selectedCells}
    {sQuery}
    {sortQuery}
  />
</section>
