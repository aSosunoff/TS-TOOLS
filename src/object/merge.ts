import { Anyfy } from "../any";

type RecordObject = Record<string, any>;

export type Merge<A extends RecordObject, B extends RecordObject> = {
  [K in keyof (Anyfy<A> & B)]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
};
