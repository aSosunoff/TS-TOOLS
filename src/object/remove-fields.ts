/**
 * Removes selected fields from an object type.
 *
 * @template T - Source object type.
 * @template K - Keys to remove from `T`.
 * @returns Object type without keys from `K`.
 */
export type RemoveFields<T extends object, K extends keyof T> = Omit<T, K>;
