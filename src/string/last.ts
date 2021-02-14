import { Split } from "./";
import { Last as ArrayLast } from "../array";

export type Last<T extends string> = T extends "" ? T : ArrayLast<Split<T, "">>;
