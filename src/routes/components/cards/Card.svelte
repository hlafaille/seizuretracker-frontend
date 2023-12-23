<script>
	/**@type {String} */
	export let title;
</script>

<div class="card">
	<div class="card-content">
		<h3 class="card-title">{title}</h3>
		<slot />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply bg-neutral-700;
		@apply border-2 border-neutral-600/25;
		@apply flex rounded-lg p-6 drop-shadow-2xl;
		@apply h-full w-full;
	}

	.card-title {
		@apply truncate whitespace-nowrap text-3xl font-bold text-white drop-shadow-lg;
		@apply select-none;
	}

	.card-content {
		@apply flex w-full flex-col;
	}
</style>
