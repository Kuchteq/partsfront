<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import suppliersForm from '/config/forms/suppliersForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';
	let modalName = 'suppliers';
	let formRef;
	let client = createPostClient(suppliersForm);

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `${$client[0].value} został dodany`
			};
			//pass name to
			let valid = client.checkValidity(modalName);
			if (valid) {
				client.post('/suppliers', successMessage).then(() => refetch());
			}
		},
		text: 'Dodaj',
		icon: 'static/icons/AddCircle.svg'
	};

	let resetAction = () => {
		client.resetValues();
	};
</script>

<UniModal {modalName} theme="suppliersModal" {actionButton} {resetAction} tabName="Dodaj dostawcę">
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
	:global(.uniModal.suppliersModal) {
		--themeGradient: var(--graSuppliers);
		--themeColor: var(--mSuppliers);
		--actionColor: var(--graSuppliers);
	}
</style>
