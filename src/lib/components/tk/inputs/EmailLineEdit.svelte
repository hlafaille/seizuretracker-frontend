<script lang="ts">
	export let id: string;
	export let placeholder: string = '';
	export let text: string = '';
</script>

<div class="line-edit">
	<input id="{id}LineEdit" bind:value={text} {placeholder} type="email" />
</div>

<style lang="postcss">
	.line-edit {
		input[type='email'] {
			outline: none;
			-webkit-appearance: none; /* for Chrome, Safari, and Opera */
			-moz-appearance: none; /* for Firefox */
			appearance: none; /* standard syntax */
			@apply bg-stone-800 hover:bg-stone-600/75 focus:bg-stone-500/75;
			@apply ring-stone-400/[0.55] hover:ring-2 focus:ring-2;
			@apply transition-all;
			@apply whitespace-nowrap font-semibold text-stone-100 hover:text-white;
			@apply flex w-full rounded-lg p-3;
			@apply drop-shadow-sm hover:drop-shadow-2xl focus:drop-shadow-2xl;
		}
	}
</style>
