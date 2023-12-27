<script lang="ts">
	import AlertDanger from '$lib/components/tk/alerts/AlertDanger.svelte';
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import EmailLineEdit from '$lib/components/tk/inputs/EmailLineEdit.svelte';
	import LineEdit from '$lib/components/tk/inputs/LineEdit.svelte';
	import PasswordLineEdit from '$lib/components/tk/inputs/PasswordLineEdit.svelte';
	import Modal from '$lib/components/tk/modals/Modal.svelte';
	import { createEventDispatcher } from 'svelte';
	import { REQUEST_FACTORY } from '$lib/utils/GlobalConstant';
	import { writable, type Writable } from 'svelte/store';
	import type { CreateAccountRequest } from '$lib/dto/user/CreateAccountRequest';
	import type { CreateAccountResponse } from '$lib/dto/user/CreateAccountResponse';

	/**
	 * EVENTS
	 */
	const dispatch = createEventDispatcher();

	/**
	 * STORES
	 */
	let errorMessage: Writable<string | undefined> = writable(undefined);
	let inFlight: Writable<boolean> = writable(false);

	/**
	 * PROPS
	 */
	export let isActive: boolean = false;

	let requestPayload: CreateAccountRequest = {
		firstName: undefined,
		lastName: undefined,
		emailAddress: undefined,
		password: undefined
	};

	/**
	 * Clear the error message store
	 */
	function clearErrorMessage() {
		errorMessage.set(undefined);
	}

	/**
	 * Send the request to create an account
	 */
	async function doCreateAccount() {
		let request = REQUEST_FACTORY.buildPostRequest<CreateAccountResponse>(
			'/users/createAccount',
			false,
			requestPayload,
			errorMessage,
			inFlight,
		);
		let responsePayload = (await request.doRequest());
		dispatch('accountCreated', responsePayload);
	}
</script>

<Modal title="Create an Account" bind:isActive>
    <div class="grid-rows-auto grid gap-2">
        {#if $errorMessage}
            <AlertDanger on:click={clearErrorMessage} text={$errorMessage} />
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
