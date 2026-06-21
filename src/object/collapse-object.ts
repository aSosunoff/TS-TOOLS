import { PropsPath } from ".";
import { GetTypeByPropsPath } from "./get-type-by-props-path";

/**
 * Flattens an object type into a map of dot-separated property paths to value types.
 *
 * @example
 * type Result = CollapseObject<{ user: { name: string; age: number } }>;
 * // {
 * //   "user.name": string;
 * //   "user.age": number;
 * // }
 */
export type CollapseObject<T extends Record<string, any>> = {
  [key in PropsPath<T>]: GetTypeByPropsPath<T, key>;
};
