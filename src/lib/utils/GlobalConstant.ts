import { RequestFactory } from '$lib/utils/requesthandler/RequestFactory';
import { PUBLIC_API_URL } from '$env/static/public'


export const REQUEST_FACTORY: RequestFactory = new RequestFactory(`${PUBLIC_API_URL}`)