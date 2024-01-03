import { type Writable, writable } from 'svelte/store';

// Globally set an error message on /auth/login
export const STORE_AUTH_LOGIN_ERROR_MESSAGE: Writable<string | undefined> = writable(undefined);