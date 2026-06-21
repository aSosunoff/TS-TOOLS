import { Pop, Push } from "../array";

/**
 * @ignore
 */
type _Split<
  S extends string,
  D extends string,
  R extends Array<string> = []
> = S extends `${infer A}${D}${infer B}`
  ? _Split<B, D, Push<R, A>>
  : Push<R, S>;

/**
 * Splits a string literal type into an array of segments using a delimiter.
 *
 * When `D` is an empty string, the result is a tuple of characters.
 *
 * @example
 * type Parts = Split<"a,b,c", ",">;
 * // ["a", "b", "c"]
 *
 * @example
 * type Chars = Split<"abc">;
 * // ["a", "b", "c"]
 */
export type Split<S extends string, D extends string = ""> = D extends ""
  ? Pop<_Split<S, D>>
  : _Split<S, D>;
