<script>
	/**@type {string}*/
	export let id;
	/**@type {string}*/
	export let text;
</script>

<button id="{id}Button" class="button" on:click>{text}</button>

<style lang="postcss">
	.button {
		outline: none;
		@apply bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-700;
		@apply ring-zinc-200/[0.55] hover:ring-2 focus:ring-2 active:ring-0;
		@apply hover:-translate-y-0.5 active:translate-y-0.5;
		@apply transition-all;
		@apply whitespace-nowrap text-center font-semibold text-neutral-200 hover:text-white active:text-neutral-300;
		@apply flex w-full items-center justify-center rounded-lg p-3;
		@apply drop-shadow-sm hover:drop-shadow-2xl;
	}
</style>
