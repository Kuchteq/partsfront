<script>
	import { openModal } from '$functions/modalManager';
	export let larger = false;
</script>

<button on:click={() => openModal('sell')} class={larger ? 'uniLongButton' : 'uniModalOpenButton'}
	>Sprzedaj inwentarz
</button>

<style lang="scss">
	button {
		background: var(--graRed);
		&::before {
			background-image: url('/icons/RemoveCircle.svg');
		}
	}
</style>
