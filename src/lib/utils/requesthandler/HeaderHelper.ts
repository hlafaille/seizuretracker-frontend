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
		let sessionCookieValue = getCookie('session')
		if (typeof sessionCookieValue == 'string') {
			requestHeaders.Authorization = `Bearer ${getCookie('session')!}`;
		} else {
			console.debug("session cookie value was null, ignoring")
		}
	}
	return requestHeaders;
}
