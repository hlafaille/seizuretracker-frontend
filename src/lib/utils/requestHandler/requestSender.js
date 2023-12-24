import { getHeaders } from './headers';

/**
 * Send an asynchronous GET request to the given URL with the given data
 * @param {string} url
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>}
 */
export async function sendGetRequest(url, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'GET',
		headers: getHeaders()
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous POST request to the given URL with the given data
 * @param {string} url
 * @param {object} data
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>}
 */
export async function sendPostRequest(url, data = {}, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'POST',
		headers: getHeaders(),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous PUT request to the given URL with the given data
 * @param {string} url
 * @param {object} data
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>}
 */
export async function sendPutRequest(url, data = {}, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'PUT',
		headers: getHeaders(),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return response;
}

/**
 * Send an asynchronous DELETE request to the given URL with the given data
 * @param {string} url
 * @param {boolean} sendAuthHeader - Send the `Authorization: Bearer abc` header
 * @returns {Promise<Response>}
 */
export async function sendDeleteRequest(url, sendAuthHeader = true) {
	const response = await fetch(url, {
		method: 'DELETE',
		headers: getHeaders()
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return response;
}
