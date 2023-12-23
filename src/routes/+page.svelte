<script>
	import NavBar from './components/nav/NavBar.svelte';
</script>

<NavBar>
	<div slot="items">
		<a href="#">Test</a>
		<a href="#">Test</a>
		<a href="#">Test</a>
		<a href="#">Test</a>
		<a href="#">Test</a>
	</div>
</NavBar>

<style lang="postcss">
	:global(html) {
		@apply bg-neutral-50 dark:bg-neutral-800;
	}
</style>
