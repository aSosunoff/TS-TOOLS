import { Prettify } from "../common/prettify";

export type PartialField<T, F extends keyof T> = Prettify<
  Omit<T, F> & Partial<Pick<T, F>>
>;
