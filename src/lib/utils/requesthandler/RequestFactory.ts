import { Request } from '$lib/utils/requesthandler/Request';
import { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';

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
	 * @param requestStatePropContext
	 */
	private build(
		endpoint: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null,
		requestStatePropContext: RequestStatePropContext
	): Request {
		return new Request(
			this.baseUrl + endpoint,
			httpMethod,
			includeAuthorizationHeader,
			requestPayload,
			requestStatePropContext
		);
	}

	/**
	 *
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 * @param requestStatePropContext
	 */
	public buildPostRequest(
		endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object | null,
		requestStatePropContext: RequestStatePropContext
	): Request {
		return this.build(endpoint, HttpMethod.POST, includeAuthorizationHeader, requestPayload, requestStatePropContext)
	}
}