/**
 * Merges two object types, giving priority to fields from the second object.
 *
 * @example
 * type Result = Merge<{ id: number; name: string }, { name: number; active: boolean }>;
 * // { id: number; name: number; active: boolean }
 */
export type Merge<A extends object, B extends object> = {
  [K in keyof (A & B)]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
