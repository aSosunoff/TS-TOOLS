/**
 * Converts a type into a generic function predicate for strict type comparison.
 *
 * This helper exists only at the type level. For any checked `G`, it returns
 * `1` when `G` is assignable to `T`, otherwise `2`. Comparing two predicates
 * avoids distributive conditional types over unions and gives a stricter
 * equivalence check.
 *
 * @template T - Type used to build the assignability predicate.
 * @returns Generic predicate function for type-level comparison.
 */
export type TypeCheck<T> = <G>() => G extends T ? 1 : 2;
