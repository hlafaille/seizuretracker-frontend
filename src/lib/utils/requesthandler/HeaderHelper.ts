import { getCookie } from '$lib/utils/CookieHandler';
import { STORE_AUTH_LOGIN_ERROR_MESSAGE } from '$lib/utils/GlobalStore';
import { goto } from '$app/navigation';
import { SessionCookieMissingError } from '$lib/utils/requesthandler/SessionCookieMissingError';

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
			STORE_AUTH_LOGIN_ERROR_MESSAGE.set("No session was detected for your device. Please log in.")
			goto("/auth/login")
			throw new SessionCookieMissingError();
		}
	}
	return requestHeaders;
}
