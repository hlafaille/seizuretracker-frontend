<script>
	import AlertDanger from '$lib/components/alerts/AlertDanger.svelte';
	import AlertSuccess from '$lib/components/alerts/AlertSuccess.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import EmailLineEdit from '$lib/components/inputs/EmailLineEdit.svelte';
	import LineEdit from '$lib/components/inputs/LineEdit.svelte';
	import PasswordLineEdit from '$lib/components/inputs/PasswordLineEdit.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { sendPostRequest } from '$lib/utils/requestHandler/requestSender';
	import { text } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';

	/**
	 * TYPES
	 */

	/**
	 * POST /v1/users request payload
	 * @typedef {Object} CreateAccountRequest
	 * @property {string | undefined} firstName - The users first name
	 * @property {string | undefined} lastName - The users last name
	 * @property {string | undefined} emailAddress - The users Email Address
	 * @property {string | undefined} password - The users password
	 */

	/**
	 * POST /v1/users request response
	 * @typedef {Object} CreateAccountResponse
	 * @property {string | undefined} userId - The new users UUID
	 */

	/**
	 * EVENTS
	 */
	const dispatch = createEventDispatcher();

	/**
	 * PROPS
	 */
	/**@type {string | null} - Error message from the request or an Error*/
	export let errorMessage = null;
	/**@type {boolean} - If the request is currently in processing*/
	export let inFlight = false;
	/**@type {Response | null} */
	let response = null;
	/**@type {CreateAccountRequest} - Object representing the request payload*/
	let requestPayload = {
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
			errorMessage = e.message;
		} finally {
			inFlight = false;
		}
		// emit the account created event
		/**@type {CreateAccountResponse}*/
		let responsePayload = await response?.json();
		dispatch('accountCreated', responsePayload);
	}
</script>

<Modal title="Create an Account">
	<div class="grid grid-rows-auto gap-2">
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
