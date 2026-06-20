import { Prettify } from "../common";

type RemoveFields<T extends object, K extends keyof T> = Omit<T, K>;

/**
 * Replaces existing fields in `T` with values from `U`.
 *
 * Unlike `Merge`, this utility only allows overriding keys that already exist in `T`.
 *
 * @example
 * type Result = OverrideFields<
 *   { id: number; name: string; active: boolean },
 *   { name: "admin"; active: false }
 * >;
 * // { id: number; name: "admin"; active: false }
 */
export type OverrideFields<T extends object, U extends Partial<Record<keyof T, unknown>>> = Prettify<
  RemoveFields<T, Extract<keyof U, keyof T>> & U
>;
