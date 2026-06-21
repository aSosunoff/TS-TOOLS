/**
 * Appends an element type to the end of a tuple or array.
 *
 * @example
 * type Result = Push<["a", "b"], "c">;
 * // ["a", "b", "c"]
 */
export type Push<T extends any[], E> = [...T, E];
