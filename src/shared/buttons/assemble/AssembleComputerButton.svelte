<script>
	export let larger = false;
</script>

<button class={larger ? 'uniLongButton' : 'uniModalOpenButton'}>Złóż komputer</button>

<style lang="scss">
	button {
		background: var(--graPurple);
		&::before {
			background-image: url('static/icons/Computer.svg');
		}
	}
</style>
