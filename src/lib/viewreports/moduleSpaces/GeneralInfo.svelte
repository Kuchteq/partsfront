<script>
  import GraphSpace from "$lib/viewreports/GraphSpace.svelte";
  import SectionWrap from "$lib/viewreports/SectionWrap.svelte";
  import { _ } from "/config/i18n.js";
  export let data;
  const months = data.byMonthInfo.map((d) =>
    new Date(d["month"]).toLocaleDateString("pl-PL", {
      month: "long",
      year: "numeric"
    })
  );
  const valueData = {
    x: months,
    y: data.byMonthInfo.map((d) => d["items_value"])
  };
  const profitData = {
    x: months,
    y: data.byMonthInfo.map((d) => d["profit"])
  };
  const amountData = {
    x: months,
    y: data.byMonthInfo.map((d) => d["items_amount"])
  };

  const elemColors = [
    "#ffba1a",
    "#ffc94d",
    "#ffa64d",
    "#e6ac00",
    "#ffcc00",
    "#e6b800",
    "#ffad33"
  ];
  const bInfo = data.generalInfo;
</script>

<SectionWrap c="wrap1">
  <div class="basicInfo">
    <h4>{$_("general.header")}</h4>
    <ul>
      <li>
        {$_("general.profit")}:
        <span
          >{(
            bInfo.post_sale_all_value -
            bInfo.parts_value -
            bInfo.computers_value
          ).toFixed(2)} PLN</span
        >
      </li>
      <li>{$_("general.orders_count")}: <span>{bInfo.orders_count}</span></li>
      <li>
        {$_("general.orders_value")}:
        <span
          >{parseFloat(bInfo.parts_value + bInfo.computers_value).toFixed(2)} PLN
        </span>
      </li>
      <li>
        {$_("general.parts_sold_count")}:
        <span>{bInfo.parts_sold_amount} </span>
      </li>
      <li>
        {$_("general.parts_value")}: <span>{bInfo.parts_value} PLN </span>
      </li>
      <li>
        {$_("general.computers_sold_count")}:
        <span>{bInfo.computers_sold_amount} </span>
      </li>
      <li>
        {$_("general.computers_value")}:
        <span>{bInfo.computers_value} PLN </span>
      </li>
      <li>
        {$_("general.clients_added")} <span>{bInfo.clients_amount}</span>
      </li>
      <li>
        {$_("general.suppliers_added")} <span>{bInfo.suppliers_amount}</span>
      </li>
    </ul>
  </div>
  <GraphSpace
    x={valueData.x}
    y={valueData.y}
    title={$_("general.orders_value_graph")}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    x={profitData.x}
    y={profitData.y}
    title={$_("general.orders_profit_graph")}
    {elemColors}
    suffix={" PLN"}
  />
  <GraphSpace
    x={amountData.x}
    y={amountData.y}
    title={$_("general.orders_amount_graph")}
    {elemColors}
  />
</SectionWrap>

<style lang="scss">
  :global(.wrap1) {
    background-color: #fdfaf2;
    --gBg: #fff9e3;
  }
  .basicInfo {
    width: 40%;
    background-color: #fff9e3;
    padding: 3%;
    margin: 2%;
    h4 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
      color: var(--mGold);
    }
    span {
      font-size: 17px;
      font-weight: 700;
      color: #916b00;
    }
  }
</style>
