<script>
	import '../styles/reset.scss';
	import '../styles/_vars.scss';
	import '../styles/globals.scss';
	import PopupPanel from '$shared/statusPopup/PopupPanel.svelte';
	import UniModal from '$shared/uniModal/UniModal.svelte';
	//import { getStores, navigating, page, session } from '$app/stores';
</script>

<main>
	<PopupPanel />
	<UniModal />
	<slot />
</main>
