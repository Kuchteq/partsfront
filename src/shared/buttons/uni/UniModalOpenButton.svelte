<script>
	import { openModal } from '$functions/modalManager';
	export let theme;
	export let text;
	export let modal;
</script>

<button on:click={() => openModal(modal)} class="uniModalOpenButton {theme}-open-button">
	{text}
</button>

<style lang="scss">
	.uniModalOpenButton {
		background: var(--buttonBg);
		&::before {
			background-image: var(--buttonIcon);
		}
	}
</style>
