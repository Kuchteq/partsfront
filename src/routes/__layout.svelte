<script context="module">
	export async function load({ session }) {
		return {
			props: {
				session
			}
		};
	}
</script>

<script>
	import '../styles/reset.scss';
	import '../styles/_vars.scss';
	import '../styles/globals.scss';
	import '../styles/moduleGlobs.scss';
	import PopupPanel from '$shared/statusPopup/PopupPanel.svelte';
	import ModalManager from '$shared/modalManager/ModalManager.svelte';
</script>

<main>
	<PopupPanel />
	<ModalManager />
	<slot />
</main>
