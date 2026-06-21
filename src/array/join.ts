import { First, Shift } from "./";

/**
 * @ignore
 */
type _Join<
  T extends any[],
  D extends string = "",
  R extends string = ""
> = First<T> extends never
  ? R
  : R extends ""
  ? _Join<Shift<T>, D, `${T[0]}`>
  : _Join<Shift<T>, D, `${R}${D}${T[0]}`>;

/**
 * Joins tuple elements into a string literal using a delimiter.
 *
 * @example
 * type Result = Join<["a", "b", "c"], "-">;
 * // "a-b-c"
 */
export type Join<T extends any[], D extends string = ""> = _Join<T, D>;
