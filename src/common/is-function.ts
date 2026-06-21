/**
 * Checks whether a type is a function after removing `null` and `undefined`.
 *
 * @example
 * type A = IsFunction<() => void>;
 * // true
 *
 * @example
 * type B = IsFunction<string | undefined>;
 * // false
 */
export type IsFunction<T> =
  NonNullable<T> extends (...args: never[]) => unknown ? true : false;
