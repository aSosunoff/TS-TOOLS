import { Prettify } from "../common/prettify";

/**
 * Makes selected object fields required.
 *
 * @example
 * type Result = RequiredField<{ id?: number; name?: string }, "id">;
 * // { id: number; name?: string }
 */
export type RequiredField<T, K extends keyof T> = Prettify<
  Omit<T, K> & Required<Pick<T, K>>
>;
