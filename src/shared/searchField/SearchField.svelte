<script>
	export let larger = false;
</script>

<input class={larger ? 'searchBarBig' : 'searchBar'} type="text" placeholder="Szukaj w bazie" />

<style lang="scss">
	input {
		width: 100%;
		box-shadow: var(--nShadow);
		border-radius: 26px;
		position: relative;
		background-image: url('static/icons/Search.svg');
		background-position: 15px;
		background-size: 30px;
		background-repeat: no-repeat;
		font-weight: 400;
		box-sizing: border-box;
	}
	.searchBarBig {
		font-size: 22px;
		padding: 12px 16px 12px 60px;
	}
	.searchBar {
		font-size: 16px;
		padding: 10px 32px 10px 60px;
	}
</style>
