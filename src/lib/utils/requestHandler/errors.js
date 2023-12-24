/**
 * Custom error class for when the session cookie is missing.
 *
 * @class
 * @extends {Error}
 */
class SessionCookieMissingError extends Error {
	constructor() {
		super('Session cookie is missing from client');
		this.name = 'SessionCookieMissingError';
	}
}
