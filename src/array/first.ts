/**
 * Returns the first element type of a tuple or array.
 *
 * @example
 * type Result = First<["a", "b", "c"]>;
 * // "a"
 */
export type First<T extends any[]> = T extends [infer R, ...any] ? R : never;
