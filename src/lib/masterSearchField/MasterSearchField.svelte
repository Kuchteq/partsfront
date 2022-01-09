<script>
  import back from "$axios";
  import PartsFormat from "./formatting/PartsFormat.svelte";
  import ComputersFormat from "./formatting/ComputersFormat.svelte";
  import SubSearchArea from "./SubSearchArea.svelte";
  import ClientsFormat from "./formatting/ClientsFormat.svelte";
  import SuppliersFormat from "./formatting/SuppliersFormat.svelte";
  import ProblemsFormat from "./formatting/ProblemsFormat.svelte";
  import { _ } from "/config/i18n.js";

  let query = "";
  let focused = false;
  let hovering = false;
  let shown = false;
  let anyResults = false;

  $: {
    if (focused && query.length > 1) {
      shown = true;
    } else if (hovering && query.length > 1) {
      shown = true;
    } else {
      shown = false;
    }
  }
  const modules = {
    parts: {
      header: $_("modules.inventory"),
      color: "var(--mBlue)",
      route: "/inventory",
      data: [],
      format: PartsFormat
    },
    computers: {
      header: $_("modules.sets"),
      color: "var(--mPurple)",
      route: "/computers",
      data: [],
      format: ComputersFormat
    },
    clients: {
      header: $_("modules.clients"),
      color: "var(--mClients)",
      route: "/clients",
      data: [],
      format: ClientsFormat
    },
    suppliers: {
      header: $_("modules.suppliers"),
      color: "var(--mSuppliers)",
      route: "/suppliers",
      data: [],
      format: SuppliersFormat
    },
    problems: {
      header: $_("modules.problems"),
      color: "var(--mOrange)",
      route: "/problems",
      data: [],
      format: ProblemsFormat
    }
  };
  const fetchResults = (val) => {
    query = val;
    if (query.length > 1) {
      back
        .get("/multisearch/", {
          params: {
            s: query,
            across: ["parts", "computers", "clients", "suppliers", "problems"]
          }
        })
        .then((qResults) => {
          anyResults = false;
          qResults.data.forEach((moduleData, i) => {
            modules[Object.keys(modules)[i]].data = moduleData;
            if (moduleData.length > 0) {
              anyResults = true;
            }
          });
          console.log(modules);
        });
    }
  };
</script>

<header>
  <input
    class="masterSearchBar {shown ? 'roundedDown' : ''}"
    type="text"
    placeholder={$_("misc.search_placeholder")}
    on:input={(e) => fetchResults(e.target.value)}
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
  />
  <div
    class="outputWindow {shown ? 'shown' : ''}"
    on:mouseleave={() => (hovering = false)}
    on:mouseenter={() => (hovering = true)}
  >
    {#if anyResults == false}<h4>{$_("misc.no_results")}</h4>
    {:else}
      {#each Object.values(modules) as module}
        {#if module.data.length > 0}
          <SubSearchArea
            header={module.header}
            color={module.color}
            format={module.format}
            results={module.data}
            destination={`${module.route}/?s=${query}`}
          />
        {/if}
      {/each}
    {/if}
  </div>
</header>

<style lang="scss">
  header {
    position: relative;
  }
  input {
    width: 100%;
    box-shadow: var(--nShadow);
    border-radius: 26px;
    position: relative;
    background-image: url("/icons/Search.svg");
    background-position: 15px;
    background-size: 30px;
    background-repeat: no-repeat;
    font-weight: 400;
    box-sizing: border-box;
    font-size: 22px;
    padding: 12px 16px 12px 60px;
    transition: var(--sTrans);
  }
  .roundedDown {
    border-radius: 26px 26px 8px 8px;
  }
  .outputWindow {
    position: absolute;
    background-color: #f6f6f6;
    box-shadow: 0px 2px 16px #00000033;
    width: 103%;
    border-radius: 13px;
    top: 70px;
    left: -1.5%;
    opacity: 0;
    visibility: hidden;
    transition: var(--sTrans);
    max-height: 52vh;
    overflow: auto;
    padding-bottom: 20px;
  }
  .shown {
    opacity: 1;
    visibility: visible;
  }
  h4 {
    text-align: center;
    padding: 10px;
    margin: 10px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
  }
</style>
