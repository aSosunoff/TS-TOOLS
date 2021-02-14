export type Tail<T extends string = ""> = T extends `${any}${infer R}` ? R : T;
