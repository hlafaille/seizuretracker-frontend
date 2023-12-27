import { Request } from '$lib/utils/requestHandler/Request';
import { HttpMethod } from '$lib/utils/requestHandler/HttpMethod';

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
	 */
	private build(endpoint: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null): Request {
		return new Request(
			this.baseUrl + endpoint,
			httpMethod,
			includeAuthorizationHeader,
			requestPayload
		);
	}

	/**
	 *
	 * @param endpoint
	 * @param includeAuthorizationHeader
	 * @param requestPayload
	 */
	public buildPostRequest(endpoint: string, includeAuthorizationHeader: boolean, requestPayload: object): Request {
		return this.build(endpoint, HttpMethod.POST, includeAuthorizationHeader, requestPayload)
	}
}