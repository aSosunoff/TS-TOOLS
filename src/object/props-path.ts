import type { Push } from "../array";
import type { isObject } from "./is-object";

type PathConcat<PARENT_PATH extends string, CHILD_PATH extends string> = PARENT_PATH extends ""
  ? `${CHILD_PATH}`
  : `${PARENT_PATH}.${CHILD_PATH}`;

type PropsPathWithAllPossibleWays<
  T extends Record<string, any>,
  STORAGE extends unknown[] = [],
  PARENT_PATH extends string = "",
> = {
  [K in keyof T]: isObject<T[K]> extends true
    ? PropsPathWithAllPossibleWays<
        T[K],
        Push<STORAGE, PathConcat<PARENT_PATH, K & string>>,
        PathConcat<PARENT_PATH, K & string>
      >
    : Push<STORAGE, PathConcat<PARENT_PATH, K & string>>[number];
}[keyof T];

/**
 * Builds a union of all dot-separated property paths for a nested object type.
 *
 * @example
 * type Result = PropsPath<{ user: { profile: { name: string } }; active: boolean }>;
 * // "user.profile.name" | "active"
 *
 * @example
 * type Result = PropsPath<{ user: { profile: { name: string } }; active: boolean }, true>;
 * // "user" | "user.profile" | "user.profile.name" | "active"
 */
export type PropsPath<
  T extends Record<string, any>,
  ALL_POSSIBLE_WAYS extends boolean = false,
> = ALL_POSSIBLE_WAYS extends true
  ? PropsPathWithAllPossibleWays<T>
  : {
      [K in keyof T]: isObject<T[K]> extends true
        ? PathConcat<K & string, PropsPath<T[K]>>
        : PathConcat<"", K & string>;
    }[keyof T];
