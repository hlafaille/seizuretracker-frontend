import { Request } from '$lib/utils/requestHandler/Request';
import type { HttpMethod } from '$lib/utils/requestHandler/HttpMethod';

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
	 */
	public build(endpoint: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean): Request {
		return new Request(
			this.baseUrl + endpoint,
			httpMethod,
			includeAuthorizationHeader
		);
	}
}