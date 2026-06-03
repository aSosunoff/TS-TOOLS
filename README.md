# TS-TOOLS

TypeScript type-level utility collection.

## Install

```sh
npm i @asosunoff/ts-tools
```

## Development

```sh
git clone https://github.com/aSosunoff/TS-TOOLS.git
cd TS-TOOLS
npm i
npm run build
```

## Usage

```ts
import type {
  any as anyTools,
  array,
  common,
  object,
  string,
} from "@asosunoff/ts-tools";
```

## Array Utilities

### `array.First<T>`

Returns the first tuple item.

```ts
type Result = array.First<["a", "b", "c"]>;
// "a"
```

### `array.Last<T>`

Returns the last tuple item.

```ts
type Result = array.Last<["a", "b", "c"]>;
// "c"
```

### `array.Pop<T>`

Removes the last tuple item.

```ts
type Result = array.Pop<["a", "b", "c"]>;
// ["a", "b"]
```

### `array.Push<T, E>`

Adds an item to the end of a tuple.

```ts
type Result = array.Push<["a", "b"], "c">;
// ["a", "b", "c"]
```

### `array.Shift<T>`

Removes the first tuple item.

```ts
type Result = array.Shift<["a", "b", "c"]>;
// ["b", "c"]
```

### `array.Unshift<T, E>`

Adds an item to the start of a tuple.

```ts
type Result = array.Unshift<["b", "c"], "a">;
// ["a", "b", "c"]
```

### `array.Join<T, D>`

Joins tuple items into a string literal.

```ts
type Result = array.Join<["user", "profile", "name"], ".">;
// "user.profile.name"
```

### `array.Length<T>`

Returns tuple length.

```ts
type Result = array.Length<["a", "b", "c"]>;
// 3
```

## String Utilities

### `string.Split<S, D>`

Splits a string literal by delimiter.

```ts
type Result = string.Split<"user.profile.name", ".">;
// ["user", "profile", "name"]
```

### `string.Length<T>`

Returns string literal length.

```ts
type Result = string.Length<"hello">;
// 5
```

### `string.Last<T>`

Returns the last character of a string literal.

```ts
type Result = string.Last<"hello">;
// "o"
```

### `string.First<T, D>`

Returns the first string part. The delimiter defaults to an empty string.

```ts
type FirstChar = string.First<"hello">;
// "h"

type FirstPart = string.First<"user.profile.name", ".">;
// "user"
```

### `string.Tail<T, D>`

Returns the string after the first delimiter match.

```ts
type Result = string.Tail<"user.profile.name", ".">;
// "profile.name"
```

### `string.Replace<T, A, B>`

Replaces the first occurrence of a string literal.

```ts
type Result = string.Replace<"user-name", "-", "_">;
// "user_name"
```

### `string.ReplaceAll<T, A, B>`

Replaces all occurrences of a string literal.

```ts
type Result = string.ReplaceAll<"user-profile-name", "-", "_">;
// "user_profile_name"
```

### `string.At<S, I>`

Returns a character by index.

```ts
type Result = string.At<"hello", 1>;
// "e"
```

## Object Utilities

### `object.Merge<A, B>`

Merges two object types. Properties from `B` override properties from `A`.

```ts
type Result = object.Merge<
  { id: number; name: string; enabled: boolean },
  { name: "admin"; role: "owner" }
>;
// {
//   id: number;
//   name: "admin";
//   enabled: boolean;
//   role: "owner";
// }
```

### `object.isObject<T>`

Checks whether a type is an object record. Arrays return `false`.

```ts
type A = object.isObject<{ id: number }>;
// true

type B = object.isObject<string[]>;
// false
```

### `object.PropsPath<T>`

Builds a union of nested property paths.

```ts
type Result = object.PropsPath<{
  user: {
    profile: {
      name: string;
    };
  };
  active: boolean;
}>;
// "user.profile.name" | "active"
```

### `object.GetTypeByPropsPath<T, PATH>`

Returns the value type by a dot-separated property path.

```ts
type Result = object.GetTypeByPropsPath<
  {
    user: {
      profile: {
        name: string;
      };
    };
  },
  "user.profile.name"
>;
// string
```

### `object.CollapseObject<T>`

Converts a nested object type into a flat object with dot-separated keys.

```ts
type Result = object.CollapseObject<{
  user: {
    profile: {
      name: string;
    };
  };
  active: boolean;
}>;
// {
//   "user.profile.name": string;
//   active: boolean;
// }
```

## Any Utilities

### `anyTools.Anyfy<O>`

Keeps object keys and converts all values to `any`.

```ts
type Result = anyTools.Anyfy<{
  id: number;
  name: string;
}>;
// {
//   id: any;
//   name: any;
// }
```

## Common Utilities

### `common.Prettify<T>`

Flattens an intersection or mapped type for cleaner editor hints.

```ts
type Result = common.Prettify<
  { id: number } & {
    name: string;
  }
>;
// {
//   id: number;
//   name: string;
// }
```

### `common.EmitListeners<T>`

Builds listener props from an event map.

```ts
type Result = common.EmitListeners<{
  change: [value: string];
  submit: [id: number, valid: boolean];
}>;
// {
//   onChange?: (value: string) => void;
//   onSubmit?: (id: number, valid: boolean) => void;
// }
```

### `common.SplitCamelCase<T, Separator>`

Inserts a separator before uppercase characters.

```ts
type Result = common.SplitCamelCase<"userProfileName">;
// "user-profile-name"
```

### `common.IsFunction<T>`

Checks whether a type is a function.

```ts
type A = common.IsFunction<() => void>;
// true

type B = common.IsFunction<string>;
// false
```

### `common.MaybeRefProps<T>`

Wraps non-function properties into a value-or-ref-like shape. Function properties stay unchanged.

```ts
type Result = common.MaybeRefProps<{
  value: string;
  count: number;
  onChange: (value: string) => void;
}>;
// {
//   value: string | { value: string };
//   count: number | { value: number };
//   onChange: (value: string) => void;
// }
```

### `common.ReplaceAll<T, FROM, TO>`

Replaces all occurrences of a string literal. `FROM` defaults to `"-"` and `TO` defaults to `"_"`.

```ts
type Result = common.ReplaceAll<"user-profile-name">;
// "user_profile_name"
```
