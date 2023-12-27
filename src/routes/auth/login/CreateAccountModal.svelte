<script lang="ts">
	import AlertDanger from '$lib/components/tk/alerts/AlertDanger.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import EmailLineEdit from '$lib/components/tk/inputs/EmailLineEdit.svelte';
	import LineEdit from '$lib/components/tk/inputs/LineEdit.svelte';
	import PasswordLineEdit from '$lib/components/tk/inputs/PasswordLineEdit.svelte';
	import Modal from '$lib/components/tk/modals/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { REQUEST_FACTORY } from '$lib/utils/GlobalConstant';
	import { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
	import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';

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
	function clearErrorMessage() {
		errorMessage = null;
	}
	/**
	 * Send the request to create an account
	 */
	async function doCreateAccount() {
		// set the base state for the request
		clearErrorMessage();

		let propContext: RequestStatePropContext = {
			'errorMessageProp': errorMessage,
			'inFlightProp': inFlight
		}
		let request = REQUEST_FACTORY.buildPostRequest("/auth/session", false, null, propContext)
		let responsePayload: object = (await request.doRequest()).json()
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
		<Button id="createAccountSubmit" text="Submit" on:click={doCreateAccount} />
	</div>
</Modal>

<style></style>
