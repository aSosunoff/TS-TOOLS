import { IsOptionalKey } from "./is-optional-key";

/**
 * Checks whether the key `K` is required in object `T`.
 *
 * @example
 * type Result = IsRequiredKey<{ id: number; name?: string }, "id">;
 * // true
 *
 * @example
 * type Result = IsRequiredKey<{ id: number; name?: string }, "name">;
 * // false
 */
export type IsRequiredKey<T, K extends keyof T> = IsOptionalKey<T, K> extends true ? false : true;


