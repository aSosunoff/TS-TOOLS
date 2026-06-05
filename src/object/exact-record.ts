import { HasOnlyKeys } from "./has-only-keys";

export type ExactRecord<
  K extends PropertyKey,
  T extends Record<K, unknown>,
> = HasOnlyKeys<K, T> extends true ? T : never;
