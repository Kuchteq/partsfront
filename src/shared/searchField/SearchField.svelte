<script>
  export let sQuery;
  import { _ } from "/config/i18n.js";
</script>

<input
  class="searchBar"
  type="text"
  placeholder={$_("misc.search_placeholder")}
  bind:value={$sQuery}
/>

<style lang="scss">
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
    font-size: 16px;
    padding: 10px 32px 10px 60px;
  }
</style>
