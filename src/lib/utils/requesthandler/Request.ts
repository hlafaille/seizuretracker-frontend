import type { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
import { getHeaders } from '$lib/utils/requesthandler/HeaderHelper';
import { RequestError } from '$lib/utils/requesthandler/RequestError';
import type { Writable } from 'svelte/store';


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

			// handle any unauthorized / forbidden errors
			if (response.status == 401 || response.status == 403) {
				throw new RequestError('Unauthorized or forbidden access');
			}

			// handle response
			let jsonResponse = await response.json(); // <-- this might cause an issue if .json() is only callable once
			if (!response.ok) {
				throw new RequestError(jsonResponse.message);
			}
			return <T>jsonResponse;
		} catch (e) {
			if (e instanceof RequestError) {
				this.errorMessageStore.set(e.message);
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