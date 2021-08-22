<script>
	export let larger = false;
</script>

<button class={larger ? 'uniLongButton' : 'uniModalOpenButton'}> Dodaj inwentarz </button>

<style lang="scss">
	button {
		background: var(--graGreen);
		&::before {
			background-image: url('static/icons/AddCircle.svg');
		}
	}
</style>
