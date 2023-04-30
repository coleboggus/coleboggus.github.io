<!-- Header.svelte -->
<script>
	import { onMount } from 'svelte';
	let showMenu = false;

	const toggleMenu = () => {
		showMenu = !showMenu;
	};
</script>

<header class="header">
	<a href="/" class="logo">Your Logo</a>
	<div tabindex="0" class="sandwich-icon" on:click={toggleMenu} on:keydown={toggleMenu}>
		<span>&#9776;</span>
	</div>
	<nav class="menu {showMenu ? 'show' : ''}">
		<a href="/about" class="nav-link">About</a>
		<a href="/services" class="nav-link">Services</a>
		<a href="/contact" class="nav-link">Contact</a>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		padding: 10px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
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

	.nav {
		display: flex;
		gap: 15px;
	}

	.nav-link, span {
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

		.nav {
			display: none;
		}

		.menu.show {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
