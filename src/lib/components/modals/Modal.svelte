<script>
	import { onMount } from 'svelte';

	/**@type {string}*/
	export let title = 'Modal';

	/**@type {boolean}*/
	export let isActive = true;

	/**Class string for sizing @type {string}*/
	export let sizingClass = 'w-full md:w-[32rem]';

	function toggleModal() {
		if (isActive) {
			isActive = false;
		} else {
			isActive = true;
		}
	}

	/**
	 * Handle Key Presses
	 * @param {KeyboardEvent} event
	 */
	function handleKeyPress(event) {
		if (event.key === 'Escape' && isActive) {
			toggleModal();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	});
</script>

{#if isActive}
	<div class="modal-container">
		<div class="modal {sizingClass}">
			<div class="flex flex-col w-full">
				<div class="flex flex-row">
					<h3 class="modal-title">{title}</h3>
					<button class="modal-close-button" on:click={toggleModal}>X</button>
				</div>
				<slot class="modal-content" />
			</div>
		</div>
		<div role="button" tabindex="0" on:keydown={handleKeyPress} on:click={toggleModal} class="modal-bg"></div>
	</div>
{/if}

<style lang="postcss">
	.modal-bg {
		@apply absolute bg-neutral-900/50 backdrop-blur-md p-2 w-screen h-screen;
	}

	.modal-container {
		@apply absolute w-screen h-screen left-0 top-0 flex items-center justify-center;
		z-index: 20;
	}

	.modal {
		@apply bg-neutral-100 dark:bg-neutral-700;
		@apply border-2 border-neutral-50 dark:border-neutral-600;
		@apply flex rounded-lg p-6 drop-shadow-2xl;
		@apply text-neutral-700 dark:text-white;
		z-index: 30;
	}

	.modal-title {
		@apply text-3xl font-black pb-2;
		@apply select-none;
		@apply w-full;
	}

	.modal-content {
		@apply flex w-full flex-col;
	}

	.modal-close-button {
		@apply text-neutral-600 hover:text-neutral-500 text-xl font-black h-min w-min;
		@apply transition-all;
		/* @apply hidden sm:block; */
	}
</style>
