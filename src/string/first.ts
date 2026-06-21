import { Split } from "./";
import { First as ArrayFirst } from "../array";

/**
 * Returns the first segment of a string literal split by a delimiter.
 *
 * @example
 * type Result = First<"user.profile.name", ".">;
 * // "user"
 *
 * @example
 * type FirstChar = First<"hello">;
 * // "h"
 */
export type First<T extends string, D extends string = ""> = T extends ""
  ? T
  : ArrayFirst<Split<T, D>>;
