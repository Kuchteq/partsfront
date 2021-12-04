<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import suppliersForm from "/config/forms/suppliersForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import clone from "just-clone";
  import modalsState, { closeModal } from "$functions/modalManager";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";
  import { writable } from "svelte/store";

  let modalName = "suppliersUpdate";
  let formRef;
  let id = $modalsState.suppliersUpdate;
  let client = createPostClient(clone(suppliersForm), "/suppliers/", id);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: `Sukces!`,
        desc: `${$client[0].value} została zaktualizowana`
      };
      //pass name to
      let valid = client.checkValidity(modalName);

      if (valid) {
        client.put("/suppliers/", id, successMessage).then(() => refetch());
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
      desc: `Dostawca ${$client[0].value} został usunięty`
    };

    client.delete("/suppliers/", id, successMessage).then(() => {
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
  theme="suppliersUpdate"
  {actionButton}
  {deleteAction}
  {resetAction}
  tabName="Przejrzyj/aktualizuj dostawcę {$client[0].value} o id {id}"
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
  :global(.uniModal.suppliersUpdate) {
    --themeGradient: var(--graSuppliers);
    --themeColor: var(--mSuppliers);
    --actionColor: var(--graSuppliers);
  }
</style>
