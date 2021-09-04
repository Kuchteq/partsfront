<script>
	import modalsState from '$functions/modalManager';
	//normal modal imports
	import AddModal from '$lib/modals/AddModal.svelte';
	import ClientsModal from '$lib/modals/ClientsModal.svelte';
	import SellModal from '$lib/modals/SellModal.svelte';
	import SuppliersModal from '$lib/modals/SuppliersModal.svelte';
	import ProblemsModal from '$lib/modals/ProblemsModal.svelte';

	//update modal imports
	import InventoryUpdateModal from '$lib/updateModals/InventoryUpdateModal.svelte';
	import SuppliersUpdateModal from '$lib/updateModals/SuppliersUpdateModal.svelte';
	import ClientsUpdateModal from '$lib/updateModals/ClientsUpdateModal.svelte';
	import AssembleModal from '$lib/modals/AssembleModal.svelte';
	import ComputersUpdateModal from '$lib/updateModals/ComputersUpdateModal.svelte';
	import ProblemsUpdateModal from '$lib/updateModals/ProblemsUpdateModal.svelte';
</script>

{#if $modalsState.add}
	<AddModal />
{/if}

{#if $modalsState.clients}
	<ClientsModal />
{/if}

{#if $modalsState.sell}
	<SellModal />
{/if}

{#if $modalsState.suppliers}
	<SuppliersModal />
{/if}

{#if $modalsState.assemble}
	<AssembleModal />
{/if}

{#if $modalsState.problems}
	<ProblemsModal />
{/if}

{#if $modalsState.inventoryUpdate}
	<InventoryUpdateModal />
{/if}

{#if $modalsState.suppliersUpdate}
	<SuppliersUpdateModal />
{/if}

{#if $modalsState.clientsUpdate}
	<ClientsUpdateModal />
{/if}
{#if $modalsState.computersUpdate}
	<ComputersUpdateModal />
{/if}

{#if $modalsState.problemsUpdate}
	<ProblemsUpdateModal />
{/if}
