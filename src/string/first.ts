import { Split } from "./";
import { First as ArrayFirst } from "../array";

export type First<T extends string> = T extends ""
  ? T
  : ArrayFirst<Split<T, "">>;
