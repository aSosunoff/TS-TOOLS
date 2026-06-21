/**
 * Replaces all property value types in an object with `any`.
 *
 * @example
 * type Result = Anyfy<{ id: number; name: string }>;
 * // { id: any; name: any }
 */
export type Anyfy<O extends Record<string, any>> = {
  [K in keyof O]: any;
};
