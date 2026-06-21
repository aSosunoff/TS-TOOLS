/**
 * Checks whether a type is a non-array object.
 *
 * @example
 * type A = isObject<{ name: string }>;
 * // true
 *
 * @example
 * type B = isObject<string[]>;
 * // false
 */
export type isObject<T> = T extends any[]
  ? false
  : T extends Record<string, any>
  ? true
  : false;
