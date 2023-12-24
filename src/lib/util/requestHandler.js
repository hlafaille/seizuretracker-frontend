/**
 * Send an asynchronous GET request to the given URL with the given data
 * @param {string} url
 * @returns {Promise<Response>}
 */
export async function sendGetRequest(url) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
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
 * @returns {Promise<Response>}
 */
export async function sendPostRequest(url, data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
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
 * @returns {Promise<Response>}
 */
export async function sendPutRequest(url, data = {}) {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
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
 * @returns {Promise<Response>}
 */
export async function sendDeleteRequest(url) {
	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		throw new Error((await response.json()).message);
	}
	return response;
}
