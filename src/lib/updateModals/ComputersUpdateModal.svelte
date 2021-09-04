<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import computerInfoForm from '/config/forms/computerInfoForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';
	import selectedParts from '$functions/selectionManager';
	import {
		fillFromInitial,
		mainParts,
		miscParts,
		updateComputer,
		addPart,
		validateComputer
	} from '$lib/assembleComps/assembleClient.js';
	import modalsState, { closeModal } from '$functions/modalManager';
	import PartField from '$lib/assembleComps/PartField.svelte';
	import MiscPartField from '$lib/assembleComps/MiscPartField.svelte';
	import { onMount } from 'svelte';
	import WarningPopup from '$shared/warningPopup/WarningPopup.svelte';
	import { writable } from 'svelte/store';
	import { deselectAll } from '$functions/selectionManager';
	import { addNotif } from '$functions/PopupClient';
	import clone from 'just-clone';

	let id = $modalsState.computersUpdate;
	let modalName = 'computersUpdate';
	let formRef;
	let client = createPostClient(
		clone(computerInfoForm),
		'/computers/',
		$modalsState.computersUpdate
	);
	let isWarningPopupOpen = writable(false);
	let initialData;

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `${$client[1].value} została dodana`
			};

			let problem = validateComputer();
			if (problem == 0) {
				createConfirm();
			} else if (problem == 3) {
				isWarningPopupOpen.set(true);
			}
			//pass name to
			// let valid = client.checkValidity(modalName);
			// if (valid) {
			// 	client.post('/computers', successMessage).then(() => refetch());
			// }
		},
		text: 'Przemontuj',
		icon: '/icons/Update.svg'
	};

	const createConfirm = () => {
		updateComputer(client.createReqJson($client), id)
			.then(() => {
				closeModal('assemble');
				deselectAll();
				refetch();
			})
			.catch((err) => console.log(err));
	};

	let resetAction = () => {
		client.resetFromGet();
		fillFromInitial(id);
	};
	onMount(() => {
		fillFromInitial(id);
	});
</script>

<UniModal
	{modalName}
	theme="assembleModal"
	{actionButton}
	{resetAction}
	tabName="Przeglądaj/zmodyfikuj komputer {$client[0].value} o id {id}"
>
	<form class="computerInfoTop">
		{#each $client as field, id}
			<svelte:component
				this={field.component}
				{id}
				label={field.label}
				update={client.updateVal}
				required={field.required}
				initValue={field.value}
				fetchString={field.fetchString && field.fetchString}
				placeholder={field.placeholder && field.placeholder}
				themeColor={field.themeColor && field.themeColor}
				addHandlerModal={field.addHandlerModal && field.addHandlerModal}
				boundries={field.boundries || undefined}
				error={field.error || undefined}
			/>
		{/each}
	</form>
	<form>
		<h1>Główne części</h1>
		{#each $mainParts as data, id}
			<PartField data={mainParts} {id} />
		{/each}
	</form>

	<form class="otherPartsWrap">
		<h1>Inne części</h1>

		{#if $miscParts.length > 0}
			{#each $miscParts as data, id}
				<MiscPartField data={miscParts} {id} />
			{/each}
		{/if}
		<button class="anotherPart" type="button" on:click={() => addPart()}
			>+ Dodaj kolejną część
		</button>
	</form>
	<WarningPopup
		header="Uwaga!"
		desc="Zamierzasz stworzyć komputer bez części wymaganych do poprawnego działania. Jeżeli nie miałeś tego na myśli, proszę kliknąć nie oraz uzupełnić wymagane podsespoły, jeżeli chcesz złożyć taki komputer, kliknij tak."
		isOpen={isWarningPopupOpen}
		onConfirm={createConfirm}
	/>
</UniModal>

<style lang="scss">
	.computerInfoTop {
		--themeGradient: var(--graPurple);
	}
	:global(.uniModal.assembleModal) {
		--themeGradient: var(--graBlue);
		--themeColor: var(--mPurple);
		--actionColor: var(--graPurple);
	}
	h1 {
		margin: 40px 0 15px;
		font-weight: 600;
		font-size: 20px;
	}
	.otherPartsWrap {
		padding-bottom: 400px;
	}
	.anotherPart {
		margin: auto;
		padding: 15px 30px;
		font-size: 18px;
		background: var(--graBlue);
		color: #fff;
		font-weight: 500;
		border-radius: 10px;
		transition: 0.15s;
		&:hover {
			filter: brightness(1.15);
		}
	}
</style>
