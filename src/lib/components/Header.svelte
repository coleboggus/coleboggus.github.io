<script>
	import Toggle from '$lib/components/Toggle.svelte';
	import isThreejsRunning from '../../stores/threeStores.js';
	let showMenu = false;

	const toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<header class="header">
	<a href="/" class="logo">Cole Boggus</a>
	<div tabindex="0" class="sandwich-icon" on:click={toggleMenu} on:keydown={toggleMenu}>
		<span>&#9776;</span>
	</div>
	<Toggle store={isThreejsRunning}>3D</Toggle>
	<nav class="menu {showMenu ? 'show' : ''}">
		<a href="/about" class="nav-link">About</a>
		<a href="/doodles" class="nav-link">Code Doodles</a>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		padding: 10px;
	}

	.logo {
		color: white;
		font-size: 24px;
		text-decoration: none;
	}

	.menu {
		display: none;
	}

	.sandwich-icon {
		display: none;
		cursor: pointer;
	}

	nav {
		display: flex;
		gap: 15px;
	}

	.nav-link,
	span {
		color: white;
		text-decoration: none;
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
