/**
 * Basic wrapper around a primitive type to allow it to be passed by reference.
 */
export interface PrimitiveWrapper <T> {
	value: T | undefined
}