<script lang="ts">
	export let title: string;
	export let sizingClass: string = '';
</script>

<div class="card {sizingClass}">
	<div class="card-content">
		<h3 class="card-title">{title}</h3>
		<slot />
	</div>
</div>

<style lang="postcss">
	.card {
		@apply bg-neutral-100 dark:bg-neutral-700;
		@apply border-2 border-neutral-50 dark:border-neutral-600;
		@apply flex rounded-lg p-6 drop-shadow-2xl;
		@apply text-neutral-700 dark:text-white;
	}

	.card-title {
		@apply text-3xl font-black pb-2;
		@apply select-none;
	}

	.card-content {
		@apply flex w-full flex-col;
	}
</style>
