<script>
	import UniModal from '$shared/uniModal/UniModal.svelte';
	import orderForm from '/config/forms/orderForm.js';
	import createPostClient from '$functions/postClient';
	import { refetch } from '$functions/triggerRefetch';

	import selectedParts from '$functions/selectionManager';
	import selectedComputers from '$functions/cSelectionManager';
	import createPartSeller from '$functions/sellPartsClient.js';
	import createComputerSeller from '$functions/sellComputersClient.js';
	import { onMount } from 'svelte';
	import SellPartChunk from '$lib/SellChunks/SellPartChunk.svelte';
	import SellComputerChunk from '$lib/SellChunks/SellComputerChunk.svelte';
	let modalName = 'sell';
	let formRef;
	let client = createPostClient(orderForm);
	let seller = createPartSeller();
	let coSeller = createComputerSeller();

	let actionButton = {
		do: () => {
			let successMessage = {
				title: `Sukces!`,
				desc: `Sprzedaż ${$client[0].value} została utworzona`
			};

			//pass name to
			let valid = client.checkValidity(modalName);
			valid = seller.checkValidity();
			valid = coSeller.checkValidity();
			console.log(valid);
			if (valid) {
				seller
					.sell(
						client.createReqJson($client),
						$client[1].value.label,
						$seller,
						$coSeller,
						successMessage
					)
					.then(() => {
						client.resetValues();
						seller.resetValues();
						coSeller.resetValues();
						refetch();
					});
			}
		},
		text: 'Sprzedaj',
		icon: '/icons/SellCircle.svg'
	};

	let resetAction = () => {
		client.resetValues();
	};

	$: seller.synchronize($selectedParts);

	$: coSeller.synchronize($selectedComputers);
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
				fetchString={field.fetchString && field.fetchString}
				placeholder={field.placeholder && field.placeholder}
				themeColor={field.themeColor && field.themeColor}
				addHandlerModal={field.addHandlerModal && field.addHandlerModal}
				boundries={field.boundries || undefined}
				error={field.error || undefined}
			/>
		{/each}
	</form>
	<form class="sellPartChunks">
		<h1>Wybrane części do sprzedania</h1>
		{#if $seller.length > 0}
			{#each $seller as item, id}
				<SellPartChunk chunkId={id} sellData={item} sellFunc={seller.updateVal} />
			{/each}
		{/if}
	</form>
	<form class="sellComputerChunks">
		<h1>Wybrane komputery do sprzedania</h1>
		{#if $coSeller.length > 0}
			{#each $coSeller as item, id}
				<SellComputerChunk chunkId={id} sellData={item} sellFunc={coSeller.updateVal} />
			{/each}
		{/if}
	</form>
</UniModal>

<style lang="scss">
	:global(.uniModal.sellModal) {
		--themeGradient: var(--graRed);
		--themeColor: var(--ff5151);
		--actionColor: var(--graRed);
	}
	.sellPartChunks,
	.sellComputerChunks {
		background: var(--graRed);
		padding: 30px 40px;
		margin-top: 30px;
		h1 {
			font-size: 22px;
			color: #fff;
			font-weight: 700;
		}
	}
	.sellComputerChunks {
		background: var(--graPurple);
		--themeGradient: var(--graPurple);
	}
</style>
