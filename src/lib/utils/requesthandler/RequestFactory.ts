import { Request } from '$lib/utils/requesthandler/Request';
import { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
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
	private build<T>(
		endpoint: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request<T> {
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
	 * Build a GET request
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	public buildGetRequest<T>(
		endpoint: string, includeAuthorizationHeader: boolean, errorMessageStore: Writable<string | undefined>,
		inFlightStore: Writable<boolean>
	): Request<T> {
		return this.build(
			endpoint, HttpMethod.GET, includeAuthorizationHeader, null, errorMessageStore, inFlightStore
		);
	}

	/**
	 * Build a POST request
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	public buildPostRequest<T>(
		endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request<T> {
		return this.build(
			endpoint, HttpMethod.POST, includeAuthorizationHeader, requestPayload, errorMessageStore, inFlightStore
		);
	}

	/**
	 * Build a PUT request
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	public buildPutRequest<T>(
		endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request<T> {
		return this.build(
			endpoint, HttpMethod.PUT, includeAuthorizationHeader, requestPayload, errorMessageStore, inFlightStore
		);
	}

	/**
	 * Build a PATCH request
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	public buildPatchRequest<T>(
		endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object | null,
		errorMessageStore: Writable<string | undefined>, inFlightStore: Writable<boolean>
	): Request<T> {
		return this.build(
			endpoint, HttpMethod.PATCH, includeAuthorizationHeader, requestPayload, errorMessageStore, inFlightStore
		);
	}

	/**
	 * Build a DELETE request
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param errorMessageStore
	 * @param inFlightStore
	 */
	public buildDeleteRequest<T>(
		endpoint: string, includeAuthorizationHeader: boolean, errorMessageStore: Writable<string | undefined>,
		inFlightStore: Writable<boolean>
	): Request<T> {
		return this.build(
			endpoint, HttpMethod.DELETE, includeAuthorizationHeader, null, errorMessageStore, inFlightStore
		);
	}
}