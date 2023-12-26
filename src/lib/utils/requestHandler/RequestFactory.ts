import { Request } from '$lib/utils/requestHandler/Request';
import type { HttpMethod } from '$lib/utils/requestHandler/HttpMethod';

/**
 * A factory object mimicking Java syntax for building a Rest Request.
 */
export class RequestFactory {
	private readonly baseUrl: string;
	private readonly includeAuthorizationHeader;

	constructor(baseUrl: string, includeAuthorizationHeader: boolean) {
		this.baseUrl = baseUrl;
		this.includeAuthorizationHeader = includeAuthorizationHeader;
	}

	/**
	 * Build a Request object
	 * @param endpoint
	 * @param httpMethod
	 */
	public buildRestRequest(endpoint: string, httpMethod: HttpMethod): Request {
		return new Request(
			this.baseUrl + endpoint,
			httpMethod,
			this.includeAuthorizationHeader
		);
	}
}