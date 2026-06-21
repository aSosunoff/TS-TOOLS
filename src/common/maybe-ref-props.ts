import type { IsFunction } from "./is-function";

type MaybeRef<T> = T | { value: T };

/**
 * Wraps non-function object properties into `T | { value: T }`.
 *
 * @example
 * type Result = MaybeRefProps<{ count: number; submit: () => void }>;
 * // {
 * //   count: number | { value: number };
 * //   submit: () => void;
 * // }
 */
export type MaybeRefProps<T extends Record<string, unknown>> = {
  [K in keyof T]: IsFunction<T[K]> extends true ? T[K] : MaybeRef<T[K]>;
};
