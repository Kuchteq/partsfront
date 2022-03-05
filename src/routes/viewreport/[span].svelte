<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    if (session.Authorization) {
      const [from, to] = page.params.span.split("t");
      const url = `http://localhost:5000/getreport/${from}/${to}`;
      const res = await fetch(url);
      if (res.ok) {
        return {
          props: {
            data: await res.json(),
            span: { from, to }
          }
        };
      }

      return {
        status: res.status,
        error: new Error(`Could not load ${url}`)
      };
    } else {
      return { status: 303, redirect: "/login" };
    }
  }
</script>

<script>
  import IndividualSales from "$lib/viewreports/IndividualSales.svelte";
  import ClientsInfo from "$lib/viewreports/moduleSpaces/ClientsInfo.svelte";
  import GeneralInfo from "$lib/viewreports/moduleSpaces/GeneralInfo.svelte";
  import SegmentsInfo from "$lib/viewreports/moduleSpaces/SegmentsInfo.svelte";
  import SuppliersInfo from "$lib/viewreports/moduleSpaces/SuppliersInfo.svelte";
  import BackFromModule from "$shared/backFromModule/BackFromModule.svelte";
  import { _ } from "/config/i18n.js";
  export let data;
  export let span;
  const generalData = {
    generalInfo: data.generalInfo,
    byMonthInfo: data.byMonthInfo,
    byWeekInfo: data.byWeekInfo
  };
  let periodInfo = $_("viewreport.period_info", {
    values: {
      from: span.from.replaceAll("-", "/"),
      to: span.to.replaceAll("-", "/")
    }
  });
</script>

<svelte:head>
  <title>{periodInfo}</title>
</svelte:head>
<div class="padCenter">
  <header>
    {periodInfo}
  </header>

  <GeneralInfo data={generalData} />
  <SegmentsInfo data={data.segmentInfo} />
  <ClientsInfo data={data.clientsInfo} />
  <SuppliersInfo data={data.suppliersSalesInfo} />
</div>
<h2>{$_("viewreport.sold_that_period")}</h2>
<IndividualSales source={`/orders-span/${span.from}/${span.to}`} />

<BackFromModule name={periodInfo} />

<style lang="scss">
  .padCenter {
    padding: 50px 15%;
    width: 70%;
    position: relative;
  }
  header {
    width: fit-content;
    font-size: 22px;
    font-weight: 600;
    &::after {
      content: "";
      background: var(--graGold);
      width: 60%;
      margin-top: 10px;
      display: block;
      position: relative;
      height: 4px;
    }
  }
  h2 {
    font-size: 26px;
    font-weight: 700;
    margin-top: 50px;
    color: var(--mGold);
    text-align: center;
  }
</style>
