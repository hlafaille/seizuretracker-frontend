<script>
	import Button from '$lib/components/buttons/Button.svelte';
	import { sendPostRequest } from '$lib/util/requestHandler';
	import Card from '$lib/components/cards/Card.svelte';
	import FlexCenterContainer from '$lib/components/containers/FlexCenterContainer.svelte';
	import LineEdit from '$lib/components/inputs/LineEdit.svelte';
	import AlertDanger from '$lib/components/alerts/AlertDanger.svelte';
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	import Modal from '$lib/components/modals/Modal.svelte';
	import AlertCodeBlock from '$lib/components/alerts/AlertCodeBlock.svelte';
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
			response = await sendPostRequest('http://localhost:8080/v1/auth/session', requestPayload);
		} catch (e /**@type {Error} */) {
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

{#if errorMessage}
	<Modal title="Uh-oh!">
		<div class="flex flex-col space-y-2">
			<p>Looks like there was an error...</p>
			<AlertCodeBlock text={errorMessage} />
		</div>
	</Modal>
{/if}

<FlexCenterContainer>
	<div class="m-4 w-full md:w-96 space-y-2">
		<div class={isLoading ? 'animate-pulse' : ''}>
			<Card title="Welcome">
				<div class="flex flex-col space-y-2">
					<LineEdit id="emailAddress" placeholder="Email" bind:text={requestPayload.email} />
					<LineEdit id="password" placeholder="Password" bind:text={requestPayload.password} />
					<Button id="logIn" text="Log In" on:click={doLogin} />
				</div>
			</Card>
		</div>
	</div>
</FlexCenterContainer>

<style lang="postcss">
</style>
