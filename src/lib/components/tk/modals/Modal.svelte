<script lang="ts">
	import { onMount } from 'svelte';
	export let title: string = 'Modal';
	export let isActive: boolean = true;
	export let sizingClass: string = 'w-full md:w-[32rem]';

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
	function handleKeyPress(event: KeyboardEvent) {
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
			<div class="flex w-full flex-col">
				<div class="flex flex-row">
					<h3 class="modal-title">{title}</h3>
					<button class="modal-close-button" on:click={toggleModal}>X</button>
				</div>
				<slot class="modal-content" />
			</div>
		</div>
		<div role="button" tabindex="0" on:keydown={handleKeyPress} on:click={toggleModal} class="modal-bg"></div>
		<div role="button" tabindex="0" on:keydown={handleKeyPress} on:click={toggleModal} class="modal-bg"></div>
	</div>
{/if}

<style lang="postcss">
	.modal-bg {
		@apply absolute h-screen w-screen bg-neutral-900/20 p-2 backdrop-blur-lg;
	}

	.modal-container {
		@apply absolute left-0 top-0 flex h-screen w-screen items-center justify-center p-2;
		z-index: 20;
	}

	.modal {
		@apply bg-neutral-100 dark:bg-neutral-700;
		@apply border-2 border-neutral-50 dark:border-neutral-600;
		@apply flex rounded-lg p-6 drop-shadow-2xl;
		@apply text-neutral-600 dark:text-white;
		z-index: 30;
	}

	.modal-title {
		@apply pb-2 text-3xl font-black;
		@apply select-none;
		@apply w-full;
	}

	.modal-content {
		@apply flex w-full flex-col;
	}

	.modal-close-button {
		@apply hover:text-neutral-100 h-min w-min text-xl font-black text-neutral-400 dark:text-neutral-600 dark:hover:text-neutral-500;
		@apply transition-all;
	}
</style>
