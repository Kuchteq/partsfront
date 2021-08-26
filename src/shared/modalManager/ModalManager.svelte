<script>
	//normal modal imports
	import AddModal from '$lib/modals/AddModal.svelte';
	import ClientsModal from '$lib/modals/ClientsModal.svelte';

	//update modal imports
	import InventoryUpdateModal from '$lib/updateModals/InventoryUpdateModal.svelte';
	import modalsState from '$functions/modalManager';
</script>

{#if $modalsState.add}
	<AddModal />
{/if}

{#if $modalsState.clients}
	<ClientsModal />
{/if}

{#if $modalsState.inventoryUpdate}
	<InventoryUpdateModal />
{/if}
