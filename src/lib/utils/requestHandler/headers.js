/**
 * Standardized request headers
 * @typedef {Object} RequestHeaders
 * @property {string} `Content-Type` - The `Content-Type`.
 * @property {string} [Authorization] - The authorization token.
 */

/**
 * Get the current `session` cookie as an `Authorization: Bearer` string
 * @returns {string}
 * @throws {Error}
 */
export function getSessionCookieAsBearer() {
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
