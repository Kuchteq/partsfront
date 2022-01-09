<script>
  import { openModal } from "$functions/modalManager";
  export let larger = false;
  import { _ } from "/config/i18n.js";
</script>

<button
  on:click={() => openModal("add")}
  class={larger ? "uniLongButton" : "uniModalOpenButton"}
>
  {$_("modals_btns.add_inventory")}
</button>

<style lang="scss">
  button {
    background: var(--graGreen);
    &::before {
      background-image: url("/icons/AddCircle.svg");
    }
  }
</style>
