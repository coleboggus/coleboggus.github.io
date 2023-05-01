<script>
	import Toggle from '$lib/components/Toggle.svelte';
	import isThreejsRunning from '../stores/threeStores.js';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Home</h1>
	<p>
		Hi, I'm Cole! I realized my portfolio site had aged pretty dramatically and decided it was
		finally time to spice it up. I decided to build this new version with SvelteKit, ThreeJS, and
		deployed statically to Github Pages
	</p>
	<p>
		Maybe at some point I will add features that would leverage the SSR of SvelteKit but I'm happy
		with how this is for now. Feel free to learn more
		<a href="/about">about me</a> or take a look at my <a href="about/experience">experience.</a> If you
		want to see some basic demonstrations that I'm a competent engineer, check out my
		<a href="doodles">code doodles.</a>
	</p>
	<p>You can also toggle the 3D background off in the navbar or on the following line.</p>
	<Toggle store={isThreejsRunning} />
	<p>Thanks for stopping by!</p>
</section>

<style>
	section {
		width: 600px;
		padding: 15px;
		margin: auto auto;
	}
	h1 {
		width: 100%;
	}

	p {
		width: 100%;
		color: white;
	}
</style>
