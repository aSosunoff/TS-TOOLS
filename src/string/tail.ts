/**
 * Returns the remainder of a string literal after the first character or delimiter.
 *
 * @example
 * type Result = Tail<"hello">;
 * // "ello"
 *
 * @example
 * type AfterDot = Tail<"user.profile", ".">;
 * // "profile"
 */
export type Tail<
  T extends string = "",
  D extends string = ""
> = T extends `${any}${D}${infer R}` ? R : "";
