import { Prettify } from "../common";
import { SnakeToCamelCase } from "../string";
import { isObject } from "./is-object";

/**
 * Recursively converts object keys from `snake_case` to `camelCase`.
 *
 * Arrays are preserved as-is and are not traversed recursively.
 *
 * @example
 * type Result = DtoWithCamelCaseKeysRecursive<{
 *   user_profile: {
 *     first_name: string;
 *     address_info: {
 *       zip_code: string;
 *     };
 *   };
 *   is_active: boolean;
 * }>;
 * // {
 * //   userProfile: {
 * //     firstName: string;
 * //     addressInfo: {
 * //       zipCode: string;
 * //     };
 * //   };
 * //   isActive: boolean;
 * // }
 */
export type DtoWithCamelCaseKeysRecursive<T extends object> = Prettify<{
  [K in keyof T as SnakeToCamelCase<K & string>]: isObject<T[K]> extends true
    ? DtoWithCamelCaseKeysRecursive<T[K] & object>
    : T[K];
}>;
