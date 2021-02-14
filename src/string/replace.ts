export type Replace<
  T extends string,
  A extends string,
  B extends string
> = T extends `${infer AR}${A}${infer BR}` ? `${AR}${B}${BR}` : T;
