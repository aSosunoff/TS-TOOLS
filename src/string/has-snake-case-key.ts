/**
 * Checks whether a key contains the `_` character.
 *
 * @template K - Key to check.
 * @returns `true` for string keys in `snake_case`, otherwise `false`.
 */
export type HasSnakeCaseKey<K extends PropertyKey> = K extends string
  ? K extends `${string}_${string}`
    ? true
    : false
  : false;
