/**
 * Prepends an element type to the beginning of a tuple or array.
 *
 * @example
 * type Result = Unshift<["b", "c"], "a">;
 * // ["a", "b", "c"]
 */
export type Unshift<T extends any[], E> = [E, ...T];
