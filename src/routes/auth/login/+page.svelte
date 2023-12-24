<script>
	import Button from '$lib/components/buttons/Button.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import FlexCenterContainer from '$lib/components/containers/FlexCenterContainer.svelte';
	import LineEdit from '$lib/components/inputs/LineEdit.svelte';

	/** @type {{ email: string | undefined, password: string | undefined }} */
	let requestPayload = {
		email: undefined,
		password: undefined
	};

	/**
	 * Send the AJAX request to log in
	 */
	async function sendRequest() {
		
	}
</script>

<FlexCenterContainer>
	<Card title="Welcome" sizingClass="m-4 w-full md:w-96">
		<div class="flex flex-col space-y-2">
			<LineEdit id="emailAddress" placeholder="Email" bind:text={requestPayload.email} />
			<LineEdit id="password" placeholder="Password" bind:text={requestPayload.password} />
			<Button id="logIn" text="Log In" on:click={}/>
		</div>
	</Card>
</FlexCenterContainer>

<style lang="postcss">
</style>
