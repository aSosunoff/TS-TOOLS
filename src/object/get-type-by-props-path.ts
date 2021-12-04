import { First, Tail } from "../string";

export type GetTypeByPropsPath<
  T extends Record<string, any>,
  PATH extends string,
  KEY extends string = ""
> = KEY extends ""
  ? GetTypeByPropsPath<T, Tail<PATH, ".">, First<PATH, ".">>
  : PATH extends ""
  ? T[KEY]
  : GetTypeByPropsPath<T[KEY], Tail<PATH, ".">, First<PATH, ".">>;
