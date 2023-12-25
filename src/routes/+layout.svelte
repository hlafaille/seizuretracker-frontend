<script lang="ts">
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-neutral-100 dark:bg-neutral-800 font-semibold;
	}
</style>
