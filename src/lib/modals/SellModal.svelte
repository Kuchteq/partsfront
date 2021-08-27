<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import inventoryForm from '/config/forms/inventoryForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';
	import { writable } from 'svelte/store';
	import selectedParts, { lastDesellection, lastSelection } from '$functions/selectionManager';
	import createSeller from '$functions/sellClient.js';
	import { onMount } from 'svelte';
	import SellPartChunk from '$lib/SellChunks/SellPartChunk.svelte';
	let modalName = 'sell';
	let formRef;
	let client = createPostClient(inventoryForm);

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `${$client[1].value} została dodana`
			};
			//pass name to
			let valid = client.checkValidity(modalName);
			if (valid) {
				client.post('/inventory', successMessage).then(() => refetch());
			}
		},
		text: 'Sprzedaj',
		icon: 'static/icons/SellCircle.svg'
	};
	let seller = createSeller();

	let resetAction = () => {
		client.resetValues();
	};
	let mounted = false;
	onMount(() => {
		$selectedParts.forEach((part_id) => {
			seller.addPart(part_id);
		});
		mounted = true;
	});
	$: {
		seller.removePart($lastDesellection);
	}
	$: {
		seller.addPart($lastSelection);
	}
	$: {
		console.log($seller);
	}
</script>

<UniModal {modalName} theme="sellModal" {actionButton} {resetAction} tabName="Sprzedaj">
	<form bind:this={formRef}>
		{#each $client as field, id}
			<svelte:component
				this={field.component}
				{id}
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
	<form class="sellChunksContainer">
		{#each $seller as item, id}
			<SellPartChunk chunkId={id} sellData={item} sellFunc={seller.updateVal} />
		{/each}
	</form>
</UniModal>

<style>
	:global(.uniModal.sellModal) {
		--themeGradient: var(--graRed);
		--themeColor: var(--ff5151);
		--actionColor: var(--graRed);
	}
</style>
