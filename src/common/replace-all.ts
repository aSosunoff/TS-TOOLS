export type ReplaceAll<
  T extends string,
  FROM extends string = "-",
  TO extends string = "_",
> = FROM extends ""
  ? T
  : T extends `${infer Left}${FROM}${infer Right}`
  ? `${Left}${TO}${ReplaceAll<Right, FROM, TO>}`
  : T;
