<script>
	export let larger = false;
</script>

<button class={larger ? 'uniLongButton' : 'uniModalOpenButton'}>Sprzedaj inwentarz </button>

<style lang="scss">
	button {
		background: var(--graRed);
		&::before {
			background-image: url('static/icons/RemoveCircle.svg');
		}
	}
</style>
