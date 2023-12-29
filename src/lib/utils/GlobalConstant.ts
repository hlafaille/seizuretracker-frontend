import { RequestFactory } from '$lib/utils/requesthandler/RequestFactory';
import { env } from '$env/dynamic/private';


export const REQUEST_FACTORY: RequestFactory = new RequestFactory(`${env.PUBLIC_API_URL}`)