<script>
	export let store;
</script>

<div class="container">
	<span class="slot"><slot /></span>
	<div class="switch">
		<input type="checkbox" bind:checked={$store} />
		<span class="slider round" />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		column-gap: 5px;
		color: white;
	}
	.slot {
		margin: auto;
	}
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	.switch input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
		margin: 0;
		z-index: 1;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #2196f3;
	}

	input:checked + .slider:before {
		transform: translateX(26px);
	}

	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
