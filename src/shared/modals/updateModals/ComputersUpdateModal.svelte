<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import computerInfoForm from "/config/forms/computerInfoForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import {
    fillFromInitial,
    mainParts,
    miscParts,
    updateComputer,
    addPart,
    validateComputer
  } from "$lib/assembleComps/assembleClient.js";
  import modalsState, { closeModal } from "$functions/modalManager";
  import PartField from "$lib/assembleComps/PartField.svelte";
  import MiscPartField from "$lib/assembleComps/MiscPartField.svelte";
  import { onMount } from "svelte";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";
  import { writable } from "svelte/store";
  import { deselectAllParts } from "$functions/selectionManager";
  import { addNotif } from "$functions/PopupClient";
  import clone from "just-clone";
  import back from "$axios";
  import { _ } from "/config/i18n.js";

  let id = $modalsState.computersUpdate;
  let modalName = "computersUpdate";
  let client = createPostClient(
    clone(computerInfoForm),
    "/computers/",
    $modalsState.computersUpdate
  );
  let isWarningPopupOpen = writable(false);

  let warningText = $_("computer_modal.missing_parts_desc");
  let actionButton = {
    do: () => {
      let problem = validateComputer();
      if (problem == 0) {
        createConfirm();
      } else if (problem == 3) {
        warningText = $_("computer_modal.missing_parts_desc");
        isWarningPopupOpen.set(1);
      }
    },
    text: "Przemontuj",
    icon: "/icons/Update.svg"
  };

  const createConfirm = () => {
    if ($isWarningPopupOpen == 2) {
      back.delete(`/computers/${id}`).then(() => {
        closeModal("computersUpdate");
        deselectAllParts();
        refetch();
        addNotif(
          "success",
          $_("popup_msg.set_disassembled_title"),
          $_("popup_msg.set_disassembled_msg", {
            values: { name: $client[0].value }
          })
        );
      });
    } else {
      updateComputer(client.createReqJson($client), id)
        .then(() => {
          closeModal("assemble");
          deselectAllParts();
          refetch();
        })
        .catch((err) => console.log(err));
    }
  };

  let deleteButton = {
    do: () => {
      warningText = $_("computer_modal.disassemble_msg");
      isWarningPopupOpen.set(2);
    },
    icon: "/icons/Disassemble.svg",
    color: "#a40000"
  };
  let resetAction = () => {
    client.resetFromGet();
    fillFromInitial(id);
  };
  onMount(() => {
    fillFromInitial(id);
  });
</script>

<UniModal
  {modalName}
  theme="assembleModal"
  {actionButton}
  {resetAction}
  {deleteButton}
  tabName={$_("modal_tabs.modify_set", {
    values: { name: $client[1].value, id: id }
  })}
>
  <form class="computerInfoTop">
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
  <form>
    <h1>{$_("computer_modal.main_parts_title")}</h1>

    {#each $mainParts as _, id}
      <PartField data={mainParts} {id} />
    {/each}
  </form>

  <form class="otherPartsWrap">
    <h1>{$_("computer_modal.misc_parts_title")}</h1>

    {#if $miscParts.length > 0}
      {#each $miscParts as _, id}
        <MiscPartField data={miscParts} {id} />
      {/each}
    {/if}
    <button class="anotherPart" type="button" on:click={() => addPart()}
      >{$_("computer_modal.add_misc_part")}
    </button>
  </form>
  <WarningPopup
    header={$_("warning_msg.title")}
    desc={warningText}
    isOpen={isWarningPopupOpen}
    onConfirm={createConfirm}
  />
</UniModal>

<style lang="scss">
  .computerInfoTop {
    --themeGradient: var(--graPurple);
  }
  :global(.uniModal.assembleModal) {
    --themeGradient: var(--graBlue);
    --themeColor: var(--mPurple);
    --actionColor: var(--graPurple);
  }
  h1 {
    margin: 40px 0 15px;
    font-weight: 600;
    font-size: 20px;
  }
  .otherPartsWrap {
    padding-bottom: 400px;
  }
  .anotherPart {
    margin: auto;
    padding: 15px 30px;
    font-size: 18px;
    background: var(--graBlue);
    color: #fff;
    font-weight: 500;
    border-radius: 10px;
    transition: 0.15s;
    &:hover {
      filter: brightness(1.15);
    }
  }
</style>
