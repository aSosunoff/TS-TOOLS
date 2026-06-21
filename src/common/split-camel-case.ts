/**
 * Converts a `camelCase` or `PascalCase` string literal into a separated string.
 *
 * @example
 * type Result = SplitCamelCase<"userProfileName">;
 * // "user-profile-name"
 *
 * @example
 * type Custom = SplitCamelCase<"UserProfileName", "_">;
 * // "User_Profile_Name"
 */
export type SplitCamelCase<T extends string, Separator extends string = "-"> = T extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${First}${SplitCamelCase<Rest, Separator>}`
    : `${First}${Separator}${SplitCamelCase<Rest, Separator>}`
  : T;
