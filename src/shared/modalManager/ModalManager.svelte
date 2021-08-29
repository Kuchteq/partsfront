<script>
	//normal modal imports
	import AddModal from '$lib/modals/AddModal.svelte';
	import ClientsModal from '$lib/modals/ClientsModal.svelte';
	import SellModal from '$lib/modals/SellModal.svelte';
	import SuppliersModal from '$lib/modals/SuppliersModal.svelte';

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

{#if $modalsState.sell}
	<SellModal />
{/if}

{#if $modalsState.suppliers}
	<SuppliersModal />
{/if}
