/**
 * Checks whether the key `K` is optional in object `T`.
 *
 * @example
 * type Result = IsOptionalKey<{ id: number; name?: string }, "name">;
 * // true
 *
 * @example
 * type Result = IsOptionalKey<{ id: number; name?: string }, "id">;
 * // false
 */
export type IsOptionalKey<T, K extends keyof T> = object extends Pick<T, K> ? true : false;
