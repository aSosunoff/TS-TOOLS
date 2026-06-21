/**
 * Replaces all occurrences of one substring with another in a string literal type.
 *
 * @example
 * type Result = ReplaceAll<"user-profile-name">;
 * // "user_profile_name"
 *
 * @example
 * type Custom = ReplaceAll<"a.b.c", ".", "/">;
 * // "a/b/c"
 */
export type ReplaceAll<
  T extends string,
  FROM extends string = "-",
  TO extends string = "_",
> = FROM extends ""
  ? T
  : T extends `${infer Left}${FROM}${infer Right}`
  ? `${Left}${TO}${ReplaceAll<Right, FROM, TO>}`
  : T;
