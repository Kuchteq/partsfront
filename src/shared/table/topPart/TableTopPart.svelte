<script>
	export let labels;
	export let sortValue;
	export let sortHandler;

	$: sortValue = sortValue;
</script>

<header>
	{#each labels as label}
		<button
			on:click={() => {
				sortHandler(label.queryName);
			}}
			class={`${label.widthClass} ${$sortValue.by === label.queryName ? $sortValue.dir : ''} ${
				label.shown ? '' : 'hiddenDisplay'
			}`}>{label.name}</button
		>
	{/each}
</header>

<style lang="scss">
	header {
		display: flex;
		box-shadow: 0px 2px 6px #00000029;
		margin-bottom: 20px;
		color: #fff;
		font-weight: 600;
		background: var(--moduleThemeGradient);
	}
	button {
		padding: 13px 18px;
		display: flex;
		align-items: center;
		border-right: 2px solid #fff;
		transition: 0.15s all;
		&:last-child {
			border-right: none;
		}
		&:hover {
			background: var(--moduleThemeLighter);
		}
		&::after {
			content: '';
			background: url('static/icons/SortTriangle.svg') no-repeat center / cover;
			display: block;
			width: 12px;
			height: 12px;
			margin-left: 6px;
			opacity: 0;
			transition: all 0.15s;
		}
	}
	.asc::after {
		opacity: 1;
	}
	.desc::after {
		opacity: 1;
		transform: rotate(180deg);
	}
	.hiddenDisplay {
		display: none;
	}
</style>
