import { Split } from "./";
import { Length as ArrayLength } from "../array";

export type Length<T extends string> = ArrayLength<Split<T, "">>;
