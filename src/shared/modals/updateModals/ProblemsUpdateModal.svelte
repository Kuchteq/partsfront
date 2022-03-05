<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import problemsForm from "/config/forms/problemsForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import clone from "just-clone";
  import modalsState, { closeModal } from "$functions/modalManager";
  import { writable } from "svelte/store";
  import WarningPopup from "$shared/warningPopup/WarningPopup.svelte";
  import { _ } from "/config/i18n.js";

  let modalName = "problemsUpdate";
  let formRef;
  let id = $modalsState.problemsUpdate;
  let client = createPostClient(clone(problemsForm), "/problems/", id);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.part_modified_msg", {
          values: { name: $client[1].value }
        })
      };
      //pass name to
      let valid = client.checkValidity(modalName);

      if (valid) {
        client.put("/problems/", id, successMessage).then(() => refetch());
      }
    },
    text: "Aktualizuj",
    icon: "/icons/Update.svg"
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
      desc: $_("popup_msg.part_removed_msg", {
        values: { name: $client[0].value.label }
      })
    };
    client.delete("/problems/", id, successMessage).then(() => {
      refetch();
      closeModal(modalName);
    });
  };

  let resetAction = () => {
    client.resetFromGet();
  };
</script>

<UniModal
  {modalName}
  theme="problemsModal"
  {actionButton}
  {resetAction}
  {deleteButton}
  tabName={$_("modal_tabs.modify_problem", {
    values: { name: $client[1].value, id: id }
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
        fetchString={field.fetchString && field.fetchString}
        themeColor={field.themeColor && field.themeColor}
        addHandlerModal={field.addHandlerModal && field.addHandlerModal}
        boundries={field.boundries || undefined}
        error={field.error || undefined}
      />
    {/each}
  </form>
  <WarningPopup
    header={$_("warning_msg.title")}
    desc={$_("warning_msg.problem_removal_msg")}
    isOpen={isWarningPopupOpen}
    onConfirm={onDeleteConfirm}
  />
</UniModal>

<style>
  :global(.uniModal.problemsModal) {
    --themeGradient: var(--graOrange);
    --themeColor: var(--mOrange);
    --actionColor: var(--graOrange);
  }
</style>
