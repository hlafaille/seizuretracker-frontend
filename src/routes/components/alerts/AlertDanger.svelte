<script>
	export let text = 'Unspecified';
</script>

<div class="alert-danger">{text}</div>

<style lang="postcss">
	.alert-danger {
		@apply overflow-y-auto;
		@apply bg-red-700;
		@apply border-2 border-red-500;
		@apply break-words text-base font-bold text-white drop-shadow-lg;
		@apply rounded-lg p-2 drop-shadow-md;
	}
</style>
