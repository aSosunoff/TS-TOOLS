/**
 * Returns the last element type of a tuple or array.
 *
 * @example
 * type Result = Last<["a", "b", "c"]>;
 * // "c"
 */
export type Last<T extends any[]> = T extends [...unknown[], infer R] ? R : never;
