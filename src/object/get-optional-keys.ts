import { IsOptionalKey } from "./is-optional-key";

/**
 * Returns a union of optional keys from object `T`.
 *
 * @example
 * type Result = GetOptionalKeys<{ id: number; name?: string; age?: number }>;
 * // "name" | "age"
 */
export type GetOptionalKeys<T> = {
  [K in keyof T]-?: IsOptionalKey<T, K> extends true ? K : never;
}[keyof T];
