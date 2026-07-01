import type { HasSnakeCaseKey } from "../string";

/**
 * Extracts only `snake_case` keys from an object.
 *
 * @template T - Object to extract `snake_case` keys from.
 * @returns Union of `T` keys containing `_`.
 */
export type TakeSnakeCaseKey<T extends object> = {
  [K in keyof T]: HasSnakeCaseKey<K> extends true ? K : never;
}[keyof T];
