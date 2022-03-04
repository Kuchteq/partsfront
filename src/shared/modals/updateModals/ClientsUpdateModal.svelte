<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import clientsForm from "/config/forms/clientsForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import clone from "just-clone";
  import modalsState, { closeModal } from "$functions/modalManager";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";
  import { writable } from "svelte/store";
  import { _ } from "/config/i18n.js";
  import IndividualSales from "$lib/viewreports/IndividualSales.svelte";

  let modalName = "clientsUpdate";
  let formRef;
  let id = $modalsState.clientsUpdate;
  let client = createPostClient(clone(clientsForm), "/clients/", id);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.general_modified_desc", {
          values: { name: $client[0].value }
        })
      };
      //pass name to
      let valid = client.checkValidity(modalName);

      if (valid) {
        client.put("/clients/", id, successMessage).then(() => refetch());
      }
    },
    text: $_("modal_action_btns.update"),
    icon: "/icons/Update.svg"
  };

  let resetAction = () => {
    client.resetFromGet();
  };
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

    client.delete("/clients/", id, successMessage).then(() => {
      refetch();
      closeModal(modalName);
    });
  };
</script>

<UniModal
  {modalName}
  theme="clientsUpdate"
  {actionButton}
  {resetAction}
  {deleteButton}
  tabName={$_("modal_tabs.modify_client", {
    values: { name: $client[0].value, id: id }
  })}
>
  <form bind:this={formRef}>
    {#each $client as field, id}
      <svelte:component
        this={field.component}
        {id}
        {field}
        label={field.label}
        update={client.updateVal}
        required={field.required}
        initValue={field.value}
        multiplier={field.quantity && $client[2].value}
        multiText={$_("misc.value")}
        fetchString={field.fetchString && field.fetchString}
        themeColor={field.themeColor && field.themeColor}
        addHandlerModal={field.addHandlerModal && field.addHandlerModal}
        boundries={field.boundries || undefined}
        error={field.error || undefined}
      />
    {/each}
  </form>
  <div class = "individ">
    <IndividualSales source={`/orders-clients/${id}`} />

  </div>

  <WarningPopup
    header={$_("warning_msg.title")}
    desc={$_("warning_msg.client_removal_msg")}
    isOpen={isWarningPopupOpen}
    onConfirm={onDeleteConfirm}
  />
</UniModal>

<style>
  :global(.uniModal.clientsUpdate) {
    --themeGradient: var(--graClients);
    --themeColor: var(--mClients);
    --actionColor: var(--graClients);
  }
  :global(.individ .moduleMainHolder)
  {
    width:100%;
  }
</style>
