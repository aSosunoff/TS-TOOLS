/**
 * Checks whether an object type contains all specified keys.
 *
 * @example
 * type Ok = HasKeys<"id" | "name", { id: number; name: string; active: boolean }>;
 * // true
 *
 * @example
 * type Fail = HasKeys<"id" | "email", { id: number; name: string }>;
 * // false
 */
export type HasKeys<K extends PropertyKey, T> = Exclude<K, keyof T> extends never
  ? true
  : false;
