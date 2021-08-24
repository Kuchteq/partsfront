<script>
	import { openModal } from '$functions/modalManager';
	export let larger = false;
</script>

<button on:click={() => openModal('add')} class={larger ? 'uniLongButton' : 'uniModalOpenButton'}>
	Dodaj inwentarz
</button>

<style lang="scss">
	button {
		background: var(--graGreen);
		&::before {
			background-image: url('static/icons/AddCircle.svg');
		}
	}
</style>
