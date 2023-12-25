<script lang="ts">
	import '../app.css';
</script>

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-neutral-100 font-semibold dark:bg-neutral-800;
	}
</style>
