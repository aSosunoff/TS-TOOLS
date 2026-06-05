export type HasKeys<K extends PropertyKey, T> = Exclude<K, keyof T> extends never
  ? true
  : false;
