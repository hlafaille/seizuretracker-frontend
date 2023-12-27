import { getCookie } from '$lib/utils/CookieHandler';

/**
 * Get an object of headers to send
 * @param {boolean} authHeader
 * @returns {RequestHeaders}
 */
export function getHeaders(authHeader = true) {
	let requestHeaders: HeadersInit = {
		'Content-Type': 'application/json'
	};
	if (authHeader) {
		requestHeaders.Authorization = `Bearer ${getCookie('session')!}`;
	}
	return requestHeaders;
}
