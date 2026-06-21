/**
 * Extracts the item type from an array type.
 *
 * @example
 * type Result = ArrayType<string[]>;
 * // string
 */
export type ArrayType<T> = T extends Array<infer U> ? U : never;
