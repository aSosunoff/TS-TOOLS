/**
 * Replaces all occurrences of a substring in a string literal type.
 *
 * @example
 * type Result = ReplaceAll<"foo bar foo", "foo", "baz">;
 * // "baz bar baz"
 *
 * @example
 * type Unchanged = ReplaceAll<"hello", "", "x">;
 * // "hello"
 */
export type ReplaceAll<
  T extends string,
  A extends string,
  B extends string
> = A extends ""
  ? T
  : T extends `${infer AR}${A}${infer BR}`
  ? ReplaceAll<`${AR}${B}${BR}`, A, B>
  : T;
