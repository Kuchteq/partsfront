<script>
	import AddModal from '$lib/modals/AddModal.svelte';
	import ClientsModal from '$lib/modals/ClientsModal.svelte';
	import { modalsOpenState } from '$functions/modalManager';
</script>

{#if $modalsOpenState.add}
	<AddModal />
{/if}

{#if $modalsOpenState.clients}
	<ClientsModal />
{/if}
