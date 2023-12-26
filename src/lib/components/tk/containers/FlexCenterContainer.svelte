<script lang="ts"></script>

<div class="flex-center">
	<slot />
</div>

<style lang="postcss">
	.flex-center {
		@apply flex items-center justify-center;
		height: 100vh;
	}
</style>
