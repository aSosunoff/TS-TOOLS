export type EmitListeners<T extends Record<string, unknown[]>> = {
  [K in keyof T as `on${Capitalize<K & string>}`]?: (...args: T[K]) => void;
};
