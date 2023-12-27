import { Request } from '$lib/utils/requesthandler/Request';
import { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';
import type { Writable } from 'svelte/store';

/**
 * A factory object mimicking Java syntax for building a Rest Request.
 */
export class RequestFactory {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Build a Request object
	 * @param endpoint
	 * @param httpMethod
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	private build(
		endpoint: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request {
		return new Request(
			this.baseUrl + endpoint,
			httpMethod,
			includeAuthorizationHeader,
			requestPayload,
			errorMessageStore,
			inFlightStore
		);
	}

	/**
	 *
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param errorMessageStore
	 */
	public buildPostRequest(
		endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request {
		return this.build(endpoint, HttpMethod.POST, includeAuthorizationHeader, requestPayload, errorMessageStore, inFlightStore);
	}
}