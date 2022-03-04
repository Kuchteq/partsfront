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
  const clientsName = data.map((sales) => sales.name);
  const yItemsAmount = data.map((sales) => sales.items_amount);
  const yItemsValue = data.map((sales) => sales.items_value);
  const yProfitPercentage = data.map((sales) => sales.profit_percentage);
  const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title={$_("on_suppliers.header_to_clients")} c="wrap4">
  <GraphSpace
    title={$_("on_suppliers.amount")}
    x={clientsName}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_suppliers.value")}
    x={clientsName}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_suppliers.profit_percentage")}
    x={clientsName}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_suppliers.profit")}
    x={clientsName}
    y={yProfit}
    {elemColors}
    suffix={" PLN"}
  />
</SectionWrap>
<SectionWrap title={$_("on_suppliers.header_to_suppliers")} c="wrap5">
  <GraphSpace
    title={$_("on_suppliers.amount_bought")}
    x={clientsName}
    y={yItemsAmount}
    elemColors={elemColorsBuy}
  />
  <GraphSpace
    title={$_("on_suppliers.value_bought")}
    x={clientsName}
    y={yItemsValue}
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
