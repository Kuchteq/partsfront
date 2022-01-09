<script>
  import { openModal } from "$functions/modalManager";
  export let larger = false;
  import { _ } from "/config/i18n.js";
</script>

<button
  on:click={() => openModal("sell")}
  class={larger ? "uniLongButton" : "uniModalOpenButton"}
>
  {$_("modals_btns.sell_inventory")}
</button>

<style lang="scss">
  button {
    background: var(--graRed);
    &::before {
      background-image: url("/icons/RemoveCircle.svg");
    }
  }
</style>
