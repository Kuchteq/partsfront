<script>
	import AddModal from '$lib/modals/AddModal.svelte';
	import { modalsOpenState } from '$functions/modalManager';
</script>

{#if $modalsOpenState.add}
	<AddModal />
{/if}
