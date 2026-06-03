import type { IsFunction } from "./is-function";

type MaybeRef<T> = T | { value: T };

export type MaybeRefProps<T extends Record<string, unknown>> = {
  [K in keyof T]: IsFunction<T[K]> extends true ? T[K] : MaybeRef<T[K]>;
};
