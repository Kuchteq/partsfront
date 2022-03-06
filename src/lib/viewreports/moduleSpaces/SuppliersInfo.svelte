<script>
  import GraphSpace from "$lib/viewreports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewreports/SectionWrap.svelte";
  import { _ } from "/config/i18n.js";
  export let data;
  let elemColors = [
    "#0489ae",
    "#05c5fa",
    "#37d0fb",
    "#1ec3fa",
    "#0497c8",
    "#05e1e1"
  ];
  let elemColorsBuy = [
    "#0099ff",
    "#33adff",
    "#00ace6",
    "#33ccff",
    "#00bfff",
    "#4dd2ff"
  ];
const dataBuy = data.buy
  data = data.sales
const yItemsAmount = data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.items_amount)
const xItemsAmountLabels =  data.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.name)
const yItemsValue = data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.items_value)
const xItemsValueLabels =  data.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.name)
const yProfitPercentage =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.profit_percentage)
const xProfitPercentageLabels =  data.sort((a,b)=>parseFloat(b.profit_percentage)-parseFloat(a.profit_percentage)).map(a=>a.name)
const yProfit =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.profit)
const xProfitLabels =  data.sort((a,b)=>parseFloat(b.profit)-parseFloat(a.profit)).map(a=>a.name)

const yItemsBuyAmount = dataBuy.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.items_amount)
const xItemsBuyAmountLabels =  dataBuy.sort((a,b)=>parseFloat(b.items_amount)-parseFloat(a.items_amount)).map(a=>a.name)
const yItemsBuyValue = dataBuy.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.items_value)
const xItemsBuyValueLabels =  dataBuy.sort((a,b)=>parseFloat(b.items_value)-parseFloat(a.items_value)).map(a=>a.name)
</script>

<SectionWrap title={$_("on_suppliers.header_to_clients")} c="wrap4">
  <GraphSpace
    title={$_("on_suppliers.amount")}
    x={xItemsAmountLabels}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_suppliers.value")}
    x={xItemsValueLabels}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_suppliers.profit_percentage")}
    x={xProfitPercentageLabels}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_suppliers.profit")}
    x={xProfitLabels}
    y={yProfit}
    {elemColors}
    suffix={" PLN"}
  />
</SectionWrap>

<SectionWrap title={$_("on_suppliers.header_to_suppliers")} c="wrap5">
  <GraphSpace
    title={$_("on_suppliers.amount")}
    x={xItemsBuyAmountLabels}
    y={yItemsBuyAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_suppliers.value")}
    x={xItemsBuyValueLabels}
    y={yItemsBuyValue}
    {elemColors}
    suffix={" PLN"}
  />
</SectionWrap>

<style>
  :global(.wrap4) {
    background-color: #f2fafc;
    --hColor: #0083a7;
  }
  :global(.wrap5) {
    background-color: #f2fafc;
    --hColor: #003c4d;
    margin-top: 0 !important;
  }
</style>

