<script lang="ts">
	import './styles.css';
	import Background from '$lib/components/Background.svelte';
	import Header from '$lib/components/Header.svelte';
	import isThreejsRunning from '../stores/threeStores';
</script>

<div class="app">
	{#if $isThreejsRunning}
		<div class="scene-container">
			<Background />
		</div>
	{/if}
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		overflow: initial;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
