/**
 * Adds a cookie
 * @param name Name of the cookie
 * @param value Value of the cookie
 * @param expiresAt Date object of when it expires
 */
export function addCookie(name: string, value: string, expiresAt: Date) {
	document.cookie = `${name}=${value}; ${expiresAt.toUTCString()}; path=/`;
}

export function getCookie(name: string): string | null{
	let cookies: string[] = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i].trim().split('=');
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
}