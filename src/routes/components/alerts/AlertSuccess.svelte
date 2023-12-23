<script>
	export let text = 'Unspecified';
</script>

<div class="alert-success">{text}</div>

<style lang="postcss">
	.alert-success {
		@apply overflow-y-auto;
		@apply bg-green-600;
		@apply border-2 border-green-500;
		@apply break-words text-base font-bold text-white drop-shadow-lg;
		@apply rounded-lg p-2 drop-shadow-md;
	}
</style>
