// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { isObject } from "./is-object";

/**
 * Builds a union of all dot-separated property paths for a nested object type.
 *
 * @example
 * type Result = PropsPath<{ user: { profile: { name: string } }; active: boolean }>;
 * // "user.profile.name" | "active"
 */
export type PropsPath<T extends Record<string, any>> = {
  [P in keyof T]: isObject<T[P]> extends true
    ? `${string & P}.${PropsPath<object & T[P]>}`
    : `${string & P}`;
}[keyof T];
