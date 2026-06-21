import { Split } from "./";

/**
 * Returns the character at the specified index in a string literal type.
 *
 * @example
 * type Result = At<"hello", 1>;
 * // "e"
 *
 * @example
 * type Missing = At<"hi", 5>;
 * // undefined
 */
export type At<S extends string, I extends number> = Split<S>[I];
