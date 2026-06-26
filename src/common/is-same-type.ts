import { TypeCheck } from "./type-check";

/**
 * Checks whether two types are exactly equivalent.
 *
 * Unlike a simple `T extends U` check, this compares both directions:
 * `T extends U` and `U extends T`. This distinguishes equivalent types from
 * merely assignable ones.
 *
 * @template T - First type to compare.
 * @template U - Second type to compare.
 * @returns `true` when the types are equivalent, otherwise `false`.
 */
export type IsSameType<T, U> =
  TypeCheck<T> extends TypeCheck<U> ? (TypeCheck<U> extends TypeCheck<T> ? true : false) : false;
