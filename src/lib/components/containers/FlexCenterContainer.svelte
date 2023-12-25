<script lang="ts"></script>

<div class="flex-center flex-center-base-z">
	<slot />
</div>

<style lang="postcss">
	.flex-center {
		@apply flex h-full w-full items-center justify-center;
	}

	.flex-center.flex-center-base-z * {
		position: relative; /* <-- relative may be a problem later */
		z-index: 0;
	}
</style>
