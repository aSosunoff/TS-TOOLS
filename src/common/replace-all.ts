export type ReplaceAll<
  T extends string,
  FROM extends string = "-",
  TO extends string = "_",
> = T extends `${infer Left}${FROM}${infer Right}` ? `${Left}${TO}${ReplaceAll<Right, FROM, TO>}` : T;
