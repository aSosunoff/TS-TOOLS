export type IsFunction<T> =
  NonNullable<T> extends (...args: never[]) => unknown ? true : false;
