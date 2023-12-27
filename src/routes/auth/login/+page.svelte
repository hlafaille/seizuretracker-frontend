<script lang="ts">
	import Button from '$lib/components/tk/buttons/Button.svelte';
	import Card from '$lib/components/tk/cards/Card.svelte';
	import FlexCenterContainer from '$lib/components/tk/containers/FlexCenterContainer.svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/tk/modals/Modal.svelte';
	import AlertCodeBlock from '$lib/components/tk/alerts/AlertCodeBlock.svelte';
	import EmailLineEdit from '$lib/components/tk/inputs/EmailLineEdit.svelte';
	import PasswordLineEdit from '$lib/components/tk/inputs/PasswordLineEdit.svelte';
	import CreateAccountModal from './CreateAccountModal.svelte';
	import AlertSuccess from '$lib/components/tk/alerts/AlertSuccess.svelte';
	import { REQUEST_FACTORY } from '$lib/utils/GlobalConstant';
	import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';
	import { addCookie } from '$lib/utils/CookieHandler';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { boolean } from 'joi';

	export let loginRequestPayload: { email: string | undefined; password: string | undefined } = {
		email: undefined,
		password: undefined
	};


	let createAccountRequestPayload: {
		firstName: string | undefined;
		lastName: string | undefined;
		email: string | undefined;
		password: string | undefined;
	} = {
		firstName: undefined,
		lastName: undefined,
		email: undefined,
		password: undefined
	};

	const errorMessage = writable(undefined);
	export let requestStatePropContext: RequestStatePropContext = {
		'errorMessageProp': { value: undefined },
		'inFlightProp': { value: false }
	};
	export let inFlight: boolean | undefined = requestStatePropContext.inFlightProp.value;

	let isCreateAccountModalActive: boolean = false;

	let newAccountCreated: boolean = false;

	/**
	 * Toggles the CreateAccount modal
	 */
	function toggleCreateAccountModal() {
		isCreateAccountModalActive = !isCreateAccountModalActive;
	}

	/**
	 * Called from the `accountCreated` event on the `CreateAccountModal` component. This function will toggle the modal closed,
	 * along with showing an alert
	 */
	function handleOnAccountCreated() {
		toggleCreateAccountModal();
		newAccountCreated = true;
	}

	/**
	 * Send the request to log in
	 */
	async function doLogin() {
		let request = REQUEST_FACTORY.buildPostRequest('/auth/session', false, loginRequestPayload, requestStatePropContext);
		try {
			let response = await request.doRequest();
			if (response.status === 201) {
				let responsePayload = await response.json();
				const expirationDate = new Date();
				expirationDate.setHours(expirationDate.getHours() + 3);
				addCookie('session', responsePayload.accessToken, expirationDate);
				await goto('/');
			}
		} catch (ignored) {
		} finally {
			console.log('@Exception type of errorMessage ' + typeof requestStatePropContext.errorMessageProp.value);
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

<!-- Create Account Modal -->
<CreateAccountModal on:accountCreated={handleOnAccountCreated} bind:isActive={isCreateAccountModalActive} />

<!-- Page Content (login card, etc) -->
<FlexCenterContainer>
    <div class="m-4 w-full space-y-2 md:w-96">
        <div class={requestStatePropContext.inFlightProp.value ? 'animate-pulse' : ''}>
            <Card title="Welcome">
                {#if requestStatePropContext.errorMessageProp.value}
                    <p>CUM</p>
                {/if}
                <!-- Account Created Alert -->
                <div class="flex flex-col space-y-2">
                    {#if newAccountCreated}
                        <AlertSuccess text="Account Created" />
                    {/if}
                    <EmailLineEdit id="emailAddress" placeholder="Email" bind:text={loginRequestPayload.email} />
                    <PasswordLineEdit id="password" placeholder="Password" bind:text={loginRequestPayload.password} />
                    <div class="grid grid-cols-2 gap-2">
                        <Button id="createAccount" text="Create Account" on:click={toggleCreateAccountModal} />
                        <Button id="logIn" text="Log In" on:click={doLogin} />
                    </div>
                </div>
            </Card>
        </div>
    </div>
</FlexCenterContainer>

<style lang="postcss">
</style>
