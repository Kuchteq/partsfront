<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import inventoryForm from "/config/forms/inventoryForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import clone from "just-clone";
  import modalsState, { closeModal } from "$functions/modalManager";
  import { writable } from "svelte/store";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";

  let modalName = "inventoryUpdate";
  let formRef;
  let id = $modalsState.inventoryUpdate;
  let client = createPostClient(clone(inventoryForm), "/inventory/", id);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: `Sukces!`,
        desc: `${$client[1].value} została zaktualizowana`
      };
      //pass name to
      let valid = client.checkValidity(modalName);

      if (valid) {
        client.put("/inventory/", id, successMessage).then(() => refetch());
      }
    },
    text: "Aktualizuj",
    icon: "/icons/Update.svg"
  };

  let isWarningPopupOpen = writable(false);

  let deleteAction = () => {
    isWarningPopupOpen.set(true);
  };

  let onDeleteConfirm = () => {
    let successMessage = {
      title: `Sukces!`,
      desc: `Część ${$client[0].value} została usunięty`
    };

    client.delete("/inventory/", id, successMessage).then(() => {
      refetch();
      closeModal(modalName);
    });
  };

  let resetAction = () => {
    client.resetFromGet();
  };
  console.log($client);
</script>

<UniModal
  {modalName}
  theme="addModal"
  {actionButton}
  {resetAction}
  {deleteAction}
  tabName="Przejrzyj/aktualizuj część {$client[1].value} o id {id}"
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
        multiText={"Wartość"}
        fetchString={field.fetchString && field.fetchString}
        themeColor={field.themeColor && field.themeColor}
        addHandlerModal={field.addHandlerModal && field.addHandlerModal}
        boundries={field.boundries || undefined}
        error={field.error || undefined}
      />
    {/each}
  </form>
  <WarningPopup
    header="Uwaga!"
    desc="Nie zalecamy usuwać danych. Z powiązanych części zostaną usunięte nazwy dostawcy oraz wykonywane raporty mogą nie uwzględniać wkładu danego dostawcy."
    isOpen={isWarningPopupOpen}
    onConfirm={onDeleteConfirm}
  />
</UniModal>

<style>
  :global(.uniModal.addModal) {
    --themeGradient: var(--graBlue);
    --themeColor: var(--mBlue);
    --actionColor: var(--graGreen);
  }
</style>
