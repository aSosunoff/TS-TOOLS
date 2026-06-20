import { SnakeToCamelCase } from "../string";

/**
 * Converts top-level `snake_case` keys of an object to `camelCase`.
 *
 * @example
 * type Result = DtoWithCamelCaseKeys<{
 *   first_name: string;
 *   last_name: string;
 *   is_active: boolean;
 * }>;
 * // {
 * //   firstName: string;
 * //   lastName: string;
 * //   isActive: boolean;
 * // }
 */
export type DtoWithCamelCaseKeys<T extends object> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};
