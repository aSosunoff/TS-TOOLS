/**
 * Returns the length of a tuple or array type.
 *
 * @example
 * type Result = Length<["a", "b", "c"]>;
 * // 3
 */
export type Length<T extends any[]> = T["length"];
