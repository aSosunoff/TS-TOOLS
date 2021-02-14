import { Pop, Push } from "../array";

/**
 * @ignore
 */
type _Split<
  S extends string,
  D extends string,
  R extends Array<string> = []
> = S extends `${infer A}${D}${infer B}`
  ? _Split<B, D, Push<R, A>>
  : Push<R, S>;

export type Split<S extends string, D extends string = ""> = D extends ""
  ? Pop<_Split<S, D>>
  : _Split<S, D>;
