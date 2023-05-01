<script>
	export let options;
	import { goto} from '$app/navigation';
	import { page } from '$app/stores';
</script>

<div class="options-row">
	{#each options as option}
		<button class={option.route === $page.url.pathname ? 'active' : ''} on:click={() => goto(option.route)}>{option.text}</button>
	{/each}
</div>

<style>

	.active{
		background-color: #FDBA3b;
		color: black;
	}
	button.active:hover {
		background-color: #FDBA3b;
	}
	.options-row {
		margin: 2rem;
		display: flex;
		justify-content: center;
	}

	button {
		margin: 0 10px;
		padding: 10px;
		border: 2px solid #FDBA3b;
		color: white;
		background-color: #111;
		border-radius: 8px;
		cursor: pointer;
		transition: .4s;
	}

	button:hover {
		background-color: #222;
	}

	button:active {
		background-color: #222;
	}
</style>
