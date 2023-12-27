import type { PrimitiveWrapper } from '$lib/utils/PrimitiveWrapper';

/**
 * An object with keys that contain props from your component. These keys will be updated during the request lifetime,
 * which will update your component props.
 */
export interface RequestStatePropContext {
	'errorMessageProp': PrimitiveWrapper<string>,
	'inFlightProp': PrimitiveWrapper<boolean>,
}