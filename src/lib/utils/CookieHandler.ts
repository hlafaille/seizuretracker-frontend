/**
 * Adds a cookie
 * @param name Name of the cookie
 * @param value Value of the cookie
 * @param expiresAt Date object of when it expires
 */
export function addCookie(name: string, value: string, expiresAt: Date) {
	document.cookie = `${name}=${value}${expiresAt.toUTCString()}; path=/`;
}