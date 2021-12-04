export type Tail<
  T extends string = "",
  D extends string = ""
> = T extends `${any}${D}${infer R}` ? R : "";
