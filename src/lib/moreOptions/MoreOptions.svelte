<script>
	import back from '$axios';
	import { addNotif } from '$functions/PopupClient';
	const logout = () => {
		back
			.post('/userlogout')
			.then(() => {
				window.location = '/login';
				addNotif('success', 'Wylogowano');
			})
			.catch((e) => {
				console.log('Nie wylogowano');
			});
	};
</script>

<div class="moreOptions">
	<button type="button" on:click={logout} />
</div>

<style>
	button {
		width: 58px;
		height: 58px;
		background-image: url('/icons/Logout.svg');
		background-repeat: no-repeat;
		background-size: 40px 40px;
		background-position: center;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
		border-radius: 100px;
	}
	.moreOptions {
		position: absolute;
		bottom: 25px;
		right: 25px;
	}
</style>
