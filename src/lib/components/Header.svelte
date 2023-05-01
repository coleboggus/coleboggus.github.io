<script>
	import Toggle from '$lib/components/Toggle.svelte';
	import isThreejsRunning from '../../stores/threeStores.js';
	let showMenu = false;

	const toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<header class="header">
	<div class="fixed-width">
		<a href="/" class="logo">Cole Boggus</a>
		<div tabindex="0" class="sandwich-icon" on:click={toggleMenu} on:keydown={toggleMenu}>
			<span>&#9776;</span>
		</div>

		<nav class="menu {showMenu ? 'show' : ''}">
			<a href="/about" class="nav-link">About</a>
			<a href="/doodles" class="nav-link">Code Doodles</a>
			<a href="/designs" class="nav-link">Designs</a>
		</nav>
		<Toggle store={isThreejsRunning}>3D</Toggle>
	</div>
</header>

<style>
	.fixed-width {
		max-width: 1200px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
	}
	.header {
		display: flex;
		background-color: #333;
		padding: 10px;
	}

	.logo {
		color: white;
		font-size: 24px;
		text-decoration: none;
		transition: .4s;
	}

	.menu {
		display: flex;
		justify-content: space-evenly;
		padding: 0 40px;
	}

	.nav-link:hover {
		border-color: #333;
	}

	.sandwich-icon {
		display: none;
		cursor: pointer;
	}

	nav {
		display: flex;
		gap: 15px;
	}
	a{
		color: white;
		transition: .4s;
		text-decoration: underline;
	}


	.nav-link,
	span{

	}
	a:hover{
		color:#FDBA3b;
	}

	/* Media query for mobile devices */
	@media (max-width: 767px) {
		.menu {
			display: block;
			background-color: #333;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			padding: 10px;
		}

		.sandwich-icon {
			display: block;
		}

		nav {
			display: none;
		}

		.menu.show {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
