import type { HttpMethod } from '$lib/utils/requestHandler/HttpMethod';
import {getHeaders} from '$lib/utils/requestHandler/HeaderHelper';

export class Request {
	private readonly fullUrl: string;
	private readonly httpMethod: HttpMethod;
	private readonly includeAuthorizationHeader: boolean;

	constructor(fullUrl: string, httpMethod: HttpMethod, includeAuthorizationHeader: boolean) {
		this.fullUrl = fullUrl;
		this.httpMethod = httpMethod;
		this.includeAuthorizationHeader = includeAuthorizationHeader;
	}

	public async doRequest(): Promise<Response> {
		const response = await fetch(this.fullUrl, {
			method: this.httpMethod,
			headers: getHeaders(this.includeAuthorizationHeader)
		});
		if (!response.ok) {
			// todo figure out how to handle this at a page level, maybe there's some global component we can use?
			if (response.status == 401 || response.status == 403) {
				return Promise.reject(new Error('Unauthorized access'));
			}
			throw new Error((await response.json()).message);
		}
		return response;
	}
}