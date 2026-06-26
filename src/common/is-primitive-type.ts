import { PrimitiveType } from "./primitive-type";

/**
 * Checks whether a type is made only of primitive values.
 *
 * @template T - Type to check.
 * @returns `true` when the type is a primitive or a union of primitives, otherwise `false`.
 */
export type IsPrimitiveType<T> = [T] extends [PrimitiveType] ? true : false;
