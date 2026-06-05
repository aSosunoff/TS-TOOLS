export type StrictRecord<
  K extends PropertyKey,
  T extends Record<K, unknown> & {
    [P in Exclude<keyof T, K>]: never;
  },
> = T;
