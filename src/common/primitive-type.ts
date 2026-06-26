/**
 * Primitive values that can be safely checked for redundant field overrides.
 *
 * Object types are intentionally excluded because TypeScript compares them
 * structurally, so an exported model type can accidentally match the DTO shape.
 */
export type PrimitiveType = string | number | boolean | bigint | symbol | null | undefined;
