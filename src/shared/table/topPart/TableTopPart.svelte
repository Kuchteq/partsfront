<script>
  //receive the props
  export let labels;
  export let sortHandler;
  export let sortQuery;
  import { _ } from "/config/i18n.js";
</script>

<header>
  <!-- Map over each column label -->
  {#each labels as label}
    <!-- On click change how the data is sorted of the data -->
    <button
      on:click={() => {
        sortHandler(sortQuery, label.queryName, $sortQuery);
      }}
      class={`${label.widthClass} ${
        $sortQuery && $sortQuery.by === label.queryName ? $sortQuery.dir : ""
      } ${label.shown ? "" : "hiddenDisplay"}`}>{label.name($_)}</button
    >
  {/each}
</header>

<style lang="scss">
  //styling part of the component, not crucial to the functionality
  header {
    display: flex;
    box-shadow: 0px 2px 6px #00000029;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 600;
    background: var(--moduleThemeGradient);
    position: sticky;
    top: 8px;
    z-index: 50;
  }
  button {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    border-right: 2px solid #fff;
    transition: 0.15s all;
    &:last-child {
      border-right: none;
    }
    &:hover {
      background: var(--moduleThemeLighter);
    }
    &::after {
      content: "";
      background: url("/icons/SortTriangle.svg") no-repeat center / cover;
      display: block;
      width: 12px;
      height: 12px;
      margin-left: 6px;
      opacity: 0;
      transition: all 0.15s;
    }
  }
  .asc::after {
    opacity: 1;
    transform: rotate(180deg);
  }
  .desc::after {
    opacity: 1;
  }
  .hiddenDisplay {
    display: none;
  }
</style>
