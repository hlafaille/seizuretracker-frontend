<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let id: string;
	export let text: string;
	export let url: string;
</script>

<button
	id={id + 'NavBarDrawerListItem'}
	class="nav-drawer-list-item"
	on:click={function () {
		goto(url);
	}}>{text}</button
>

<style lang="postcss">
	.nav-drawer-list-item {
		img {
			@apply w-10;
			@apply pr-3;
		}

		@apply transition-all;
		@apply pb-3 pl-3 pt-3;
		@apply h-min w-max;
		@apply flex flex-row;
		@apply text-2xl font-bold;
		@apply w-full;
		@apply select-none;
		@apply text-neutral-600 hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-white;
		@apply hover:bg-neutral-200 dark:hover:bg-neutral-800;
	}
</style>
