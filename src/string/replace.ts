/**
 * Replaces the first occurrence of a substring in a string literal type.
 *
 * @example
 * type Result = Replace<"foo bar foo", "foo", "baz">;
 * // "baz bar foo"
 *
 * @example
 * type Unchanged = Replace<"hello", "x", "y">;
 * // "hello"
 */
export type Replace<
  T extends string,
  A extends string,
  B extends string
> = T extends `${infer AR}${A}${infer BR}` ? `${AR}${B}${BR}` : T;
