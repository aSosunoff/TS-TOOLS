import { Prettify } from "../common/prettify";

/**
 * Makes selected object fields optional.
 *
 * @example
 * type Result = PartialField<{ id: number; name: string }, "name">;
 * // { id: number; name?: string }
 */
export type PartialField<T, F extends keyof T> = Prettify<Omit<T, F> & Partial<Pick<T, F>>>;
