<script>
  import GraphSpace from "$lib/viewraports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewraports/SectionWrap.svelte";
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
  const clientsName = data.map((sales) => sales.name);
  const yItemsAmount = data.map((sales) => sales.items_amount);
  const yItemsValue = data.map((sales) => sales.items_value);
  const yProfitPercentage = data.map((sales) => sales.profit_percentage);
  const yProfit = data.map((sales) => sales.profit);
</script>

<SectionWrap title={$_("on_clients.header")} c="wrap3">
  <GraphSpace
    title={$_("on_clients.amount")}
    x={clientsName}
    y={yItemsAmount}
    {elemColors}
  />
  <GraphSpace
    title={$_("on_clients.value")}
    x={clientsName}
    y={yItemsValue}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    title={$_("on_clients.profit_percentage")}
    x={clientsName}
    y={yProfitPercentage}
    {elemColors}
    suffix={"%"}
  />
  <GraphSpace
    title={$_("on_clients.profit")}
    x={clientsName}
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
