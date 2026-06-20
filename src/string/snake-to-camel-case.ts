/**
 * Converts a `snake_case` string literal to `camelCase`.
 *
 * @example
 * type Result = SnakeToCamelCase<"user_profile_name">;
 * // "userProfileName"
 *
 * @example
 * type AlreadyCamel = SnakeToCamelCase<"userProfileName">;
 * // "userProfileName"
 */
export type SnakeToCamelCase<T extends string> = T extends `${infer First}_${infer Rest}`
  ? `${First}${Capitalize<SnakeToCamelCase<Rest>>}`
  : T;
