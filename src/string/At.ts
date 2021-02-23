import { Split } from "./";

export type At<S extends string, I extends number> = Split<S>[I];
