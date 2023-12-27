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
	let loginRequestPayload: { email: string | undefined; password: string | undefined } = {
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

	let errorMessage: string | null = null;

	let isLoading: boolean = false;

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
		/**@type {string | null}*/
		errorMessage = null;
		/**@type {Response | null}*/
		let response: Response | null = null;
		isLoading = true;
		try {
			response = await sendPostRequest('http://localhost:8080/v1/auth/session', loginRequestPayload, false);
		} catch (e) {
			if (e instanceof Error) {
				errorMessage = e.message;
			}
		} finally {
			isLoading = false;
		}
		if (response?.status === 201) {
			isLoading = false;
			let responsePayload = await response.json();
			const expirationDate = new Date();
			expirationDate.setHours(expirationDate.getHours() + 3);
			document.cookie =
				'session=' +
				responsePayload.accessToken +
				'; expires=' +
				expirationDate.toUTCString() +
				'; path=/; domain=localhost; secure';
			goto('/');
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

<!-- Create Account Modal -->
<CreateAccountModal on:accountCreated={handleOnAccountCreated} bind:isActive={isCreateAccountModalActive} />

<!-- Page Content (login card, etc) -->
<FlexCenterContainer>
	<div class="m-4 w-full space-y-2 md:w-96">
		<div class={isLoading ? 'animate-pulse' : ''}>
			<Card title="Welcome">
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
