import { Split } from "./";
import { Last as ArrayLast } from "../array";

/**
 * Returns the last character of a string literal type.
 *
 * @example
 * type Result = Last<"hello">;
 * // "o"
 *
 * @example
 * type Empty = Last<"">;
 * // ""
 */
export type Last<T extends string> = T extends "" ? T : ArrayLast<Split<T, "">>;
