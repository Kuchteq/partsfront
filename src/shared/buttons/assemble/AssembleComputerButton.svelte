<script>
  import { openModal } from "$functions/modalManager";

  import { _ } from "/config/i18n.js";
  export let larger = false;
</script>

<button
  on:click={() => openModal("assemble")}
  class={larger ? "uniLongButton" : "uniModalOpenButton"}
>
  {$_("modals_btns.assemble_computer")}
</button>

<style lang="scss">
  button {
    background: var(--graPurple);
    &::before {
      background-image: url("/icons/Computer.svg");
    }
  }
</style>
