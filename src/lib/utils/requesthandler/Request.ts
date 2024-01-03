import type { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
import { getHeaders } from '$lib/utils/requesthandler/HeaderHelper';
import { RequestError } from '$lib/utils/requesthandler/RequestError';
import type { Writable } from 'svelte/store';
import { env } from '$env/dynamic/public';
import { STORE_AUTH_LOGIN_ERROR_MESSAGE } from '$lib/utils/GlobalStore';
import { goto } from '$app/navigation';


export class Request<T> {
	private readonly fullUrl: string;
	private readonly httpMethod: HttpMethod;
	private readonly includeAuthorizationHeader: boolean;
	private readonly requestPayload: object | null;
	private readonly errorMessageStore: Writable<string | undefined>;
	private readonly inFlightStore: Writable<boolean>;

	constructor(
		fullUrl: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>) {
		this.fullUrl = fullUrl;
		this.httpMethod = httpMethod;
		this.includeAuthorizationHeader = includeAuthorizationHeader;
		this.requestPayload = requestPayload;
		this.errorMessageStore = errorMessageStore;
		this.inFlightStore = inFlightStore;
	}

	/**
	 * Send the request
	 * @throws RequestError
	 */
	public async doRequest(): Promise<T> {
		// set the base state
		this.errorMessageStore.set(undefined);
		this.inFlightStore.set(true);

		try {
			// make the request
			let response = await fetch(this.fullUrl, {
				method: this.httpMethod,
				headers: getHeaders(this.includeAuthorizationHeader),
				body: JSON.stringify(this.requestPayload)
			});

			let jsonResponse = await response.json();

			// handle any unauthorized / forbidden / internal server errors
			if (response.status == 401 || response.status == 403) {
				STORE_AUTH_LOGIN_ERROR_MESSAGE.set('Your login has been invalidated. Please re-login.');
				await goto('/auth/login');
				throw new RequestError('Unauthorized or forbidden access');
			} else if (response.status == 500) {
				throw new RequestError(jsonResponse.message);
			}

			// handle response
			if (!response.ok) {
				throw new RequestError(jsonResponse.message);
			}
			return <T>jsonResponse;
		} catch (e) {
			if (e instanceof RequestError) {
				this.errorMessageStore.set(e.message);
			} else if (e instanceof TypeError) {
				let errorMessage = e.message.toLowerCase();
				if (errorMessage.includes('failed') || errorMessage.includes('error')) {
					STORE_AUTH_LOGIN_ERROR_MESSAGE.set('Unable to communicate with the server. Please check your network connection.');
					await goto('/auth/login');
				}
			} else if (e instanceof Error) {
				this.errorMessageStore.set('An internal error has occurred.');
			}
			throw e;
		} finally {
			// set the component in flight prop to false
			this.inFlightStore.set(false);
		}
	}
}