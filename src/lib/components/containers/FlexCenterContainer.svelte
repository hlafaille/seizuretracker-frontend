<script></script>

<div class="flex-center flex-center-base-z">
	<slot />
</div>

<style lang="postcss">
	.flex-center {
		@apply flex items-center justify-center w-full h-full;
	}

	.flex-center.flex-center-base-z * {
		position: relative; /* <-- relative may be a problem later */
		z-index: 0;
	}
</style>
