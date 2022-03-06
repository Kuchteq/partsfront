<script>
  import GraphSpace from "$lib/viewreports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewreports/SectionWrap.svelte";
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

console.log(data)
const yItemsAmount = data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.items_amount)
const xItemsAmountLabels =  data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.segment_name)
const yItemsValue = data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.items_value)
const xItemsValueLabels =  data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.segment_name)
const yProfitPercentage =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.profit_percentage)
const xProfitPercentageLabels =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.segment_name)
const yProfit =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.profit)
const xProfitLabels =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.segment_name)

</script>

<SectionWrap title={$_("on_segments.header")} c="wrap2">
  <GraphSpace
    title={$_("on_segments.amount")}
    x={xItemsAmountLabels}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_segments.value")}
    x={xItemsValueLabels}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_segments.profit_percentage")}
    x={xProfitPercentageLabels}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_segments.profit")}
    x={xProfitLabels}
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

