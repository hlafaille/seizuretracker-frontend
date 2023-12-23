<script></script>

<div class="flex-center flex-center-base-z">
	<slot />
</div>

<style lang="postcss">
	.flex-center {
		@apply flex items-center justify-center;
		height: 100vh;
		width: 100vw;
	}

	.flex-center * {
		max-width: 100vw;
		max-height: 100vh;
	}

	.flex-center.flex-center-base-z * {
		position: relative; /* <-- relative may be a problem later */
		z-index: 0;
	}
</style>
