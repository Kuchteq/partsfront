<script>
	import StatusPopup from '$shared/statusPopup/StatusPopup.svelte';

	import { pushStack } from '$functions/PopupClient';
</script>

<section>
	{#each $pushStack as notif}
		{#if notif.display}<StatusPopup
				id={notif.id}
				header={notif.header}
				type={notif.type}
				desc={notif.desc}
				visible={notif.visible}
				clickAction={notif.clickAction || undefined}
			/>{/if}
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		z-index: 1000;
		flex-direction: column;
		align-items: center;
		position: fixed;
		left: 32px;
		bottom: 32px;
		width: fit-content;
		max-height: calc(100vh - 64px);
	}
</style>
