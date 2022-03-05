<script>
  import UniModal from "$shared//modals/uniModal/UniModal.svelte";
  import problemsForm from "/config/forms/problemsForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";
  import { _ } from "/config/i18n.js";

  let modalName = "problems";
  let formRef;
  let client = createPostClient(problemsForm);

  let actionButton = {
    do: () => {
      let successMessage = {
        title: $_("popup_msg.success"),
        desc: $_("popup_msg.general_added_desc", {
          values: { name: $client[0].value.label }
        })
      };
      //pass name to
      let valid = client.checkValidity(modalName);
      if (valid) {
        client.post("/problems", successMessage).then(() => refetch());
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
  theme="problemsModal"
  {actionButton}
  {resetAction}
  tabName={$_("modal_tabs.add_problem")}
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
</UniModal>

<style>
  :global(.uniModal.problemsModal) {
    --themeGradient: var(--graOrange);
    --themeColor: var(--mOrange);
    --actionColor: var(--graOrange);
  }
</style>
