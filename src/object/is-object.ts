export type isObject<T> = T extends any[]
  ? false
  : T extends Record<string, any>
  ? true
  : false;
