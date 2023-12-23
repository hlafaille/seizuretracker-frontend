<script>
	import Button from '$lib/components/buttons/Button.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import FlexCenterContainer from '$lib/components/containers/FlexCenterContainer.svelte';
	import LineEdit from '$lib/components/inputs/LineEdit.svelte';
</script>

<FlexCenterContainer>
	<Card title="Welcome" sizingClass="m-4 w-full md:w-96">
		<LineEdit id="emailAddress" placeholder="Email" />
		<Button id="logIn" text="Log In" />
	</Card>
</FlexCenterContainer>

<style lang="postcss">
</style>
