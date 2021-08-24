<script>
	export let header;
	export let id;
	export let desc = '';
	export let type;
	export let visible = true;
	export let clickAction = undefined;

	import { holdLifeTime, resumeKilling, killInstantly } from '$functions/PopupClient';
</script>

<div
	class={`notif ${type} ${visible ? '' : 'disappearing'}`}
	on:mouseenter={() => holdLifeTime(id)}
	on:mouseleave={() => resumeKilling(id)}
>
	<div class="top">
		<div>
			{#if type === 'success'}
				<img src="static/icons/Done.svg" />
			{:else if type === 'assembled'}
				<img src="static/icons/Done.svg" />
			{:else}
				<img src="static/icons/Error.svg" />
			{/if}
		</div>
		<h3>{header}</h3>
	</div>
	{#if desc}<p>{desc}</p>{/if}
	{#if clickAction}
		<button on:click={clickAction()} class="popupClickAction"
			><img src="static/icons/PopupActionArrow.svg" /></button
		>
	{/if}
	<button class="closePopup" on:click={() => killInstantly(id)} />
</div>

<style lang="scss">
	.notif {
		position: relative;
		width: 320px;
		padding: 20px 60px 20px 20px;
		box-shadow: var(--popupShadow);
		color: #fff;
		animation: jumpIn 0.3s ease-out;
		margin-bottom: 22px;
		transition: 3s opacity;
	}
	.success {
		background: var(--graGreen);
		--success-action-btnBg: linear-gradient(80deg, #3ed33a 0%, #3df83a 100%);
	}
	.error {
		background: var(--graRed);
		--success-action-btnBg: linear-gradient(108deg, #ff5b5b 0%, #d94f4f 100%);
	}
	.assembled {
		background: var(--graPurple);
		--success-action-btnBg: linear-gradient(112deg, #d066ff 0%, #cc43fc 100%);
	}
	.popupClickAction {
		position: relative;
		margin-left: auto;
		padding: 10px 45px;
		right: -60px;
		top: 20px;
		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background: var(--success-action-btnBg);
			top: 0;
			left: 0;
			z-index: 0;
		}
		img {
			position: relative;
			display: block;
			width: 40px;
			height: 40px;
		}
	}
	p {
		font-size: 14px;
		margin-top: 18px;
	}
	.top {
		display: flex;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
		img {
			margin-right: 8px;
			display: block;
		}
	}

	.closePopup {
		background: var(--crossBg);
		width: 40px;
		position: absolute;
		border-radius: 0px 0 0 14px;
		top: 0;
		right: 0;
		height: 40px;
	}

	.disappearing {
		opacity: 0;
	}
</style>
