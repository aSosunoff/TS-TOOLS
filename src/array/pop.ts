/**
 * Removes the last element type from a tuple or array.
 *
 * @example
 * type Result = Pop<["a", "b", "c"]>;
 * // ["a", "b"]
 */
export type Pop<T extends any[]> = T extends [...infer R, any] ? R : never;
