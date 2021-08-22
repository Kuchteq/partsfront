<script>
	export let value;
	export let type = 'login';
	export let Icon;
	export let placeholderText;
	const handleInput = (e) => {
		value = e.target.value;
	};
</script>

<div class={'loginField'}>
	<label for={placeholderText}>
		<svelte:component this={Icon} />
	</label>
	<input
		placeholder={placeholderText}
		type={type === 'pass' ? 'password' : 'text'}
		on:input={handleInput}
		name={placeholderText}
	/>
</div>

<style lang="scss">
	.loginField {
		box-shadow: var(--nShadow);
		border-radius: 27px;
		display: flex;
		align-items: center;
		overflow: hidden;
		transition: 0.2s all;
		input {
			padding: 14px 17px 14px 10px;
			font-size: 22px;
			color: var(--black);

			background-color: transparent;
		}
		label {
			background-color: var(--gray);
			padding: 15px;
			border-radius: 100%;
			box-shadow: var(--nShadow);
			transition: 0.2s all;
		}
		&:focus-within {
			box-shadow: var(--nShadow), 0px 0px 2px var(--mBlue);
			label {
				background-color: var(--mBlue);
			}
			* {
				fill: var(--white);
			}
		}
	}
</style>
