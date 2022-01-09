<script>
  import GraphSpace from "$lib/viewraports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewraports/SectionWrap.svelte";
  export let data;
  export let elemColors = [
    "#005fcc",
    "#0077ff",
    "#3392ff",
    "#3366ff",
    "#0080ff",
    "#0059b3"
  ];
  import { _ } from "/config/i18n.js";
  const segmentsName = data.map((sales) => sales.segment_name);
  const yItemsAmount = data.map((sales) => sales.items_amount);
  const yItemsValue = data.map((sales) => sales.items_value);
  const yProfitPercentage = data.map((sales) => sales.profit_percentage);
  const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title={$_("on_segments.header")} c="wrap2">
  <GraphSpace
    title={$_("on_segments.amount")}
    x={segmentsName}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_segments.value")}
    x={segmentsName}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_segments.profit_percentage")}
    x={segmentsName}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_segments.profit")}
    x={segmentsName}
    y={yProfit}
    {elemColors}
    suffix={" PLN"}
  />
</SectionWrap>

<style>
  :global(.wrap2) {
    background-color: #ebf4ff;
    --gBg: #d9ebff;
    --hColor: var(--mBlue);
  }
</style>
