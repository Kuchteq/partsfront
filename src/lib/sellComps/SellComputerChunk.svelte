<script>
  export let sellData;
  export let sellFunc;
  import back from "$axios";
  import { serverError } from "$functions/PopupClient.js";
  import PriceField from "$shared/fields/PriceField.svelte";
  import accordion from "$functions/accordion";
  import { _ } from "/config/i18n.js";
  import {setComputerSelection} from "$functions/cSelectionManager";
  export let chunkId;
  let computerInfo = {};
  let parts = [];
  let isOpen = true;

  back
    .get(`/computers/${sellData.computer_id}`)
    .then((res) => {
      computerInfo = res.data;
      parts = res.data.parts;
    })
    .catch((err) => {
      console.log(err);
      serverError();
    });

  let totalValue = 0;
  $: {
    totalValue = parseInt(sellData.sell_price) * parseInt(sellData.quantity);
  }
</script>

<article class="sellChunk" class:closedDetails={!isOpen}>
  <button type="button" class="generalGarbageButton removeFromOrder" 
on:click={() => setComputerSelection(computerInfo.computer_id)}
/>
  <div class="topPart">
    <h1>
      {#if sellData.sell_price && sellData.quantity}
        <img src="/icons/ReadyToSell.svg" />
      {:else}
        <img src="/icons/NotYetToSell.svg" />
      {/if}
      {computerInfo.computer_name}
    </h1>
    <div class="rightSideTop">
      <h2 class="totalValue" class:visible={totalValue}>
        {$_("sell_modal.order_chunk_value")}
        {totalValue.toFixed(2)} PLN
      </h2>
      <button
        type="button"
        class:rotatedButton={isOpen}
        on:click={() => (isOpen = !isOpen)}
      >
        <img src="/icons/UnravelTriangle.svg" />
      </button>
    </div>
  </div>
  <div use:accordion={isOpen}>
    <div class="fillPartSellData">
      <PriceField
        label={$_("sell_modal.netto_price")}
        initValue={sellData.sell_price}
        update={(id, val) => sellFunc(chunkId, val, "sell_price")}
        required={true}
        multiplier={1.23}
        multiText={"Wartość brutto: "}
        error={sellData.error == 1 || undefined}
      />
    </div>

    <div class="sellnPartInfo">
      <div>
        <h3>{$_("sell_modal.order_chunk_info")}</h3>
        <ul>
          <li>
            - {$_("sell_modal.comp_value")}
            <b>{computerInfo.computer_value}</b> PLN
          </li>
          <li>
            - {$_("sell_modal.profit")}
            <b>{(sellData.sell_price - computerInfo.computer_value).toFixed(2)}</b> PLN
          </li>
        </ul>
      </div>
      <div>
        <h3>{$_("sell_modal.set_info")}</h3>
        <ul>
          {#each parts as part}
            <li>
              - {part.segment_obj.label}: <span>{part.part_name}</span> /
              <b>{part.price*part.quantity}</b> PLN {#if part.quantity > 1} x {part.quantity}{/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</article>

<style lang="scss">
  .sellChunk {
    background-color: #fff;
    border-radius: 14px;
    margin-top: 25px;
    padding-bottom: 25px;
    transition: 0.1s padding;
    box-shadow: 0px 0px 7px rgb(0 0 0 / 10%);
    position: relative;
    &:hover {
      .removeFromOrder {
        opacity: 1;
      }
    }
  }
  .removeFromOrder {
    top: 0%;
    left: 50%;
    transform: translate(0, -50%);
    opacity: 0;
  }
  .topPart {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    transition: 0.1s margin;
    h1 {
      padding: 18px;
      font-size: 20px;
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
    h2 {
      display: flex;
    }
  }
  .closedDetails {
    .topPart {
      margin-bottom: 0;
    }
    &.sellChunk {
      padding-bottom: 0;
    }
  }

  .fillPartSellData {
    padding: 0 25px;
    margin-bottom: 28px;
  }
  .sellnPartInfo {
    margin: 0 28px;
    background: #f3f3f3;
    border-radius: 0px 0 10px 10px;
    padding: 15px 26px;
    display: flex;
    transition: 0.3s padding;
    h3 {
      font-size: 22px;
      font-weight: 700;
      color: #c625ff;
      margin-bottom: 5px;
    }
    & > div {
      width: 47.5%;
      &:nth-child(1) {
        margin-right: 5%;
        border-right: 2px solid #c625ff;
      }
    }
    li {
      span {
        color: #7b00a6;
      }
      b {
        font-weight: 700;
      }
    }
  }
  .totalValue {
    background-color: #f5f5f5;
    padding: 18px 20px;
    border-radius: 0 0 9px 16px;
  }
  .rotatedButton {
    transform: rotate(180deg);
  }

  .rightSideTop {
    display: flex;
    button {
      width: 70px;
      transition: 0.15s all;
      transform-origin: center;
      height: 70px;
      img {
        width: 19px;
      }
      &:hover {
        filter: brightness(1.5);
      }
    }
  }
</style>

