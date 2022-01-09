<script>
  import { _ } from "/config/i18n.js";
  export let icons;
  export let labels;
  export let handleHide;
  export let classOptio = "";
  let determining = $labels.slice(-1)[0].determining;
</script>

<div class="showFields {classOptio}">
  <h5>{$_("misc.show_fields")}</h5>
  {#each $labels as field, i}
    {#if !(determining && i == $labels.length - 1)}
      <button class:turnedOff={!field.shown} on:click={() => handleHide(i)}
        ><img src={`/icons/showFieldsIcons/${icons[i]}.svg`} /></button
      >
    {/if}
  {/each}
</div>

<style lang="scss">
  .showFields {
    display: flex;
    align-items: center;
    background-color: var(--topPartBg);
    width: fit-content;
    border-radius: 12px;
    box-shadow: 0px 2px 12px #00000033;
  }
  h5 {
    font-weight: 600;
    color: #fff;
    padding: 7px 15px 7px 22px;
    background-color: var(--topPartBg);
    border-radius: 12px 0px 0px 12px;
  }
  button {
    padding: 7px;
    background-color: var(--moduleThemeColor);
    transition: 0.15s all;
    img {
      display: block;
      width: 24px;
      height: 24px;
    }
    &:last-child {
      border-radius: 0px 12px 12px 0px;
      padding-right: 10px;
    }
  }
  .turnedOff {
    background-color: var(--topPartTurnedOff);
  }
  .rightStick {
    position: fixed;
    z-index: 1200;
  }
</style>
