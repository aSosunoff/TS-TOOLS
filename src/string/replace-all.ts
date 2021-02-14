export type ReplaceAll<
  T extends string,
  A extends string,
  B extends string
> = T extends `${infer AR}${A}${infer BR}`
  ? ReplaceAll<`${AR}${B}${BR}`, A, B>
  : T;
