<script>
	export let icons;
	export let labels;
	export let handleHide;
</script>

<div class="showFields">
	<h5>Pola widoku</h5>
	{#each $labels as field, i}
		<button class:turnedOff={!field.shown} on:click={() => handleHide(i)}
			><img src={`static/icons/showFieldsIcons/${icons[i]}.svg`} /></button
		>
	{/each}
</div>

<style lang="scss">
	.showFields {
		display: flex;
		align-items: center;
		background-color: var(--topPartBg);
		width: fit-content;
		border-radius: 12px;
		box-shadow: 0px 2px 12px #00000033;
	}
	h5 {
		font-weight: 600;
		color: #fff;
		padding: 7px 15px 7px 22px;
		background-color: var(--topPartBg);
		border-radius: 12px 0px 0px 12px;
	}
	button {
		padding: 7px;
		background-color: var(--moduleThemeColor);
		transition: 0.15s all;
		img {
			display: block;
			width: 24px;
			height: 24px;
		}
		&:last-child {
			border-radius: 0px 12px 12px 0px;
			padding-right: 10px;
		}
	}
	.turnedOff {
		background-color: var(--topPartTurnedOff);
	}
</style>
