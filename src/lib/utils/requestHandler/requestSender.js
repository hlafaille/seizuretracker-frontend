import { goto } from '$app/navigation';
import { getHeaders } from './headers';

/**
 * Send an asynchronous GET request to the given URL with the given data
 * @param {string} url
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>} - Promise containing a `Response`
 */
export async function sendGetRequest(url, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'GET',
		headers: getHeaders(sendAuthHeader)
	});
	if (!response.ok) {
		// this may cause a problem :/
		if (response.status == 401 || response.status == 403) {
			goto('/auth/login');
			return Promise.reject(new Error('Unauthorized access'));
		}
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous POST request to the given URL with the given data
 * @param {string} url
 * @param {object} data
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>} - Promise containing a `Response`
 */
export async function sendPostRequest(url, data = {}, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'POST',
		headers: getHeaders(sendAuthHeader),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		// this may cause a problem :/
		if (response.status == 401 || response.status == 403) {
			goto('/auth/login');
			return Promise.reject(new Error('Unauthorized access'));
		}
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous PUT request to the given URL with the given data
 * @param {string} url
 * @param {object} data
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>} - Promise containing a `Response`
 */
export async function sendPutRequest(url, data = {}, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'PUT',
		headers: getHeaders(sendAuthHeader),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		// this may cause a problem :/
		if (response.status == 401 || response.status == 403) {
			goto('/auth/login');
			return Promise.reject(new Error('Unauthorized access'));
		}
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous DELETE request to the given URL with the given data
 * @param {string} url
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>} - Promise containing a `Response`
 */
export async function sendDeleteRequest(url, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'DELETE',
		headers: getHeaders(sendAuthHeader)
	});
	if (!response.ok) {
		// this may cause a problem :/
		if (response.status == 401 || response.status == 403) {
			goto('/auth/login');
			return Promise.reject(new Error('Unauthorized access'));
		}
		throw new Error((await response.json()).message);
	}
	return response;
}
