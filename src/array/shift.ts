/**
 * Removes the first element type from a tuple or array.
 *
 * @example
 * type Result = Shift<["a", "b", "c"]>;
 * // ["b", "c"]
 */
export type Shift<T extends any[]> = T extends [any, ...infer R] ? R : never;
