import { SessionCookieMissingError } from './errors';
/**
 * Standardized request headers
 * @typedef {Object} RequestHeaders
 * @property {string} `Content-Type` - The `Content-Type`.
 * @property {string} [Authorization] - The `Authorization: Bearer abc`.
 */

/**
 * Get the current `session` cookie as an `Authorization: Bearer` string.
 * @returns {string} `Authorization: Bearer` header string
 * @throws {Error | SessionCookieMissingError}
 */
export function getSessionCookieAsBearer() {
	if (typeof document === 'undefined') {
		throw new Error('`document` is undefined, you may have broken SSR');
	}
	const allCookies = document.cookie;
	const cookies = Object.fromEntries(
		allCookies.split('; ').map((cookie) => {
			const [name, value] = cookie.split('=');
			return [name, decodeURIComponent(value)];
		})
	);
	const specificCookieValue = cookies['session'];
	if (specificCookieValue === undefined) {
		throw new SessionCookieMissingError();
	}
	return 'Authorization: Bearer ' + specificCookieValue;
}

/**
 * Get an object of headers to send
 * @param {boolean} authHeader
 * @returns {RequestHeaders}
 */
export function getHeaders(authHeader = true) {
	/**@type {RequestHeaders} */
	let requestHeaders = {
		'Content-Type': 'application/json'
	};
	if (authHeader) {
		/**@type {string | null} */
		let authorizationHeader = getSessionCookieAsBearer();

		if (authorizationHeader) {
			/**@type {string} */
			requestHeaders['Authorization'] = authorizationHeader;
		}
	}
	return requestHeaders;
}
