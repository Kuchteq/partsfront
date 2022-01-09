<script>
  import { onMount } from "svelte";
  import back from "$axios";
  import { _ } from "svelte-i18n";
  import { openModal } from "$functions/modalManager.js";
  import Select from "svelte-select";
  export let id;
  export let label;
  export let update;
  export let initValue = "";
  export let themeColor = "#505050";
  export let addHandlerModal = "";
  export let fetchString;
  export let error = undefined;
  export let required = true;
  let items;

  function handleSelect(event) {
    update(id, event.detail);
  }

  onMount(() => {
    back
      .get(fetchString)
      .then((res) => {
        items = res.data;
      })
      .catch((err) => {});
  });
</script>

<div
  class="uniField {required && 'reqField'} {error && 'fieldFillError'}"
  style="--selectFieldColor:{themeColor}"
>
  <label>{label($_)}</label>
  <div class="inputsWrap" data-field-id={id}>
    <Select
      {items}
      placeholder={$_("misc.choose")}
      containerClasses={"customContainer"}
      on:clear={handleSelect}
      on:select={handleSelect}
      value={initValue}
    />
    {#if addHandlerModal}
      <button
        type="button"
        on:click={() => openModal(addHandlerModal)}
        class="add"
      >
        {$_("misc.add_new_one")}
      </button>
    {/if}
  </div>
</div>

<style lang="scss">
  .inputsWrap {
    width: calc(82% + 34px);
    display: flex;
    align-items: center;
    :global(.customContainer) {
      border-color: #505050;
      --borderFocusColor: var(--selectFieldColor);
      --itemIsActiveBG: var(--selectFieldColor);
      padding: 15px;
      width: 500px;
      margin-left: 20px;
      :global(.selectedItem) {
        height: unset;
      }
    }
  }
  .add {
    margin-left: 20px;
    padding: 8px 14px;
    border: 1px solid #505050;
    background-color: var(--selectFieldColor);
    color: #fff;
    font-size: 17px;
    border-radius: 3px;
  }
</style>
