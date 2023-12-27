import type { HttpMethod } from '$lib/utils/requestHandler/HttpMethod';
import {getHeaders} from '$lib/utils/requestHandler/HeaderHelper';
import type { RequestStatePropContext } from '$lib/utils/requestHandler/RequestStatePropContext';
import { RequestError } from '$lib/utils/requestHandler/RequestError';

export class Request {
	private readonly fullUrl: string;
	private readonly httpMethod: HttpMethod;
	private readonly includeAuthorizationHeader: boolean;

	constructor(fullUrl: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean) {
		this.fullUrl = fullUrl;
		this.httpMethod = httpMethod;
		this.includeAuthorizationHeader = includeAuthorizationHeader;
	}

	/**
	 * Send the request
	 * @param context
	 */
	public async doRequest(context: RequestStatePropContext): Promise<Response> {
		// set the component inFlight prop to true
		context.inFlightProp = true;

		// make the request
		const response = await fetch(this.fullUrl, {
			method: this.httpMethod,
			headers: getHeaders(this.includeAuthorizationHeader)
		});

		// set the component in flight prop to true
		context.inFlightProp = false;

		// handle any unauthorized / forbidden errors
		if (response.status == 401 || response.status == 403) {
			return Promise.reject(new RequestError('Unauthorized or forbidden access'));
		}

		// if the response was not ok, set the component errorMessage prop to our responses message
		let jsonResponse = await response.json() // <-- this might cause an issue if .json() is only callable once
		if (!response.ok) {
			context.errorMessageProp = jsonResponse.message
		}
		return response;
	}
}