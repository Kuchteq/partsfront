<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import orderForm from "/config/forms/orderForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import selectedParts, {
    setPartSelection,
    deselectAllParts
  } from "$functions/selectionManager";
  import back from "$axios";
  import { addNotif, serverError } from "$functions/PopupClient";
  import selectedComputers, {
    deselectAllComputers,
    setComputerSelection
  } from "$functions/cSelectionManager";
  import createPartSeller from "$functions/sellPartsClient.js";
  import createComputerSeller from "$functions/sellComputersClient.js";
  import { writable } from "svelte/store";
  import modalsState, { closeModal } from "$functions/modalManager";
  import SellPartChunk from "$lib/sellComps/SellPartChunk.svelte";
  import SellComputerChunk from "$lib/sellComps/SellComputerChunk.svelte";
  import MoreAddButton from "$lib/sellComps/MoreAddButton.svelte";
  import clone from "just-clone";
  import { onDestroy } from "svelte";
  import { _ } from "/config/i18n.js";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";

  let modalName = "orderUpdate";
  let formRef;

  let order_id = $modalsState.orderUpdate;
  let client = createPostClient(clone(orderForm), "/orders-basic/", order_id);
  let seller = createPartSeller();
  let coSeller = createComputerSeller();
  let waitingState = writable(false);

  let isWarningPopupOpen = writable(false);

  let deleteButton = {
    do: () => {
      isWarningPopupOpen.set(true);
    }
  };

  let onDeleteConfirm = () => {
    let successMessage = {
      title: $_("popup_msg.success"),
      desc: $_("popup_msg.general_removed_desc", {
        values: { name: $client[0].value.label }
      })
    };

    client.delete("/orders/", order_id, successMessage).then(() => {
      refetch();
      closeModal(modalName);
    });
  };
  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.order_modified_msg", {
          values: { name: $client[0].value }
        })
      };

      let valid = client.checkValidity(modalName);
      valid = seller.checkValidity();
      valid = coSeller.checkValidity();
      if (valid) {
        seller
          .modify(
            order_id,
            client.createReqJson($client),
            $client[1].value.label,
            $seller,
            $coSeller,
            successMessage
          )
          .then(() => {
            refetch();
          });
      }
    },
    text: $_("modal_action_btns.modify"),
    icon: "/icons/Update.svg"
  };

  deselectAllParts();
  deselectAllComputers();
  back
    .get(`/orders-chunks/${order_id}`)
    .then((res) => {
      res.data.partsInfo.forEach((elem, i) => {
        setPartSelection(elem.part_id);
        seller.synchronize($selectedParts);
        seller.updateVal(i, elem.sold_at, "sell_price");
        seller.updateVal(i, elem.quantity, "quantity");
      });
      res.data.compsInfo.forEach((elem, i) => {
        setComputerSelection(elem.computer_id);
        coSeller.synchronize($selectedComputers);
        coSeller.updateVal(i, elem.sold_at, "sell_price");
      });
    })
    .catch((err) => {
      console.log(err);
      serverError();
    });

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
          serverError();
        });
    });
  }

  $: coSeller.synchronize($selectedComputers);
  onDestroy(() => {
    deselectAllComputers();
    deselectAllParts();
  });
</script>

<div class={$waitingState ? "awaitForNewParts" : ""}>
  <UniModal
    {modalName}
    theme="orderUpdate"
    {actionButton}
    {resetAction}
    {deleteButton}
    tabName={$_("modal_tabs.modify_order", {
      values: { name: $client[0].value, id: order_id }
    })}
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
          <SellPartChunk
            chunkId={id}
            part={item}
            sellFunc={seller.updateVal}
            isOpen={false}
          />
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
            isOpen={false}
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
    <WarningPopup
      header={$_("warning_msg.title")}
      desc={$_("warning_msg.order_removal_msg")}
      isOpen={isWarningPopupOpen}
      onConfirm={onDeleteConfirm}
    />
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
  :global(.uniModal.orderUpdate) {
    --themeGradient: var(--graGold);
    --actionColor: var(--graGold);
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
