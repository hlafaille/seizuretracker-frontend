/**
 * Custom error class for when the server responds with an error.
 */
export class RequestError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'RequestError';
	}
}
