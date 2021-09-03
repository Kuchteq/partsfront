<script>
	import { openModal } from '$functions/modalManager';

	export let larger = false;
</script>

<button
	on:click={() => openModal('assemble')}
	class={larger ? 'uniLongButton' : 'uniModalOpenButton'}>Złóż komputer</button
>

<style lang="scss">
	button {
		background: var(--graPurple);
		&::before {
			background-image: url('static/icons/Computer.svg');
		}
	}
</style>
