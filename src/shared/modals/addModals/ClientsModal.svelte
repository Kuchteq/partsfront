<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import clientsForm from "/config/forms/clientsForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import { _ } from "/config/i18n.js";

  let modalName = "clients";
  let client = createPostClient(clientsForm);
  let formRef;

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.general_added_desc", {
          values: { name: $client[0].value }
        })
      };
      //pass name to
      let valid = client.checkValidity(modalName);
      if (valid) {
        client.post("/clients", successMessage).then(() => refetch());
      }
    },
    text: $_("modal_action_btns.add"),
    icon: "/icons/AddCircle.svg"
  };

  let resetAction = () => {
    client.resetValues();
  };
</script>

<UniModal
  {modalName}
  theme="clientsModal"
  {actionButton}
  {resetAction}
  tabName={$_("modal_tabs.add_client")}
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
        quantity={field.quantity && $client[2].value}
        fetchString={field.fetchString && field.fetchString}
        themeColor={field.themeColor && field.themeColor}
        addHandlerModal={field.addHandlerModal && field.addHandlerModal}
        boundries={field.boundries && field.boundries}
        error={field.error || undefined}
      />
    {/each}
  </form>
</UniModal>

<style>
  :global(.uniModal.clientsModal) {
    --themeGradient: var(--graClients);
    --themeColor: var(--mClients);
    --actionColor: var(--graClients);
  }
</style>
