export type Anyfy<O extends Record<string, any>> = {
  [K in keyof O]: any;
};
