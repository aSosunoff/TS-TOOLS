/**
 * Creates a record type that forbids keys outside of the provided key union.
 *
 * @example
 * type Result = StrictRecord<"id" | "name", { id: number; name: string }>;
 * // { id: number; name: string }
 */
export type StrictRecord<
  K extends PropertyKey,
  T extends Record<K, unknown> & {
    [P in Exclude<keyof T, K>]: never;
  },
> = T;
