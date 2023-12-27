/**
 * An object with keys that contain props from your component. These keys will be updated during the request lifetime,
 * which will update your component props.
 */
export interface RequestStatePropContext {
	'errorMessageProp': string | null,
	'inFlightProp': boolean | null,
}