import { Prettify } from "../common/prettify";

export type RequiredField<T, K extends keyof T> = Prettify<
  Omit<T, K> & Required<Pick<T, K>>
>;
