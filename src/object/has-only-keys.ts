export type HasOnlyKeys<K extends PropertyKey, T> = Exclude<
  keyof T,
  K
> extends never
  ? true
  : false;
