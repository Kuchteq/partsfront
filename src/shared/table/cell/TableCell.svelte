<script>
	export let result;
	export let labels;
	export let highlighted;
	export let selectedCells;
	export let onDoubleClick;
	export let onSingleClick;

	let id = Object.values(result)[0];
</script>

<ul
	class={$selectedCells && $selectedCells.findIndex((idx) => idx == id) != -1 ? 'selected' : ''}
	on:dblclick={onDoubleClick(id)}
	on:click={onSingleClick(id)}
>
	{#each Object.values(result) as column, i}
		<li
			class={`${labels[i].widthClass} ${labels[i].shown ? '' : 'hiddenDisplay'} ${
				highlighted == i ? 'highlighted' : ''
			}`}
		>
			{!column ? '' : labels[i].format ? labels[i].format(column) : column}
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		border: 1px solid #cfcfcf;
		border-radius: 14px;
		box-shadow: 0px 0px 4px #00000033;
		margin-top: 8px;
		font-weight: 500;
		animation: fadeIn 0.1s;
		transition: 0.1 all;
		cursor: pointer;
		&:nth-child(even) {
			background-color: #eeeeee;
		}
		&:hover {
			background-color: var(--hoverCell, #e1e1e1);
		}
		&.selected {
			background-color: var(--selectedCellColor);
			&:hover {
				background-color: var(--selectedCellColor);
			}
		}
		&.highlighted {
			animation: highlightCell 2.5s;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes highlightCell {
		from {
			background-color: var(--moduleThemeColor);
		}
		to {
			background-color: transparent;
		}
	}
	li {
		padding: 12px 18px;
	}

	.hiddenDisplay {
		display: none;
	}
</style>
