import { IsRequiredKey } from "./is-requered-key";

/**
 * Returns a union of required keys from object `T`.
 *
 * @example
 * type Result = GetRequiredKeys<{ id: number; name?: string; active: boolean }>;
 * // "id" | "active"
 */
export type GetRequiredKeys<T> = {
  [K in keyof T]-?: IsRequiredKey<T, K> extends true ? K : never;
}[keyof T];
