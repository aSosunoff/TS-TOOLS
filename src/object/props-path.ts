// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { isObject } from "./is-object";

export type PropsPath<T extends Record<string, any>> = {
  [P in keyof T]: isObject<T[P]> extends true
    ? `${string & P}.${PropsPath<object & T[P]>}`
    : `${string & P}`;
}[keyof T];
