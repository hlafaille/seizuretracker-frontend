<script>
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-neutral-50 dark:bg-neutral-800;
	}
</style>
