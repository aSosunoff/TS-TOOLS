import { HasKeys } from "./has-keys";
import { HasOnlyKeys } from "./has-only-keys";

/**
 * Checks whether an object type has exactly the specified keys.
 *
 * @example
 * type Ok = HasExactKeys<"id" | "name", { id: number; name: string }>;
 * // true
 *
 * @example
 * type Fail = HasExactKeys<"id", { id: number; name: string }>;
 * // false
 */
export type HasExactKeys<K extends PropertyKey, T> = HasKeys<K, T> extends true
  ? HasOnlyKeys<K, T>
  : false;
