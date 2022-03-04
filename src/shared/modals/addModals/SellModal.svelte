<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import orderForm from "/config/forms/orderForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import selectedParts from "$functions/selectionManager";
  import back from "$axios";
  import { addNotif } from "$functions/PopupClient";
  import selectedComputers from "$functions/cSelectionManager";
  import createPartSeller from "$functions/sellPartsClient.js";
  import createComputerSeller from "$functions/sellComputersClient.js";
  import { writable } from "svelte/store";
  import { closeModal } from "$functions/modalManager";
  import SellPartChunk from "$lib/sellComps/SellPartChunk.svelte";
  import SellComputerChunk from "$lib/sellComps/SellComputerChunk.svelte";
  import MoreAddButton from "$lib/sellComps/MoreAddButton.svelte";
  import { _ } from "/config/i18n.js";

  let modalName = "sell";
  let formRef;
  let client = createPostClient(orderForm);
  let seller = createPartSeller();
  let coSeller = createComputerSeller();
  let waitingState = writable(false);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.order_added_msg", {
          values: { name: $client[0].value }
        })
      };

      console.log($seller, $coSeller);
      //pass name to
      let valid =
        client.checkValidity(modalName) &&
        seller.checkValidity() &&
        coSeller.checkValidity();

      let empty = !$seller.length && !$coSeller.length;
      if (valid && !empty) {
        seller
          .sell(
            client.createReqJson($client),
            $client[1].value.label,
            $seller,
            $coSeller,
            successMessage
          )
          .then(() => {
            client.resetValues();
            seller.resetValues();
            coSeller.resetValues();
            refetch();
            closeModal(modalName);
          });
      } else if (empty) {
        addNotif("error", $_("sell_modal.empty_order_error"));
      }
    },
    text: $_("sell_modal.sell_btn"),
    icon: "/icons/SellCircle.svg"
  };

  let resetAction = () => {
    client.resetValues();
  };

  $: {
    seller.synchronize($selectedParts);
    let unfetched = $seller.filter((x) => x.info === undefined);
    unfetched.forEach(({ part_id }) => {
      back
        .get(`/inventory/${part_id}`)
        .then((res) => {
          seller.addInfo(part_id, res.data);
        })
        .catch((err) => {
          console.log(err);
          addNotif("error", $_("server_error_title"), $_("server_error_desc"));
        });
    });
  }

  $: coSeller.synchronize($selectedComputers);
</script>

<div class={$waitingState ? "awaitForNewParts" : ""}>
  <UniModal
    {modalName}
    theme="sellModal"
    {actionButton}
    {resetAction}
    tabName={$_("modal_tabs.add_order")}
  >
    <form bind:this={formRef}>
      {#each $client as field, id}
        <svelte:component
          this={field.component}
          {id}
          label={field.label}
          update={client.updateVal}
          required={field.required}
          initValue={field.value}
          fetchString={field.fetchString && field.fetchString}
          placeholder={field.placeholder && field.placeholder}
          themeColor={field.themeColor && field.themeColor}
          addHandlerModal={field.addHandlerModal && field.addHandlerModal}
          boundries={field.boundries || undefined}
          error={field.error || undefined}
        />
      {/each}
    </form>
    <form class="sellPartChunks">
      <h1>{$_("sell_modal.parts_title")}</h1>
      {#if $seller.length > 0}
        {#each $seller as item, id}
          <SellPartChunk chunkId={id} part={item} sellFunc={seller.updateVal} />
        {/each}
      {/if}
      <MoreAddButton
        color="blueScheme"
        text={$_("sell_modal.parts_btn")}
        href="/inventory"
        icon="/icons/InventoryModuleIcon.svg"
        state={waitingState}
      />
    </form>
    <form class="sellComputerChunks">
      <h1>{$_("sell_modal.computers_title")}</h1>
      {#if $coSeller.length > 0}
        {#each $coSeller as item, id}
          <SellComputerChunk
            chunkId={id}
            sellData={item}
            sellFunc={coSeller.updateVal}
          />
        {/each}
      {/if}
      <MoreAddButton
        color="purpleScheme"
        text={$_("sell_modal.computers_btn")}
        href="/computers"
        icon="/icons/ComputersModuleIcon.svg"
        state={waitingState}
      />
    </form>
  </UniModal>
</div>
<button
  type="button"
  class="returnToModalBtn {$waitingState ? '' : 'hiddenBtn'}"
  on:click={() => {
    waitingState.set(false);
  }}
>
  <img src="/icons/ExpandToTable.svg" alt="Back" />{$_(
    "sell_modal.return_to_modal"
  )}
</button>

<style lang="scss">
  :global(.uniModal.sellModal) {
    --themeGradient: var(--graRed);
    --themeColor: var(--ff5151);
    --actionColor: var(--graRed);
  }
  .sellPartChunks,
  .sellComputerChunks {
    background: #f2f2f2;
    padding: 30px 40px;
    margin-top: 30px;
    --themeGradient: var(--graBlue);
    h1 {
      font-size: 22px;
      color: var(--mBlue);
      font-weight: 700;
    }
  }
  .sellComputerChunks {
    background: #f2f2f2;
    --themeGradient: var(--graPurple);
    h1 {
      color: var(--mPurple);
    }
  }
  @keyframes hideForNewParts {
    0% {
      display: block;
      visibility: visible;
      opacity: 1;
    }
    99% {
      display: block;
      visibility: visible;
      opacity: 0;
    }
    100% {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }
  .awaitForNewParts {
    animation: hideForNewParts 0.2s;
    animation-fill-mode: forwards;
  }
  .returnToModalBtn {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 110;
    background-color: #ff5b5b;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    padding: 10px 50px;
    border-radius: 20px 20px 0 0px;
    transition: var(--sTrans);
    opacity: 1;
    img {
      margin-right: 15px;
    }
  }
  .hiddenBtn {
    display: none;
    opacity: 0;
  }
</style>
