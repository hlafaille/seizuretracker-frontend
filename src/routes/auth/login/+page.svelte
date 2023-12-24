<script>
	import Button from '$lib/components/buttons/Button.svelte';
	import { sendPostRequest } from '$lib/utils/requestHandler/requestSender';
	import Card from '$lib/components/cards/Card.svelte';
	import FlexCenterContainer from '$lib/components/containers/FlexCenterContainer.svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/modals/Modal.svelte';
	import AlertCodeBlock from '$lib/components/alerts/AlertCodeBlock.svelte';
	import EmailLineEdit from '$lib/components/inputs/EmailLineEdit.svelte';
	import PasswordLineEdit from '$lib/components/inputs/PasswordLineEdit.svelte';
	/** @type {{ email: string | undefined, password: string | undefined }} */
	let requestPayload = {
		email: undefined,
		password: undefined
	};

	/**@type {string | null}*/
	let errorMessage = null;

	/**@type {boolean}*/
	let isLoading = false;

	/**
	 * Clears any queued error message
	 */
	function clearErrorMessage() {
		errorMessage = null;
	}

	/**
	 * Send the request to log in
	 */
	async function doLogin() {
		/**@type {string | null}*/
		errorMessage = null;
		/**@type {Response | null}*/
		let response = null;
		isLoading = true;
		try {
			response = await sendPostRequest('http://localhost:8080/v1/auth/session', requestPayload, false);
		} catch (e) {
			errorMessage = e.message;
		} finally {
			isLoading = false;
		}
		if (response?.status === 201) {
			isLoading = false;
			let responsePayload = await response.json();
			console.log(responsePayload);
			const expirationDate = new Date();
			expirationDate.setHours(expirationDate.getHours() + 3);
			document.cookie =
				'session=' +
				responsePayload.accessToken +
				'; expires=' +
				expirationDate.toUTCString() +
				'; path=/; domain=localhost; secure';
			goto('/home');
			return;
		}
	}
</script>

<!-- Error Modal -->
{#if errorMessage}
	<Modal title="Uh-oh!">
		<div class="flex flex-col space-y-2">
			<p>Looks like there was an error...</p>
			<AlertCodeBlock text={errorMessage} />
		</div>
	</Modal>
{/if}

<!-- Page Content (login card, etc) -->
<FlexCenterContainer>
	<div class="m-4 w-full md:w-96 space-y-2">
		<div class={isLoading ? 'animate-pulse' : ''}>
			<Card title="Welcome">
				<div class="flex flex-col space-y-2">
					<EmailLineEdit id="emailAddress" placeholder="Email" bind:text={requestPayload.email} />
					<PasswordLineEdit id="password" placeholder="Password" bind:text={requestPayload.password} />
					<Button id="logIn" text="Log In" on:click={doLogin} />
				</div>
			</Card>
		</div>
	</div>
</FlexCenterContainer>

<style lang="postcss">
</style>
