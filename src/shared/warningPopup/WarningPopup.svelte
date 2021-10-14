<script>
	export let header = '';
	export let desc = '';
	export let isOpen = false;
	export let onConfirm = () => {};
</script>

{#if $isOpen}
	<div class="warningPopupShadow maxAll">
		<div class="popup absCenter">
			<h1>{header}</h1>
			<p>{desc}</p>
			<div class="decisionHolder">
				Kontynuować?
				<div class="btns">
					<button type="button" on:click={() => isOpen.set(false)}>Nie</button>
					<button type="button" on:click={onConfirm}>Tak</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.warningPopupShadow {
		background: rgba(0, 0, 0, 0.25);
		border-radius: var(--modalRounding);
	}
	.popup {
		box-shadow: 0px 0px 22px #00000029;
		background-color: #fff;
		padding: 30px;
		width: 30%;
		border-radius: var(--modalRounding);
		h1 {
			font-size: 30px;
			text-align: center;
			margin-bottom: 20px;
			font-weight: 700;
		}
	}
	.btns {
		display: flex;
		justify-content: space-around;
		button {
			width: 30%;
			margin-top: 20px;
			padding: 2% 5%;
			box-shadow: var(--btnShadow);
			border-radius: 10px;
			color: #fff;
			font-weight: 700;
			transition: var(--sTrans);
			&:hover {
				box-shadow: var(--btnShadow), inset 0px 0px 17px #ffffff8a;
			}
			&:nth-child(1) {
				background: var(--graGreen);
			}
			&:nth-child(2) {
				background: var(--graRed);
			}
		}
	}
	.decisionHolder {
		margin-top: 25px;
		text-align: center;
	}
</style>
