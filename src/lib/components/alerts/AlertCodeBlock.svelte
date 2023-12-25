<script lang="ts">
	export let text: string | null = null;
	if (text === null) {
		text = 'Unspecified';
	}
</script>

<div class="alert-code">{text}</div>

<style lang="postcss">
	.alert-code {
		@apply overflow-y-auto;
		@apply bg-gray-700;
		@apply border-2 border-gray-500;
		@apply break-words text-base font-mono font-bold text-neutral-500 drop-shadow-lg;
		@apply rounded-lg p-2 drop-shadow-md;
	}
</style>
