<script lang="ts">
	import { browser } from '$app/environment';
	import NavBarDrawerUserSection from './NavBarDrawerUserSection.svelte';
	export let navbarTitle: string = 'SeizureTracker';
	if (browser) {
		let navBarDrawer: HTMLElement | null = document.getElementById('navBarDrawer');
	}
	export let isDrawerActive: boolean = false;

	/**
	 * Simply toggles `drawerEnabled`
	 */
	function toggleHamburger() {
		console.log(isDrawerActive);
		if (isDrawerActive) {
			isDrawerActive = false;
		} else {
			isDrawerActive = true;
		}
	}
</script>

{#if isDrawerActive}
	<div id="drawer-bg" class="nav-drawer-bg" />
	<div id="drawer" class="nav-drawer">
		<div class="nav-drawer-list">
			<NavBarDrawerUserSection />
			<slot />
		</div>
	</div>
{/if}

<div class="navbar">
	<button id="navBarHamburger" on:click={toggleHamburger} class="navbar-hamburger">☰</button>
	<h3 class="navbar-title">{navbarTitle}</h3>
</div>

<style lang="postcss">
	.nav-container {
		@apply flex;
	}
	.navbar {
		@apply bg-neutral-200 dark:bg-neutral-700;
		@apply w-full p-3 drop-shadow-lg;
		@apply fixed border-b-2 border-l-2 border-r-2 border-neutral-300 dark:border-neutral-600/25;
		@apply flex;
		@apply text-neutral-600 dark:text-neutral-100;
		z-index: 10;
	}

	.navbar-title {
		@apply w-min truncate whitespace-nowrap pl-4 pr-4 text-2xl font-bold;
		@apply select-none;
	}

	.navbar .navbar-hamburger {
		@apply w-auto truncate whitespace-nowrap text-2xl font-black  transition-colors hover:text-neutral-400;
		@apply select-none;
	}

	.nav-drawer {
		@apply fixed h-full w-screen bg-neutral-300 text-white lg:w-96 dark:bg-neutral-900;
		@apply border-r-2 border-neutral-600/50;
		@apply flex flex-col space-y-4 drop-shadow-2xl;
		z-index: 9;
	}

	.nav-drawer-bg {
		@apply fixed h-full w-screen bg-neutral-400/50 backdrop-blur-lg dark:bg-neutral-900/50;
		z-index: 8;
	}

	.nav-drawer .nav-drawer-list {
		@apply mt-[3.5rem];
		@apply w-full;
		@apply flex flex-col;
	}
</style>
