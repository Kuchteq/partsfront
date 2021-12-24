<script>
  //import the components
  import UniModal from "$shared/modals/uniModal/UniModal.svelte";
  import inventoryForm from "/config/forms/inventoryForm.js";
  import createPostClient from "$functions/postClient";
  import { refetch } from "$functions/triggerRefetch";

  //set the modal settings
  let modalName = "add";
  let client = createPostClient(inventoryForm);
  let actionButton = {
    do: () => {
      let successMessage = {
        title: `Sukces!`,
        desc: `${$client[1].value} została dodana`
      };
      let valid = client.checkValidity(modalName);
      if (valid) {
        client.post("/inventory", successMessage).then(() => refetch());
      }
    },
    text: "Dodaj",
    icon: "/icons/AddCircle.svg"
  };

  let resetAction = () => {
    client.resetValues();
  };
</script>

<!-- Use the UniModal modal boilerplate component-->
<UniModal
  {modalName}
  theme="addModal"
  {actionButton}
  {resetAction}
  tabName="Dodaj inwentarz"
>
  <form>
    <!-- For each form input to be filled in, create the appropriate field type component -->
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
</UniModal>

<style>
  /* setting this particular modal theme */
  :global(.uniModal.addModal) {
    --themeGradient: var(--graBlue);
    --themeColor: var(--mBlue);
    --actionColor: var(--graGreen);
  }
</style>
