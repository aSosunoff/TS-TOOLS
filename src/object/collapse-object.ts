import { PropsPath } from ".";
import { GetTypeByPropsPath } from "./get-type-by-props-path";

export type CollapseObject<T extends Record<string, any>> = {
  [key in PropsPath<T>]: GetTypeByPropsPath<T, key>;
};
