export type CamelTo<
  T extends string,
  WithCharacter extends string = "-",
> = T extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${First}${CamelTo<Rest, WithCharacter>}`
    : `${First}${WithCharacter}${CamelTo<Rest, WithCharacter>}`
  : T;
