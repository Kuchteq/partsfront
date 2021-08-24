<script>
	export let result;
	export let labels;
</script>

<ul>
	{#each Object.values(result) as column, i}
		<li class={`${labels[i].widthClass} ${labels[i].shown ? '' : 'hiddenDisplay'}`}>{column}</li>
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
		&:nth-child(even) {
			background-color: #eeeeee;
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
	li {
		padding: 12px 18px;
	}
	.hiddenDisplay {
		display: none;
	}
</style>
