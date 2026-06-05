<p align="center">
  <img src="./ts-tools-pro-1-generics.svg" alt="TS-TOOLS logo" width="240">
</p>

# TypeScript - Tools

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

You can also import commonly used utilities directly from the package root.

```ts
import type {
  ArrayLast,
  HasOnlyKeys,
  StringReplaceAll,
  StrictRecord,
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

### `array.ArrayType<T>`

Returns the item type from an array type.

```ts
type Result = array.ArrayType<Array<{ id: number; name: string }>>;
// {
//   id: number;
//   name: string;
// }
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

Key-check helpers use different directions:

| Utility | Checks |
| --- | --- |
| `object.HasKeys<K, T>` | every key in `K` exists in `T` |
| `object.HasOnlyKeys<K, T>` | every key in `T` is allowed by `K` |
| `object.HasExactKeys<K, T>` | both previous checks are true |
| `object.StrictRecord<K, T>` | requires `T` to be a strict `Record<K, unknown>` |

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

### `object.HasKeys<K, T>`

Checks whether every key in `K` exists in `T`.

```ts
type A = object.HasKeys<
  "id",
  {
    id: number;
    name: string;
  }
>;
// true

type B = object.HasKeys<
  "id" | "email",
  {
    id: number;
    name: string;
  }
>;
// false
```

### `object.HasOnlyKeys<K, T>`

Checks whether `T` has no keys outside `K`.

```ts
type KeysList = "alert" | "confirm";

type A = object.HasOnlyKeys<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
  }
>;
// true

type B = object.HasOnlyKeys<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
    custom: { id: string };
  }
>;
// false
```

### `object.HasExactKeys<K, T>`

Checks whether `T` has exactly the selected key union.

```ts
type Result = object.HasExactKeys<
  "id" | "name",
  {
    id: number;
    name: string;
  }
>;
// true
```

### `object.StrictRecord<K, T>`

Requires `T` to be a record with every key from `K` and no keys outside `K`.

```ts
type KeysList = "alert" | "confirm";

type A = object.StrictRecord<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
  }
>;
// {
//   alert: { title: string };
//   confirm: { message: string };
// }

type B = object.StrictRecord<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
    custom: { id: string };
  }
>;
// Error: "custom" is not allowed.
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

### `object.PartialField<T, F>`

Makes selected object fields optional and keeps all other fields unchanged.

```ts
type Result = object.PartialField<
  {
    id: number;
    name: string;
    email: string;
  },
  "email"
>;
// {
//   id: number;
//   name: string;
//   email?: string;
// }
```

### `object.RequiredField<T, K>`

Makes selected object fields required and keeps all other fields unchanged.

```ts
type Result = object.RequiredField<
  {
    id: number;
    name?: string;
    email?: string;
  },
  "name" | "email"
>;
// {
//   id: number;
//   name: string;
//   email: string;
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
