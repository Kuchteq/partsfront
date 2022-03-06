<script>
  import GraphSpace from "$lib/viewreports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewreports/SectionWrap.svelte";
  import { _ } from "/config/i18n.js";
  export let data;
  export let elemColors = [
    "#00cc99",
    "#00ffbf",
    "#4dffd2",
    "#33ff99",
    "#80ffbf",
    "#00cc66"
  ];
  const yItemsAmount = data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.items_amount)
  const xItemsAmountLabels =  data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.name)
  const yItemsValue = data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.items_value)
  const xItemsValueLabels =  data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.name)
  const yProfitPercentage =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.profit_percentage)
  const xProfitPercentageLabels =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.name)
  const yProfit =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.profit)
  const xProfitLabels =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.name)
</script>

<SectionWrap title={$_("on_clients.header")} c="wrap3">
  <GraphSpace
    title={$_("on_clients.amount")}
    x={xItemsAmountLabels}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_clients.value")}
    x={xItemsValueLabels}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_clients.profit_percentage")}
    x={xProfitPercentageLabels}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_clients.profit")}
    x={xProfitLabels}
    y={yProfit}
    {elemColors}
    suffix={" PLN"}
  />
</SectionWrap>

<style>
  :global(.wrap3) {
    background-color: #f2fcfb;
    --hColor: #009889;
  }
</style>
