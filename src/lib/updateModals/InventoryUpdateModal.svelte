<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import inventoryForm from '/config/forms/inventoryForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';
	import clone from 'just-clone';
	import modalsState from '$functions/modalManager';

	let modalName = 'inventoryUpdate';
	let formRef;
	let id = $modalsState.inventoryUpdate;
	let client = createPostClient(clone(inventoryForm), '/inventory/', id);

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `${$client[1].value} została zaktualizowana`
			};
			//pass name to
			let valid = client.checkValidity(modalName);

			if (valid) {
				client.put('/inventory/', id, successMessage).then(() => refetch());
			}
		},
		text: 'Aktualizuj',
		icon: 'static/icons/Update.svg'
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
				quantity={field.quantity && $client[2].value}
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
	:global(.uniModal.addModal) {
		--themeGradient: var(--graBlue);
		--themeColor: var(--mBlue);
		--actionColor: var(--graGreen);
	}
</style>
