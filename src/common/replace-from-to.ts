export type ReplaceFromTo<
  T extends string,
  FROM extends string = "-",
  TO extends string = "_",
> = T extends `${infer Left}${FROM}${infer Right}`
  ? `${Left}${TO}${ReplaceFromTo<Right, FROM, TO>}`
  : T;
