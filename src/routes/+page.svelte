<script>
	import Card from './components/Card.svelte';
</script>

<html lang="en">
	<Card title="Hello World">
		<p>Poop</p>
	</Card>
</html>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
