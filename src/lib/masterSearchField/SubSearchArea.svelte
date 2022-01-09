<script>
  import { _ } from "/config/i18n.js";

  export let results = [];
  export let header = "";
  export let color = "#000";
  export let format = "";
  export let destination = "";
</script>

<section style="--accentColor:{color}">
  <div class="topPart">
    <div class="inner">
      <h2>{header}</h2>
      <a href={destination}>{$_("misc.view_in_module")}</a>
    </div>
    <div class="resultsCount">
      {results.length >= 6
        ? $_("misc.more_results_amount", {
            values: { max: 6 }
          })
        : $_("misc.all_results_amount", {
            values: { max: results.length }
          })}
    </div>
  </div>
  <div>
    {#each results as row}
      <svelte:component this={format} data={row} />
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    padding: 16px 35px 0;
  }
  .topPart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    h2 {
      color: var(--accentColor);
      font-size: 22px;
      font-weight: 500;
      margin-right: 20px;
    }
    a {
      border-radius: 40px;
      font-size: 16px;
      font-weight: 700;
      background-color: var(--accentColor);
      color: #fff;
      padding: 5px 30px;
      box-shadow: 1px 2px 6px rgb(0 0 0 / 22%);
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 71%;
      height: 1px;
      background: var(--accentColor);
      right: 0;
      z-index: 0;
    }
  }

  .inner {
    display: flex;
    align-items: center;
  }
  .resultsCount {
    background-color: #f1f1f1;
    border: 1px solid #c9c9c9;
    padding: 5px 20px;
    margin-right: 20px;
    position: relative;
    z-index: 5;
  }
</style>
