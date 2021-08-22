<script>
	export let header;
	export let id;
	export let desc = '';
	export let type;
	export let visible = true;
	import { holdLifeTime, resumeKilling, killInstantly } from '$shared/statusPopup/PopupClient';
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
	<button on:click={() => killInstantly(id)} />
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
	@keyframes jumpIn {
		from {
			opacity: 0;
			transform: scale(0.6);
		}
		to {
			transform: scale(1);
			opacity: 1;
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
	.success {
		background: var(--graGreen);
	}
	.error {
		background: var(--graRed);
	}
	.assembled {
		background: var(--graPurple);
	}
	button {
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
