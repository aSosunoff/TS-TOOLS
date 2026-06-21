import { First, Tail } from "../string";

/**
 * Returns the value type located at a dot-separated object property path.
 *
 * @example
 * type Result = GetTypeByPropsPath<{ user: { profile: { name: string } } }, "user.profile.name">;
 * // string
 */
export type GetTypeByPropsPath<
  T extends Record<string, any>,
  PATH extends string,
  KEY extends string = ""
> = KEY extends ""
  ? GetTypeByPropsPath<T, Tail<PATH, ".">, First<PATH, ".">>
  : PATH extends ""
  ? T[KEY]
  : GetTypeByPropsPath<T[KEY], Tail<PATH, ".">, First<PATH, ".">>;
