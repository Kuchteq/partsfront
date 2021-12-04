<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import problemsForm from '/config/forms/problemsForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';

	let modalName = 'problems';
	let formRef;
	let client = createPostClient(problemsForm);

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `Problem związany z komputerem ${$client[0].value.label} został dodany`
			};
			//pass name to
			let valid = client.checkValidity(modalName);
			if (valid) {
				client.post('/problems', successMessage).then(() => refetch());
			}
		},
		text: 'Dodaj',
		icon: '/icons/AddCircle.svg'
	};

	let resetAction = () => {
		client.resetValues();
	};
</script>

<UniModal {modalName} theme="problemsModal" {actionButton} {resetAction} tabName="Dodaj problem">
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
				multiText={'Wartość'}
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
