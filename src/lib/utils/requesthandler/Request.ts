import type { HttpMethod } from '$lib/utils/requesthandler/HttpMethod';
import { getHeaders } from '$lib/utils/requesthandler/HeaderHelper';
import type { RequestStatePropContext } from '$lib/utils/requesthandler/RequestStatePropContext';
import { RequestError } from '$lib/utils/requesthandler/RequestError';

export class Request {
	private readonly fullUrl: string;
	private readonly httpMethod: HttpMethod;
	private readonly includeAuthorizationHeader: boolean;
	private readonly requestPayload: object | null;
	private readonly requestStatePropContext: RequestStatePropContext;

	constructor(
		fullUrl: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean, requestPayload: object | null,
		requestStatePropContext: RequestStatePropContext) {
		this.fullUrl = fullUrl;
		this.httpMethod = httpMethod;
		this.includeAuthorizationHeader = includeAuthorizationHeader;
		this.requestPayload = requestPayload;
		this.requestStatePropContext = requestStatePropContext;
	}

	/**
	 * Send the request
	 * @throws RequestError
	 */
	public async doRequest(): Promise<Response> {
		// set the base state
		this.requestStatePropContext.errorMessageProp.value = undefined;
		this.requestStatePropContext.inFlightProp.value = true;

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
			return response;
		} catch (e) {
			if (e instanceof RequestError) {
				this.requestStatePropContext.errorMessageProp.value = e.message;
			} else if (e instanceof Error) {
				this.requestStatePropContext.errorMessageProp.value = 'An internal error has occurred.';
			}
			throw e;
		} finally {
			// set the component in flight prop to false
			this.requestStatePropContext.inFlightProp.value = false;
		}
	}
}