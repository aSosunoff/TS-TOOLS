import { HasKeys } from "./has-keys";
import { HasOnlyKeys } from "./has-only-keys";

export type HasExactKeys<K extends PropertyKey, T> = HasKeys<K, T> extends true
  ? HasOnlyKeys<K, T>
  : false;
