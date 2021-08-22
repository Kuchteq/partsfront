<script>
	import StatusPopup from '$shared/statusPopup/StatusPopup.svelte';

	import { pushStack } from '$shared/statusPopup/PopupClient';
</script>

<section>
	{#each $pushStack as notif}
		{#if notif.display}<StatusPopup
				id={notif.id}
				header={notif.header}
				type={notif.type}
				desc={notif.desc}
				visible={notif.visible}
			/>{/if}
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		z-index: 100;
		flex-direction: column-reverse;
		align-items: center;
		position: fixed;
		left: 32px;
		top: 32px;
		width: fit-content;
		max-height: calc(100vh - 64px);
	}
</style>
