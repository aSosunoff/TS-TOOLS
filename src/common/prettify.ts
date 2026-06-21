/**
 * Rebuilds an object type to improve IDE display and type readability.
 *
 * @example
 * type Result = Prettify<{ a: string } & { b: number }>;
 * // { a: string; b: number }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
