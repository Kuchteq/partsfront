<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import problemsForm from '/config/forms/problemsForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';
	import clone from 'just-clone';
	import modalsState, { closeModal } from '$functions/modalManager';
	import { writable } from 'svelte/store';
	import WarningPopup from '$shared/warningPopup/WarningPopup.svelte';

	let modalName = 'problemsUpdate';
	let formRef;
	let id = $modalsState.problemsUpdate;
	let client = createPostClient(clone(problemsForm), '/problems/', id);

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `${$client[1].value} została zaktualizowana`
			};
			//pass name to
			let valid = client.checkValidity(modalName);

			if (valid) {
				client.put('/problems/', id, successMessage).then(() => refetch());
			}
		},
		text: 'Aktualizuj',
		icon: '/icons/Update.svg'
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

		client.delete('/problems/', id, successMessage).then(() => {
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
	{deleteAction}
	tabName="Przejrzyj"
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
		header="Uwaga!"
		desc="Nie zalecamy usuwać danych. Z powiązanych części zostaną usunięte nazwy dostawcy oraz wykonywane raporty mogą nie uwzględniać wkładu danego dostawcy."
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
