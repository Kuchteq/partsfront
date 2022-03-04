<script>
  import { onMount } from "svelte";
  import back from "$axios";
  import {
    updateMiscs,
    removeMiscPart,
    updateQuantity
  } from "./assembleClient";
  import Select from "svelte-select";
  import segmentsMap from "/config/segmentsMap";
  import { _ } from "/config/i18n.js";
  export let id;
  export let data;
  export let themeColor = "#006AE5";
  export let error = undefined;
  export let required = false;
  let categoryItems = segmentsMap;
  let selectedCategory;
  let items;
  let curInfo;

  $: curInfo = $data[id];

  onMount(() => {
    selectedCategory = curInfo.segment_id;
    back.get(`/inventory-all-bycat/${selectedCategory}`).then((res) => {
      items = res.data;
    });
  });
  function handleCategorySelect(event) {
    if (event.detail) {
      selectedCategory = event.detail.value;
      back.get(`/inventory-all-bycat/${selectedCategory}`).then((res) => {
        items = res.data;
      });
    } else {
      updateMiscs(id, null, 0);
    }
  }
  function handleSelect(event) {
    updateMiscs(id, event.detail, selectedCategory);
  }
</script>

{#if curInfo}
  <div
    class="uniField {required && 'reqField'} {error &&
      'fieldFillError'} partField"
    style="--selectFieldColor:{themeColor}"
  >
    <button
      type="button"
      class="removeFromComputer"
      on:click={() => removeMiscPart(id)}
    />
    <label class="miscCategory" for="miscPart">
      <Select
        items={categoryItems}
        placeholder={$_("misc.choose")}
        containerClasses={"customContainer"}
        on:clear={handleCategorySelect}
        on:select={handleCategorySelect}
        value={curInfo.segment_id && {
          value: curInfo.segment_id,
          label: curInfo.label
        }}
      />
    </label>
    <div class="innerWrap" data-field-id={id}>
      <div class="withId">
        <Select
          {items}
          placeholder={$_("misc.choose")}
          containerClasses={"customContainer"}
          value={curInfo.value && {
            value: curInfo.value.part_id,
            label: curInfo.value.part_name,
            price: curInfo.value.price,
            stock: curInfo.value.stock
          }}
          on:clear={handleSelect}
          on:select={handleSelect}
        />
        <input
          class="miniCountInput"
          type="number"
          on:input={(e) => updateQuantity(e, id, true)}
          value={curInfo.quantity}
        />
        {#if curInfo.value}
          <p>
            {$_("computer_modal.part_id_info")}
            {curInfo.value.part_id}
          </p>
        {/if}
      </div>
      {#if curInfo.value}
        <div class="partValue">
          {curInfo.value.price} zł
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .innerWrap {
    width: calc(82% + 34px);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .removeFromComputer {
    width: 28px;
    height: 28px;
    position: absolute;
    background-color: rgb(46, 46, 46);
    background-image: url("/icons/DeleteFromOrder.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
    border-radius: 8px;
    top: 50%;
    left: -10px;
    transform: translate(0, -50%);
    opacity: 0;
    transition: 0.15s;
    &:hover {
      background-color: #ff5151;
    }
  }
  .partField {
    border-radius: 15px;
    &:hover {
      .removeFromComputer {
        opacity: 1;
      }
    }
  }
  .miscCategory {
    border-radius: 15px 0 0 15px;
    padding: 8px 16px;
    :global(.customContainer) {
      border-color: #fff;
      --borderFocusColor: var(--selectFieldColor);
      --itemIsActiveBG: var(--selectFieldColor);
      --background: var(--graBlue);
      --itemColor: #000;
      --itemHoverBG: var(--mLightBlue);
      --itemHoverColor: #fff;
      --inputColor: #fff;
      text-align: left;
      padding: 15px;
      margin-left: 20px;
      :global(input::placeholder) {
        color: #fff;
      }
      :global(.selectedItem) {
        height: unset;
      }
    }
  }
  .partValue {
    width: 20%;
    padding: 16px;
    background-color: #ececec;
  }
  .withId {
    display: flex;
    align-items: center;
    p {
      margin-left: 20px;
    }
  }
</style>
