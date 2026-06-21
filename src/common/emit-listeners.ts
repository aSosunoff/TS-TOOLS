/**
 * Maps an event payload dictionary to optional `onXxx` listener props.
 *
 * @example
 * type Result = EmitListeners<{ change: [value: string]; submit: [] }>;
 * // {
 * //   onChange?: (value: string) => void;
 * //   onSubmit?: () => void;
 * // }
 */
export type EmitListeners<T extends Record<string, unknown[]>> = {
  [K in keyof T as `on${Capitalize<K & string>}`]?: (...args: T[K]) => void;
};
