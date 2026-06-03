export type SplitCamelCase<T extends string, Separator extends string = "-"> = T extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${First}${SplitCamelCase<Rest, Separator>}`
    : `${First}${Separator}${SplitCamelCase<Rest, Separator>}`
  : T;
