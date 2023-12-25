<script lang="ts">
	import AlertDanger from '$lib/components/tk/alerts/AlertDanger.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import EmailLineEdit from '$lib/components/inputs/EmailLineEdit.svelte';
	import LineEdit from '$lib/components/inputs/LineEdit.svelte';
	import PasswordLineEdit from '$lib/components/inputs/PasswordLineEdit.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { sendPostRequest } from '$lib/utils/requestHandler/requestSender';
	import { createEventDispatcher } from 'svelte';

	/**
	 * TYPES
	 */

	/**
	 * POST /v1/users request payload
	 */
	interface CreateAccountRequest {
		firstName: string | undefined;
		lastName: string | undefined;
		emailAddress: string | undefined;
		password: string | undefined;
	}

	/**
	 * POST /v1/users request response
	 */
	interface CreateAccountResponse {
		userId: string | undefined;
	}

	/**
	 * EVENTS
	 */
	const dispatch = createEventDispatcher();

	/**
	 * PROPS
	 */
	export let errorMessage: string | null = null;
	export let inFlight: boolean = false;
	export let isActive: boolean = false;
	let response: Response | null = null;
	let requestPayload: CreateAccountRequest = {
		firstName: undefined,
		lastName: undefined,
		emailAddress: undefined,
		password: undefined
	};

	/**
	 * Clears the error message
	 */
	async function clearErrorMessage() {
		errorMessage = null;
	}
	/**
	 * Send the request to create an account
	 */
	async function sendRequest() {
		// set the base state for the request
		clearErrorMessage();
		inFlight = true;

		/**@type {Response | null}*/
		response = null;

		//  do the request
		try {
			response = await sendPostRequest('http://localhost:8080/v1/users', requestPayload, false);
		} catch (e) {
			if (e instanceof Error) {
				errorMessage = e.message;
			}
		} finally {
			inFlight = false;
		}
		// emit the account created event
		/**@type {CreateAccountResponse}*/
		let responsePayload: CreateAccountResponse = await response?.json();
		dispatch('accountCreated', responsePayload);
	}
</script>

<Modal title="Create an Account" bind:isActive>
	<div class="grid-rows-auto grid gap-2">
		{#if errorMessage}
			<AlertDanger on:click={clearErrorMessage} text={errorMessage} />
		{/if}
		<div class="grid grid-cols-2 gap-2">
			<LineEdit id="createAccountFirstName" placeholder="First Name" bind:text={requestPayload.firstName} />
			<LineEdit id="createAccountLastName" placeholder="Last Name" bind:text={requestPayload.lastName} />
		</div>
		<EmailLineEdit id="createAccountEmailAddress" placeholder="Email" bind:text={requestPayload.emailAddress} />
		<PasswordLineEdit id="createAccountPassword" placeholder="Password" bind:text={requestPayload.password} />
		<Button id="createAccountSubmit" text="Submit" on:click={sendRequest} />
	</div>
</Modal>

<style></style>
