<script>
	/**@type {string | null}*/
	export let text = null;
	if (text === null) {
		text = 'Unspecified';
	}
</script>

<button class="alert-danger" on:click>{text}</button>

<style lang="postcss">
	.alert-danger {
		@apply overflow-y-auto;
		@apply bg-red-700 hover:bg-red-600;
		@apply border-2 border-red-500;
		@apply break-words text-base font-bold text-white drop-shadow-lg;
		@apply rounded-lg p-2 drop-shadow-md;
		@apply transition-all;
	}
</style>
