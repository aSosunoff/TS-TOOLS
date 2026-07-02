import type { First, Tail } from "../string";
import type { PropsPath } from "./props-path";

type GetTypeByPropsPathInner<
  T extends Record<string, any>,
  PATH extends string,
  KEY extends string = "",
> = KEY extends ""
  ? GetTypeByPropsPathInner<T, Tail<PATH, ".">, First<PATH, ".">>
  : PATH extends ""
    ? T[KEY]
    : GetTypeByPropsPathInner<T[KEY], Tail<PATH, ".">, First<PATH, ".">>;

/**
 * Returns the value type located at a dot-separated object property path.
 *
 * @example
 * type Result = GetTypeByPropsPath<{ user: { profile: { name: string } } }, "user.profile.name">;
 * // string
 *
 * @example
 * type Result = GetTypeByPropsPath<{ user: { profile: { name: string } } }, "user.profile">;
 * // { name: string }
 */
export type GetTypeByPropsPath<
  T extends Record<string, unknown>,
  PATH extends PropsPath<T, true>,
> = GetTypeByPropsPathInner<T, PATH>;
