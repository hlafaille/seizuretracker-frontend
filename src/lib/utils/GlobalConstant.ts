import { RequestFactory } from '$lib/utils/requesthandler/RequestFactory';

const apiUrl = import.meta.env.VITE_API_URL;
export const REQUEST_FACTORY: RequestFactory = new RequestFactory(`${apiUrl}`)