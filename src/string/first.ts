import { Split } from "./";
import { First as ArrayFirst } from "../array";

export type First<T extends string, D extends string = ""> = T extends ""
  ? T
  : ArrayFirst<Split<T, D>>;
