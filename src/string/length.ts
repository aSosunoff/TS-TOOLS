import { Split } from "./";
import { Length as ArrayLength } from "../array";

/**
 * Returns the length of a string literal type.
 *
 * @example
 * type Result = Length<"hello">;
 * // 5
 *
 * @example
 * type Empty = Length<"">;
 * // 0
 */
export type Length<T extends string> = ArrayLength<Split<T, "">>;
