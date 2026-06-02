/* import type { MaybeRef } from "vue"; */
type MaybeRef<T> = T & any;
import type { IsFunction } from "./is-function";

export type MaybeRefProps<T extends Record<string, unknown>> = {
  [K in keyof T]: IsFunction<T[K]> extends true ? T[K] : MaybeRef<T[K]>;
};
