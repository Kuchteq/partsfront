<script context="module">
	import authWatch from '$functions/authWatch.js';

	export async function load({ session }) {
		return await authWatch({ session });
	}
</script>

<script>
	import BackFromModule from '$shared/backFromModule/backFromModule.svelte';
</script>

<BackFromModule name="Raporty" />
